// Skyrim name data.
//
// The lists of names are harvested from UESP by names/data/update.py and live in skyrim.names.js.
// Everything here -- the patterns, the word lists, the notes -- is written by hand.
//
// Nord is the mixed case the engine was shaped around: the forename is a sound (Markov over real
// names) while the surname is built (Stormcloak, Battle-Born, Snow-Shod are two words welded or
// hyphenated together). Argonian is the case that breaks statistics entirely — a deed name is a
// short sentence, and no chain trained on finished names will ever emit "Lifts-Her-Tail".
//
// Argonians use one name or the other, rarely both: a Jel name like Keerava, or a deed name like
// Scouts-Many-Marshes. Switch off the slot you don't want. The Jel list is the smallest here, because
// canon has few of them, and it is the one most worth adding to.

// Lists of names come from skyrim.names.js, which update.py builds from UESP. Patterns and word
// lists are written by hand here and are never touched by the script.
const SK = typeof SKYRIM_NAMES !== "undefined" ? SKYRIM_NAMES : {};
const skList = (race, set) => ((SK[race] || {})[set] || []);
const bothOf = (...lists) => [...new Set(lists.flat().filter(Boolean))].sort();

const SKYRIM_RACES = [
  {
    id: "skyrim-nord",
    game: "Skyrim",
    race: "Nord",
    note: "Norse-flavoured forenames with a compound surname, joined (Stormcloak) or hyphenated (Battle-Born).",
    sets: ["Masculine", "Feminine"],
    slots: {
      first: {
        kind: "corpus",
        sets: {
          Masculine: skList("nord", "Masculine"),
          Feminine: skList("nord", "Feminine"),
        },
      },
      last: {
        kind: "pools",
        patterns: ["{a}-{b}", "{a}{joined}"],
        pools: {
          a: ["Storm", "Battle", "Gray", "Snow", "Ice", "Fire", "Shatter", "Bear", "Silver", "Black", "Cruel",
            "Iron", "Stone", "Frost", "War", "Oak", "Shield", "Grim", "Cold", "Long", "Night", "Pale", "Red",
            "Sea", "Steel", "Thorn", "White", "Wind", "Wolf", "Bright", "Deep", "Hammer", "Horn", "Raven",
            "Sky", "Hearth", "Elk", "Hollow", "Wild", "Stout"],
          b: ["Born", "Mane", "Shod", "Veins", "Shield", "Claw", "Blood", "Briar", "Sea", "Heart", "Hand",
            "Hide", "Hammer", "Beard", "Song", "Blade", "Spear", "Axe", "Fist", "Brand", "Fang", "Helm",
            "Watch", "Crag", "Gale", "Tooth", "Bane", "Striker", "Walker", "Mender"],
          joined: ["cloak", "blood", "beard", "mane", "heart", "hand", "shield", "helm", "song", "brand",
            "wood", "crag", "fell", "hold", "moor", "stead", "gard", "rath", "mund", "ward"],
        },
      },
    },
  },
  {
    id: "skyrim-argonian",
    game: "Skyrim",
    race: "Argonian",
    note: "A Jel name (Keerava) or a deed name (Scouts-Many-Marshes), almost never both. Switch off the slot you don't want.",
    slots: {
      first: {
        kind: "corpus",
        // Both, because canon has few Jel names and the two sources barely overlap
        names: bothOf(skList("argonian", "Masculine"), skList("argonian", "Feminine"), ["Keerava", "Derkeethus", "Madesi", "Deekus", "Shahvee", "Veezara", "Neetrenaza", "Wujeeta",
          "Jaree-Ra", "Gulum-Ei", "Talen-Jei", "Beem-Ja", "An-Deesei", "Okan-Zeeus", "Ocheeva", "Teinaava",
          "Huleeya", "Im-Kilaya", "Heem-La", "Beem-Kiurz", "Tsrava", "Dar-Jee", "Oleen-Gei", "Weebam-Na",
          "Xeeta", "Jaxsik-Orn", "Seeus", "Raj-Teeba", "Vee-Shan", "Keel-Zeeus", "Neesha", "Daj-Ra", "Seelith",
          "Ushnar-Jo", "Reeh-Ja", "Chun-Ei", "Zeeba", "Maj-Deelo", "Hasheeva", "Tul-Rasha", "Geeshka",
          "Nar-Teeko", "Veelith", "Ji-Saan", "Mureeka", "Oorz-Dei"]),
      },
      last: {
        kind: "pools",
        patterns: ["{verb}-{mid}-{noun}", "{verb}-{noun}", "{verb}-{adv}"],
        pools: {
          verb: ["Lifts", "Swims", "Hides", "Scouts", "Sees", "Walks", "Builds", "Counts", "Dives", "Guards",
            "Hunts", "Keeps", "Listens", "Marks", "Reads", "Runs", "Seeks", "Sings", "Speaks", "Stands",
            "Takes", "Tends", "Waits", "Watches", "Weaves", "Wades", "Climbs", "Carries", "Catches", "Digs",
            "Drinks", "Finds", "Follows", "Gathers", "Holds", "Breaks", "Burns", "Calls", "Casts", "Clears",
            "Cuts", "Draws", "Dreams", "Drifts", "Fears", "Fights", "Floats", "Gives", "Knows", "Leads",
            "Learns", "Lives", "Loses", "Moves", "Names", "Opens", "Pulls", "Rests", "Rises", "Sails",
            "Sends", "Shapes", "Sleeps", "Steals", "Swears", "Trades", "Turns", "Wanders", "Wears"],
          mid: ["Her", "His", "The", "Many", "In", "At", "With", "Through", "Beneath", "Among", "Deep",
            "Without", "All", "No", "One", "Three", "Nine", "Every", "Some", "That", "Two", "Few"],
          noun: ["Tail", "Eyes", "Marshes", "Water", "Deep", "Branch", "Reeds", "Stones", "Roots", "Sky",
            "Moons", "River", "Shadows", "Nets", "Songs", "Secrets", "Bones", "Scales", "Storms", "Mud",
            "Trees", "Paths", "Vines", "Eggs", "Hatchlings", "Spears", "Coin", "Shells", "Silt", "Fog",
            "Rain", "Thorns", "Cups", "Shallows", "Fathoms", "Tides", "Nests", "Feathers", "Teeth", "Claws",
            "Debts", "Names", "Hours", "Roads", "Fires", "Salt", "Weeds", "Hollows", "Currents", "Banks"],
          adv: ["Softly", "Slowly", "Quickly", "Quietly", "Alone", "Twice", "Often", "Far", "Late", "Early",
            "Deeply", "Lightly", "Sideways", "Homeward", "Sternly", "Gladly"],
        },
      },
    },
  },
];

