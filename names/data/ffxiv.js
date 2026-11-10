// Final Fantasy XIV name data: every race, split by clan.
//
// FFXIV has no source that tags a name with the race who carries it -- XIVAPI gives NPC names but
// no clan, and nothing else fills the gap -- so unlike Skyrim and Warcraft none of this is
// harvested. It suits the game: most of its clans name themselves to a published rule rather than
// by ear, so what is wanted is the vocabulary and the shape, not a list of finished names.
//
// The shapes come from Square Enix's own naming-convention posts, which cover Hyur, Elezen,
// Lalafell, Miqo'te and Roegadyn in detail, and say of the Au Ra only that Raen names lean Japanese
// and Xaela names follow the steppe clans. No convention was ever published for Viera or Hrothgar:
// those four clans are shaped on the handful of canon names there are, and are the ones to check
// first if something reads wrong.
//
// The word lists are a starting point rather than a full vocabulary. Where a clan is a list race,
// the list wants widening; where it is a pattern race, adding words to a pool goes further faster.

const FFXIV_RACES = [
  // ------------------------------------------------------------------ Hyur
  {
    id: "ffxiv-hyur-midlander", game: "Final Fantasy XIV", race: "Hyur (Midlander)",
    note: "Forenames out of pre-17th century Europe; a surname from a trade, a place or a feature.",
    sets: ["Masculine", "Feminine"],
    slots: {
      first: { kind: "corpus", sets: {
        Masculine: ["Eddard", "Petyr", "Belmont", "Wymond", "Thancred", "Godbert", "Hildibrand",
          "Alberic", "Baldwin", "Cedric", "Dunstan", "Edric", "Godwin", "Harold", "Leofric",
          "Osric", "Wulfric", "Aldred", "Beornwulf", "Cuthbert", "Egbert", "Hereward", "Leofwin",
          "Oswin", "Redwald", "Siward", "Theodric", "Wilfrid", "Aethelred", "Cyneric", "Dougal",
          "Ewan", "Gareth", "Howell", "Ithel", "Kynon", "Maddoc", "Owain", "Rhodri", "Tudur",
          "Ansgar", "Brennus", "Colwyn", "Drystan", "Elidir", "Gerent", "Hywel", "Morcant"],
        Feminine: ["Isolde", "Hester", "Joyse", "Edda", "Minfilia", "Alys", "Beatrix", "Cecily",
          "Edith", "Godiva", "Hilda", "Juliana", "Katrin", "Lettice", "Maud", "Nesta", "Osythe",
          "Petronel", "Rosamund", "Sybil", "Thomasin", "Wenna", "Ysolt", "Aldith", "Bethan",
          "Clarice", "Dilys", "Elswyth", "Gwenllian", "Heledd", "Idony", "Mabel", "Olwen",
          "Rhonwen", "Tegan", "Winifred", "Avice", "Eluned", "Gwladys", "Morwen", "Sidwell"] } },
      last: { kind: "pools",
        patterns: ["{trade}", "{trade}", "{head}{tail}"],
        pools: {
          trade: ["Baker", "Stone", "Miller", "Hunter", "Smith", "Fisher", "Brewer", "Carter",
            "Cooper", "Draper", "Fletcher", "Glover", "Mason", "Potter", "Shepherd", "Tanner",
            "Thatcher", "Turner", "Weaver", "Wright", "Browne", "Stark", "Swift", "Wilde",
            "Younge", "Marsh", "Vale", "Brook", "Field", "Ford", "Hill", "Wood"],
          head: ["Green", "Fair", "Hart", "Iron", "Stone", "Oak", "Ash", "Bright", "Black",
            "White", "Long", "Swift", "Elm", "Mill", "Church", "Well", "Red", "Moor"],
          tail: ["field", "well", "wood", "brook", "ford", "hill", "worth", "bourne", "ridge",
            "stead", "gate", "combe", "barrow", "haven", "mere", "thorpe"] } },
    },
  },
  {
    id: "ffxiv-hyur-highlander", game: "Final Fantasy XIV", race: "Hyur (Highlander)",
    note: "Germanic forenames and a surname that sounds like something earned in a fight.",
    sets: ["Masculine", "Feminine"],
    slots: {
      first: { kind: "corpus", sets: {
        Masculine: ["Aethlwold", "Hunfrid", "Lewenhart", "Gundobald", "Adalbert", "Burkhart",
          "Dietrich", "Eberhard", "Folkmar", "Gerhart", "Hartmut", "Irminric", "Kunibert",
          "Lothar", "Meinhard", "Norbert", "Otger", "Reinhard", "Sigmund", "Theodbald",
          "Udalrich", "Volkmar", "Wolfram", "Aldric", "Bernhart", "Conrad", "Dankmar",
          "Engelbert", "Frowin", "Gotthard", "Helmbrecht", "Isenhart", "Liutbald", "Markward",
          "Odilo", "Rudiger", "Siegward", "Warin", "Hartwig", "Baldmar", "Ekkehard", "Grimbald"],
        Feminine: ["Sigberta", "Orieldis", "Bergard", "Adalheid", "Brunhild", "Clotild", "Dagmar",
          "Ermengard", "Frideswid", "Gerlind", "Hildegund", "Irmgard", "Kunigund", "Liutgard",
          "Mathild", "Notburg", "Odila", "Richildis", "Swanhild", "Theoda", "Walburg", "Adelind",
          "Berthild", "Edeltraud", "Hadewig", "Irmentrud", "Leudgard", "Wulfhild", "Gisela",
          "Ortrud", "Reinhild", "Sieglind", "Thiedrud", "Amalgard", "Hrotsvith", "Mechthild"] } },
      last: { kind: "pools",
        patterns: ["{head}{tail}", "{head}{tail}", "{plain}"],
        pools: {
          head: ["Iron", "Grim", "Storm", "Bear", "Wolf", "Boar", "Bone", "Blood", "Battle",
            "Oak", "Stone", "Steel", "Fire", "Frost", "Hawk", "Raven", "War", "Shield", "Spear",
            "Axe", "Stout", "Hard", "Cold", "Red", "Black"],
          tail: ["blade", "fist", "hand", "claw", "bane", "heart", "born", "breaker", "biter",
            "hide", "maw", "song", "tooth", "shield", "spear", "mane", "brand", "ward", "blood",
            "crest", "helm", "arm"],
          plain: ["Strong", "Blacke", "Thorne", "Hunter", "Stark", "Swift", "Bold", "Grim",
            "Wilde", "Harde", "Stern", "Fell"] } },
    },
  },

  // ------------------------------------------------------------------ Elezen
  // Both clans build names the same way -- the official convention says so -- but they never share
  // a surname, which is why the forename lists below are the same and the house lists are not.
  ...[["wildwood", "Wildwood", "The forest-born, and most of Ishgard's highborn houses.",
       ["Leveilleur", "Fortemps", "Haillenarte", "Durendaire", "Dzemael", "Borel", "Greystone",
        "Taillefer", "Valentione", "Caillebotte", "Jhacedoix", "Roussillon", "Lhuillier",
        "Beaulaix", "Chantefeuille", "Daurevelle", "Fontenay", "Hautefoy", "Lescaut", "Montblanc",
        "Rochefort", "Tournefort", "Verlaine", "Marcanet", "Charlemaigne", "Lavalliere"]],
      ["duskwight", "Duskwight", "The cave-born of Gelmorra, who share the Wildwood's way with a name but never their houses.",
       ["Sombrevaux", "Noirterre", "Malveaux", "Esclavier", "Ombrelin", "Corbeaux", "Froideveaux",
        "Tenebraix", "Gravesaint", "Mornecourt", "Caverault", "Dolourel", "Estagne", "Quelleve",
        "Sauvelle", "Yvrault", "Pradelles", "Soulvaincourt", "Creuxmont", "Ravenoix",
        "Silvanoix", "Umbrelaix", "Gloamvaux", "Nocteveaux"]]
    ].map(([key, name, note, houses]) => ({
      id: "ffxiv-elezen-" + key, game: "Final Fantasy XIV", race: "Elezen (" + name + ")",
      note: note + " Women's names run short and end in -ne, -ette, -elle or a long vowel; men's run long and end in x or a silent t.",
      sets: ["Masculine", "Feminine"],
      slots: {
        first: { kind: "corpus", sets: {
          Masculine: ["Haurchefant", "Artoirel", "Emmanellain", "Edmont", "Francel", "Aymeric",
            "Estinien", "Charlemend", "Grinnaux", "Adelphel", "Zephirin", "Vellguine",
            "Paulecrain", "Ignasse", "Noudenet", "Janlenoux", "Yuhelmeric", "Aurvael", "Leuekin",
            "Alphinaud", "Louisoix", "Urianger", "Marcelloix", "Bertennant", "Hennetaux",
            "Guillaime", "Hilaire", "Laurent", "Ompagne", "Sylbrand", "Coultenet", "Honoroit",
            "Stephanivien", "Gibrillont", "Jannequinard", "Ferrant", "Vaindreau", "Drillemont",
            "Lutibert", "Falhairn", "Baurendouin", "Guydelot", "Jehantel", "Girauld", "Raitmeaux",
            "Mourechaux", "Nogeloix", "Padilloux", "Vairemont", "Aurifort", "Thibaudin"],
          Feminine: ["Alisaie", "Yaelle", "Lucia", "Laniaitte", "Heustienne", "Rielle", "Dulia",
            "Gaetelle", "Mairead", "Olphaire", "Ysayle", "Mathye", "Marielle", "Sylvaine",
            "Aymeline", "Perrine", "Adelle", "Honorine", "Emmeline", "Francelle", "Vivienne",
            "Ameliance", "Chantelle", "Josselaine", "Noemie", "Odette", "Solange", "Valentine",
            "Blancette", "Delphine", "Fabienne", "Gisele", "Jehanne", "Leuiliene", "Mauricette",
            "Orielle", "Sidonie", "Veraine", "Yvonnette", "Tivionne", "Elviane", "Jainelette",
            "Pimelle", "Jannie", "Ceaulie"] } },
        last: { kind: "corpus", names: houses },
      },
    })),

  // ------------------------------------------------------------------ Lalafell
  // Lalafell names are a shape rather than a sound: a syllable repeated to a pattern, with the
  // surname echoing the forename's ending. The whole name is one part here, because the two halves
  // have to share a syllable and a pattern can only hold a token steady inside itself.
  {
    id: "ffxiv-lalafell-plainsfolk", game: "Final Fantasy XIV", race: "Lalafell (Plainsfolk)",
    note: "A shape, not a sound. Men take AB-CB, women ABB-AB. The surname is nobody's but theirs, so forename and surname come together.",
    sets: ["Masculine", "Feminine"],
    slots: {
      first: { kind: "pools",
        patterns: ["{a}{b} {c}{b}"],
        pools: {
          a: ["zori", "kope", "alka", "nana", "papa", "wawa", "tata", "momo", "lala", "jaja",
            "koko", "mimi", "rara", "sasa", "toto", "yaya", "bobo", "dada", "gogo", "hoho"],
          b: ["do", "l", "a", "ko", "mo", "ra", "to", "wa", "ya", "zo", "bi", "lu", "ni", "su"],
          c: ["manari", "yorpe", "zolka", "pamina", "tatana", "wawala", "kokoma", "nanaro",
            "lalari", "jajabo", "mimito", "rarana", "sasami", "totolu", "yayaki", "bobowa"] },
        sets: {
          Masculine: { patterns: ["{a}{b} {c}{b}"] },
          Feminine: { patterns: ["{a}{b}{b} {a}{b}"],
            pools: { a: ["mi", "toki", "ula", "nana", "koko", "jaja", "yaya", "momo", "tata",
              "lala", "papa", "wawa", "rara", "sasa", "bibi", "dodo", "kuku", "nunu"],
              b: ["mo", "ki", "la", "no", "bi", "ra", "to", "wa", "ya", "zo", "lu", "ni"] } },
        } },
    },
  },
  {
    id: "ffxiv-lalafell-dunesfolk", game: "Final Fantasy XIV", race: "Lalafell (Dunesfolk)",
    note: "A shape, not a sound. Men take AAB-CCB, women AAB-AB. The surname is nobody's but theirs, so forename and surname come together.",
    sets: ["Masculine", "Feminine"],
    slots: {
      first: { kind: "pools",
        patterns: ["{a}{a}{b} {c}{c}{b}"],
        pools: {
          a: ["ja", "nu", "ko", "ta", "pa", "wa", "mo", "la", "ri", "su", "to", "ya", "be", "do",
            "gi", "he", "ku", "ne"],
          b: ["riku", "lupa", "bina", "moto", "nara", "siku", "tela", "wina", "zoma", "kiro",
            "lami", "pola", "ruku", "tami"],
          // No syllable that {a} also has, or a name comes out as Hehezoma Hehezoma. The official
          // shape lets A and C rhyme, which these do, but they are never the same syllable.
          c: ["ba", "ca", "fi", "gu", "hi", "ji", "ki", "mi", "no", "pi", "ra", "sa", "ti", "va",
            "wi", "za", "du", "lo"] },
        sets: {
          Masculine: { patterns: ["{a}{a}{b} {c}{c}{b}"] },
          Feminine: { patterns: ["{a}{a}{b} {a}{b}"],
            pools: { b: ["no", "bi", "mo", "ki", "la", "ra", "to", "wa", "ya", "zo", "lu", "ni",
              "su", "te"] } },
        } },
    },
  },

  // ------------------------------------------------------------------ Miqo'te
  {
    id: "ffxiv-miqote-seeker", game: "Final Fantasy XIV", race: "Miqo'te (Seeker of the Sun)",
    note: "A tribe letter, an apostrophe, then the given name in lower case. A man's surname is his standing -- Tia, or Nunh for the tribe's breeding male -- and a woman's is the forename of the nunh who sired her.",
    sets: ["Masculine", "Feminine"],
    slots: {
      // The apostrophe is structure, not a sound, which is why this clan is patterns rather than a
      // list of names: a chain trained on finished Seeker names drops the apostrophe or doubles it.
      first: { kind: "pools",
        patterns: ["{tribe}'{given}"],
        pools: {
          tribe: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
          given: ["shtola", "naago", "ashaht", "bhen", "odh", "kebbe", "rhid", "dolkka", "mhitra",
            "raha", "rhun", "ranmaia", "sahnja", "lhaminn", "nelhah", "ljinha", "bhaq", "tenmi",
            "jhun", "zhuri", "khonsu", "nazra", "tahla", "mykka", "roshan", "vaneh", "sahto",
            "liandri", "nhaza", "wyrsha", "khetto", "menji", "rhasi", "zhan", "lassa", "thokka",
            "bhimi", "nerrha", "saldja", "vhetto", "yhara", "dhosa", "kkoro", "mhaza", "tsena",
            "tyaka", "sushmo", "bolata", "amneko", "khera", "jinha", "myrra"] } },
      last: { kind: "pools",
        patterns: ["{name}"],
        pools: { name: ["Tia", "Nunh"] },
        sets: {
          Masculine: { pools: { name: ["Tia", "Nunh"] } },
          // A woman carries the nunh's forename, so these are men's given names with a capital
          Feminine: { pools: { name: ["Rhiki", "Raha", "Odh", "Nelhah", "Bhen", "Kebbe", "Rhid",
            "Jhun", "Khonsu", "Thokka", "Zhan", "Menji", "Sahto", "Roshan", "Vaneh", "Khetto",
            "Dhosa", "Tsena", "Bhaq", "Tenmi", "Nhaza", "Mykka", "Lassa", "Rhasi"] } },
        } },
    },
  },
  {
    id: "ffxiv-miqote-keeper", game: "Final Fantasy XIV", race: "Miqo'te (Keeper of the Moon)",
    note: "Matriarchal, and no tribe letter. A woman takes a short forename and her mother's surname; a man takes his mother's forename with a birth-order ending -- 'a for the first son, 'to the second, 'li the third.",
    sets: ["Masculine", "Feminine"],
    slots: {
      first: { kind: "pools",
        patterns: ["{given}"],
        pools: {
          given: ["Okhi", "Cemi", "Sizha", "Mahri", "Tsuki", "Bahko", "Nhemi", "Rhana", "Sahza",
            "Teli", "Vahli", "Yuhri", "Zehna", "Ahko", "Bhira", "China", "Dahzi", "Ehna", "Fhira",
            "Ghila", "Hazhi", "Ihma", "Jhila", "Khina", "Lhami", "Mhezi", "Nhila", "Ohza",
            "Phira", "Rhema", "Shila", "Thani", "Uhma", "Vheza", "Whila", "Yhani", "Zhila"],
          order: ["a", "to", "li", "sae", "ra", "no"] },
        sets: {
          Masculine: { patterns: ["{given}'{order}"] },
          Feminine: { patterns: ["{given}"] },
        } },
      last: { kind: "pools",
        patterns: ["{family}"],
        pools: { family: ["Nbolo", "Jinjahl", "Epocan", "Molkot", "Nunhja", "Rhaka", "Sahgo",
          "Tokhra", "Vhandi", "Yaszha", "Zhelko", "Ahtmir", "Bhanda", "Chalka", "Dhemsi",
          "Ehmbor", "Fhandi", "Ghelko", "Hanzha", "Imbroka", "Jhanti", "Khanda", "Lhundi",
          "Mhozha", "Nhandi", "Ohkamu", "Phandi", "Rhanzi", "Shundi", "Thamba"] } },
    },
  },

  // ------------------------------------------------------------------ Roegadyn
  {
    id: "ffxiv-roegadyn-seawolf", game: "Final Fantasy XIV", race: "Roegadyn (Sea Wolf)",
    note: "A forename is two words of Old Roegadyn welded shut; a woman's second word says woman, sister or daughter. The surname is the father's name with -syn for a son or -wyn for a daughter. Forcing a string works best when it is one of those roots.",
    sets: ["Masculine", "Feminine"],
    slots: {
      first: { kind: "pools",
        patterns: ["{head}{tail}"],
        pools: {
          head: ["Bloef", "Merl", "Sudr", "Wyrn", "Rhotz", "Styrm", "Dael", "Grint", "Haldr",
            "Jaeg", "Kolb", "Lorn", "Mael", "Naeg", "Oryn", "Praet", "Roegn", "Sval", "Thaeg",
            "Ulfr", "Varn", "Wolf", "Yrsa", "Zoen", "Brand", "Fryd", "Gand", "Hraes", "Isen",
            "Kragn", "Leif", "Mord", "Ofn", "Rask", "Skald", "Torn", "Vagn", "Drak", "Eikr",
            "Halm", "Jorv", "Narv", "Snae", "Vyrd", "Greint", "Myte", "Ahtm"],
          tail: ["hild", "led", "zoen", "gyn", "byrn", "frid", "mund", "grim", "stan", "ulf",
            "vald", "were", "haed", "drun", "mere", "wic", "holm", "bern", "laed", "syn", "thyr",
            "wald", "fast", "rond", "sken", "troed", "varn", "yrn", "oum", "myrgan", "mhas"] },
        sets: {
          Masculine: { patterns: ["{head}{tail}"] },
          // A woman's second word is one that says who she is in the family
          Feminine: { patterns: ["{head}{kin}"],
            pools: { kin: ["swys", "thota", "wyb", "hilda", "dyr", "moerda", "sywn", "fraw"] } },
        } },
      last: { kind: "pools",
        patterns: ["{head}{tail}{child}"],
        pools: {
          head: ["Bloef", "Merl", "Sudr", "Wyrn", "Rhotz", "Styrm", "Dael", "Grint", "Haldr",
            "Jaeg", "Kolb", "Lorn", "Mael", "Naeg", "Oryn", "Praet", "Roegn", "Sval", "Thaeg",
            "Ulfr", "Varn", "Wolf", "Zoen", "Brand", "Fryd", "Gand", "Hraes", "Isen", "Kragn"],
          tail: ["his", "en", "ael", "oen", "ar", "ir", "ol", "ys", "un", "wen", "aes", "ond"],
          child: ["syn", "wyn"] },
        sets: {
          Masculine: { pools: { child: ["syn"] } },
          Feminine: { pools: { child: ["wyn"] } },
        } },
    },
  },
  {
    id: "ffxiv-roegadyn-hellsguard", game: "Final Fantasy XIV", race: "Roegadyn (Hellsguard)",
    note: "Two plain words, a description and a thing, most often out of the natural world. Many Hellsguard carry no family name at all, so the whole name is the forename.",
    slots: {
      first: { kind: "pools",
        patterns: ["{adj} {noun}"],
        pools: {
          adj: ["tall", "spinning", "still", "blue", "weeping", "silent", "broken", "burning",
            "falling", "rising", "distant", "hidden", "waking", "sleeping", "bitter", "patient",
            "restless", "gentle", "roaring", "fading", "creeping", "shining", "hollow", "steady",
            "wandering", "watchful", "quiet", "sudden", "lasting", "crooked", "pale", "deep"],
          noun: ["mountain", "blade", "river", "lily", "orchid", "moss", "stone", "ember",
            "thunder", "ash", "pine", "cedar", "briar", "fern", "spring", "canyon", "ridge",
            "flame", "cinder", "basalt", "willow", "thistle", "lotus", "reed", "boulder",
            "summit", "hollow", "current", "shadow", "feather", "antler", "bramble"] } },
    },
  },

  // ------------------------------------------------------------------ Au Ra
  {
    id: "ffxiv-aura-raen", game: "Final Fantasy XIV", race: "Au Ra (Raen)",
    note: "Japanese in cast, from long years among the Domans. Eorzea puts the family name second, where the Far East would put it first.",
    sets: ["Masculine", "Feminine"],
    slots: {
      first: { kind: "corpus", sets: {
        Masculine: ["Hien", "Gosetsu", "Hakuro", "Asahi", "Yoshimitsu", "Kaien", "Masaaki",
          "Nobutada", "Ryoma", "Sadanobu", "Takeharu", "Ujihiro", "Yasutake", "Chikara",
          "Daichi", "Eijiro", "Fumito", "Genzo", "Hideo", "Isamu", "Jiro", "Katsuro", "Mamoru",
          "Naoki", "Osamu", "Raiden", "Shinobu", "Tadashi", "Yorimasa", "Zenjiro", "Akito",
          "Hiroya", "Kenshin", "Mitsuru", "Noburo", "Seijuro", "Toshiro", "Yukimura"],
        Feminine: ["Yugiri", "Yotsuyu", "Tsubaki", "Akane", "Chiyo", "Hinako", "Kaede", "Mizuki",
          "Nanami", "Ohana", "Rinka", "Sakura", "Tomoe", "Umeko", "Yuzuki", "Asuka", "Fuyuko",
          "Harumi", "Izumi", "Kohaku", "Momoka", "Natsume", "Reiko", "Shizuka", "Tamaki",
          "Wakana", "Yuina", "Ayame", "Chihaya", "Haruka", "Kasumi", "Michiru", "Nozomi",
          "Sayuri", "Yoshino", "Suzume"] } },
      last: { kind: "corpus",
        names: ["Rijin", "Hyobanshi", "Kiyomori", "Tatsunaga", "Shirogane", "Kurosawa",
          "Takahashi", "Yatsurugi", "Amamiya", "Fujinaka", "Hoshikawa", "Inabayama", "Kagehira",
          "Matsunaga", "Nagamine", "Okitsugu", "Sakakibara", "Tachibana", "Ukitake", "Yamaguchi",
          "Arakawa", "Fukumoto", "Hasegawa", "Ishikawa", "Kurogane", "Minamoto", "Nakamura",
          "Ryuzaki", "Shinomiya", "Tokugawa", "Watanabe", "Yukimura", "Asakura", "Hayashida"] },
    },
  },
  {
    id: "ffxiv-aura-xaela", game: "Final Fantasy XIV", race: "Au Ra (Xaela)",
    note: "Out of the Azim Steppe, with the name of the tribe carried as a surname.",
    sets: ["Masculine", "Feminine"],
    slots: {
      first: { kind: "corpus", sets: {
        Masculine: ["Magnai", "Daidukul", "Bardam", "Sadu", "Temur", "Batu", "Chuluun", "Enkhbat",
          "Ganbold", "Khorchi", "Munkhbat", "Narangerel", "Otgon", "Qarluk", "Subetai", "Tolui",
          "Ulagan", "Yesugei", "Altan", "Baatar", "Chagatai", "Erdene", "Gantulga", "Jirgal",
          "Khasar", "Mergen", "Nergui", "Oyun", "Sechen", "Tegus", "Urjin", "Zorigt", "Arslan",
          "Boroqul", "Delger", "Hulagu"],
        Feminine: ["Cirina", "Temulun", "Sadu", "Altani", "Bolormaa", "Chimeg", "Delgermaa",
          "Enkhjin", "Gereltuya", "Khulan", "Munkhtsetseg", "Narantuya", "Odval", "Saran",
          "Tuyaa", "Uyanga", "Yanjmaa", "Ariunaa", "Badamkhand", "Chuluunaa", "Erdenechimeg",
          "Gantuya", "Khongordzol", "Myagmar", "Nomin", "Oyuun", "Sarnai", "Tsetseg", "Undral",
          "Zolzaya", "Alagh", "Borte", "Checheyigen", "Khutulun"] } },
      last: { kind: "pools",
        patterns: ["{tribe}"],
        pools: { tribe: ["Dotharl", "Oronir", "Buduga", "Kha", "Mol", "Qerel", "Borlaaq",
          "Dazkar", "Goro", "Malqir", "Ura", "Himaa", "Avagnar", "Angura", "Arulaq", "Hotgo",
          "Iriq", "Jhungid", "Kagon", "Khatayin", "Khatun", "Mierqid", "Noykin", "Olkund",
          "Orluun", "Sagahl", "Tumet", "Adarkim", "Haragin", "Torgud", "Ejinn", "Geneq"] } },
    },
  },

  // ------------------------------------------------------------------ Viera and Hrothgar
  // Square Enix never published a convention for either, so these four are shaped on the handful of
  // canon names there are. They are the likeliest to want correcting.
  {
    id: "ffxiv-viera-rava", game: "Final Fantasy XIV", race: "Viera (Rava)",
    note: "One name and no surname. No convention was ever published for the Viera; this is shaped on the few canon names there are.",
    slots: {
      first: { kind: "corpus",
        names: ["Fran", "Mjrn", "Jote", "Lyna", "Krile", "Ktjn", "Sylphie", "Vaara", "Rinn",
          "Shera", "Tjala", "Kjrn", "Myrra", "Vhena", "Alsha", "Brenn", "Caela", "Dyrra",
          "Elvra", "Fenna", "Grenn", "Hylla", "Irsha", "Jenna", "Kaela", "Lirra", "Mynn",
          "Nerra", "Olla", "Phena", "Quella", "Rhenn", "Sirra", "Thella", "Vrenn", "Wylla",
          "Yrsha", "Zella", "Aerla", "Brynn", "Cyrra", "Drenn", "Esha", "Fyrra"] },
    },
  },
  {
    id: "ffxiv-viera-veena", game: "Final Fantasy XIV", race: "Viera (Veena)",
    note: "One name and no surname, running a little longer and softer than the Rava's. No convention was ever published for the Viera; this is shaped on the few canon names there are.",
    slots: {
      first: { kind: "corpus",
        names: ["Lyna", "Sylvie", "Ameliance", "Vaelira", "Hjelna", "Mirelle", "Ysanne",
          "Caelira", "Delphine", "Elowyn", "Fayelle", "Ghislaine", "Hyacinthe", "Isolene",
          "Jhuliene", "Kaelira", "Liorelle", "Mavelle", "Nyarelle", "Ombrelle", "Perenelle",
          "Rhiannelle", "Sylvaine", "Thessaly", "Ursuline", "Vaerelle", "Wisteria", "Yvelline",
          "Zephyrine", "Aurelle", "Bryelle", "Clairene", "Danaelle", "Emeline", "Florelle"] },
    },
  },
  {
    id: "ffxiv-hrothgar-helions", game: "Final Fantasy XIV", race: "Hrothgar (Helions)",
    note: "Old Norse in cast, after the one Hrothgar name there is to go on. No convention was ever published for the Hrothgar; treat this as a starting point.",
    slots: {
      first: { kind: "corpus",
        names: ["Gunnhildr", "Runar", "Arnbjorn", "Bersi", "Dagfinn", "Eirikr", "Fjolnir",
          "Gudbrand", "Hallvard", "Ingvar", "Jorund", "Ketilbjorn", "Leifr", "Magnhild",
          "Njordr", "Ormarr", "Ragnvald", "Sigurdr", "Thorbjorn", "Ulfarr", "Vemundr", "Ylfa",
          "Asgeirr", "Brynjolf", "Eyvindr", "Gautr", "Hjalmarr", "Isleifr", "Kolbeinn",
          "Myrkjartan", "Oddleifr", "Steinarr", "Thrainn", "Vigdis", "Ragnarr", "Hodbrodd"] },
    },
  },
  {
    id: "ffxiv-hrothgar-lost", game: "Final Fantasy XIV", race: "Hrothgar (The Lost)",
    note: "The wandering clan, with names worn rougher than the Helions'. No convention was ever published for the Hrothgar; treat this as a starting point.",
    slots: {
      first: { kind: "corpus",
        names: ["Skaldr", "Grimarr", "Hrokr", "Vargr", "Bjarkr", "Draugr", "Eldgrim", "Fenrarr",
          "Gnupr", "Haugr", "Jokull", "Kaldr", "Lodbrok", "Mordr", "Nokkvi", "Ospakr", "Rauthr",
          "Steinbjorn", "Throttr", "Ulfhedinn", "Vandrathr", "Yngvarr", "Austri", "Bolverkr",
          "Darri", "Eggther", "Farbauti", "Geirrod", "Hymir", "Ivarr", "Kaldbakr", "Logi",
          "Nithhogg", "Surtr", "Thrymr", "Vafthrudnir"] },
    },
  },
];
