// A Realm Reborn Zodiac weapons: every step and what each weapon needs for it.
// The format is described above the data scripts in ffxiv/relics/index.html.
RELIC_DATA.push({
  id: "arr",
  expansion: "A Realm Reborn",
  name: "Zodiac Weapons",
  weapons: [
    {id: "PLD", job: "Paladin", label: "Excalibur"},
    {id: "PLD-shield", job: "Paladin", label: "Aegis Shield"},
    {id: "WAR", job: "Warrior", label: "Ragnarok"},
    {id: "DRG", job: "Dragoon", label: "Longinus"},
    {id: "MNK", job: "Monk", label: "Kaiser Knuckles"},
    {id: "NIN", job: "Ninja", label: "Sasuke's Blades"},
    {id: "BRD", job: "Bard", label: "Yoichi Bow"},
    {id: "BLM", job: "Black Mage", label: "Lilith Rod"},
    {id: "SMN", job: "Summoner", label: "Apocalypse"},
    {id: "WHM", job: "White Mage", label: "Nirvana"},
    {id: "SCH", job: "Scholar", label: "Last Resort"}
  ],
  steps: [
    {
      name: "Relic",
      quest: "A Relic Reborn (job-specific version; first time only also The Weaponsmith of Legend from Nedrick Ironheart, Vesper Bay (12,14))",
      start: "Gerolt, Hyrstmill, North Shroud (30,20)",
      note: "Recover the broken relic from your job's beastman stronghold, defeat the Chimera and Hydra trials, clear Amdapor Keep, kill 24 beastmen with the unfinished weapon, and clear Ifrit/Garuda/Titan (Hard). Paladin's quest yields both Curtana and Holy Shield, so the shield needs nothing extra.",
      items: [
        {name: "Alumina Salts", qty: 1, source: "Quest drop: clear the trial A Relic Reborn: The Chimera on this job"},
        {name: "Amdapor Glyph", qty: 1, source: "Quest drop: clear Amdapor Keep (normal) on this job; trade to Rowena for the job's relic book"},
        {name: "White-Hot Ember", qty: 1, source: "Quest drop: clear The Bowl of Embers (Hard) on this job"},
        {name: "Howling Gale", qty: 1, source: "Quest drop: clear The Howling Eye (Hard) on this job"},
        {name: "Hyperfused Ore", qty: 1, source: "Quest drop: clear The Navel (Hard) on this job"},
        {name: "Radz-at-Han Quenching Oil", qty: 1, buy: {currency: "Allagan Tomestone of Poetics", price: 15, vendor: "Auriana, Revenant's Toll, Mor Dhona (22.7,6.6)"}}
      ],
      weaponItems: {
        PLD: [
          {name: "Aeolian Scimitar", qty: 1, source: "Crafted (unspoiled-node and Wanderer's Palace materials) or bought on the Market Board; does not need to be HQ"},
          {name: "Battledance Materia III", qty: 2, source: "Melded into the crafted weapon; from the Market Board, spiritbonding or desynthesis (no NPC vendor)"}
        ],
        WAR: [
          {name: "Barbarian's Bardiche", qty: 1, source: "Crafted (unspoiled-node and Wanderer's Palace materials) or bought on the Market Board; does not need to be HQ"},
          {name: "Battledance Materia III", qty: 2, source: "Melded into the crafted weapon; from the Market Board, spiritbonding or desynthesis (no NPC vendor)"}
        ],
        DRG: [
          {name: "Champion's Lance", qty: 1, source: "Crafted (unspoiled-node and Wanderer's Palace materials) or bought on the Market Board; does not need to be HQ"},
          {name: "Savage Aim Materia III", qty: 2, source: "Melded into the crafted weapon; from the Market Board, spiritbonding or desynthesis (no NPC vendor)"}
        ],
        MNK: [
          {name: "Wildling's Cesti", qty: 1, source: "Crafted (unspoiled-node and Wanderer's Palace materials) or bought on the Market Board; does not need to be HQ"},
          {name: "Savage Aim Materia III", qty: 2, source: "Melded into the crafted weapon; from the Market Board, spiritbonding or desynthesis (no NPC vendor)"}
        ],
        NIN: [
          {name: "Vamper's Knives", qty: 1, source: "Crafted (unspoiled-node and Wanderer's Palace materials) or bought on the Market Board; does not need to be HQ"},
          {name: "Heavens' Eye Materia III", qty: 2, source: "Melded into the crafted weapon; from the Market Board, spiritbonding or desynthesis (no NPC vendor)"}
        ],
        BRD: [
          {name: "Longarm's Composite Bow", qty: 1, source: "Crafted (unspoiled-node and Wanderer's Palace materials) or bought on the Market Board; does not need to be HQ"},
          {name: "Heavens' Eye Materia III", qty: 2, source: "Melded into the crafted weapon; from the Market Board, spiritbonding or desynthesis (no NPC vendor)"}
        ],
        BLM: [
          {name: "Sanguine Scepter", qty: 1, source: "Crafted (unspoiled-node and Wanderer's Palace materials) or bought on the Market Board; does not need to be HQ"},
          {name: "Savage Might Materia III", qty: 2, source: "Melded into the crafted weapon; from the Market Board, spiritbonding or desynthesis (no NPC vendor)"}
        ],
        SMN: [
          {name: "Erudite's Picatrix of Casting", qty: 1, source: "Crafted (unspoiled-node and Wanderer's Palace materials) or bought on the Market Board; does not need to be HQ"},
          {name: "Savage Might Materia III", qty: 2, source: "Melded into the crafted weapon; from the Market Board, spiritbonding or desynthesis (no NPC vendor)"}
        ],
        WHM: [
          {name: "Madman's Whispering Rod", qty: 1, source: "Crafted (unspoiled-node and Wanderer's Palace materials) or bought on the Market Board; does not need to be HQ"},
          {name: "Quicktongue Materia III", qty: 2, source: "Melded into the crafted weapon; from the Market Board, spiritbonding or desynthesis (no NPC vendor)"}
        ],
        SCH: [
          {name: "Erudite's Picatrix of Healing", qty: 1, source: "Crafted (unspoiled-node and Wanderer's Palace materials) or bought on the Market Board; does not need to be HQ"},
          {name: "Quicktongue Materia III", qty: 2, source: "Melded into the crafted weapon; from the Market Board, spiritbonding or desynthesis (no NPC vendor)"}
        ]
      },
      sources: [
        "https://ffxiv.consolegameswiki.com/wiki/Zodiac_Weapons",
        "https://ffxiv.consolegameswiki.com/wiki/Zodiac_Weapons/Quest",
        "https://www.garlandtools.org/db/#item/6267"
      ],
      itemsSkip: ["PLD-shield"]
    },
    {
      name: "Zenith",
      quest: "No quest: trade at the Furnace",
      start: "Furnace, Hyrstmill, North Shroud (30,20)",
      note: "Trade the base weapon plus Thavnairian Mist at the Furnace next to Gerolt. Paladin: Curtana takes 2 mists and Holy Shield takes 1.",
      items: [
        {buy: {currency: "Allagan Tomestone of Poetics", price: 20, vendor: "Auriana, Revenant's Toll, Mor Dhona (22.7,6.6)"}, name: "Thavnairian Mist", qty: 3}
      ],
      weaponItems: {
        PLD: [
          {name: "Thavnairian Mist", qty: 2, buy: {currency: "Allagan Tomestone of Poetics", price: 20, vendor: "Auriana, Revenant's Toll, Mor Dhona (22.7,6.6)"}}
        ],
        "PLD-shield": [
          {name: "Thavnairian Mist", qty: 1, buy: {currency: "Allagan Tomestone of Poetics", price: 20, vendor: "Auriana, Revenant's Toll, Mor Dhona (22.7,6.6)"}}
        ]
      },
      sources: [
        "https://ffxiv.consolegameswiki.com/wiki/Zenith_Zodiac_Weapons/Quest",
        "https://www.garlandtools.org/db/#item/6268"
      ],
      itemsSkip: ["PLD", "PLD-shield"]
    },
    {
      name: "Atma",
      quest: "Up in Arms",
      start: "Gerolt, Hyrstmill, North Shroud (30,20); upgrades by Jalzahn (29.5,19.6)",
      note: "Collect the 12 Atmas from FATEs with a Zenith weapon equipped, then choose \"Relic Weapon Zenith Enhancement\" with Jalzahn. Paladin turns in Curtana Zenith and Holy Shield Zenith together for one set of 12 Atmas.",
      items: [
        {name: "Atma of the Lion", qty: 1, source: "Random drop (~20%) from completing FATEs in Outer La Noscea with a Zenith weapon equipped"},
        {name: "Atma of the Water-bearer", qty: 1, source: "Random drop (~20%) from completing FATEs in Upper La Noscea with a Zenith weapon equipped"},
        {name: "Atma of the Ram", qty: 1, source: "Random drop (~20%) from completing FATEs in Middle La Noscea with a Zenith weapon equipped"},
        {name: "Atma of the Crab", qty: 1, source: "Random drop (~20%) from completing FATEs in Western La Noscea with a Zenith weapon equipped"},
        {name: "Atma of the Fish", qty: 1, source: "Random drop (~20%) from completing FATEs in Lower La Noscea with a Zenith weapon equipped"},
        {name: "Atma of the Bull", qty: 1, source: "Random drop (~20%) from completing FATEs in Eastern Thanalan with a Zenith weapon equipped"},
        {name: "Atma of the Scales", qty: 1, source: "Random drop (~20%) from completing FATEs in Central Thanalan with a Zenith weapon equipped"},
        {name: "Atma of the Twins", qty: 1, source: "Random drop (~20%) from completing FATEs in Western Thanalan with a Zenith weapon equipped"},
        {name: "Atma of the Scorpion", qty: 1, source: "Random drop (~20%) from completing FATEs in Southern Thanalan with a Zenith weapon equipped"},
        {name: "Atma of the Archer", qty: 1, source: "Random drop (~20%) from completing FATEs in North Shroud with a Zenith weapon equipped"},
        {name: "Atma of the Goat", qty: 1, source: "Random drop (~20%) from completing FATEs in East Shroud with a Zenith weapon equipped"},
        {name: "Atma of the Maiden", qty: 1, source: "Random drop (~20%) from completing FATEs in Central Shroud with a Zenith weapon equipped"}
      ],
      sources: [
        "https://ffxiv.consolegameswiki.com/wiki/Atma_Zodiac_Weapons/Quest",
        "https://ffxiv.consolegameswiki.com/wiki/Curtana_Zenith"
      ],
      itemsSkip: ["PLD-shield"]
    },
    {
      name: "Animus",
      quest: "Trials of the Braves",
      start: "Jalzahn, Hyrstmill, North Shroud (29.5,19.6)",
      note: "Complete all 9 Trials of the Braves books (monster kills, dungeons, FATEs, leves) with the Atma weapon equipped, then choose \"Relic Weapon Atma Enhancement\" with Jalzahn. Paladin does 7 books on Curtana and 2 on Holy Shield.",
      items: [
        {buy: {currency: "Allagan Tomestone of Poetics", price: 100, vendor: "G'jusana, Revenant's Toll, Mor Dhona (22.9,7.3)"}, name: "Book of Skyfire I", qty: 1, source: "Bought one at a time with the Atma weapon equipped; complete its kills, 3 dungeons, 3 FATEs and 3 leves"},
        {buy: {currency: "Allagan Tomestone of Poetics", price: 100, vendor: "G'jusana, Revenant's Toll, Mor Dhona (22.9,7.3)"}, name: "Book of Skyfire II", qty: 1, source: "Bought one at a time with the Atma weapon equipped; complete its kills, 3 dungeons, 3 FATEs and 3 leves"},
        {buy: {currency: "Allagan Tomestone of Poetics", price: 100, vendor: "G'jusana, Revenant's Toll, Mor Dhona (22.9,7.3)"}, name: "Book of Netherfire I", qty: 1, source: "Bought one at a time with the Atma weapon equipped; complete its kills, 3 dungeons, 3 FATEs and 3 leves"},
        {buy: {currency: "Allagan Tomestone of Poetics", price: 100, vendor: "G'jusana, Revenant's Toll, Mor Dhona (22.9,7.3)"}, name: "Book of Skyfall I", qty: 1, source: "Bought one at a time with the Atma weapon equipped; complete its kills, 3 dungeons, 3 FATEs and 3 leves"},
        {buy: {currency: "Allagan Tomestone of Poetics", price: 100, vendor: "G'jusana, Revenant's Toll, Mor Dhona (22.9,7.3)"}, name: "Book of Skyfall II", qty: 1, source: "Bought one at a time with the Atma weapon equipped; complete its kills, 3 dungeons, 3 FATEs and 3 leves"},
        {buy: {currency: "Allagan Tomestone of Poetics", price: 100, vendor: "G'jusana, Revenant's Toll, Mor Dhona (22.9,7.3)"}, name: "Book of Netherfall I", qty: 1, source: "Bought one at a time with the Atma weapon equipped; complete its kills, 3 dungeons, 3 FATEs and 3 leves"},
        {buy: {currency: "Allagan Tomestone of Poetics", price: 100, vendor: "G'jusana, Revenant's Toll, Mor Dhona (22.9,7.3)"}, name: "Book of Skywind I", qty: 1, source: "Bought one at a time with the Atma weapon equipped; complete its kills, 3 dungeons, 3 FATEs and 3 leves"},
        {buy: {currency: "Allagan Tomestone of Poetics", price: 100, vendor: "G'jusana, Revenant's Toll, Mor Dhona (22.9,7.3)"}, name: "Book of Skywind II", qty: 1, source: "Bought one at a time with the Atma weapon equipped; complete its kills, 3 dungeons, 3 FATEs and 3 leves"},
        {buy: {currency: "Allagan Tomestone of Poetics", price: 100, vendor: "G'jusana, Revenant's Toll, Mor Dhona (22.9,7.3)"}, name: "Book of Skyearth I", qty: 1, source: "Bought one at a time with the Atma weapon equipped; complete its kills, 3 dungeons, 3 FATEs and 3 leves"}
      ],
      weaponItems: {
        PLD: [
          {name: "Trials of the Braves book (any of the 9)", qty: 7, buy: {currency: "Allagan Tomestone of Poetics", price: 100, vendor: "G'jusana, Revenant's Toll, Mor Dhona (22.9,7.3)"}, source: "Bought one at a time with Curtana Atma equipped"}
        ],
        "PLD-shield": [
          {name: "Trials of the Braves book (any of the 9)", qty: 2, buy: {currency: "Allagan Tomestone of Poetics", price: 100, vendor: "G'jusana, Revenant's Toll, Mor Dhona (22.9,7.3)"}, source: "Bought one at a time with Holy Shield Atma equipped"}
        ]
      },
      sources: [
        "https://ffxiv.consolegameswiki.com/wiki/Animus_Zodiac_Weapons/Quest",
        "https://ffxiv.consolegameswiki.com/wiki/Zodiac_Weapons"
      ],
      itemsSkip: ["PLD", "PLD-shield"]
    },
    {
      name: "Novus",
      quest: "Celestial Radiance; Star Light, Star Bright",
      start: "Jalzahn, Hyrstmill, North Shroud (29.5,19.6)",
      note: "Have Hubairtin make a Sphere Scroll, then infuse 75 materia (Grade I, then II, III, IV; failed infusions destroy the materia but not the Alexandrite), each costing 1 Alexandrite; turn in with \"Relic Weapon Animus Enhancement\". Materia is not listed: plan on about 20 of each grade per weapon from the Market Board or spiritbonding. Paladin's 75 slots are split 53 (Curtana) / 22 (Holy Shield).",
      items: [
        {buy: {currency: "Allagan Tomestone of Poetics", price: 25, vendor: "Auriana, Revenant's Toll, Mor Dhona (22.7,6.6)"}, name: "Superior Enchanted Ink", qty: 3, source: "Given to Hubairtin, The Bonfire, Central Thanalan (23,13) for the Sphere Scroll"},
        {buy: {currency: "Allagan Tomestone of Poetics", price: 75, vendor: "Auriana, Revenant's Toll, Mor Dhona (22.7,6.6)"}, name: "Mysterious Map", qty: 15, source: "Each completed map gives 5 Alexandrite; Brangwine's daily quest Morbid Motivation also gives one free map"},
        {name: "Alexandrite", qty: 75, source: "From Mysterious Maps (5 each, listed above), FATEs with an Animus weapon, or 50 Allied Seals each from a Hunt Billmaster"}
      ],
      weaponItems: {
        PLD: [
          {name: "Superior Enchanted Ink", qty: 2, buy: {currency: "Allagan Tomestone of Poetics", price: 25, vendor: "Auriana, Revenant's Toll, Mor Dhona (22.7,6.6)"}, source: "Given to Hubairtin, The Bonfire, Central Thanalan (23,13) for the Sphere Scroll"},
          {name: "Mysterious Map", qty: 11, buy: {currency: "Allagan Tomestone of Poetics", price: 75, vendor: "Auriana, Revenant's Toll, Mor Dhona (22.7,6.6)"}, source: "Each completed map gives 5 Alexandrite; Brangwine's daily quest Morbid Motivation also gives one free map"},
          {name: "Alexandrite", qty: 53, source: "From Mysterious Maps (5 each, listed above), FATEs with an Animus weapon, or 50 Allied Seals each from a Hunt Billmaster"}
        ],
        "PLD-shield": [
          {name: "Superior Enchanted Ink", qty: 1, buy: {currency: "Allagan Tomestone of Poetics", price: 25, vendor: "Auriana, Revenant's Toll, Mor Dhona (22.7,6.6)"}, source: "Given to Hubairtin, The Bonfire, Central Thanalan (23,13) for the Sphere Scroll"},
          {name: "Mysterious Map", qty: 4, buy: {currency: "Allagan Tomestone of Poetics", price: 75, vendor: "Auriana, Revenant's Toll, Mor Dhona (22.7,6.6)"}, source: "Each completed map gives 5 Alexandrite; Brangwine's daily quest Morbid Motivation also gives one free map"},
          {name: "Alexandrite", qty: 22, source: "From Mysterious Maps (5 each, listed above), FATEs with an Animus weapon, or 50 Allied Seals each from a Hunt Billmaster"}
        ]
      },
      sources: [
        "https://ffxiv.consolegameswiki.com/wiki/Novus_Zodiac_Weapons/Quest",
        "https://ffxiv.consolegameswiki.com/wiki/Mysterious_Map",
        "https://ffxiv.consolegameswiki.com/wiki/Sphere_Scroll:_Curtana",
        "https://ffxiv.consolegameswiki.com/wiki/Sphere_Scroll:_Holy_Shield",
        "https://www.garlandtools.org/db/#item/7885",
        "https://www.garlandtools.org/db/#item/7883"
      ],
      itemsSkip: ["PLD", "PLD-shield"]
    },
    {
      name: "Nexus",
      quest: "Mmmmmm, Soulglazed Relics",
      start: "Jalzahn, Hyrstmill, North Shroud (29.5,19.6)",
      note: "Have Jalzahn soulglaze the Novus weapon, then fill it with light (2,000 points) by running ARR duties, FATEs, maps or PvP with it equipped; turn in with \"Relic Weapon Novus Enhancement\". Paladin must soulglaze both Curtana and Holy Shield.",
      items: [],
      sources: [
        "https://ffxiv.consolegameswiki.com/wiki/Nexus_Zodiac_Weapons/Quest",
        "https://ffxiv.consolegameswiki.com/wiki/Zodiac_Weapons"
      ]
    },
    {
      name: "Zodiac Braves",
      quest: "Wherefore Art Thou, Zodiac; A Ponze of Flesh; Labor of Love; A Treasured Mother; Method in His Malice; His Dark Materia (first weapon only)",
      start: "Jalzahn, Hyrstmill, North Shroud (29.5,19.6); sub-quests from Papana (22.9,7.3), Guiding Star (21,6), Brangwine (22.0,6.7) in Mor Dhona and Adkin, The Bonfire, Central Thanalan (23,13)",
      note: "Complete the four sub-quests (repeatable per weapon) to earn the Book of Skylight, Zodium, Flawless Alexandrite and Zodiac Scroll; the first weapon is finished through His Dark Materia with Gerolt, later ones via \"Zodiac Weapon Recreation\" with Jalzahn. Paladin's sword and shield are upgraded together by one set.",
      items: [
        {buy: {currency: "Grand Company Seal", price: 20000, vendor: "Storm Quartermaster, Limsa Lominsa Upper Decks (13.2,12.8) / Serpent Quartermaster, New Gridania (9.9,11.0) / Flame Quartermaster, Ul'dah - Steps of Nald (8.4,9.1)"}, name: "Bombard Core", qty: 4, source: "One per sub-quest; requires Second Lieutenant rank"},
        {buy: {currency: "Allagan Tomestone of Poetics", price: 200, vendor: "Auriana, Revenant's Toll, Mor Dhona (22.7,6.6)"}, name: "Sacred Spring Water", qty: 4, source: "One per sub-quest; appears at Auriana after Wherefore Art Thou, Zodiac"},
        {buy: {currency: "Gil", price: 100000, vendor: "Merchant & Mender, Whitebrim Front, Coerthas Central Highlands (13.3,16.0)"}, name: "Furite Sand", qty: 1, source: "For Method in His Malice"},
        {buy: {currency: "Gil", price: 100000, vendor: "Merchant & Mender, Forgotten Springs, Southern Thanalan (15.9,29.1)"}, name: "Allagan Resin", qty: 1, source: "For Labor of Love"},
        {buy: {currency: "Gil", price: 100000, vendor: "Junkmonger, Jijiroon's Trading Post, Upper La Noscea (26.1,26.4)"}, name: "Bronze Lake Crystal", qty: 1, source: "For A Ponze of Flesh"},
        {buy: {currency: "Gil", price: 100000, vendor: "Tool Supplier & Mender, Hyrstmill, North Shroud (29.9,18.9)"}, name: "Brass Kettle", qty: 1, source: "For A Treasured Mother"},
        {hq: true, name: "Perfect Firewood", qty: 1, source: "Must be HQ; for A Ponze of Flesh. Carpenter recipe (Master Recipes (1)); key ingredient Aged Spear Shaft comes from desynthesizing an Aged Spear (3,000 gil, Merchant & Mender, The Silver Bazaar, Western Thanalan (15,29); ~18% chance), or buy on the Market Board"},
        {hq: true, name: "Furnace Ring", qty: 1, source: "Must be HQ; for A Ponze of Flesh. Goldsmith recipe (Master Recipes (1)); key ingredient Aged Eye of Fire comes from desynthesizing an Aged Ring (3,000 gil, Merchant & Mender, The Silver Bazaar, Western Thanalan (15,29); ~18% chance), or buy on the Market Board"},
        {hq: true, name: "Perfect Pestle", qty: 1, source: "Must be HQ; for Labor of Love. Blacksmith recipe (Master Recipes (1)); key ingredient Aged Pestle Pieces comes from desynthesizing an Aged Pestle (3,000 gil, Merchant & Mender, The Silver Bazaar, Western Thanalan (15,29); ~18% chance), or buy on the Market Board"},
        {hq: true, name: "Perfect Mortar", qty: 1, source: "Must be HQ; for Labor of Love. Armorer recipe (Master Recipes (1)); key ingredient Aged Mortar Pieces comes from desynthesizing an Aged Mortar (3,000 gil, Merchant & Mender, The Silver Bazaar, Western Thanalan (15,29); ~18% chance), or buy on the Market Board"},
        {hq: true, name: "Perfect Vellum", qty: 1, source: "Must be HQ; for Method in His Malice. Leatherworker recipe (Master Recipes (1)); key ingredient Aged Vellum comes from desynthesizing an Aged Grimoire (3,000 gil, Merchant & Mender, The Silver Bazaar, Western Thanalan (15,29); ~18% chance), or buy on the Market Board"},
        {hq: true, name: "Perfect Pounce", qty: 1, source: "Must be HQ; for Method in His Malice. Alchemist recipe (Master Recipes (1)); key ingredient Dried Ether comes from desynthesizing an Aged Phial (3,000 gil, Merchant & Mender, The Silver Bazaar, Western Thanalan (15,29); ~18% chance), or buy on the Market Board"},
        {hq: true, name: "Perfect Cloth", qty: 1, source: "Must be HQ; for A Treasured Mother. Weaver recipe (Master Recipes (1)); key ingredient Stained Cloth comes from desynthesizing an Aged Robe (3,000 gil, Merchant & Mender, The Silver Bazaar, Western Thanalan (15,29); ~18% chance), or buy on the Market Board"},
        {hq: true, name: "Tailor-made Eel Pie", qty: 1, source: "Must be HQ; for A Treasured Mother. Culinarian recipe (Master Recipes (1)); key ingredient Vintage Cooking Sherry comes from desynthesizing an Aged Decanter (3,000 gil, Merchant & Mender, The Silver Bazaar, Western Thanalan (15,29); ~18% chance), or buy on the Market Board"},
        {name: "Horn of the Beast", qty: 1, source: "Quest drop from clearing Dzemael Darkhold once A Ponze of Flesh asks for it (any job, unsynced is fine)"},
        {name: "Gobmachine Bangplate", qty: 1, source: "Quest drop from clearing Brayflox's Longstop (Hard) once A Ponze of Flesh asks for it (any job, unsynced is fine)"},
        {name: "Narasimha Hide", qty: 1, source: "Quest drop from clearing Halatali (Hard) once A Ponze of Flesh asks for it (any job, unsynced is fine)"},
        {name: "Sickle Fang", qty: 1, source: "Quest drop from clearing Snowcloak once A Ponze of Flesh asks for it (any job, unsynced is fine)"},
        {name: "Vale Bubo", qty: 1, source: "Quest drop from clearing The Aurum Vale once Labor of Love asks for it (any job, unsynced is fine)"},
        {name: "Voidweave", qty: 1, source: "Quest drop from clearing Haukke Manor (Hard) once Labor of Love asks for it (any job, unsynced is fine)"},
        {name: "Amdapor Vellum", qty: 1, source: "Quest drop from clearing The Lost City of Amdapor once Labor of Love asks for it (any job, unsynced is fine)"},
        {name: "Indigo Pearl", qty: 1, source: "Quest drop from clearing Sastasha (Hard) once Labor of Love asks for it (any job, unsynced is fine)"},
        {name: "Tonberry King Blood", qty: 1, source: "Quest drop from clearing The Wanderer's Palace once Method in His Malice asks for it (any job, unsynced is fine)"},
        {name: "Royal Gigant Blood", qty: 1, source: "Quest drop from clearing Copperbell Mines (Hard) once Method in His Malice asks for it (any job, unsynced is fine)"},
        {name: "Kraken Blood", qty: 1, source: "Quest drop from clearing Hullbreaker Isle once Method in His Malice asks for it (any job, unsynced is fine)"},
        {name: "Vicegerent Blood", qty: 1, source: "Quest drop from clearing The Sunken Temple of Qarn (Hard) once Method in His Malice asks for it (any job, unsynced is fine)"},
        {name: "Lost Treasure of Amdapor", qty: 1, source: "Quest drop from clearing Amdapor Keep once A Treasured Mother asks for it (any job, unsynced is fine)"},
        {name: "Lost Treasure of Pharos Sirius", qty: 1, source: "Quest drop from clearing Pharos Sirius once A Treasured Mother asks for it (any job, unsynced is fine)"},
        {name: "Lost Treasure of the Tam-Tara Deepcroft", qty: 1, source: "Quest drop from clearing The Tam-Tara Deepcroft (Hard) once A Treasured Mother asks for it (any job, unsynced is fine)"},
        {name: "Lost Treasure of the Stone Vigil", qty: 1, source: "Quest drop from clearing The Stone Vigil (Hard) once A Treasured Mother asks for it (any job, unsynced is fine)"}
      ],
      sources: [
        "https://ffxiv.consolegameswiki.com/wiki/Zodiac_Braves_Weapons/Quest",
        "https://ffxiv.consolegameswiki.com/wiki/Excalibur",
        "https://www.garlandtools.org/db/#item/9539",
        "https://www.garlandtools.org/db/#item/9540"
      ],
      itemsSkip: ["PLD-shield"]
    },
    {
      name: "Zodiac Zeta",
      quest: "Rise and Shine (then The Vital Title and Kettle to the Mettle after the first weapon)",
      start: "Jalzahn, Hyrstmill, North Shroud (29.5,19.6); Mahatma from Remon, Swiftperch, Western La Noscea (34.3,31.7)",
      note: "Awaken 12 Mahatma in order (40 points each from ARR duties, FATEs, maps or PvP with the weapon equipped), then choose \"Zodiac Weapon Awakening\" with Jalzahn.",
      items: [
        {buy: {currency: "Allagan Tomestone of Poetics", price: 50, vendor: "Remon, Swiftperch, Western La Noscea (34.3,31.7)"}, name: "Mahatma", qty: 12, source: "Attached one at a time by Remon; each is awakened by running ARR duties/FATEs with the weapon equipped"}
      ],
      sources: [
        "https://ffxiv.consolegameswiki.com/wiki/Zodiac_Zeta_Weapons/Quest",
        "https://ffxiv.consolegameswiki.com/wiki/Zodiac_Weapons"
      ],
      itemsSkip: ["PLD-shield"]
    }
  ],
  uncertain: [
    "Zodiac Zeta for Paladin: the sources do not say explicitly whether Aegis Shield needs its own 12 Mahatma; modelled as one set on the sword that upgrades both (as Atma and Braves do).",
    "Nexus for Paladin: both pieces must be soulglazed; whether each piece needs its own 2,000 light or they fill together while both are equipped is not stated.",
    "Animus for Paladin: 7 books on Curtana and 2 on Holy Shield is confirmed, but which named books go to which piece is not listed, so they are shown as generic books.",
    "Novus for Paladin: 53 + 22 Alexandrite split as 11 + 4 Mysterious Maps (55 + 20 = 75); maps give 5 each, so the shield's 22 relies on 3 spare from the sword's maps.",
    "Novus materia (about 75 successful infusions, roughly 20 of each grade I-IV including failures) is not listed as an item because the stats and grade counts are your choice.",
    "Relic step crafted weapons and Grade III materia have no NPC vendor; prices depend on the Market Board.",
    "Mysterious Map price (75 Poetics at Auriana) comes from the wiki; Garland Tools does not list its shop."
  ]
});
