# Changelog

The site has no version numbers; changes are grouped by the day they were made.

### 2026-11-12
- Character Names is marked Beta, on its tile, beside its heading and in the tool switcher. The tag is a shared style, so any tool can carry one

### 2026-11-09
- Added a Character Names generator: names that fit a game's races, with a first name, a last name or both. Forty-six races and clans: all sixteen in FFXIV, eight in Skyrim and twenty-two in World of Warcraft
- Every FFXIV clan is written out to Square Enix's own naming conventions, which means patterns rather than lists for most of them: Lalafell names are a syllable repeated to a shape, a Miqo'te Seeker carries a tribe letter and an apostrophe, a Sea Wolf forename is two words of Old Roegadyn and the surname is the father's name with -syn or -wyn. No convention was ever published for the Viera or the Hrothgar, so those four clans are shaped on the few canon names there are and say so
- World of Warcraft surnames are now built from the words they are made of rather than learned whole, so Amberstill and Angerfang come out at the right length instead of running on into Fiendspeakheart
- Added the allied races and the races added since, including the Skyborne of World of Warcraft: Forever, and a hand-written Troll, whose names the wiki files by tribe rather than by race
- Skyrim and World of Warcraft name lists are built by `names/data/update.py` from UESP and Warcraft Wiki, both of which file their characters by race. A word list sorts names from jobs, so Alchemist and Adventurer are left out while Adalvald and J'zargo are kept. FFXIV has no race-tagged source and stays hand-written, which suits it: most of its races are built to a shape rather than learned from a list
- A string can be forced into a name as the whole of it, its start, its end or somewhere inside, with a variance that gives near-misses of it instead: each step changes, adds or drops one letter, drawn from the letters that race actually uses, so a near-miss still fits
- Variance can keep to the ends of what you typed, which is what it does by default, or work anywhere in it. Keeping to the ends never touches the middle, so Merl gives Merk or Berl and stays readable; changing a letter in the middle of a short word rarely leaves anything recognisable
- Variance counts as a limit rather than a target, so a batch spends itself on the nearest misses first and only reaches further when it needs more names
- What you forced in is underlined in each result, since once a string is inside a built name there is otherwise no way to see where it stops
- A forced string that already works as a name of that race is used exactly as it is, and the page says so
- Races are only data, so you can write your own, or copy one of the built-in ones and change it
- A race part built from patterns can now split by set the same way a list of names does, so one part can be built differently for men and women: a Miqo'te surname is Tia or Nunh for a man and the tribe's name for a woman. In your own races, a line like [Masculine] under the patterns or word lists gives that set its own
- Names starting with a letter outside a-z, like Élodie, Ægir or Þora, now keep their capital
- A batch that came up short of what you asked for is now filled out rather than handed back with one or two names in it, which a small list of very unalike names used to do
- A race part whose list of names is empty, or a pattern naming a word list that isn't there, no longer stops the generator or prints {the-list-name} into a name; the editor says which list it couldn't find
- The page says so when the browser won't let it save, instead of letting you type a race in and lose it
- Asking before something is deleted, cleared or replaced now uses a dialog of the site's own instead of the browser's confirm box, which some in-app and embedded browsers refuse to show at all, leaving the button looking broken. Every tool uses it, and Cancel starts focused so a stray Enter or Escape never confirms
- Forcing a string that is one of a race's own building words, like Merl for a Roegadyn, now puts it in that word's place in the name (Merlwyb) instead of joining it on the outside (MerlKolbwyb), and picks a pattern that has somewhere to put it, so forcing cloak gives Wolfcloak rather than Grim-Shieldcloak
- Variance now means the same thing for every race: letters change. It used to swap a whole word for another from the same list on races built that way, which kept nothing of what you typed, and those sibling words already come up on their own at variance 0. A varied word still goes in its own place in the name, so Merl at variance 1 gives Merswyb or Gerlulf
- Forcing a string into a race whose names are built from words now says whether it is one of those words, a whole name, or neither, and lists some of the words when it is neither, so there is something to go on when they are invented ones like Bloef

