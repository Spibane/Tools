// The name generator's engine. It knows nothing about any particular game: a race is data, and the
// packs in data/ are just the ones that ship with the site. A race a visitor writes themselves uses
// the same shape, so anything here works for both.
//
// A race is {id, game, race, note, sets, slots:{first, last}}. A slot generates one part of a name
// and is one of two kinds:
//   corpus   {kind:"corpus", names:[...]}  or  {kind:"corpus", sets:{"Masculine":[...], ...}}
//            A character-level Markov chain over real names. Good for names that are a sound rather
//            than a structure: Elezen, Nord, most of WoW. Needs a lot of names to stop parroting them.
//   pools    {kind:"pools", patterns:["{a}{b}", "{a}-{b}"], pools:{a:[...], b:[...]}}
//            Patterns with {pool} slots filled from word lists. The only way to do names that are built
//            rather than sounded: Roegadyn compounds, Nord surnames, Argonian phrase names.
// Both kinds answer the same four questions, which is what lets the page treat them alike:
// generate one, score how typical a string is, say whether a given string is already a legal name,
// and produce near-misses of a string.

const ORDER = 3;          // Markov context length. 2 is sloppy, 4 memorises the corpus; 3 is the useful one.
const ALPHABET = 30;      // roughly how many characters a name can use, for smoothing
const BACKOFF_COST = 0.7; // how much a score is docked each time an unseen context forces a shorter one

const weightedPick = counts => {
  let total = 0;
  for (const n of counts.values()) total += n;
  let r = Math.random() * total;
  for (const [k, n] of counts) if ((r -= n) < 0) return k;
  return [...counts.keys()][0];
};

