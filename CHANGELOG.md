# Changelog

The site has no version numbers; changes are grouped by the day they were made.

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
