// Dawntrail Phantom weapons: every step and what each weapon needs for it.
// The format is described above the data scripts in ffxiv/relics/index.html.
RELIC_DATA.push({
  id: "dt",
  expansion: "Dawntrail",
  name: "Phantom Weapons",
  weapons: [
    {id:"PLD", job:"Paladin", label:"Phantom Sword Occultum & Phantom Shield Occultum"},
    {id:"WAR", job:"Warrior", label:"Phantom War Hammer Occultum"},
    {id:"DRK", job:"Dark Knight", label:"Phantom Guillotine Occultum"},
    {id:"GNB", job:"Gunbreaker", label:"Phantom Gunblade Occultum"},
    {id:"WHM", job:"White Mage", label:"Phantom Cane Occultum"},
    {id:"SCH", job:"Scholar", label:"Phantom Codex Occultum"},
    {id:"AST", job:"Astrologian", label:"Phantom Star Globe Occultum"},
    {id:"SGE", job:"Sage", label:"Phantom Pendulums Occultum"},
    {id:"MNK", job:"Monk", label:"Phantom Tonfa Occultum"},
    {id:"DRG", job:"Dragoon", label:"Phantom Spear Occultum"},
    {id:"NIN", job:"Ninja", label:"Phantom Knives Occultum"},
    {id:"SAM", job:"Samurai", label:"Phantom Blade Occultum"},
    {id:"RPR", job:"Reaper", label:"Phantom War Scythe Occultum"},
    {id:"VPR", job:"Viper", label:"Phantom Twinfangs Occultum"},
    {id:"BRD", job:"Bard", label:"Phantom Harp Bow Occultum"},
    {id:"MCH", job:"Machinist", label:"Phantom Revolver Occultum"},
    {id:"DNC", job:"Dancer", label:"Phantom Fans Occultum"},
    {id:"BLM", job:"Black Mage", label:"Phantom Staff Occultum"},
    {id:"SMN", job:"Summoner", label:"Phantom Index Occultum"},
    {id:"RDM", job:"Red Mage", label:"Phantom Degen Occultum"},
    {id:"PCT", job:"Pictomancer", label:"Phantom Round Brush Occultum"}
  ],
  steps: [
    {
      name: "Penumbrae",
      patch: "7.25",
      quest: "Arcane Artistry; Forging the Phantasmal",
      start: "Lydirceil, Phantom Village (6.6, 7.1)",
      note: "Requires the Occult Crescent quests through Unfamiliar Territory. Collect the demiatma once for the line (they drop only while Arcane Artistry is active), then each weapon costs 3 Arcanite: the quest delivers 3 to Dodokkuli for your first weapon, and every other weapon is bought from Dodokkuli, Phantom Village (6.7, 7.1) for 3 Arcanite.",
      items: [
        {name:"Azurite Demiatma", qty:3, perRelic:true, source:"FATEs and Critical Encounters in South Horn (southeast), or FATEs in Urqopacha"},
        {name:"Verdigris Demiatma", qty:3, perRelic:true, source:"FATEs and Critical Encounters in South Horn (southwest), or FATEs in Kozama'uka"},
        {name:"Malachite Demiatma", qty:3, perRelic:true, source:"FATEs and Critical Encounters in South Horn (west), or FATEs in Yak T'el"},
        {name:"Realgar Demiatma", qty:3, perRelic:true, source:"FATEs and Critical Encounters in South Horn (north), or FATEs in Shaaloani"},
        {name:"Caput Mortuum Demiatma", qty:3, perRelic:true, source:"FATEs and Critical Encounters in South Horn (east), or FATEs in Heritage Found"},
        {name:"Orpiment Demiatma", qty:3, perRelic:true, source:"FATEs and Critical Encounters in South Horn (center and northeast), or FATEs in Living Memory"},
        {name:"Arcanite", qty:3, buy:{currency:"Allagan Tomestone of Mathematics", price:500, vendor:"Ermina, Phantom Village (6.9, 7.3)"}}
      ],
      sources: [
        "https://ffxiv.consolegameswiki.com/wiki/Phantom_Weapons",
        "https://ffxiv.consolegameswiki.com/wiki/Arcane_Artistry",
        "https://ffxiv.consolegameswiki.com/wiki/Forging_the_Phantasmal",
        "https://ffxiv.consolegameswiki.com/wiki/Dodokkuli",
        "https://ffxiv.consolegameswiki.com/wiki/Ermina"
      ]
    },
    {
      name: "Umbrae",
      patch: "7.31",
      quest: "Keeping the Old Ways Alive; Aether, Aether, Everywhere; Wrought by Hands Phantasmal",
      start: "Lydirceil, Phantom Village (6.6, 7.1)",
      note: "One time for the line: turn in five materials to Gerolt, then fill the Aetherwell Array with aether from the High-level Dungeon, Alliance Raid, Trial and Normal Raid roulettes. Each weapon then costs its Penumbrae plus 3 Waxing Arcanite, traded to Dodokkuli, Phantom Village (6.7, 7.1); the quest covers your first one.",
      items: [
        {name:"Rroneek Glue", qty:1, perRelic:true, buy:{currency:"Gil", price:300000, vendor:"Goplu, Tuliyollal (13.1, 12.7)"}},
        {name:"Ut'ohmu Siderite", qty:1, perRelic:true, buy:{currency:"Bicolor Gemstone", price:600, vendor:"Rral Wuruq, Yak T'el (13.8, 12.7)"}},
        {name:"Synthetic Dark Matter Alpha", qty:1, perRelic:true, source:"Crafted by BSM/ARM/GSM (Master Recipes XII) or Market Board"},
        {name:"Synthetic Dark Matter Beta", qty:1, perRelic:true, source:"Crafted by CRP/LTW/WVR (Master Recipes XII) or Market Board"},
        {name:"Synthetic Dark Matter Gamma", qty:1, perRelic:true, source:"Crafted by ALC/CUL (Master Recipes XII) or Market Board"},
        {name:"Waxing Arcanite", qty:3, buy:{currency:"Allagan Tomestone of Mathematics", price:500, vendor:"Ermina, Phantom Village (6.9, 7.3)"}}
      ],
      sources: [
        "https://ffxiv.consolegameswiki.com/wiki/Phantom_Weapons",
        "https://ffxiv.consolegameswiki.com/wiki/Keeping_the_Old_Ways_Alive",
        "https://ffxiv.consolegameswiki.com/wiki/Aether,_Aether,_Everywhere",
        "https://ffxiv.consolegameswiki.com/wiki/Wrought_by_Hands_Phantasmal",
        "https://ffxiv.consolegameswiki.com/wiki/Goplu",
        "https://ffxiv.consolegameswiki.com/wiki/Ut'ohmu_Siderite",
        "https://ffxiv.consolegameswiki.com/wiki/Dodokkuli"
      ]
    },
    {
      name: "Obscurum",
      patch: "7.41",
      quest: "Timeworn Techniques; In Pursuit of Perfection; A Phantom Reborn",
      start: "Lydirceil, Phantom Village (6.6, 7.2)",
      note: "One time for the line: turn in four materials, then fill the Phantom Glass with 1,200 Crystal Paste (delivered to Gerolt in parts of 100, 200, 300 and 600). Each weapon then costs its Umbrae plus 3 Waning Arcanite, traded to Dodokkuli, Phantom Village (6.7, 7.1); the quest covers your first one.",
      items: [
        {name:"Umbral Clay", qty:1, perRelic:true, buy:{currency:"Gil", price:500000, vendor:"Goplu, Tuliyollal (13.1, 12.7)"}},
        {name:"Aspected Aetheroconductor", qty:1, perRelic:true, source:"Crafted by BSM/ARM/GSM (Master Recipes XII) or Market Board"},
        {name:"Aspected Aether Agglomerate", qty:1, perRelic:true, source:"Crafted by CRP/LTW/WVR (Master Recipes XII) or Market Board"},
        {name:"Aspected Aetherocatalyst", qty:1, perRelic:true, source:"Crafted by ALC/CUL (Master Recipes XII) or Market Board"},
        {name:"Crystal Paste", qty:1200, perRelic:true, source:"Duty roulettes, Dawntrail and Occult Crescent FATEs and CEs, and various Dawntrail duties"},
        {name:"Waning Arcanite", qty:3, buy:{currency:"Allagan Tomestone of Mathematics", price:500, vendor:"Ermina, Phantom Village (6.9, 7.3)"}}
      ],
      sources: [
        "https://ffxiv.consolegameswiki.com/wiki/Phantom_Weapons",
        "https://ffxiv.consolegameswiki.com/wiki/Timeworn_Techniques",
        "https://ffxiv.consolegameswiki.com/wiki/In_Pursuit_of_Perfection",
        "https://ffxiv.consolegameswiki.com/wiki/A_Phantom_Reborn",
        "https://ffxiv.consolegameswiki.com/wiki/Goplu",
        "https://ffxiv.consolegameswiki.com/wiki/Ermina"
      ]
    },
    {
      name: "Eclipticum",
      patch: "7.55",
      quest: "Under No Illusion; Phantoms to Fillet; A Phantom Unveiled",
      start: "Lydirceil, Phantom Village (6.6, 7.2)",
      note: "One time for the line: turn in four materials, then collect 100 of each Phantom Dispeller from North Horn FATEs and CEs or roulettes. Each weapon then costs its Obscurum plus 3 Ecliptic Arcanite, traded to Dodokkuli, Phantom Village (6.7, 7.1); the quest covers your first one.",
      items: [
        {name:"Monarch Whetstone", qty:1, perRelic:true, buy:{currency:"Gil", price:500000, vendor:"Goplu, Tuliyollal (13.1, 12.7)"}},
        {name:"Ancestral Alloy Ingot", qty:1, perRelic:true, source:"Crafted (Master Recipes XII) or Market Board"},
        {name:"Ascendant Twine", qty:1, perRelic:true, source:"Crafted (Master Recipes XII) or Market Board"},
        {name:"Majestic Polish", qty:1, perRelic:true, source:"Crafted by ALC/CUL (Master Recipes XII) or Market Board"},
        {name:"Phantom Dispeller α", qty:100, perRelic:true, source:"North Horn FATEs and CEs, or the High-level Dungeons roulette"},
        {name:"Phantom Dispeller β", qty:100, perRelic:true, source:"North Horn FATEs and CEs, or the Trials roulette"},
        {name:"Phantom Dispeller γ", qty:100, perRelic:true, source:"North Horn FATEs and CEs, or the Normal Raids roulette"},
        {name:"Ecliptic Arcanite", qty:3, buy:{currency:"Allagan Tomestone of Mathematics", price:500, vendor:"Ermina, Phantom Village (6.9, 7.3)"}}
      ],
      sources: [
        "https://ffxiv.consolegameswiki.com/wiki/Phantom_Weapons",
        "https://ffxiv.consolegameswiki.com/wiki/Under_No_Illusion",
        "https://ffxiv.consolegameswiki.com/wiki/Phantoms_to_Fillet",
        "https://ffxiv.consolegameswiki.com/wiki/A_Phantom_Unveiled",
        "https://ffxiv.consolegameswiki.com/wiki/Goplu",
        "https://ffxiv.consolegameswiki.com/wiki/Dodokkuli"
      ]
    },
    {
      name: "Occultum",
      patch: "7.55",
      quest: "Final Phantasm",
      start: "Lydirceil, Phantom Village (6.6, 7.2)",
      note: "Fill the Knowledge Crystal once by clearing the listed Dawntrail FATEs, dungeons, trials, alliance raids and Arcadion normal raids, then choose substats. Every other weapon is traded to Dodokkuli for its matching Eclipticum, with no further items or tomestones.",
      items: [
        {name:"Knowledge Crystal", qty:1, perRelic:true, source:"Given empty by Dodokkuli during Final Phantasm; filled with martial memories from Dawntrail content"}
      ],
      sources: [
        "https://ffxiv.consolegameswiki.com/wiki/Phantom_Weapons",
        "https://ffxiv.consolegameswiki.com/wiki/Final_Phantasm",
        "https://ffxiv.consolegameswiki.com/wiki/Dodokkuli"
      ]
    }
  ],
  uncertain: [
    "Orpiment Demiatma overworld zone (Living Memory) is inferred from the Phantom Weapons page's zone list; its item page names only the South Horn center and northeast regions.",
    "Arcanite prices assume the current uncapped tomestone, Allagan Tomestone of Mathematics. When patches rotate tomestones, the currency changes.",
    "Ancestral Alloy Ingot vs. Ascendant Twine crafter class: sources disagree, so the crafter is left unspecified.",
    "Final Phantasm's page mentions an option to undertake the quest as another job, but Dodokkuli's shop lists every Occultum for 1 matching Eclipticum and nothing else. The tool assumes the Knowledge Crystal is needed only once.",
    "Lydirceil coordinates are shown as (6.6, 7.1) on 7.25 and 7.31 quest pages and (6.6, 7.2) on 7.41 and 7.55 pages."
  ]
});
