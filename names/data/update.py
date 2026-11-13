# Rebuilds the generated name lists from two wikis, both of which tag their characters by race:
#   skyrim.names.js   UESP            en.uesp.net        Category:Skyrim-<Race>, split by
#                                                        Category:Skyrim-Male/Female NPCs
#   wow.names.js      Warcraft Wiki   warcraft.wiki.gg   Category:<Race> characters
# Run it when you want the lists refreshed: python3 names/data/update.py
# Check the diff before committing: wikis gain and lose pages, and the filters below are guesses
# about what is a name, so a bad run shows up as a race suddenly losing half its list.
#
# Only the corpus (list-of-names) parts of a race come from here. Patterns and word lists -- Nord
# surnames, Argonian deed names -- are written by hand in skyrim.js and wow.js and are never touched
# by this script.
#
# Both wikis are share-alike: UESP CC BY-SA 2.5, Warcraft Wiki CC BY-SA 4.0. The generated files
# carry the credit in their header.
import json, pathlib, random, re, shutil, ssl, subprocess, sys, time, urllib.parse, urllib.request

HERE = pathlib.Path(__file__).parent
UA = "SpibaneToolsNameData/1.0 (https://spibane.com; static site name-list builder)"
PAUSE = 0.6           # between requests, to stay a polite guest; UESP throttles a long run
PER_RACE = 400        # at most this many names kept per list; more than the generator needs
SEED = 20261109       # fixed, so re-running without wiki changes gives the same file

UESP = "https://en.uesp.net/w/api.php"
WOW = "https://warcraft.wiki.gg/api.php"

SKYRIM_RACES = {
    "nord": "Nord", "imperial": "Imperial", "breton": "Breton", "redguard": "Redguard",
    "dark-elf": "Dark Elf", "high-elf": "High Elf", "wood-elf": "Wood Elf",
    "orc": "Orc", "khajiit": "Khajiit", "argonian": "Argonian",
}
WOW_RACES = {
    "human": "Human", "orc": "Orc", "night-elf": "Night elf", "dwarf": "Dwarf",
    "gnome": "Gnome", "troll": "Troll", "tauren": "Tauren", "draenei": "Draenei",
    "blood-elf": "Blood elf", "undead": "Undead", "worgen": "Worgen",
    "goblin": "Goblin", "pandaren": "Pandaren",
    # The allied races and the ones added since. Kul Tiran and Mechagnome have no category of their
    # own -- the wiki files them under Human and Gnome -- so they are not here.
    "nightborne": "Nightborne", "void-elf": "Void elf", "lightforged-draenei": "Lightforged draenei",
    "highmountain-tauren": "Highmountain tauren", "maghar-orc": "Mag'har orc",
    "dark-iron-dwarf": "Dark Iron dwarf", "zandalari-troll": "Zandalari troll",
    "vulpera": "Vulpera", "earthen": "Earthen", "dracthyr": "Dracthyr", "haranir": "Haranir",
    "skyborne": "Skyborne",
}
# Races the wiki files under more than the one "<Race> characters" category go here, and their
# categories are merged. Nothing needs it today. The troll tribes were tried -- "Troll characters"
# holds 40 pages where orcs have four thousand, because trolls are filed by tribe -- but those
# categories are about the tribes rather than their people, and brought back Drakkari, Berserking
# and Dinomancer along with the names. A thin honest list beats a padded one, and wow.js leaves a
# race out entirely rather than ship one the generator would only echo back.
WOW_EXTRA = {}

# Words that start a page title but aren't part of the name. "Acolyte Jenssen" is Jenssen.
TITLES = r"""Acolyte|Adept|Admiral|Apprentice|Archmage|Arch-Mage|Baron|Baroness|Battlemaster|Bishop|
Brother|Captain|Chief|Chieftain|Commander|Companion|Count|Countess|Dark|Deacon|Doctor|Elder|Emperor|
Empress|Farmer|Father|General|Grandmaster|Guard|Guardian|High|Housecarl|Hunter|Initiate|Inquisitor|
Jarl|King|Knight|Lady|Legate|Lieutenant|Lord|Madame|Magister|Marshal|Master|Mistress|Mother|Overseer|
Priest|Priestess|Prince|Princess|Prophet|Queen|Ranger|Scout|Sergeant|Sister|Sir|Stormcloak|Thane|
Vigilant|Warchief|Warden"""
TITLE_RE = re.compile(r"^(?:%s)\s+" % "|".join(t.strip() for t in TITLES.split("|")), re.I)

