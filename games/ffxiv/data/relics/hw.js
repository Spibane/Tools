// Heavensward Anima weapons: every step and what each weapon needs for it.
// The format is described above the data scripts in ffxiv/relics/index.html.
RELIC_DATA.push({
  id: "hw",
  expansion: "Heavensward",
  name: "Anima Weapons",
  weapons: [
    { id: "PLD", job: "Paladin", label: "Aettir Lux / Priwen Lux" },
    { id: "WAR", job: "Warrior", label: "Minos Lux" },
    { id: "DRK", job: "Dark Knight", label: "Cronus Lux" },
    { id: "MNK", job: "Monk", label: "Nyepels Lux" },
    { id: "DRG", job: "Dragoon", label: "Areadbhar Lux" },
    { id: "NIN", job: "Ninja", label: "Sandungs Lux" },
    { id: "BRD", job: "Bard", label: "Terpander Lux" },
    { id: "MCH", job: "Machinist", label: "Deathlocke Lux" },
    { id: "BLM", job: "Black Mage", label: "Kaladanda Lux" },
    { id: "SMN", job: "Summoner", label: "Mimesis Lux" },
    { id: "WHM", job: "White Mage", label: "Sindri Lux" },
    { id: "SCH", job: "Scholar", label: "Anabasis Lux" },
    { id: "AST", job: "Astrologian", label: "Canopus Lux" }
  ],
  steps: [
    {
      name: "Animated",
      quest: "An Unexpected Proposal (one-time), then Soul without Life",
      start: "Rowena, Idyllshire (5.7,5.5) for An Unexpected Proposal; Ardashir, Azys Lla (7.4,11.5) for Soul without Life",
      note: "Trade the Wind, Fire and Lightning crystals to Syndony in Mor Dhona (22.5,5.9) for an Astral Nodule and the Ice, Earth and Water crystals for an Umbral Nodule, then hand both nodules to Ardashir. You can instead give Syndony one Zodiac Zeta weapon (PLD needs the sword and the shield) for both nodules, but you lose that Zeta weapon.",
      items: [
        { name: "Luminous Wind Crystal", qty: 1, source: "Drops from FATEs in The Sea of Clouds (about 33% drop rate). Alternative: trade a Zodiac Zeta weapon to Syndony for both nodules." },
        { name: "Luminous Fire Crystal", qty: 1, source: "Drops from FATEs in Azys Lla (about 33% drop rate). Alternative: trade a Zodiac Zeta weapon to Syndony for both nodules." },
        { name: "Luminous Lightning Crystal", qty: 1, source: "Drops from FATEs in The Churning Mists (about 33% drop rate). Alternative: trade a Zodiac Zeta weapon to Syndony for both nodules." },
        { name: "Luminous Ice Crystal", qty: 1, source: "Drops from FATEs in Coerthas Western Highlands (about 33% drop rate). Alternative: trade a Zodiac Zeta weapon to Syndony for both nodules." },
        { name: "Luminous Earth Crystal", qty: 1, source: "Drops from FATEs in The Dravanian Forelands (about 33% drop rate). Alternative: trade a Zodiac Zeta weapon to Syndony for both nodules." },
        { name: "Luminous Water Crystal", qty: 1, source: "Drops from FATEs in The Dravanian Hinterlands (about 33% drop rate). Alternative: trade a Zodiac Zeta weapon to Syndony for both nodules." }
      ],
      sources: [
        "https://ffxiv.consolegameswiki.com/wiki/Anima_Weapons",
        "https://ffxiv.consolegameswiki.com/wiki/Animated_Weapons/Quest",
        "https://ffxiv.consolegameswiki.com/wiki/Soul_without_Life",
        "https://ffxiv.consolegameswiki.com/wiki/Syndony",
        "https://ffxiv.consolegameswiki.com/wiki/An_Unexpected_Proposal"
      ]
    },
    {
      name: "Awoken",
      quest: "Toughening Up",
      start: "Ardashir, Azys Lla (7.4,11.5)",
      note: "With the Animated weapon equipped, clear these ten dungeons in order: Snowcloak, Sastasha (Hard), The Sunken Temple of Qarn (Hard), The Keeper of the Lake, The Wanderer's Palace (Hard), Amdapor Keep (Hard), The Dusk Vigil, Sohm Al, The Aery and The Vault. Between them you also talk to Ardashir in Southern Thanalan, South Shroud and The Pillars, then return to him in Azys Lla. Unsynced solo runs are allowed.",
      items: [],
      sources: [
        "https://ffxiv.consolegameswiki.com/wiki/Anima_Weapons",
        "https://ffxiv.consolegameswiki.com/wiki/Toughening_Up"
      ]
    },
    {
      name: "Anima",
      quest: "Coming into Its Own",
      start: "Ardashir, Azys Lla (7.4,11.5)",
      note: "Trade the items to Cristiana in Mor Dhona (21.4,5.4) for Enchanted Rubber, Fast-drying Carboncoat, Divine Water and Fast-acting Allagan Catalyst. Each of those costs 10 of one Unidentifiable item plus 4 of one crafted item. Then deliver all four to Gerolt in Azys Lla.",
      items: [
        { name: "Unidentifiable Bone", qty: 10, buy: { currency: "Allagan Tomestone of Poetics", price: 150, vendor: "Hismena, Idyllshire (5.7,5.2)" }, source: "Also sold by Auriana, Mor Dhona (22.7,6.6). Alternatives: Allied Society tokens, 3 Precision Gordian Bolt (Sabina, Idyllshire), or 300 Allied Seals." },
        { name: "Unidentifiable Shell", qty: 10, buy: { currency: "Allagan Tomestone of Poetics", price: 150, vendor: "Hismena, Idyllshire (5.7,5.2)" }, source: "Also sold by Auriana, Mor Dhona (22.7,6.6). Alternatives: Allied Society tokens or 3 Precision Gordian Lens (Sabina, Idyllshire)." },
        { name: "Unidentifiable Ore", qty: 10, buy: { currency: "Allagan Tomestone of Poetics", price: 150, vendor: "Hismena, Idyllshire (5.7,5.2)" }, source: "Also sold by Auriana, Mor Dhona (22.7,6.6). Alternatives: Allied Society tokens or 3 Precision Gordian Spring (Sabina, Idyllshire)." },
        { name: "Unidentifiable Seeds", qty: 10, buy: { currency: "Allagan Tomestone of Poetics", price: 150, vendor: "Hismena, Idyllshire (5.7,5.2)" }, source: "Also sold by Auriana, Mor Dhona (22.7,6.6). Alternatives: Allied Society tokens, 3 Precision Gordian Shaft (Sabina, Idyllshire), or 300 Allied Seals." },
        { name: "Adamantite Francesca", qty: 4, buy: { currency: "Grand Company Seal", price: 5000, vendor: "Storm Quartermaster, Limsa Lominsa Upper Decks (13.2,12.8) / Serpent Quartermaster, New Gridania (9.8,11.0) / Flame Quartermaster, Ul'dah - Steps of Nald (8.3,9.0)" }, source: "Alternative: craft it (Blacksmith, level 60, NQ is fine) or buy it on the Market Board." },
        { name: "Titanium Alloy Mirror", qty: 4, buy: { currency: "Grand Company Seal", price: 5000, vendor: "Storm Quartermaster, Limsa Lominsa Upper Decks (13.2,12.8) / Serpent Quartermaster, New Gridania (9.8,11.0) / Flame Quartermaster, Ul'dah - Steps of Nald (8.3,9.0)" }, source: "Alternative: craft it (Alchemist, level 60, NQ is fine) or buy it on the Market Board." },
        { name: "Dispelling Arrow", qty: 4, buy: { currency: "Grand Company Seal", price: 5000, vendor: "Storm Quartermaster, Limsa Lominsa Upper Decks (13.2,12.8) / Serpent Quartermaster, New Gridania (9.8,11.0) / Flame Quartermaster, Ul'dah - Steps of Nald (8.3,9.0)" }, source: "Alternative: craft it (Carpenter, level 60, NQ is fine) or buy it on the Market Board." },
        { name: "Kingcake", qty: 4, buy: { currency: "Grand Company Seal", price: 5000, vendor: "Storm Quartermaster, Limsa Lominsa Upper Decks (13.2,12.8) / Serpent Quartermaster, New Gridania (9.8,11.0) / Flame Quartermaster, Ul'dah - Steps of Nald (8.3,9.0)" }, source: "Alternative: craft it (Culinarian, level 60, NQ is fine) or buy it on the Market Board." }
      ],
      sources: [
        "https://ffxiv.consolegameswiki.com/wiki/Anima_Weapons",
        "https://ffxiv.consolegameswiki.com/wiki/Anima_Weapons/Quest",
        "https://ffxiv.consolegameswiki.com/wiki/Cristiana",
        "https://ffxiv.consolegameswiki.com/wiki/Hismena",
        "https://www.garlandtools.org/db/#item/13582",
        "https://www.garlandtools.org/db/#item/13595",
        "https://www.garlandtools.org/db/#item/13577"
      ]
    },
    {
      name: "Hyperconductive",
      quest: "Finding Your Voice",
      start: "Ardashir, Azys Lla (7.4,11.5)",
      note: "Deliver the Aether Oil to Ardashir. This step also unlocks the Restoration Node, which sells glamour replicas.",
      items: [
        { name: "Aether Oil", qty: 5, buy: { currency: "Allagan Tomestone of Poetics", price: 350, vendor: "Hismena, Idyllshire (5.7,5.2)" }, source: "Also sold by Auriana, Mor Dhona (22.7,6.6)." }
      ],
      sources: [
        "https://ffxiv.consolegameswiki.com/wiki/Anima_Weapons",
        "https://ffxiv.consolegameswiki.com/wiki/Finding_Your_Voice",
        "https://www.garlandtools.org/db/#item/14899"
      ]
    },
    {
      name: "Reconditioned",
      quest: "A Dream Fulfilled",
      start: "Ardashir, Azys Lla (7.4,11.5)",
      note: "Ulan in Idyllshire (6.4,4.7) turns each Crystal Sand plus Umbrite into 3 Treated Crystal Sand (3 to 6 in the second half), and you spend 180 of those on stat points before returning to Ardashir. Crystal Sand comes from Ulan, 2 at a time, for 5 Superior Enchanted Ink + 5 Thavnairian Mist. The quantities listed are the maximum; good luck can save about 3 of each.",
      items: [
        { name: "Umbrite", qty: 60, buy: { currency: "Allagan Tomestone of Poetics", price: 75, vendor: "Hismena, Idyllshire (5.7,5.2)" }, source: "Also sold by Auriana, Mor Dhona (22.7,6.6). Usually 57 to 60 are needed; 60 is the maximum." },
        { name: "Crystal Sand", qty: 60, source: "Get it from Ulan, Idyllshire (6.4,4.7): 2 Crystal Sand per 5 Superior Enchanted Ink + 5 Thavnairian Mist (listed below). Alternatives for 2 sand: 5 Blue Crafters' Scrip Token, 5 Blue Gatherers' Scrip Token, 5 Moonstone, 1 Amber-encased Vilekin, or sets of ARR Extreme primal parts. Usually 57 to 60 are needed." },
        { name: "Superior Enchanted Ink", qty: 150, buy: { currency: "Allagan Tomestone of Poetics", price: 25, vendor: "Hismena, Idyllshire (5.7,5.2)" }, source: "Traded to Ulan for Crystal Sand (5 ink + 5 mist = 2 sand). Not needed if you use another Crystal Sand route." },
        { name: "Thavnairian Mist", qty: 150, buy: { currency: "Allagan Tomestone of Poetics", price: 20, vendor: "Hismena, Idyllshire (5.7,5.2)" }, source: "Traded to Ulan for Crystal Sand (5 ink + 5 mist = 2 sand). Not needed if you use another Crystal Sand route." }
      ],
      sources: [
        "https://ffxiv.consolegameswiki.com/wiki/Anima_Weapons",
        "https://ffxiv.consolegameswiki.com/wiki/Reconditioned_Anima_Weapons/Quest",
        "https://ffxiv.consolegameswiki.com/wiki/A_Dream_Fulfilled",
        "https://ffxiv.consolegameswiki.com/wiki/Ulan",
        "https://www.garlandtools.org/db/#item/15840",
        "https://www.garlandtools.org/db/#item/7885",
        "https://www.garlandtools.org/db/#item/6268"
      ]
    },
    {
      name: "Sharpened",
      quest: "Future Proof",
      start: "Ardashir, Azys Lla (7.4,11.5)",
      note: "Deliver the Singing Clusters to Blamprest in Idyllshire (7.9,6.0) for Distilled Ceruleum and Moonrise, then bring those to Ardashir.",
      items: [
        { name: "Singing Cluster", qty: 50, buy: { currency: "Allagan Tomestone of Poetics", price: 40, vendor: "Hismena, Idyllshire (5.7,5.2)" }, source: "Also sold by Auriana, Mor Dhona (22.7,6.6). Alternatives: 1 from the daily quest Cut from a Different Cloth (High-level Dungeons roulette) and 18 from the weekly quest Seeking Inspiration (3 Leveling roulettes)." }
      ],
      sources: [
        "https://ffxiv.consolegameswiki.com/wiki/Anima_Weapons",
        "https://ffxiv.consolegameswiki.com/wiki/Future_Proof",
        "https://ffxiv.consolegameswiki.com/wiki/Blamprest",
        "https://www.garlandtools.org/db/#item/16064"
      ]
    },
    {
      name: "Complete",
      quest: "Born Again Anima, Some Assembly Required",
      start: "Ardashir, Azys Lla (7.4,11.5); Some Assembly Required from the Processing Node, Azys Lla (7.0,11.4)",
      note: "As the weapon's job, clear The Lost City of Amdapor (Hard), The Great Gubal Library (Hard) and Sohm Al (Hard) in any order for the forging materials. Then earn about 2,000 aetheric density with the weapon equipped (21 unsynced runs of Alexander - The Eyes of the Creator (Savage) is the usual method), and load the Pneumite into the Processing Node for the Newborn Soulstone.",
      items: [
        { name: "Pneumite", qty: 15, buy: { currency: "Allagan Tomestone of Poetics", price: 100, vendor: "Hismena, Idyllshire (5.7,5.2)" }, source: "Also sold by Auriana, Mor Dhona (22.7,6.6). The Poetics vendors only list it once a weapon reaches this step. Alternative: 4,000 Grand Company Seal each from your Grand Company quartermaster (60,000 per weapon), which is always available." }
      ],
      sources: [
        "https://ffxiv.consolegameswiki.com/wiki/Anima_Weapons",
        "https://ffxiv.consolegameswiki.com/wiki/Complete_Anima_Weapons/Quest",
        "https://ffxiv.consolegameswiki.com/wiki/Born_Again_Anima",
        "https://ffxiv.consolegameswiki.com/wiki/Some_Assembly_Required",
        "https://ffxiv.consolegameswiki.com/wiki/Pneumite",
        "https://www.garlandtools.org/db/#item/16933"
      ]
    },
    {
      name: "Lux",
      quest: "Body and Soul (one-time), Words of Wisdom (one-time), then Best Friends Forever",
      start: "Automaton, Azys Lla (7.4,11.5) for Body and Soul; Ardashir, Azys Lla (7.4,11.5) for Words of Wisdom and Best Friends Forever",
      note: "With the weapon equipped, clear 12 trials in four groups (each group in order, any order within a group): Bowl of Embers, Howling Eye and Navel (Hard); Thornmarch, Whorleater, Striking Tree and Akh Afah Amphitheatre (Hard); Thok ast Thok and Limitless Blue (Hard); Containment Bay S1T7, P1T6 and Z1T9. Then deliver the ink to Ardashir.",
      items: [
        { name: "Archaic Enchanted Ink", qty: 1, buy: { currency: "Allagan Tomestone of Poetics", price: 500, vendor: "Hismena, Idyllshire (5.7,5.2)" }, source: "Also sold by Auriana, Mor Dhona (22.7,6.6). It is only listed once a weapon reaches this step." }
      ],
      sources: [
        "https://ffxiv.consolegameswiki.com/wiki/Anima_Weapons",
        "https://ffxiv.consolegameswiki.com/wiki/Best_Friends_Forever",
        "https://ffxiv.consolegameswiki.com/wiki/Body_and_Soul",
        "https://ffxiv.consolegameswiki.com/wiki/Words_of_Wisdom",
        "https://www.garlandtools.org/db/#item/16934"
      ]
    }
  ],
  uncertain: [
    "Reconditioned: Crystal Sand and Umbrite needs are RNG-based (usually 57 to 60 each). The data uses the maximum of 60, so 150 Superior Enchanted Ink and 150 Thavnairian Mist; real needs may be about 3 sand and 3 Umbrite lower per weapon.",
    "Crystal Sand is listed with no buy price because it is an exchange at Ulan, not a currency purchase. Its Poetics cost appears through the Superior Enchanted Ink and Thavnairian Mist rows. Players using scrip tokens or another route can skip those two rows.",
    "The Grand Company rank needed to buy Kingcake, Adamantite Francesca, Titanium Alloy Mirror, Dispelling Arrow and Pneumite from the quartermasters was not verified. Garland Tools shows the seal prices but no rank.",
    "Paladin: the sword and shield (e.g. Aettir/Priwen) go through each step together on one quest with one set of materials, so PLD counts as one weapon. This is inferred from the quest texts ('weapon/shield') and per-job requirements; no source states it outright.",
    "Coordinates come from the wiki NPC and quest infoboxes (Ardashir 7.4,11.5; the Anima Weapons page rounds it to 7,11). Garland Tools gives slightly different decimals (e.g. Hismena 5.78,5.29)."
  ]
});