### 2026-11-06
- Task and event groups can have a color of their own, shown as a gradient like the site's
- Picking a color, for groups and Score players, now offers the palette plus a custom color picker and hex box

### 2026-11-05
- Folded the settings on the game tools into a Settings section you can open and close, with its arrow in a small gradient box, which starts closed and remembers how you left it

### 2026-11-04
- Aniimo Collection page headers no longer show "slots x–x of x", so the page buttons stay on one line, and the copy button keeps its width while it says "Copied"
- Added a toggle to the FFXIV Roulette Job Picker that rolls every unlocked roulette again once the daily reset passes

### 2026-11-03
- Added a "To the top" button to every page, in the bottom corner once you've scrolled down a little

### 2026-11-02
- Shared the common pieces of every tool (form fields, lock buttons, played lists, full screen, list helpers) through `shared/`, so they look and work the same everywhere
- Printing now leaves out every tool's settings and buttons the same way

### 2026-11-01
- Added wheels to the Randomizer, one per pick, that spin to the pick and show it across the middle, as a toggle
- Added an Outlast Trials loadout randomizer for a rig, a tool, skill and medicine amp, and a trial from the Trial Randomizer's settings, with each part optional
- Added a note under the privacy note on the main page saying the site isn't affiliated with the games' owners

### 2026-10-31
- Added a README and this changelog
- Added a link back to all tools at the top of each game tool page
- Added a Turn Tracker with skips, delays, holds, and notes that count down
- Added a Score Pad with player colors, a full screen view split between players, and a turn clock or shared timer
- Added Brackets: single and double elimination, and round robin with standings, with a full screen view
- Made the main page tiles a compact grid, so every tool fits on about one screen

### 2026-10-30
- Added select and clear for a whole page, a reset, and checklist data shared with the checklists to the Aniimo collection manager
- Added marks for each sub-region to the Aniimo checklists

### 2026-10-29
- Added marking tiles as owned in the Aniimo collection manager
- Updated Aniimo data from the official wiki for Whisperwake Isles
- Moved one-of Prismana keepsakes, Prismana Sparkelf and Prismana Irisalis to one-time events
- Drew the Dice Roller's quick buttons as the dice they roll
- Showed heads and tails as the result of d2 rolls, without a heads and tails count when d2s are mixed with other dice

### 2026-10-28
- Added Tasks and Events: repeating task groups and event groups
- Added a Randomizer for your own lists
- Added Drop Odds for the chance a drop has dropped by now
- Added Bingo Cards made from your own list
- Added a Dice Roller with keep highest and lowest, coins and saved rolls, with results split by bars and a heads and tails tally for d2s
- Added a Dead by Daylight loadout randomizer
- Added an Outlast Trials trial randomizer that counts played trials against the ticked ones
- Added a team-up roll for each hero in the Marvel Rivals hero randomizer
- Added Import to the Tasks, Randomizer and Bingo backups, which adds a file's entries to yours
- Added link preview tags and image
- Added a Ko-fi link to the footer and the site header to the 404 page
- Renamed the Any Game category to General
- Fixed the Drop Odds inputs panel layout
- **BREAKING:** Moved game tools into `games/`, so their old links (such as `/aniimo/`) no longer work

### 2026-10-27
- Gave every tool its own backup, sharing common styles and scripts across pages
- Added marking roulettes completed for the day and a lock on each roulette in the FFXIV roulette picker

### 2026-10-26
- Added an FFXIV roulette job picker, with split DPS roles, upcoming jobs, and roles and jobs set per roulette
- Added a Marvel Rivals hero randomizer
- Added save and load of all progress on the hub page
- Added a subtle random hex grid background

### 2026-10-25
- Launched at spibane.com as Spibane's Tools for Everything, with a logo, theme switch, shared footer and a privacy note
- Grouped hub projects into categories, starting with Games
- Added the Aniimo collection page, with options to group one-time event specials, show gender forms as separate tiles, and combine pick-one forms into one tile
- Added Aniimo region checklists by sub-region, plus an all-forms list and collection filters
- Added FFXIV relic step checklists
- Prepared Aniimo data for the Whisperwake Isles update and added Prismana Pawney's Russet Highlands spawn