# Most generic NPCs are named after the job they do, and a job is an ordinary English word while a
# name almost never is. A system word list sorts the two apart far better than any blocklist could:
# it throws out Alchemist, Adventurer, Airship and Ascendant while keeping Adalvald, Aayndia and
# J'zargo. Where there is no word list to read, the names below do what they can on their own.
WORDLIST = next((w for w in ("/usr/share/dict/words", "/usr/dict/words") if pathlib.Path(w).exists()), None)
WORDS = {w.strip().lower() for w in pathlib.Path(WORDLIST).read_text(errors="replace").splitlines()
         if w.strip()} if WORDLIST else set()


def ordinary(name, compounds=True):
    """Is this an ordinary word rather than somebody's name?"""
    low = name.lower()
    if low in ROLES:
        return True
    if not WORDS:
        return False
    if low in WORDS:
        return True
    for cut, add in (("s", ""), ("es", ""), ("ies", "y")):
        if low.endswith(cut) and (low[:-len(cut)] + add) in WORDS:
            return True
    # Two ordinary words welded together is a job too: Bonekeeper, Battlecrier, Stormcaller. Only
    # safe for given names -- surnames are built that way on purpose, and the rule would throw out
    # Bronzebeard and Proudmoore along with them.
    if compounds:
        for i in range(4, len(low) - 3):
            if low[:i] in WORDS and low[i:] in WORDS:
                return True
    return False


# A page that is a job rather than a person. The cross-race test below catches most of these on its
# own; these are the ones common enough to appear under a single race and still not be a name.
ROLES = {
    "adventurer", "bandit", "citizen", "guard", "soldier", "merchant", "miner", "farmer", "beggar",
    "prisoner", "bard", "blacksmith", "innkeeper", "hunter", "mage", "necromancer", "warlock",
    "shaman", "priest", "thug", "assassin", "spy", "sailor", "slave", "servant", "worker", "noble",
    "villager", "traveler", "traveller", "patron", "drunk", "child", "boy", "girl", "man", "woman",
    "stormcloak", "legionnaire", "vampire", "werewolf", "forsworn", "thalmor", "imperial", "penitus",
    "corpse", "skeleton", "ghost", "draugr", "dremora", "unknown", "nameless",
    # stragglers no word list holds
    "arcanist", "infiltrator", "accessories", "questgiver", "innkeep", "flightmaster",
    "stablemaster", "auctioneer", "battlemaster", "peon", "grunt", "footman", "adherent",
}


# A python.org build on macOS ships with no certificate store of its own until you run
# "Install Certificates.command" from its Applications folder, and then every https call fails
# with CERTIFICATE_VERIFY_FAILED. Rather than turn verification off, which would be worse than
# the problem, fall back to curl, which uses the system's own trust store. Running that command
# once is the real fix and makes this fallback unnecessary.
_use_curl = False


def _fetch(url):
    global _use_curl
    if not _use_curl:
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA})
            with urllib.request.urlopen(req, timeout=60) as r:
                return r.read()
        except urllib.error.URLError as e:
            if not isinstance(getattr(e, "reason", None), ssl.SSLCertVerificationError):
                raise
            if not shutil.which("curl"):
                raise SystemExit(
                    "This Python has no certificates to verify https with, and there is no curl to\n"
                    "fall back on. Run \"Install Certificates.command\" from this Python's folder in\n"
                    "/Applications, then try again.")
            print("  (this Python has no certificate store; using curl instead -- see the note in "
                  "this script)", file=sys.stderr)
            _use_curl = True
    out = subprocess.run(["curl", "-sS", "--fail", "--max-time", "60", "-A", UA, url],
                         capture_output=True)
    if out.returncode:
        raise RuntimeError(out.stderr.decode(errors="replace").strip() or "curl failed")
    return out.stdout


