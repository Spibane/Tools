// Stormblood Eureka weapons: every step and what each weapon needs for it.
// The format is described above the data scripts in ffxiv/relics/index.html.
RELIC_DATA.push({
  id: "sb",
  expansion: "Stormblood",
  name: "Eureka Weapons",
  weapons: [
    { id: "PLD", job: "Paladin", label: "Antea Physeos & Bellerophon Physeos" },
    { id: "WAR", job: "Warrior", label: "Shamash Physeos" },
    { id: "DRK", job: "Dark Knight", label: "Xiphias Physeos" },
    { id: "MNK", job: "Monk", label: "Dumuzis Physeos" },
    { id: "DRG", job: "Dragoon", label: "Daboya Physeos" },
    { id: "NIN", job: "Ninja", label: "Kasasagi Physeos" },
    { id: "SAM", job: "Samurai", label: "Torigashira Physeos" },
    { id: "BRD", job: "Bard", label: "Circinae Physeos" },
    { id: "MCH", job: "Machinist", label: "Mollfrith Physeos" },
    { id: "BLM", job: "Black Mage", label: "Paikea Physeos" },
    { id: "SMN", job: "Summoner", label: "Tuah Physeos" },
    { id: "RDM", job: "Red Mage", label: "Brunello Physeos" },
    { id: "WHM", job: "White Mage", label: "Rose Couverte Physeos" },
    { id: "SCH", job: "Scholar", label: "Jebat Physeos" },
    { id: "AST", job: "Astrologian", label: "Albireo Physeos" }
  ],
  steps: [
    {
      name: "Antiquated",
      quest: "Each job's level 70 job quest",
      start: "Each job's quest giver",
      note: "Reach level 70 and finish the job quests for every job; the level 70 job quest rewards the Antiquated weapon. Paladin's sword and shield are upgraded together as one set at every step.",
      items: [],
      weaponItems: {
        "PLD": [
          { name: "Antiquated Galatyn", qty: 1, source: "Reward from the level 70 Paladin job quest; a lost copy can be replaced for 1,000 gil at the Calamity Salvager." },
          { name: "Antiquated Evalach", qty: 1, source: "Reward from the level 70 Paladin job quest; a lost copy can be replaced for 1,000 gil at the Calamity Salvager." }
        ],
        "WAR": [ { name: "Antiquated Farsha", qty: 1, source: "Reward from the level 70 job quest; replacement 1,000 gil at the Calamity Salvager." } ],
        "DRK": [ { name: "Antiquated Caladbolg", qty: 1, source: "Reward from the level 70 job quest; replacement 1,000 gil at the Calamity Salvager." } ],
        "MNK": [ { name: "Antiquated Sudarshana Chakra", qty: 1, source: "Reward from the level 70 job quest; replacement 1,000 gil at the Calamity Salvager." } ],
        "DRG": [ { name: "Antiquated Ryunohige", qty: 1, source: "Reward from the level 70 job quest; replacement 1,000 gil at the Calamity Salvager." } ],
        "NIN": [ { name: "Antiquated Nagi", qty: 1, source: "Reward from the level 70 job quest; replacement 1,000 gil at the Calamity Salvager." } ],
        "SAM": [ { name: "Antiquated Kiku-ichimonji", qty: 1, source: "Reward from the level 70 job quest; replacement 1,000 gil at the Calamity Salvager." } ],
        "BRD": [ { name: "Antiquated Failnaught", qty: 1, source: "Reward from the level 70 job quest; replacement 1,000 gil at the Calamity Salvager." } ],
        "MCH": [ { name: "Antiquated Outsider", qty: 1, source: "Reward from the level 70 job quest; replacement 1,000 gil at the Calamity Salvager." } ],
        "BLM": [ { name: "Antiquated Vanargand", qty: 1, source: "Reward from the level 70 job quest; replacement 1,000 gil at the Calamity Salvager." } ],
        "SMN": [ { name: "Antiquated Lemegeton", qty: 1, source: "Reward from the level 70 job quest; replacement 1,000 gil at the Calamity Salvager." } ],
        "RDM": [ { name: "Antiquated Murgleis", qty: 1, source: "Reward from the level 70 job quest; replacement 1,000 gil at the Calamity Salvager." } ],
        "WHM": [ { name: "Antiquated Aymur", qty: 1, source: "Reward from the level 70 job quest; replacement 1,000 gil at the Calamity Salvager." } ],
        "SCH": [ { name: "Antiquated Organum", qty: 1, source: "Reward from the level 70 job quest; replacement 1,000 gil at the Calamity Salvager." } ],
        "AST": [ { name: "Antiquated Pleiades", qty: 1, source: "Reward from the level 70 job quest; replacement 1,000 gil at the Calamity Salvager." } ]
      },
      sources: ["https://ffxiv.consolegameswiki.com/wiki/Eurekan_Weapons"]
    },
    {
      name: "Anemos",
      quest: "And We Shall Call It Eureka",
      start: "Galiena, Rhalgr's Reach (9.8,12.5)",
      note: "Requires level 70 and the Stormblood main scenario. Unlocks Eureka Anemos; trade the Antiquated weapon plus crystals to Gerolt, The Forbidden Land, Eureka Anemos (18,32.3).",
      items: [
        { name: "Protean Crystal", qty: 100, source: "Eureka Anemos: trade Anemos Crystals (from Notorious Monsters) to Gerolt for 2-5 each, or random drops from enemies." }
      ],
      sources: ["https://ffxiv.consolegameswiki.com/wiki/And_We_Shall_Call_It_Eureka", "https://ffxiv.consolegameswiki.com/wiki/Galatyn"]
    },
    {
      name: "Anemos +1",
      quest: "None (exchange)",
      start: "Gerolt, The Forbidden Land, Eureka Anemos (18,32.3)",
      note: "Trade the base weapon plus crystals to Gerolt.",
      items: [
        { name: "Protean Crystal", qty: 400, source: "Eureka Anemos: Anemos Crystals traded to Gerolt, or enemy drops." }
      ],
      sources: ["https://ffxiv.consolegameswiki.com/wiki/Evalach_1", "https://ffxiv.consolegameswiki.com/wiki/Eurekan_Weapons"]
    },
    {
      name: "Anemos +2",
      quest: "None (exchange)",
      start: "Gerolt, The Forbidden Land, Eureka Anemos (18,32.3)",
      note: "Trade the +1 weapon plus crystals to Gerolt.",
      items: [
        { name: "Protean Crystal", qty: 800, source: "Eureka Anemos: Anemos Crystals traded to Gerolt, or enemy drops." }
      ],
      sources: ["https://ffxiv.consolegameswiki.com/wiki/Evalach_1", "https://ffxiv.consolegameswiki.com/wiki/Eurekan_Weapons"]
    },
    {
      name: "Anemos (complete)",
      quest: "None (exchange)",
      start: "Gerolt, The Forbidden Land, Eureka Anemos (18,32.3)",
      note: "You must be on the matching job for Gerolt to offer this upgrade.",
      items: [
        { name: "Pazuzu's Feather", qty: 3, buy: { currency: "Protean Crystal", price: 300, vendor: "Expedition Birdwatcher, The Forbidden Land, Eureka Anemos (18.9,31.4)" }, source: "3 per gold completion of the NM Wail in the Willows (Eureka Anemos, elemental level 19+), or buy from the Expedition Birdwatcher (also in Pagos (4.5,24.4) and Pyros (17.6,25.4))." }
      ],
      sources: ["https://ffxiv.consolegameswiki.com/wiki/Evalach_Anemos", "https://ffxiv.consolegameswiki.com/wiki/Pazuzu%27s_Feather"]
    },
    {
      name: "Pagos",
      quest: "And We Shall Call It Pagos",
      start: "Rodney, Kugane (8.6,14.2)",
      note: "Requires the Anemos questline and elemental level 20. Accept the level 25 quest in Pagos to get the vitiated aether kettle from Gerolt, fill it by killing enemies, and turn full charges in at the Crystal Forge (6.0,21.5) for Frosted Protean Crystals; then trade to Gerolt, Eureka Pagos (4.2,25).",
      items: [
        { name: "Frosted Protean Crystal", qty: 5, source: "Eureka Pagos: 1 per full charge of vitiated aether, exchanged at the Crystal Forge (6.0,21.5). The kettle holds up to 9 charges." }
      ],
      sources: ["https://ffxiv.consolegameswiki.com/wiki/And_We_Shall_Call_It_Pagos", "https://ffxiv.consolegameswiki.com/wiki/Galatyn_Pagos", "https://ffxiv.consolegameswiki.com/wiki/Eurekan_Weapons"]
    },
    {
      name: "Pagos +1",
      quest: "None (exchange)",
      start: "Gerolt, The Forbidden Land, Eureka Pagos (4.2,25)",
      note: "Trade the Pagos weapon plus crystals to Gerolt.",
      items: [
        { name: "Frosted Protean Crystal", qty: 10, source: "Eureka Pagos: vitiated aether turned in at the Crystal Forge (6.0,21.5)." },
        { name: "Pagos Crystal", qty: 500, source: "Eureka Pagos: Notorious Monster drops." }
      ],
      sources: ["https://ffxiv.consolegameswiki.com/wiki/Galatyn_Pagos"]
    },
    {
      name: "Elemental",
      quest: "None (exchange)",
      start: "Gerolt, The Forbidden Land, Eureka Pagos (4.2,25)",
      note: "Trade the Pagos +1 weapon plus items to Gerolt.",
      items: [
        { name: "Frosted Protean Crystal", qty: 16, source: "Eureka Pagos: vitiated aether turned in at the Crystal Forge (6.0,21.5)." },
        { name: "Louhi's Ice", qty: 5, buy: { currency: "Pagos Crystal", price: 50, vendor: "Expedition Birdwatcher, The Forbidden Land, Eureka Pagos (4.5,24.4)" }, source: "2 per gold completion of the NM Louhi on Ice (Eureka Pagos), or buy from the Expedition Birdwatcher (also in Anemos (18.9,31.4) and Pyros (17.6,25.4))." }
      ],
      sources: ["https://ffxiv.consolegameswiki.com/wiki/Elemental_Sword", "https://ffxiv.consolegameswiki.com/wiki/Louhi%27s_Ice"]
    },
    {
      name: "Elemental +1",
      quest: "And We Shall Call It Pyros",
      start: "Rodney, Kugane (8.6,14.2)",
      note: "Requires the Pagos questline and elemental level 35. You must have unlocked 10 unique Logos Actions; trade to Gerolt, Eureka Pyros (15.3,23.6).",
      items: [
        { name: "Pyros Crystal", qty: 150, source: "Eureka Pyros: Notorious Monster drops." }
      ],
      sources: ["https://ffxiv.consolegameswiki.com/wiki/And_We_Shall_Call_It_Pyros", "https://ffxiv.consolegameswiki.com/wiki/Elemental_Sword", "https://ffxiv.consolegameswiki.com/wiki/Eurekan_Weapons"]
    },
    {
      name: "Elemental +2",
      quest: "None (exchange)",
      start: "Gerolt, The Forbidden Land, Eureka Pyros (15.3,23.6)",
      note: "You must have unlocked 20 unique Logos Actions.",
      items: [
        { name: "Pyros Crystal", qty: 200, source: "Eureka Pyros: Notorious Monster drops." }
      ],
      sources: ["https://ffxiv.consolegameswiki.com/wiki/Elemental_Sword_2", "https://ffxiv.consolegameswiki.com/wiki/Eurekan_Weapons"]
    },
    {
      name: "Pyros",
      quest: "None (exchange)",
      start: "Gerolt, The Forbidden Land, Eureka Pyros (15.3,23.6)",
      note: "You must have unlocked 30 unique Logos Actions.",
      items: [
        { name: "Pyros Crystal", qty: 300, source: "Eureka Pyros: Notorious Monster drops." },
        { name: "Penthesilea's Flame", qty: 5, buy: { currency: "Pyros Crystal", price: 50, vendor: "Expedition Birdwatcher, The Forbidden Land, Eureka Pyros (17.6,25.4)" }, source: "3 per gold completion of the NM Lost Epic (Eureka Pyros), or buy from the Expedition Birdwatcher (also in Anemos (18.9,31.4) and Pagos (4.5,24.4))." }
      ],
      sources: ["https://ffxiv.consolegameswiki.com/wiki/Pyros_Sword", "https://ffxiv.consolegameswiki.com/wiki/Penthesilea%27s_Flame"]
    },
    {
      name: "Hydatos",
      quest: "And We Shall Call It Hydatos",
      start: "Rodney, Kugane (8.6,14.2)",
      note: "Requires the Pyros questline and elemental level 50. Trade to Gerolt, Eureka Hydatos (21.4,13.6).",
      items: [
        { name: "Hydatos Crystal", qty: 50, source: "Eureka Hydatos: Notorious Monster drops; also The Baldesion Arsenal: Expedition Support during an ongoing Arsenal run." }
      ],
      sources: ["https://ffxiv.consolegameswiki.com/wiki/And_We_Shall_Call_It_Hydatos", "https://ffxiv.consolegameswiki.com/wiki/Pyros_Sword"]
    },
    {
      name: "Hydatos +1",
      quest: "None (exchange)",
      start: "Gerolt, The Forbidden Land, Eureka Hydatos (21.4,13.6)",
      note: "Trade the Hydatos weapon plus crystals to Gerolt.",
      items: [
        { name: "Hydatos Crystal", qty: 100, source: "Eureka Hydatos: Notorious Monster drops." }
      ],
      sources: ["https://ffxiv.consolegameswiki.com/wiki/Hydatos_Sword_1"]
    },
    {
      name: "Eureka",
      quest: "None (exchange)",
      start: "Gerolt, The Forbidden Land, Eureka Hydatos (21.4,13.6)",
      note: "Trade the Hydatos +1 weapon plus crystals for the named weapon (e.g. Antea, Shamash).",
      items: [
        { name: "Hydatos Crystal", qty: 100, source: "Eureka Hydatos: Notorious Monster drops." }
      ],
      sources: ["https://ffxiv.consolegameswiki.com/wiki/Hydatos_Sword_1"]
    },
    {
      name: "Eureka (complete)",
      quest: "None (exchange)",
      start: "Gerolt, The Forbidden Land, Eureka Hydatos (21.4,13.6)",
      note: "Trade the Base Eureka weapon plus items to Gerolt. Crystalline Scales are not sold by any vendor.",
      items: [
        { name: "Hydatos Crystal", qty: 100, source: "Eureka Hydatos: Notorious Monster drops." },
        { name: "Crystalline Scale", qty: 5, source: "3 per gold completion of the NM Crystalline Provenance (Provenance Watcher) in Eureka Hydatos." }
      ],
      sources: ["https://ffxiv.consolegameswiki.com/wiki/Antea_Eureka", "https://ffxiv.consolegameswiki.com/wiki/Crystalline_Scale"]
    },
    {
      name: "Physeos",
      quest: "None (exchange)",
      start: "Gerolt, The Forbidden Land, Eureka Hydatos (21.4,13.6)",
      note: "Eureka Fragments come only from The Baldesion Arsenal (elemental level 60, Eureka storyline complete, entered via the Ovni FATE in Hydatos). A full clear gives 28, so about four clears per weapon.",
      items: [
        { name: "Eureka Fragment", qty: 100, source: "The Baldesion Arsenal only: 3 each from Art and Owain, 6 from Raiden, 6 from Absolute Virtue, 10 from Proto Ozma, 1 per chest (3 chests)." }
      ],
      sources: ["https://ffxiv.consolegameswiki.com/wiki/Antea_Eureka", "https://ffxiv.consolegameswiki.com/wiki/The_Baldesion_Arsenal", "https://ffxiv.consolegameswiki.com/wiki/Eurekan_Weapons"]
    }
  ],
  uncertain: [
    "No patch note was found that reduced the weapon crystal costs; later patches raised crystal and EXP yields instead. The quantities here are the wiki's current exchange tables.",
    "The level 70 job quest names that award each Antiquated weapon were not looked up one by one.",
    "The vitiated aether kettle (needed for Frosted Protean Crystals) comes from Gerolt with the level 25 Pagos quest; that quest's exact name was not verified, and the kettle is not listed as an item.",
    "The exact name of the final Eureka storyline quest needed to enter The Baldesion Arsenal was not verified.",
    "Gerolt's Anemos coordinates are listed on the wiki as (18,32.3), with no decimal on the X value."
  ]
});
