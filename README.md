<h1 align="center">Spibane's Tools for Everything</h1>

<h2 align="center"><strong>Small, simple tools and projects, live at <a href="https://spibane.com">spibane.com</a></strong></h2>

<div align="center">

[![Status](https://img.shields.io/badge/Status-Live-darkgreen)](https://spibane.com)
[![Changelog](https://img.shields.io/badge/Changelog-blue)](./CHANGELOG.md)

[![HTML](https://img.shields.io/badge/HTML-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-222222?logo=githubpages&logoColor=white)](https://pages.github.com)

</div>

## Architecture

A static site with no build step, framework or server. Each tool is a folder with its own `index.html`, and every page loads the shared stylesheet and script from `shared/`.

```
 browser ──► index.html (hub) ──► tool/index.html
                 │                     │
                 └──── shared/ ◄───────┘   base.css, site.js (theme, footer, helpers, backups)
                          │
                          ▼
                    localStorage             all saved progress and settings
```

- **No accounts or tracking.** Everything a tool saves stays in the browser's `localStorage`.
- **Shared helpers.** `shared/site.js` has the small pieces tools reuse (`shuffle`, `uid`, `slug`, `plural`, `splitLines`, `toggleIn`, `lockButton`, `fullScreen`, `PALETTE`, and for colors `colorField`, `pickColor`, `colorVars`, `hexColor`, `inkOn`), and `shared/base.css` styles form fields, dialogs, color choices, result rows, locks and played lists. Check there before writing one into a page.
- **Backups.** `backups()` in `shared/site.js` gives each tool Save, Load and Clear buttons for its own keys, plus Import when the tool passes `merge`. The hub's backup holds every tool's data in one file, and a tool can load its part out of that file.
- **Settings.** Put a tool's settings fieldsets right under the intro, wrapped in `<details class="settings"><summary><h2>Settings</h2></summary>…</details>`. `shared/site.js` starts it closed and remembers how it was left on each page. Keep main inputs (entries, players, lists) and the toggles beside the roll button outside it.
- **Game data** lives in plain JS files under each game's `data/` folder.

## Tools

| Category | Tool | What it does |
|---|---|---|
| Everyday | [Tasks and Events](https://spibane.com/tasks/) | Checklists that reset, and events that end |
| General | [Randomizer](https://spibane.com/randomizer/) | Picks at random from your own lists |
| General | [Drop Odds](https://spibane.com/odds/) | The chance a drop has dropped by now |
| General | [Bingo Cards](https://spibane.com/bingo/) | Bingo cards from your own list |
| General | [Dice Roller](https://spibane.com/dice/) | Dice like 2d6+3, and coin flips |
| General | [Turn Tracker](https://spibane.com/turns/) | Turn order with skips, holds and notes |
| General | [Score Pad](https://spibane.com/score/) | Scores with a turn clock or timer |
| General | [Brackets](https://spibane.com/brackets/) | Elimination brackets and round robins |
| General | [Character Names](https://spibane.com/names/) | Names that fit a game's races and clans |
| Games | [Aniimo](https://spibane.com/games/aniimo/) | Collection boxes and checklists |
| Games | [Dead by Daylight](https://spibane.com/games/dbd/) | Loadout randomizer |
| Games | [Final Fantasy XIV](https://spibane.com/games/ffxiv/) | Relic checklists and roulette job picker |
| Games | [Marvel Rivals](https://spibane.com/games/marvel-rivals/) | Hero randomizer |
| Games | [The Outlast Trials](https://spibane.com/games/outlast-trials/) | Trial and loadout randomizers |

## Package Structure

```
.
├── index.html          # Hub page: tool list and site-wide backup
├── 404.html
├── shared/             # base.css, site.js, logo and link preview image
├── tasks/              # Each general tool: index.html + style.css
├── randomizer/
├── odds/
├── bingo/
├── dice/
├── turns/
├── score/
├── brackets/
├── names/              # engine.js (the generator) + data/ (one file per game, plus harvested name lists)
└── games/
    ├── aniimo/         # collection/, checklist/, data/ (forms, spawns, categories)
    ├── dbd/            # loadout/, data/ (loadout.js + update.py)
    ├── ffxiv/          # relics/, roulette/, data/relics/
    ├── marvel-rivals/
    └── outlast-trials/ # randomizer/, loadout/, data/ (trials, rigs and amps)
```

## Running Locally

Any static file server works:

```bash
python3 -m http.server     # then open http://localhost:8000
```

## Updating Data

- **Dead by Daylight:** `python3 games/dbd/data/update.py` rebuilds `loadout.js` from the dbd.tricky.lol API. Check the diff before committing, since the API can list things from test builds early.
- **Aniimo:** edited by hand from the official wiki and in-game checks. The wiki leaves some things out on purpose, so don't drop entries just because it's missing them.
- **Character Names:** `python3 names/data/update.py [skyrim|wow]` rebuilds `skyrim.names.js` and `wow.names.js`, the harvested lists of names, from UESP and Warcraft Wiki. Check the diff before committing: both wikis gain and lose pages, and the script guesses at what is a name, so a bad run shows as a race suddenly losing half its list. It only writes those two files; the race definitions beside them are hand-written and never touched. FFXIV has no race-tagged source and is hand-written throughout, to Square Enix's own naming conventions; no convention was ever published for the Viera or the Hrothgar, so those four clans are shaped on the few canon names there are. Forty-six races and clans in all. `names/data/*.js` holds one file per game. Names that are a sound (Elezen, Nord) are a list the generator learns from; names that are built to a shape (Roegadyn compounds, Nord surnames, Argonian deed names, the apostrophe in Miqo'te) are patterns and word lists, which a list of finished names can never reproduce. A race is plain data and the engine has no game knowledge, so a new race or game is a data change only. Name lists want roughly 150–300 entries each to generate well; much under thirty and the generator mostly hands back names already in the list.

## Adding a Tool

1. Make a folder (games go in `games/`) with an `index.html` that loads `shared/base.css` and `shared/site.js` in `<head>`.
2. Call `backups({...})` with the tool's storage keys.
3. Add an `<li>` for it under the right category in the hub's `index.html`, and the same entry to `TOOLS` in `shared/site.js` so it appears in the breadcrumb bar's tool switcher.
4. Add a line to [CHANGELOG.md](./CHANGELOG.md).

## Deployment

| Branch | Deploys to |
|---|---|
| `dev` | Cloudflare Pages preview, for testing |
| `main` | GitHub Pages at spibane.com (`CNAME`) |

Push to `dev`, test on the preview, then open a PR from `dev` into `main`. Never push to `main` directly. The live site caches files for about 10 minutes.