def api(endpoint, params):
    """One API call, as JSON. Raises on anything other than a clean answer, including the errors
    MediaWiki returns with a 200 and the throttling a long run can run into -- both of which used
    to read as "this category is empty" and quietly wrote a race's list away to nothing."""
    url = endpoint + "?" + urllib.parse.urlencode({**params, "format": "json"})
    last = None
    for attempt in range(4):
        try:
            data = json.loads(_fetch(url))
            if "error" in data:
                raise RuntimeError(data["error"].get("info", "api error"))
            if "query" not in data:
                raise RuntimeError("no query in answer: " + json.dumps(data)[:120])
            return data
        except Exception as e:
            last = e
            time.sleep(PAUSE * 4 * (attempt + 1))
    raise RuntimeError("gave up after 4 tries: %s" % last)


def members(endpoint, category):
    """Every page title in a category, following continuations to the end."""
    out, params = [], {"action": "query", "list": "categorymembers",
                       "cmtitle": "Category:" + category, "cmlimit": "500", "cmtype": "page"}
    while True:
        data = api(endpoint, params)
        out += [m["title"] for m in data.get("query", {}).get("categorymembers", [])]
        cont = data.get("continue")
        if not cont:
            return out
        params = {**params, **cont}
        time.sleep(PAUSE)


def clean(title):
    """A page title reduced to the name part, or None when it isn't a name at all."""
    name = title.split(":", 1)[1] if ":" in title and title.split(":", 1)[0] in ("Skyrim", "Lore") else title
    # Punctuation that never belongs inside a name: it means the title is a phrase, a list or a
    # disambiguation. The apostrophe and a single hyphen stay -- J'zargo and Beem-Ja need them.
    if any(c in name for c in '(/,.;:!?"[]&') or any(c.isdigit() for c in name):
        return None
    name = re.sub(r"\s+the\s+.*$", "", name, flags=re.I)   # Aela the Huntress -> Aela
    name = TITLE_RE.sub("", name).strip()
    if not name:
        return None
    # Two or more hyphens is an Argonian deed name, Lifts-Her-Tail. Those are built from words and
    # belong in a pattern, which is hand-written, not in a list the chain learns from.
    if name.count("-") >= 2:
        return None
    # A corpus wants the given name on its own; surnames are collected separately where they exist
    first = name.split()[0].strip("'’-")
    if len(first) < 2 or not first[0].isalpha() or first.endswith("'s") or ordinary(first):
        return None
    # A hyphenated name is fine, but not when a half of it is an ordinary word: Beem-Ja is a name,
    # Jern-Faced is an epithet somebody earned.
    if any(ordinary(part, compounds=False) for part in first.split("-") if len(part) > 2):
        return None
    rest = name.split()[1:]
    last = rest[-1].strip("'’-") if rest else None
    if last and (len(last) < 3 or not last[0].isalpha() or ordinary(last, compounds=False)):
        last = None
    return first, last


def harvest(endpoint, categories, label):
    """{key: [titles]} for each race, printing progress as it goes. A race can draw on more than
    one category: trolls are filed by tribe far more than by race, so the race category on its own
    holds a fraction of them."""
    found = {}
    for key, names in categories.items():
        titles = []
        for category in ([names] if isinstance(names, str) else names):
            try:
                titles += members(endpoint, category)
            except Exception as e:                              # a renamed category shouldn't stop the run
                print("  %-12s FAILED on %s (%s)" % (key, category, e), file=sys.stderr)
            time.sleep(PAUSE)
        titles = sorted(set(titles))
        found[key] = titles
        print("  %-12s %5d pages%s" % (key, len(titles), "   <- empty, check the category name" if not titles else ""))
        time.sleep(PAUSE)
    return found


def seam(name):
    """A compound surname split into the two words it is made of, or None. Warcraft surnames are
    built this way -- Bronzebeard, Amberstill, Angerfang -- and a chain that learns them whole will
    sometimes glue four parts together and produce Fiendspeakheart. Split into words, the generator
    joins exactly two and the result reads like the real thing."""
    low, best = name.lower(), None
    for i in range(3, len(low) - 2):
        if low[:i] in WORDS and low[i:] in WORDS:
            score = abs(len(low) - 2 * i)          # the most even seam is usually the real one
            if best is None or score < best[0]:
                best = (score, name[:i], name[i:])
    return (best[1], best[2]) if best else None