// Levenshtein distance, capped: it stops early once everything is further apart than max,
// which matters because the canon check runs it against every name in the corpus.
function editDistance(a, b, max = Infinity) {
  if (Math.abs(a.length - b.length) > max) return max + 1;
  let prev = [...Array(b.length + 1).keys()];
  for (let i = 1; i <= a.length; i++) {
    const row = [i];
    let best = i;
    for (let j = 1; j <= b.length; j++) {
      row[j] = Math.min(prev[j] + 1, row[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      best = Math.min(best, row[j]);
    }
    if (best > max) return max + 1;
    prev = row;
  }
  return prev[b.length];
}

// ---------------------------------------------------------------- corpus slots

// Tables of "what follows this context", one per context length. Shorter lengths are the fallback for
// a context the names never used, so an odd string still gets a sensible score instead of an impossible one.
function buildModel(names) {
  const clean = [...new Set(names.map(n => String(n).trim()).filter(Boolean))];
  const tables = [];
  for (let o = 1; o <= ORDER; o++) {
    const table = new Map();
    for (const name of clean) {
      const s = "^".repeat(o) + name.toLowerCase() + "$";
      for (let i = 0; i + o < s.length; i++) {
        const key = s.slice(i, i + o);
        let counts = table.get(key);
        if (!counts) table.set(key, counts = new Map());
        counts.set(s[i + o], (counts.get(s[i + o]) || 0) + 1);
      }
    }
    tables.push(table);
  }
  // Letters in the proportions this race actually uses them, so a mutation reaches for a plausible
  // letter instead of a random one from the alphabet. This is what keeps forced variants in character.
  const letters = new Map();
  for (const name of clean) for (const ch of name.toLowerCase()) if (/[^\s]/.test(ch)) letters.set(ch, (letters.get(ch) || 0) + 1);
  // Length bounds come from percentiles, not the shortest and longest name. One stray four-letter
  // name in a race of long ones would otherwise let the chain stop after four letters all day.
  const lengths = clean.map(n => n.length).sort((a, b) => a - b);
  const at = q => lengths[Math.min(lengths.length - 1, Math.floor(lengths.length * q))];
  const model = {
    kind: "corpus", tables, letters, names: clean,
    lower: new Set(clean.map(n => n.toLowerCase())),
    min: Math.max(2, at(0.05)),
    max: at(0.95) + 2,
  };
  // The last resort when even a single letter is one this race never uses, which happens as soon as
  // someone forces a string from outside it. Without this the chain simply stops and the forced
  // string comes back bare. "$" is weighted so names still end at about the length they should.
  model.fallback = new Map(letters);
  model.fallback.set("$", Math.max(1, clean.length));
  // The bar for "this is a real name of this race": the least typical name the race actually has, with
  // a little slack. Anything scoring at least this much is as plausible as the oddest genuine name.
  const scores = clean.map(n => scoreCorpus(model, n)).sort((a, b) => a - b);
  model.floor = (scores[Math.floor(scores.length * 0.02)] ?? scores[0] ?? -4) - 0.2;
  return model;
}

// The chance of the next character, backing off to a shorter context when this one is unseen.
// Returns [probability, how many times it had to back off].
function nextCounts(model, context) {
  for (let o = ORDER; o >= 1; o--) {
    const counts = model.tables[o - 1].get(context.slice(-o).padStart(o, "^"));
    if (counts && counts.size) return [counts, ORDER - o];
  }
  return [model.fallback && model.fallback.size ? model.fallback : null, ORDER];
}

// How typical a string is for this race, as an average log-probability per character.
// Higher is more typical; it is always a real number, so nothing is ever rejected outright.
function scoreCorpus(model, word) {
  const s = "^".repeat(ORDER) + String(word).toLowerCase() + "$";
  let total = 0, n = 0;
  for (let i = ORDER; i < s.length; i++) {
    const [counts, backoff] = nextCounts(model, s.slice(0, i));
    let p = 1 / ALPHABET;
    if (counts) {
      let sum = 0;
      for (const c of counts.values()) sum += c;
      p = ((counts.get(s[i]) || 0) + 0.08) / (sum + 0.08 * ALPHABET);
    }
    total += Math.log(p) - backoff * BACKOFF_COST;
    n++;
  }
  return n ? total / n : -9;
}

// One name. start is text it must begin with (the forced string, when it is anchored to the front):
// the chain is seeded with it and carries on, so what follows still flows out of those letters.
function growCorpus(model, start = "") {
  let out = start.toLowerCase();
  let context = ("^".repeat(ORDER) + out).slice(-ORDER);
  for (let i = 0; i < model.max + 6; i++) {
    const [counts] = nextCounts(model, context);
    if (!counts) break;
    const ch = weightedPick(counts);
    if (ch === "$") break;
    out += ch;
    context = (context + ch).slice(-ORDER);
  }
  return out;
}

// ---------------------------------------------------------------- pools slots

const POOL_TOKEN = /\{(\w+)\}/g;

// Splits "{verb}-{noun}" into ["{verb}", "-", "{noun}"]
const patternParts = pattern => pattern.split(/(\{\w+\})/).filter(Boolean);

// A pools slot's patterns, always at least one. A race saved with none (or with the field missing
// after a hand-edited backup) used to take the generator down on the first draw.
const patternsOf = slot => (Array.isArray(slot.patterns) && slot.patterns.length ? slot.patterns : ["{" + (Object.keys(slot.pools || {})[0] || "a") + "}"]);

// One name from a pattern, as its separate pieces. They are kept apart rather than joined so a
// forced string can be put in at a seam between words instead of through the middle of one.
function fillParts(slot, pattern) {
  // The same {token} used twice in one pattern means the same word both times. Lalafell names are
  // built on it -- Jajano Jano is one syllable repeated to a shape. Two independent draws want two
  // pools with different names.
  const chosen = {};
  return patternParts(pattern).map(part => {
    const token = part.match(/^\{(\w+)\}$/);
    if (!token) return part;
    if (token[1] in chosen) return chosen[token[1]];
    const pool = (slot.pools || {})[token[1]] || [];
    // A pattern naming a pool that isn't there used to put "{missing}" in the middle of the name.
    // It leaves a gap instead; the editor is where a visitor is told which name was wrong.
    return (chosen[token[1]] = pool.length ? pool[Math.floor(Math.random() * pool.length)] : "");
  });
}

// Pool names a pattern asks for that the slot hasn't got, for the editor to warn about.
function unknownPools(slot) {
  const missing = new Set();
  for (const pattern of patternsOf(slot)) {
    for (const part of patternParts(pattern)) {
      const token = part.match(/^\{(\w+)\}$/);
      if (token && !((slot.pools || {})[token[1]] || []).length) missing.add(token[1]);
    }
  }
  return [...missing];
}

// Is this string one of the race's own words, rather than a whole name? "Merl" is a Roegadyn word
// but not a Roegadyn name, because a name is a head and a tail joined.
function poolWord(slot, word) {
  const low = String(word).trim().toLowerCase();
  for (const [name, pool] of Object.entries(slot.pools || {})) {
    const match = pool.find(v => v.toLowerCase() === low);
    if (match) return { pool: name, value: match };
  }
  return null;
}

// The places in a pattern that draw from a given pool, in the order the pattern uses them.
// Seats are found by pool rather than by matching a word, because a word with a letter changed
// is no longer in the pool but still belongs where that word would have gone.
function poolSeats(slot, pattern, poolName) {
  const seats = [];
  patternParts(pattern).forEach((part, index) => {
    const token = part.match(/^\{(\w+)\}$/);
    if (token && token[1] === poolName) seats.push(index);
  });
  return seats;
}

// Can this string be built from this race's own words? Returns the pieces it was built from
// (so a mutation can swap one), or null. This is the pools answer to "is it already a legal name".
function decompose(slot, str) {
  for (const pattern of patternsOf(slot)) {
    const parts = patternParts(pattern);
    const walk = (i, pos, taken, chosen) => {
      if (i === parts.length) return pos === str.length ? taken : null;
      const token = parts[i].match(/^\{(\w+)\}$/);
      if (!token) {
        return str.slice(pos, pos + parts[i].length).toLowerCase() === parts[i].toLowerCase()
          ? walk(i + 1, pos + parts[i].length, taken, chosen) : null;
      }
      // A token already used in this pattern has to be the same word again
      const pool = token[1] in chosen ? [chosen[token[1]]] : (slot.pools[token[1]] || []);
      // Longest first, so "Storm" + "cloak" wins over a shorter word that also fits the front
      for (const value of [...pool].sort((a, b) => b.length - a.length)) {
        if (str.slice(pos, pos + value.length).toLowerCase() !== value.toLowerCase()) continue;
        const rest = walk(i + 1, pos + value.length, taken.concat([{ pool: token[1], value }]),
                          { ...chosen, [token[1]]: value });
        if (rest) return rest;
      }
      return null;
    };
    const taken = walk(0, 0, [], {});
    if (taken) return { pattern, parts: taken };
  }
  return null;
}

// ---------------------------------------------------------------- one interface over both kinds

// Slots are prepared once and cached: a Markov model is a little work to build and the page
// regenerates on every click. set picks which list a corpus slot uses (Masculine, Feminine, ...).
const cache = new Map();
function prepare(slot, set, cacheKey) {
  // A pools slot splits by set the same way a corpus one does, except that what a set holds is a
  // patterns and pools override laid over the slot. A Miqo'te surname needs this: the men take Tia
  // or Nunh and the women take the tribe's name, from one slot with one pattern.
  if (slot.kind !== "corpus") {
    if (!slot.sets) return slot;
    const over = slot.sets[set] || {};
    return {
      ...slot,
      patterns: (over.patterns && over.patterns.length) ? over.patterns : slot.patterns,
      pools: { ...(slot.pools || {}), ...(over.pools || {}) },
    };
  }
  const key = cacheKey + "|" + (set || "");
  if (cache.has(key)) return cache.get(key);
  const sets = slot.sets;
  // A set the slot doesn't have falls back to everything it does have, so a race can name
  // its sets loosely without every slot needing to split the same way.
  // A set that is named but still empty falls back to everything the slot has, the same as a set
  // it hasn't got. Typing "[Masculine]" and not having filled it in yet should not stop the
  // generator dead while the rest of the race is sitting right there.
  const names = !sets ? (slot.names || [])
    : (sets[set] && sets[set].length) ? sets[set]
    : Object.values(sets).flat();
  const model = buildModel(names);
  cache.set(key, model);
  return model;
}
const clearCache = () => cache.clear();

const isCorpus = prepared => prepared.kind === "corpus";

// Is this string already a name this race could have? Corpus slots ask whether it reads like one,
// pools slots whether it can be spelled out of the race's own words.
function legal(prepared, str) {
  str = String(str).trim();
  if (!str) return false;
  return isCorpus(prepared) ? scoreCorpus(prepared, str) >= prepared.floor : !!decompose(prepared, str);
}

// Near-misses of a string, at an edit distance of at most `vary`. The point is that they stay in
// character: a corpus slot swaps in letters the race actually uses, and a pools slot swaps a whole
// word for another from the same pool, because changing one letter of "Stormcloak" is just a typo.
// scope says which letters an edit may touch: "ends" keeps the inside of the word as it was typed
// and changes only its first or last letter, which is what keeps a short word readable -- Merl
// gives Berl or Merk rather than Mdrl. "any" lets an edit land anywhere in the word.
function variants(prepared, str, vary, want = 40, scope = "ends") {
  const out = new Map();
  if (vary <= 0) return [str];
  // Variance means the same thing for every race: letters change. Swapping a whole word for
  // another from its pool was tried and is not a near-miss -- Merl becoming Styrm keeps nothing
  // of what was typed -- and sibling words already come up on their own at variance 0, because
  // only the forced word is pinned and the rest of the pattern is drawn fresh each time.
  const pools = !isCorpus(prepared);
  // For pools the letters come from the race's own words, so an edit stays in character.
  if (pools) prepared = { ...buildModel(Object.values(prepared.pools || {}).flat()), floor: -Infinity };
  // Edits run on a lowercase copy, whichever kind of slot this is, so that adding a letter at the
  // front can't strand the capital in the middle: Synrix would otherwise give hSynrix. Chain names
  // are lowercase anyway and have their capitals put back later; a pool word gets its own back here.
  const capital = pools && /^[A-Z]/.test(str);
  const base = String(str).toLowerCase();
  const letters = [...prepared.letters.keys()];
  const weights = prepared.letters;
  const randomLetter = () => weightedPick(weights) ?? letters[0] ?? "a";
  const ends = scope !== "any";
  // With "ends" the inside of the word is held out of reach rather than merely avoided. Editing by
  // position isn't enough: a first edit moves where the ends are, so a second can reach a letter
  // that started in the middle. Here the word is split once into lead + inside + trail, the inside
  // is never touched, and every edit is spent on lead or trail, which may grow, shrink or change.
  const inside = ends && base.length > 2 ? base.slice(1, -1) : "";
  for (let i = 0; i < 600 && out.size < want; i++) {
    let name = base;
    const edits = 1 + Math.floor(Math.random() * vary);
    if (ends) {
      let lead = base.slice(0, 1), trail = base.length > 1 ? base.slice(-1) : "";
      for (let e = 0; e < edits; e++) {
        const front = Math.random() < 0.5;
        let part = front ? lead : trail;
        const op = Math.random();
        if (op < 0.6 && part) part = front ? randomLetter() + part.slice(1) : part.slice(0, -1) + randomLetter();
        else if (op < 0.85 || !part) part = front ? randomLetter() + part : part + randomLetter();
        else part = front ? part.slice(1) : part.slice(0, -1);
        if (front) lead = part; else trail = part;
      }
      name = lead + inside + trail;
    } else for (let e = 0; e < edits; e++) {
      if (!name.length) break;
      const at = Math.floor(Math.random() * name.length);
      const op = Math.random();
      if (op < 0.6 || name.length <= 3) name = name.slice(0, at) + randomLetter() + name.slice(at + 1);
      else if (op < 0.85) name = name.slice(0, at + 1) + randomLetter() + name.slice(at + 1);
      else name = name.slice(0, at) + name.slice(at + 1);
    }
    // Random edits can undo each other, so check what actually came out rather than how many were made
    if (!name.length || name === base) continue;
    const dist = editDistance(name.toLowerCase(), base.toLowerCase(), vary);
    if (dist <= vary) out.set(name, { dist, score: scoreCorpus(prepared, name) });
  }
  // Nearest first, then best-sounding. Variance is a ceiling rather than a target: asking for 2
  // should spend most of a batch on one-letter misses and reach for two-letter ones after, or a
  // short word comes back unrecognisable -- half of "Merl" can change before the limit is met.
  const list = [...out.entries()]
    .sort((a, b) => a[1].dist - b[1].dist || b[1].score - a[1].score)
    .map(e => e[0]);
  return [str, ...(capital ? list.map(v => v.charAt(0).toUpperCase() + v.slice(1)) : list)];
}

// `count` distinct indexes below n
function pickIndexes(n, count) {
  const all = [...Array(n).keys()];
  for (let i = all.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [all[i], all[j]] = [all[j], all[i]]; }
  return all.slice(0, count);
}

// Capitals go after hyphens and spaces too, because a generated Jel name is "Raj-Deesei", not
// "Raj-deesei". Pool values carry their own case and already match this.
// Matched by Unicode letter case, not a-z: a race whose names start with E, AE or TH is not
// unusual once games beyond English are in, and those came back as elodie, aegir and thora.
const capitalise = s => s.replace(/(^|[-\s])(\p{Ll})/gu, (whole, before, letter) => before + letter.toUpperCase());
// Pool values and pattern text carry the case they were written with, so only word starts are
// raised: a name of two words is two capitals -- Jajano Jano, Tall Mountain -- while a hyphen is
// left alone, because {a}-of-the-{b} is one name and should not become Pale-Of-The-Striker.
const capitaliseWords = s => s.replace(/(^|\s)(\p{Ll})/gu, (whole, before, letter) => before + letter.toUpperCase());

// Every name this slot can offer for one roll, honouring a forced string.
// force is {text, where, vary}: where is "whole", "start", "end" or "anywhere".
// avoidCanon drops anything that is, or is one letter from, a name the race already has.
function slotNames(prepared, { force, avoidCanon = true, want = 1 } = {}) {
  const text = force && force.text ? String(force.text).trim() : "";
  const vary = force ? Math.max(0, Math.min(3, +force.vary || 0)) : 0;
  const where = (force && force.where) || "whole";
  const scope = (force && force.scope) || "ends";
  const results = [];
  const seen = new Set();
  // forced says this string is the visitor's own choice, so the canon check doesn't apply to it:
  // asking for Aymeric should give you Aymeric, not a refusal because the game already has one.
  const add = (name, forced, from) => {
    // Only chain output needs capitals put back throughout, because it is built lowercase. Pattern
    // text and pool words are written with the case they should have, so touching them would turn
    // a pattern like {a}-of-the-{b} into "Pale-Of-The-Striker". The very first letter is still
    // raised, since whatever else it is the result is a name: forcing the suffix "wyb" as a whole
    // name should give Wyb, not wyb.
    name = name.trim();
    name = isCorpus(prepared) ? capitalise(name) : capitaliseWords(name);
    const key = name.toLowerCase();
    if (!name || seen.has(key)) return;
    if (!forced && avoidCanon && isCorpus(prepared) && tooClose(prepared, key)) return;
    seen.add(key);
    // from is the string that was actually put in, which is the forced text or a varied form of
    // it. The page points at it in the result, because once it is inside a built name there is
    // otherwise no telling where it stops.
    results.push({ name, from: from || "" });
  };

  // A forced whole name is the simplest case: it, or its near-misses, and nothing generated at all.
  // There may be fewer of those than were asked for, and that is the honest answer.
  if (text && where === "whole") {
    for (const v of variants(prepared, text, vary, want * 3, scope)) { add(v, true, v); if (results.length >= want) break; }
    return results;
  }

  const stems = text ? variants(prepared, text, vary, Math.max(8, want), scope) : [""];
  const spliced = [];
  // Which of the race's words the forced string is, if any. Taken from the text as typed: its
  // varied forms are not in any pool, but they still belong in that word's place.
  const seat = text && !isCorpus(prepared) ? poolWord(prepared, text) : null;
  for (let attempt = 0; attempt < want * 120 && results.length < want; attempt++) {
    const stem = stems[attempt % stems.length];
    let name;
    if (!isCorpus(prepared)) {
      // When the forced string is one of the race's words, only patterns with somewhere to put it
      // are worth drawing from: "cloak" belongs to {a}{joined}, so {a}-{b} would just hang it on
      // the end and give Grim-Shieldcloak.
      let choices = patternsOf(prepared);
      if (seat) {
        const fit = choices.filter(p => poolSeats(prepared, p, seat.pool).length);
        if (fit.length) choices = fit;
      }
      const pattern = choices[Math.floor(Math.random() * choices.length)];
      const pieces = fillParts(prepared, pattern);
      name = pieces.join("");
      if (stem) {
        // If the string is one of the race's own words it takes that word's place in the pattern,
        // so forcing "Merl" on a Roegadyn gives Merlwyb rather than MerlKolbwyb. A varied Merl goes
        // in the same place, which is why the seat is worked out from the string as it was typed.
        const seats = seat ? poolSeats(prepared, pattern, seat.pool) : [];
        if (seats.length) {
          // Every place that pool fills, since a token used twice means the same word twice
          for (const at of seats) pieces[at] = stem;
          add(pieces.join(""), true, stem);
          continue;
        }
        // A compound will not happen to contain a string of someone's choosing, so it is put in
        // rather than waited for -- at a seam between words, which is where it reads as one of them.
        const low = name.toLowerCase(), want = stem.toLowerCase();
        const has = where === "start" ? low.startsWith(want) : where === "end" ? low.endsWith(want) : low.includes(want);
        if (!has) {
          if (where === "start") name = stem + name;
          else if (where === "end") name = name + stem;
          else {
            const seam = 1 + Math.floor(Math.random() * Math.max(1, pieces.length - 1));
            name = pieces.slice(0, seam).join("") + stem + pieces.slice(seam).join("");
          }
        }
      }
      add(name, !!stem, stem);
      continue;
    }
    if (!stem) { name = growCorpus(prepared); }
    else if (where === "start") {
      name = growCorpus(prepared, stem);
      // The seed can dead-end: "Synrix" ends in "ix", and in Elezen "ix" only ever ends a name, so
      // the chain correctly refuses to carry on. Correct, but it hands back the forced string alone.
      // Borrow the ending of a real name instead, which keeps the tail in character.
      if (name.length < prepared.min) {
        const donor = prepared.names[Math.floor(Math.random() * prepared.names.length)].toLowerCase();
        // Take enough of the donor's ending to reach a normal length for the race
        const need = Math.max(2, prepared.min - stem.length) + Math.floor(Math.random() * 3);
        const joined = stem.toLowerCase() + donor.slice(-Math.min(need, donor.length));
        if (joined.length <= prepared.max + 2) spliced.push([joined, scoreCorpus(prepared, joined), stem]);
        continue;
      }
    }
    else {
      // The forced string has to sit at the end or inside, which the chain can't be steered into
      // directly: grow a name and splice the string in. These are collected and ranked rather than
      // filtered against the race's bar, because a forced string is a deliberate override of it --
      // judging the splices against each other still puts the best-reading joins at the top.
      const grown = growCorpus(prepared);
      const low = stem.toLowerCase();
      // How much of the generated name there is room for once the forced string is in it. Without
      // this the splice is a whole name with the string stuck on the end, which is far too long.
      const room = prepared.max - low.length;
      if (room < 1) { spliced.push([low, scoreCorpus(prepared, low), stem]); continue; }
      const between = (lo, hi) => lo + Math.floor(Math.random() * Math.max(1, hi - lo + 1));
      if (where === "end") {
        const cut = between(Math.max(1, prepared.min - low.length), Math.min(grown.length, room));
        name = grown.slice(0, cut) + low;
      } else {
        const cut = between(1, Math.min(grown.length - 1, room));
        const tail = between(0, Math.min(room - cut, grown.length - cut));
        name = grown.slice(0, cut) + low + (tail ? grown.slice(grown.length - tail) : "");
      }
      spliced.push([name, scoreCorpus(prepared, name), stem]);
      continue;
    }
    if (name.length < prepared.min || name.length > prepared.max + (stem ? stem.length : 0)) continue;
    add(name, false, stem);
  }
  // Best-reading splices first
  for (const [name, , from] of spliced.sort((a, b) => b[1] - a[1])) {
    if (results.length >= want) break;
    add(name, true, from);
  }
  // A corner can be narrow enough that skipping the game's own names leaves little or nothing: in
  // Nord a name starting "Ae" is only ever Aela or Aeri, and a small list of very unalike names
  // gives a chain with almost nowhere to go. Short of what was asked for, the skip is dropped and
  // the rest of the batch filled, because ten names including a few of the game's own is a better
  // answer than one name. The fresh ones still come first.
  if (results.length < want && avoidCanon) {
    for (const made of slotNames(prepared, { force, avoidCanon: false, want })) {
      if (results.length >= want) break;
      const key = made.name.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      results.push(made);
    }
  }
  return results;
}

// Within one letter of a name the race already has. Generating "Aymerix" from a list containing
// "Aymeric" is not a new name, and a small corpus will do it constantly unless this is checked.
const tooClose = (model, lower) => model.names.some(n => editDistance(lower, n.toLowerCase(), 1) <= 1);

// A batch of names. Each slot is asked for the whole batch at once rather than one name at a time,
// so the slot can keep them distinct from each other, and so a forced string with variance spends
// its near-misses across the batch instead of repeating one of them.
function makeNames(race, { slots, set, force = {}, avoidCanon = true, count = 10 }) {
  const columns = {};
  let rows = 0;
  for (const key of ["first", "last"]) {
    if (!slots[key] || !race.slots[key]) continue;
    const prepared = prepare(race.slots[key], set, race.id + ":" + key);
    columns[key] = slotNames(prepared, { force: force[key], avoidCanon, want: count });
    rows = Math.max(rows, columns[key].length);
  }
  if (!rows) return [];
  // A slot that ran out (a forced whole name has only so many variants) cycles rather than
  // leaving gaps, so every row is still a complete name.
  return Array.from({ length: Math.min(count, rows) }, (unused, i) => {
    const row = { from: {} };
    for (const [key, list] of Object.entries(columns)) {
      if (!list.length) continue;
      let made = list[i % list.length];
      // Nobody is called Adams Adams. The lists are drawn separately and a name can be in both, so
      // a surname that matches the forename steps along to the next one.
      if (key === "last" && made.name === row.first && list.length > 1) made = list[(i + 1) % list.length];
      row[key] = made.name;
      row.from[key] = made.from;
    }
    return row;
  });
}

// Why a forced string was or wasn't taken as it stands, for the note under the box.
function forceReport(race, key, set, text) {
  const slot = race.slots[key];
  if (!slot || !String(text).trim()) return null;
  const prepared = prepare(slot, set, race.id + ":" + key);
  const str = String(text).trim();
  if (isCorpus(prepared)) return { ok: legal(prepared, str), kind: "corpus" };
  const built = decompose(prepared, str);
  if (built) return { ok: true, kind: "pools", parts: built.parts.map(p => p.value) };
  // Not a whole name, but it may still be one of the words a name is made of
  return { ok: false, kind: "pools", parts: null, word: !!poolWord(prepared, str) };
}
