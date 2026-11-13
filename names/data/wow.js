// World of Warcraft name data.
//
// The lists of names are harvested from Warcraft Wiki by names/data/update.py and live in
// wow.names.js. Everything here -- which races exist, what their parts are called, the notes --
// is written by hand.
//
// Given names are lists: they are a sound, and a chain catches them. Surnames are patterns, because
// they are built -- Bronzebeard, Amberstill, Angerfang -- and update.py takes the harvested ones
// apart into the words they are made of. Learned whole, a chain would sometimes glue four parts
// together and hand back Fiendspeakheart; joined from two word lists it cannot. Surnames that don't
// come apart, which is most of a human's, are kept whole and used as they are.
//
// The wiki files no gender, so each list covers both. The names are also the whole cast rather than
// one people: a human list holds Stormwind and Kul Tiran names together, which is a fair sample of
// the game but not of any one city.

const WOW_LIST = typeof WOW_NAMES !== "undefined" ? WOW_NAMES : {};

const WOW_RACES = [
  ["human", "Human", "Western given names with a compound surname, from Stormwind, Lordaeron and Kul Tiras alike."],
  ["orc", "Orc", "Hard consonants and apostrophes, with a clan name for a surname."],
  ["night-elf", "Night Elf", "Long flowing given names; surnames are compounds drawn from the natural world."],
  ["blood-elf", "Blood Elf", "Thalassian, often apostrophed, with surnames built around the sun and the dawn."],
  ["dwarf", "Dwarf", "Scots-flavoured given names, with surnames compounded from metal, stone and drink."],
  ["gnome", "Gnome", "Short bright given names, with surnames that read like the machines they build."],
  ["draenei", "Draenei", "Eredun: long vowels and apostrophes, and far fewer surnames than given names."],
  ["tauren", "Tauren", "Surnames are compounds of the plains and the hunt, carried as a whole phrase."],
  ["undead", "Undead (Forsaken)", "The names they carried as humans, kept after death."],
  ["worgen", "Worgen", "Gilnean, which is to say English, and unchanged by the curse."],
  ["goblin", "Goblin", "Trade-cant given names with surnames that sound like a going concern."],
  ["pandaren", "Pandaren", "Given names in two short syllables, with surnames taken from brewing and the table."],
  ["nightborne", "Nightborne", "Shal'dorei: elven names worn formal by ten thousand years behind the Nightwell."],
  ["void-elf", "Void Elf", "Ren'dorei: Thalassian names, with the sun in them giving way to the dark."],
  ["lightforged-draenei", "Lightforged Draenei", "Eredun, with the Light's own words worked into the surnames."],
  ["highmountain-tauren", "Highmountain Tauren", "Tauren names turned to the mountain rather than the plain."],
  ["maghar-orc", "Mag'har Orc", "Orcish as it was before the fel: clan names carried unbroken."],
  ["dark-iron-dwarf", "Dark Iron Dwarf", "Dwarven names cast in the forge and the dark beneath the mountain."],
  ["zandalari-troll", "Zandalari Troll", "Zandali in its oldest and most formal shape, with the empire's names behind it."],
  ["vulpera", "Vulpera", "Short, light names from the caravans of Vol'dun."],
  ["earthen", "Earthen", "Titan-forged, and named for stone, ore and the work of making."],
  ["dracthyr", "Dracthyr", "Draconic: hard syllables and the marks of the five flights."],
  ["haranir", "Haranir", "Names out of the deep forest, soft and old."],
].map(([key, race, note]) => {
  const lists = WOW_LIST[key] || {};
  const slots = {};
  // Under about sixty names a chain mostly hands back the list it learned from, so a part that
  // thin is left off rather than shipped looking broken.
  if ((lists.first || []).length >= 60) slots.first = { kind: "corpus", names: lists.first };
  const head = lists.lastHead || [], tail = lists.lastTail || [], whole = lists.lastWhole || [];
  if (head.length >= 40 && tail.length >= 40) {
    // Two parts named twice and one whole name once, so most of a batch is newly built while the
    // surnames that never came apart still turn up
    const patterns = ["{head}{tail}", "{head}{tail}"];
    if (whole.length >= 20) patterns.push("{whole}");
    slots.last = { kind: "pools", patterns, pools: { head, tail, whole } };
  } else if (whole.length >= 60) {
    slots.last = { kind: "corpus", names: whole };
  }
  return { id: "wow-" + key, game: "World of Warcraft", race, note, slots };
}).filter(r => Object.keys(r.slots).length);

