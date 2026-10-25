// Your own groupings, kept by hand. Refreshing forms.js never changes this file.
//
// How to write an entry:
//   "Irisalis"          - the base form
//   "Prismana Iris"     - the Prismana form
//   "Highland Iris"     - a regional form (form name, then species name)
//
// A form listed here shows only when that category's checkbox is ticked.
// Keepsakes get their own boxes; event specials stay in Aniilog order.
// Forms numbered #10001 and up that aren't listed here count as event specials.
//
// Spelling must match forms.js. The page warns you about any entry it can't find.

const CATEGORIES = {
  // Season 1 keepsake exclusives
  keepsake: [
    "Prismana Inferlupa",
    "Prismana Melloblum",
    "Prismana Glynsera",
    "Prismana Waleetle",
    "Prismana Infergon",
    "Irisalis",
    "Dazmand",
    "Fulmintis",
    "Prismana Fulmintis",
    "Sparkelf",
    "Prismana Sparkelf",
  ],

  // One-time event specials (no duplicates possible)
  event: [
    "Prismana Somniwing",
    "Prismana Iris",
    "Prismana Irisal",
    "Prismana Sherro",
    "Prismana Fenmane",
    "Besauce",
  ],

  // Pick one: a player can only own one form from each group, so each group shares one tile,
  // placed where the first form would be.
  pickOne: [
    ["Prismana Iris", "Prismana Irisal"],
  ],
};
