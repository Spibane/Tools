// Endwalker Manderville weapons: every step and what each weapon needs for it.
// The format is described above the data scripts in ffxiv/relics/index.html.
RELIC_DATA.push({
  id: "ew",
  expansion: "Endwalker",
  name: "Manderville Weapons",
  weapons: [
    {id:"PLD", job:"Paladin", label:"Mandervillous Falchion & Mandervillous Kite Shield"},
    {id:"WAR", job:"Warrior", label:"Mandervillous Battleaxe"},
    {id:"DRK", job:"Dark Knight", label:"Mandervillous Greatsword"},
    {id:"GNB", job:"Gunbreaker", label:"Mandervillous Gunblade"},
    {id:"WHM", job:"White Mage", label:"Mandervillous Cane"},
    {id:"SCH", job:"Scholar", label:"Mandervillous Codex"},
    {id:"AST", job:"Astrologian", label:"Mandervillous Torquetum"},
    {id:"SGE", job:"Sage", label:"Mandervillous Wings"},
    {id:"MNK", job:"Monk", label:"Mandervillous Fists"},
    {id:"DRG", job:"Dragoon", label:"Mandervillous Trident"},
    {id:"NIN", job:"Ninja", label:"Mandervillous Knives"},
    {id:"SAM", job:"Samurai", label:"Mandervillous Samurai Blade"},
    {id:"RPR", job:"Reaper", label:"Mandervillous Zaghnal"},
    {id:"BRD", job:"Bard", label:"Mandervillous Compound Bow"},
    {id:"MCH", job:"Machinist", label:"Mandervillous Revolver"},
    {id:"DNC", job:"Dancer", label:"Mandervillous Chakrams"},
    {id:"BLM", job:"Black Mage", label:"Mandervillous Rod"},
    {id:"SMN", job:"Summoner", label:"Mandervillous Index"},
    {id:"RDM", job:"Red Mage", label:"Mandervillous Rapier"}
  ],
  steps: [
    {
      name: "Manderville",
      quest: "Make It a Manderville (first weapon); Make Another Manderville (repeatable, each further job)",
      start: "House Manderville Manservant, Radz-at-Han (11.8,11.2); repeatable from House Manderville Artisan, Radz-at-Han (12.0,7.2)",
      note: "Requires level 90, the Endwalker main scenario and the Hildibrand quests through The Imperfect Gentleman. Be on the job you want the weapon for; changing job during the quest blocks progress.",
      items: [
        {name:"Manderium Meteorite", qty: 3, buy:{currency:"Allagan Tomestone of Poetics", price: 500, vendor:"Jubrunnah, Radz-at-Han (12.2,10.9)"}}
      ],
      sources: [
        "https://ffxiv.consolegameswiki.com/wiki/Manderville_Weapons",
        "https://ffxiv.consolegameswiki.com/wiki/Make_It_a_Manderville",
        "https://ffxiv.consolegameswiki.com/wiki/Make_Another_Manderville",
        "https://ffxiv.consolegameswiki.com/wiki/Jubrunnah",
        "https://www.garlandtools.org/db/#item/38420"
      ]
    },
    {
      name: "Amazing Manderville",
      quest: "Well-oiled (first weapon); The Next Mander-level (repeatable)",
      start: "Gerolt, Radz-at-Han (12.0,7.1); repeatable from House Manderville Artisan, Radz-at-Han (12.0,7.2)",
      note: "Unlocks after the Somehow Further Hildibrand quest Generational Bonding. Well-oiled includes a short staged fight against a training mammet; bring the Manderville weapon in your inventory or Armoury Chest.",
      items: [
        {name:"Complementary Chondrite", qty: 3, buy:{currency:"Allagan Tomestone of Poetics", price: 500, vendor:"Jubrunnah, Radz-at-Han (12.2,10.9)"}}
      ],
      sources: [
        "https://ffxiv.consolegameswiki.com/wiki/Manderville_Weapons",
        "https://ffxiv.consolegameswiki.com/wiki/Well-oiled",
        "https://ffxiv.consolegameswiki.com/wiki/The_Next_Mander-level",
        "https://www.garlandtools.org/db/#item/38940"
      ]
    },
    {
      name: "Majestic Manderville",
      quest: "A Spirited Reforging (first weapon); In Need of Adjustment (repeatable)",
      start: "Gerolt, Radz-at-Han (12.0,7.1); repeatable from House Manderville Artisan, Radz-at-Han (12.0,7.2)",
      note: "Unlocks after the Somehow Further Hildibrand quest Not from Around Here. You pick the weapon's three attributes (two maxed, one lower); changing them later at the House Manderville Alchemist costs 1 Amplifying Achondrite.",
      items: [
        {name:"Amplifying Achondrite", qty: 3, buy:{currency:"Allagan Tomestone of Poetics", price: 500, vendor:"Jubrunnah, Radz-at-Han (12.2,10.9)"}}
      ],
      sources: [
        "https://ffxiv.consolegameswiki.com/wiki/Manderville_Weapons",
        "https://ffxiv.consolegameswiki.com/wiki/A_Spirited_Reforging",
        "https://ffxiv.consolegameswiki.com/wiki/In_Need_of_Adjustment",
        "https://www.garlandtools.org/db/#item/40322"
      ]
    },
    {
      name: "Mandervillous",
      quest: "Resonating with Perfection (first weapon); Positively Mandervillous (repeatable)",
      start: "Gerolt, Radz-at-Han (12.0,7.1); repeatable from House Manderville Artisan, Radz-at-Han (12.0,7.2)",
      note: "Unlocks after the Somehow Further Hildibrand quest Gentlemen at Heart. Bring the Majestic Manderville weapon; attributes can be changed later at the House Manderville Alchemist for 1 Cosmic Crystallite.",
      items: [
        {name:"Cosmic Crystallite", qty: 3, buy:{currency:"Allagan Tomestone of Poetics", price: 500, vendor:"Jubrunnah, Radz-at-Han (12.2,10.9)"}}
      ],
      sources: [
        "https://ffxiv.consolegameswiki.com/wiki/Manderville_Weapons",
        "https://ffxiv.consolegameswiki.com/wiki/Resonating_with_Perfection",
        "https://ffxiv.consolegameswiki.com/wiki/Positively_Mandervillous",
        "https://www.garlandtools.org/db/#item/41032",
        "https://www.garlandtools.org/db/#quest/70343"
      ]
    }
  ],
  uncertain: [
    "Paladin is treated as one weapon (sword and shield from a single turn-in). The quest reward lists include both the sword and the shield, and the wiki's 57-items-per-tier total matches 19 weapons, but no source states outright that one turn-in gives both.",
    "Viper and Pictomancer are excluded: no Manderville items exist for them in Garland Tools or on the wiki, so they appear not to have been added. No official statement was found."
  ]
});
