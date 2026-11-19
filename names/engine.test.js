// Run with: node --test names/
const test = require("node:test"), assert = require("node:assert"), fs = require("node:fs"), vm = require("node:vm");

// The engine and the race files are plain browser scripts, loaded in order into one context of their own
const ctx = vm.createContext({});
for (const f of ["engine.js", "data/skyrim.names.js", "data/wow.names.js", "data/ffxiv.js", "data/skyrim.js", "data/wow.js"])
  vm.runInContext(fs.readFileSync(__dirname + "/" + f, "utf8"), ctx);
const { makeNames, RACES } = vm.runInContext("({makeNames, RACES: [...FFXIV_RACES, ...SKYRIM_RACES, ...WOW_RACES]})", ctx);

// Every word a race is written with, to tell a capital it was given on purpose (McCoy) from one a join left behind
const words = race => {
  const out = [];
  const scan = v => { if (typeof v === "string") out.push(v); else if (v && typeof v === "object") Object.values(v).forEach(scan); };
  scan(race.slots);
  return out;
};
const own = (race, key) => {
  const slot = race.slots[key];
  return slot.kind === "pools" ? Object.values(slot.pools || {}).flat().find(w => w.length > 2) : null;
};

// Every race, every set, each part, each place, with a plain string and with one of the race's own words
function* cases() {
  for (const race of RACES) for (const set of race.sets && race.sets.length ? race.sets : [""])
    for (const key of ["first", "last"]) if (race.slots[key])
      for (const text of ["Ra", own(race, key)].filter(Boolean))
        for (const where of ["start", "end", "anywhere"]) yield { race, set, key, text, where };
}
const run = ({ race, set, key, text, where }) =>
  makeNames(race, { slots: { [key]: true }, set, force: { [key]: { text, where, vary: 0 } }, count: 6 }).map(r => r[key]);

// A capital after a lowercase letter is fine only when one of the race's own words puts it there: McCoy, or a
// word list entry written with a capital, like Gregor among the WoW surname endings
const fromData = (name, at, list) => list.some(w => [...w].some((ch, j) =>
  /\p{Lu}/u.test(ch) && at - j >= 0 && name.startsWith(w, at - j)));

test("forced text never leaves a capital in the middle of a word", () => {
  for (const c of cases()) {
    const list = words(c.race);
    for (const name of run(c))
      for (const m of name.matchAll(/\p{Ll}(\p{Lu})/gu))
        assert.ok(fromData(name, m.index + 1, list), `${c.race.id} ${c.key} ${c.where} "${c.text}": ${name}`);
  }
});

test("forced text goes where it was asked to", () => {
  for (const c of cases()) {
    const t = c.text.toLowerCase();
    for (const name of run(c).map(n => n.toLowerCase())) {
      const ok = c.where === "start" ? name.startsWith(t) : c.where === "end" ? name.endsWith(t) : name.includes(t);
      assert.ok(ok, `${c.race.id} ${c.key} ${c.where} "${c.text}": ${name}`);
    }
  }
});
