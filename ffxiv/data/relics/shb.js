// Shadowbringers Resistance weapons: every step and what each weapon needs for it.
// The format is described above the data scripts in ffxiv/relics/index.html.
RELIC_DATA.push({
  id: "shb",
  expansion: "Shadowbringers",
  name: "Resistance Weapons",
  weapons: [
    { id: "PLD", job: "Paladin", label: "Blade's Honor & Blade's Fortitude" },
    { id: "WAR", job: "Warrior", label: "Blade's Valor" },
    { id: "DRK", job: "Dark Knight", label: "Blade's Justice" },
    { id: "GNB", job: "Gunbreaker", label: "Blade's Resolve" },
    { id: "MNK", job: "Monk", label: "Blade's Serenity" },
    { id: "DRG", job: "Dragoon", label: "Blade's Glory" },
    { id: "NIN", job: "Ninja", label: "Blade's Subtlety" },
    { id: "SAM", job: "Samurai", label: "Blade's Fealty" },
    { id: "BRD", job: "Bard", label: "Blade's Muse" },
    { id: "MCH", job: "Machinist", label: "Blade's Ingenuity" },
    { id: "DNC", job: "Dancer", label: "Blade's Euphoria" },
    { id: "BLM", job: "Black Mage", label: "Blade's Fury" },
    { id: "SMN", job: "Summoner", label: "Blade's Acumen" },
    { id: "RDM", job: "Red Mage", label: "Blade's Temperance" },
    { id: "WHM", job: "White Mage", label: "Blade's Mercy" },
    { id: "SCH", job: "Scholar", label: "Blade's Wisdom" },
    { id: "AST", job: "Astrologian", label: "Blade's Providence" }
  ],
  steps: [
    {
      name: "Resistance",
      quest: "Fire in the Forge (first weapon, one time); Resistance Is (Not) Futile (repeatable)",
      start: "Zlatan, Gangos (6.1,4.9)",
      note: "Unlock with Hail to the Queen (Keiten, Kugane (12.2,12.3)), Path to the Past, The Bozja Incident and Fire in the Forge; Fire in the Forge gives your first weapon free, so only 16 of the 17 weapons need scalepowder. Change to the job you want before talking to Zlatan; Paladin gets the sword and shield together.",
      items: [
        {
          name: "Thavnairian Scalepowder",
          qty: 4,
          buy: { currency: "Allagan Tomestone of Poetics", price: 250, vendor: "Auriana, Revenant's Toll, Mor Dhona (22.7,6.6)" },
          source: "Also sold for 250 Poetics by Hismena, Idyllshire (5.7,5.2) and Rowena's Representative in Limsa Lominsa Lower Decks (9.1,11.1), New Gridania (11.9,12.3), Ul'dah - Steps of Nald (9.1,8.3) and Foundation (10.5,11.8). Not needed for the first weapon (free from Fire in the Forge)."
        }
      ],
      sources: [
        "https://ffxiv.consolegameswiki.com/wiki/Resistance_Weapons",
        "https://ffxiv.consolegameswiki.com/wiki/Resistance_Is_(Not)_Futile",
        "https://ffxiv.consolegameswiki.com/wiki/Fire_in_the_Forge",
        "https://ffxiv.consolegameswiki.com/wiki/Thavnairian_Scalepowder",
        "https://www.garlandtools.org/db/#item/30273"
      ]
    },
    {
      name: "Augmented Resistance",
      quest: "For Want of a Memory",
      start: "Zlatan, Gangos (6.1,4.9)",
      note: "Needs the main story through Vows of Virtue, Deeds of Cruelty plus the side quests Where Eagles Nest and A Sober Proposal. Keep the Resistance weapon in your inventory or armoury chest when you turn in the memories.",
      items: [
        { name: "Tortured Memory of the Dying", qty: 20, source: "Heavensward FATEs in Coerthas Western Highlands and The Sea of Clouds; random drop in the Southern Entrenchment zone of the Bozjan Southern Front" },
        { name: "Sorrowful Memory of the Dying", qty: 20, source: "Heavensward FATEs in The Dravanian Forelands and The Churning Mists; random drop in the Old Bozja zone of the Bozjan Southern Front" },
        { name: "Harrowing Memory of the Dying", qty: 20, source: "Heavensward FATEs in The Dravanian Hinterlands and Azys Lla; random drop in The Alermuc Climb zone of the Bozjan Southern Front" }
      ],
      sources: [
        "https://ffxiv.consolegameswiki.com/wiki/Resistance_Weapons",
        "https://ffxiv.consolegameswiki.com/wiki/For_Want_of_a_Memory"
      ]
    },
    {
      name: "Recollection",
      quest: "The Will to Resist",
      start: "Zlatan, Gangos (6.1,4.9)",
      note: "Turn in the memories with the Augmented Resistance weapon in your inventory. Any materia melded on the weapon is lost.",
      items: [
        { name: "Bitter Memory of the Dying", qty: 6, source: "Level 60 Heavensward dungeons run synced (e.g. The Antitower), Duty Roulette: Leveling (once a day), Critical Engagements and rarely enemies on the Bozjan Southern Front" }
      ],
      sources: [
        "https://ffxiv.consolegameswiki.com/wiki/Resistance_Weapons",
        "https://ffxiv.consolegameswiki.com/wiki/The_Will_to_Resist"
      ]
    },
    {
      name: "Law's Order",
      quest: "Change of Arms",
      start: "Zlatan, Gangos (6.1,4.9)",
      note: "Needs Resistance Rank 10, The Battle of Castrum Lacus Litore, and the side quests A Sign of What's to Come, Fit for a Queen and In the Queen's Image (Delubrum Reginae). Change to the job you want before talking to Zlatan.",
      items: [
        { name: "Loathsome Memory of the Dying", qty: 15, source: "The Battle of Castrum Lacus Litore (5 per clear), Crystal Tower alliance raids (Labyrinth of the Ancients, Syrcus Tower, The World of Darkness), Critical Engagements on the Bozjan Southern Front" }
      ],
      sources: [
        "https://ffxiv.consolegameswiki.com/wiki/Resistance_Weapons",
        "https://ffxiv.consolegameswiki.com/wiki/Change_of_Arms"
      ]
    },
    {
      name: "Augmented Law's Order",
      quest: "The Resistance Remembers (one time); A New Path of Resistance (repeatable)",
      start: "Gerolt, Gangos (6.2,5.0) for The Resistance Remembers; Zlatan, Gangos (6.1,4.9) for A New Path of Resistance",
      note: "The Resistance Remembers is done once and its memories go to the Allagan Node in Gangos; it can't be done inside Bozja or Zadnor. After that, each weapon needs Timeworn Artifacts and its Law's Order weapon.",
      items: [
        { name: "Haunting Memory of the Dying", qty: 18, perRelic: true, source: "Shadow of Mhach alliance raids (The Void Ark, The Weeping City of Mhach, Dun Scaith; 3 per clear) or FATEs in The Fringes, The Peaks and The Lochs (1, chance)" },
        { name: "Vexatious Memory of the Dying", qty: 18, perRelic: true, source: "Return to Ivalice alliance raids (Rabanastre, Ridorana Lighthouse, Orbonne Monastery; 3 per clear) or FATEs in The Ruby Sea, Yanxia and The Azim Steppe (1, chance)" },
        { name: "Timeworn Artifact", qty: 15, source: "Delubrum Reginae (3 per clear) or Palace of the Dead (1, random; more likely on deeper floors)" }
      ],
      sources: [
        "https://ffxiv.consolegameswiki.com/wiki/Resistance_Weapons",
        "https://ffxiv.consolegameswiki.com/wiki/The_Resistance_Remembers",
        "https://ffxiv.consolegameswiki.com/wiki/A_New_Path_of_Resistance"
      ]
    },
    {
      name: "Blade's",
      quest: "A New Playing Field, What Dreams Are Made Of, Spare Parts, Tell Me a Story, A Fond Memory, A Done Deal (one time); Irresistible (repeatable)",
      start: "Gerolt, Gangos (6.2,5.0) for What Dreams Are Made Of and A Done Deal; Zlatan, Gangos (6.1,4.9) for Spare Parts, Tell Me a Story, A Fond Memory and Irresistible",
      note: "A New Playing Field unlocks Zadnor; the three one-time trade quests are done once. On each Irresistible turn-in you pick four stats for the weapon, and you can't change job while the quest is active.",
      items: [
        { name: "Compact Axle", qty: 30, perRelic: true, source: "Spare Parts: Zadnor Southern Plateau skirmishes (1) or Alexander raid clears (1)" },
        { name: "Compact Spring", qty: 30, perRelic: true, source: "Spare Parts: Zadnor Southern Plateau Critical Engagements (2) or Alexander raid clears (1)" },
        { name: "A Day in the Life: Battles for the Realm", qty: 30, perRelic: true, source: "Tell Me a Story: Zadnor Western Plateau skirmishes (1) or Omega raid clears (V1 and V2 of Deltascape, Sigmascape, Alphascape)" },
        { name: "A Day in the Life: Beyond the Rift", qty: 30, perRelic: true, source: "Tell Me a Story: Zadnor Western Plateau Critical Engagements (2) or Omega raid clears (V3 and V4 of Deltascape, Sigmascape, Alphascape)" },
        { name: "Bleak Memory of the Dying", qty: 30, perRelic: true, source: "A Fond Memory: Zadnor skirmishes or certain Eden raid clears" },
        { name: "Lurid Memory of the Dying", qty: 30, perRelic: true, source: "A Fond Memory: Zadnor Critical Engagements or certain Eden raid clears" },
        { name: "Raw Emotion", qty: 15, source: "The Dalriada (3), Delubrum Reginae (2), level 70 Stormblood dungeons run synced e.g. Hell's Lid (1), Heaven-on-High (1, random)" }
      ],
      sources: [
        "https://ffxiv.consolegameswiki.com/wiki/Resistance_Weapons",
        "https://ffxiv.consolegameswiki.com/wiki/What_Dreams_Are_Made_Of",
        "https://ffxiv.consolegameswiki.com/wiki/Spare_Parts",
        "https://ffxiv.consolegameswiki.com/wiki/Tell_Me_a_Story",
        "https://ffxiv.consolegameswiki.com/wiki/A_Fond_Memory",
        "https://ffxiv.consolegameswiki.com/wiki/A_Done_Deal",
        "https://ffxiv.consolegameswiki.com/wiki/Irresistible"
      ]
    }
  ],
  uncertain: [
    "Resistance step: the first weapon is free from Fire in the Forge, so the real Thavnairian Scalepowder total is 64 (16 x 4, 16,000 Poetics), not 68 (17 x 4) as plain multiplication would give.",
    "Paladin: Fire in the Forge dialogue says a Paladin gets both Honorbound (sword) and Tenacity (shield) from one quest. The wiki's 17-weapon totals (e.g. 340 memories = 17 x 20) imply one turn-in for sword and shield together, but the quest pages list the shield as a separate weapon and don't say this outright.",
    "Optional, not counted: re-rolling a Blade's or Augmented Law's Order weapon's stats ('Forged Anew' at the Allagan Node, Gangos (5.9,4.8)) costs 4 Aetherial Sealant at 100 Allagan Tomestone of Poetics each from Auriana or Hismena.",
    "No later jobs (Reaper, Sage, Viper, Pictomancer) were added to this line; the wiki lists 18 weapons for 17 jobs.",
    "Gamer Escape blocked automated access (HTTP 403). Vendor prices were cross-checked with Garland Tools instead; drop sources and quantities come only from the Console Games Wiki.",
    "Exact Zadnor zones for Bleak and Lurid memories and which Eden raids drop them weren't recorded in detail."
  ]
});