def pick(names, rng):
    """At most PER_RACE names, chosen across the whole list rather than off the front, so the
    sample isn't all A names -- which would skew what the generator thinks a name starts with."""
    names = sorted(set(names))
    if len(names) <= PER_RACE:
        return names
    return sorted(rng.sample(names, PER_RACE))


def write_js(path, const, data, credit):
    body = ",\n".join(
        '  %s: {\n%s\n  }' % (json.dumps(key), ",\n".join(
            '    %s: [%s]' % (json.dumps(sub), ", ".join(json.dumps(n) for n in names))
            for sub, names in sorted(lists.items()) if names))
        for key, lists in sorted(data.items()) if any(lists.values()))
    path.write_text(
        "// %s\n// Don't edit by hand: run python3 names/data/update.py to bring it up to date.\n"
        "// Only the lists of names come from here; patterns and word lists are written by hand.\n"
        "const %s = {\n%s,\n};\n" % (credit, const, body), encoding="utf-8")
    print("wrote %s (%d races)" % (path.name, len(data)))


def main():
    rng = random.Random(SEED)
    only = sys.argv[1] if len(sys.argv) > 1 else None
    if only not in (None, "skyrim", "wow"):
        raise SystemExit("usage: python3 names/data/update.py [skyrim|wow]")

    if only in (None, "skyrim"):
        skyrim_names(rng)
    if only in (None, "wow"):
        wow_names(rng)


def skyrim_names(rng):
    print("Skyrim, from UESP:")
    males = set(members(UESP, "Skyrim-Male NPCs"))
    time.sleep(PAUSE)
    females = set(members(UESP, "Skyrim-Female NPCs"))
    time.sleep(PAUSE)
    raw = harvest(UESP, {k: "Skyrim-" + v for k, v in SKYRIM_RACES.items()}, "skyrim")
    # A title filed under three or more races is a job, not a person
    seen = {}
    for titles in raw.values():
        for t in titles:
            seen[t] = seen.get(t, 0) + 1
    generic = {t for t, n in seen.items() if n >= 3}

    skyrim = {}
    for key, titles in raw.items():
        sets = {"Masculine": [], "Feminine": [], "": []}
        for t in titles:
            if t in generic:
                continue
            got = clean(t)
            if not got:
                continue
            sets["Masculine" if t in males else "Feminine" if t in females else ""].append(got[0])
        skyrim[key] = {k: pick(v, rng) for k, v in sets.items() if v}
        # Names of unknown gender join both lists rather than making a third
        spare = skyrim[key].pop("", [])
        for s in ("Masculine", "Feminine"):
            if spare and skyrim[key].get(s):
                skyrim[key][s] = pick(skyrim[key][s] + spare, rng)
    write_js(HERE / "skyrim.names.js", "SKYRIM_NAMES", skyrim,
             "Skyrim character names from UESP (en.uesp.net), CC BY-SA 2.5.")


def wow_names(rng):
    print("\nWorld of Warcraft, from Warcraft Wiki:")
    raw = harvest(WOW, {k: [v + " characters"] + WOW_EXTRA.get(k, []) for k, v in WOW_RACES.items()}, "wow")
    seen = {}
    for titles in raw.values():
        for t in titles:
            seen[t] = seen.get(t, 0) + 1
    generic = {t for t, n in seen.items() if n >= 3}

    wow = {}
    for key, titles in raw.items():
        first, last = [], []
        for t in titles:
            if t in generic:
                continue
            got = clean(t)
            if not got:
                continue
            first.append(got[0])
            if got[1]:
                last.append(got[1])
        # The wiki files no gender, so these are one list each. Surnames are taken apart into the
        # words they are built from, and the ones that don't come apart are kept whole.
        heads, tails, wholes = [], [], []
        for name in set(last):
            cut = seam(name)
            if cut:
                heads.append(cut[0])
                tails.append(cut[1])
            else:
                wholes.append(name)
        wow[key] = {"first": pick(first, rng), "lastWhole": pick(wholes, rng),
                    "lastHead": pick(heads, rng), "lastTail": pick(tails, rng)}
    write_js(HERE / "wow.names.js", "WOW_NAMES", wow,
             "World of Warcraft character names from Warcraft Wiki (warcraft.wiki.gg), CC BY-SA 4.0.")


if __name__ == "__main__":
    main()