// Troll is written by hand. The wiki files trolls by tribe rather than by race, so its race
// category holds forty pages where orcs have four thousand, and the tribe categories are about the
// tribes rather than their people -- they came back with Drakkari, Berserking and Dinomancer among
// the names. It wants patterns anyway: Zandali names are a stem, an apostrophe and an ending, the
// way Vol'jin and Sen'jin are built, and a chain over a handful of finished ones would only lose
// the apostrophe. Trolls carry no surname; what stands in its place is the tribe they belong to.
// The whole names below are canon, and update.py's harvest is folded in beside them.
// Skyborne, the elven race of World of Warcraft: Forever, written by hand. Their category holds
// ninety-odd pages but most are an Al'Aketh something-or-other rather than a person, so what the
// harvest leaves is folded in beside names written to the shape the canon ones show: an elven
// forename and a surname compounded out of the sky -- Elaadrin Evengale, Ayessa Dawnsinger,
// Anathamaas Aetherwind.
WOW_RACES.push({
  id: "wow-skyborne",
  game: "World of Warcraft",
  race: "Skyborne",
  note: "Elven forenames, Darnassian in cast, with a surname compounded out of the sky and the wind.",
  slots: {
    first: {
      kind: "corpus",
      names: [...new Set([
        "Elaadrin", "Ayessa", "Anathamaas", "Corswyn", "Aeigelyges", "Aetheen", "Aerindel",
        "Aelyssia", "Caelwyn", "Daerynn", "Elandria", "Faelorin", "Gaelthas", "Haeldrin",
        "Iriadne", "Kaelwynn", "Lathiel", "Myrrathen", "Naeryssa", "Orithel", "Phaedrin",
        "Quelanis", "Rhaelynn", "Sylvaeth", "Thaeriel", "Ulandris", "Vaelorin", "Wyndaeth",
        "Yllandra", "Zephyrael", "Aelindra", "Baeltheris", "Cirendel", "Draelyn", "Elowyss",
        "Faeryndal", "Galendis", "Hyrianne", "Isaldrin", "Jaelorin", "Kyrianth", "Lirathel",
        "Maelwyss", "Nythaeril", "Oriandel", "Pyraleth", "Rhydaeth", "Saelinor", "Tyraneth",
        "Vaeltheris", "Wylandris", "Ysaeril",
        ...(((typeof WOW_NAMES !== "undefined" && WOW_NAMES.skyborne) || {}).first || []),
      ])],
    },
    last: {
      kind: "pools",
      patterns: ["{head}{tail}"],
      pools: {
        head: ["Even", "Dawn", "Aether", "Sky", "Storm", "Cloud", "Wind", "Gale", "Zephyr",
          "Sun", "Star", "Moon", "Mist", "Rain", "Thunder", "Light", "High", "Far", "Swift",
          "Bright", "Silver", "Azure", "Pale", "Soar", "Wing", "Cirrus", "Tempest", "Dusk",
          "Morning", "Ever", "Wander", "Winter", "Summer", "Hollow", "Whisper"],
        tail: ["gale", "singer", "wind", "wing", "song", "caller", "chaser", "weaver", "rider",
          "breeze", "sky", "light", "dancer", "whisper", "drift", "glide", "spire", "reach",
          "crest", "veil", "borne", "soarer", "watcher", "bringer", "fall", "rise"] },
    },
  },
});

WOW_RACES.push({
  id: "wow-troll",
  game: "World of Warcraft",
  race: "Troll",
  note: "Zandali: a stem, an apostrophe and an ending. In place of a surname a troll carries the name of their tribe.",
  slots: {
    first: {
      kind: "pools",
      // Two to one, so most of a batch is built rather than drawn from the names already known
      patterns: ["{stem}'{ending}", "{stem}'{ending}", "{whole}"],
      pools: {
        stem: ["Vol", "Zul", "Sen", "Jin", "Gal", "Rok", "Mar", "Zan", "Tal", "Hex", "Vel", "Xal",
          "Kaz", "Bom", "Rhu", "Tor", "Zen", "Jan", "Kil", "Mul", "Nal", "Ryn", "Shan", "Thal",
          "Vash", "Yaz", "Zil", "Bro", "Dar", "Gri", "Hak", "Lok", "Nok", "Qel", "Ras", "Sul",
          "Ter", "Vud", "Wun", "Xar", "Zar", "Krag", "Hir", "Juk", "Mak", "Ogo", "Rhen", "Tak"],
        ending: ["jin", "do", "darah", "nah", "li", "zil", "zin", "thar", "kir", "bul", "dan",
          "ja", "mi", "rok", "tabra", "ek", "ku", "wa", "gal", "han", "zah", "nji", "kai", "ro",
          "shi", "tay", "vak", "zu", "kha", "mah", "tek", "vir"],
        whole: ["Rokhan", "Zalazane", "Bwonsamdi", "Hakkar", "Vanira", "Natunga", "Zekhan",
          "Talanji", "Rastakhan", "Jinthala", "Tiza", "Gonk", "Kimbul", "Shadra", "Akali",
          "Rezan", "Torcali", "Yazma", "Zolani", "Bakar", "Masha", "Jubei", "Harkoa", "Zentimo",
          ...(((typeof WOW_NAMES !== "undefined" && WOW_NAMES.troll) || {}).first || [])],
      },
    },
    last: {
      kind: "pools",
      patterns: ["{tribe}"],
      pools: {
        tribe: ["Darkspear", "Zandalari", "Gurubashi", "Amani", "Drakkari", "Farraki",
          "Witherbark", "Vilebranch", "Bloodscalp", "Skullsplitter", "Shatterspear", "Frostmane",
          "Winterax", "Mossflayer", "Sandfury", "Revantusk", "Smolderthorn", "Firetree",
          "Hakkari", "Atal'ai"],
      },
    },
  },
});