// The rest of Skyrim's races, which are all sound rather than structure and so need nothing but a
// list. They are added here rather than written out one by one because the only thing that differs
// between them is the note.
//
// Skyrim has far fewer named people than Warcraft does, so a race is split by gender only when both
// halves are big enough to learn from; otherwise its names go in one list. A race too thin even for
// that is left out rather than shipped echoing its own list back -- Khajiit and Wood Elf today,
// and in Khajiit's case the names are built to a shape anyway (Ri'saad, J'zargo, the dro- and -dar
// honorifics) and would be better written as patterns by hand.
const SKYRIM_MORE = [
  ["imperial", "Imperial", "Latinate, from the Empire's heartland in Cyrodiil."],
  ["breton", "Breton", "High Rock: part Nordic, part Elven, with a French cast to it."],
  ["dark-elf", "Dark Elf", "Dunmer, from Morrowind: clipped consonants and few soft endings."],
  ["high-elf", "High Elf", "Altmer, from the Summerset Isles: long, formal and vowel-heavy."],
  ["redguard", "Redguard", "Hammerfell, with an Arabic cast and the occasional apostrophe."],
  ["orc", "Orc", "Orsimer strongholds: blunt and consonant-heavy. Men carry gro-, women gra-, before their father's or mother's name."],
].map(([key, race, note]) => {
  const masc = skList(key, "Masculine"), fem = skList(key, "Feminine");
  const both = bothOf(masc, fem);
  if (both.length < 40) return null;
  const slots = { first: masc.length >= 50 && fem.length >= 50
    ? { kind: "corpus", sets: { Masculine: masc, Feminine: fem } }
    : { kind: "corpus", names: both } };
  const race_ = { id: "skyrim-" + key, game: "Skyrim", race, note, slots };
  if (slots.first.sets) race_.sets = ["Masculine", "Feminine"];
  return race_;
}).filter(Boolean);

SKYRIM_RACES.push(...SKYRIM_MORE);
