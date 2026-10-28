# Rebuilds loadout.js from the dbd.tricky.lol API, which tracks the game's files.
# Run it after a new chapter or event comes out: python3 games/dbd/data/update.py
# Then check the diff before committing, since the API can list things from test builds early.
import json, pathlib, re, urllib.request

API = "https://dbd.tricky.lol/api/"
OUT = pathlib.Path(__file__).with_name("loadout.js")

def get(what):
    req = urllib.request.Request(API + what, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=60) as r:
        return json.load(r)

chars, perks, items, addons, offerings = (get(w) for w in ["characters", "perks", "items", "addons", "offerings"])

# Event things are rolled only if you turn them on. The game shows them with their own Event rarity.
EVENT_OFFERING = re.compile(r"Anniversary|Halloween|Spring|Summer|Winter|RedMoney")
ITEM_TYPES = {"flashlight", "medkit", "toolbox", "key", "map", "fogvial", "firecracker"}

def rarity(v, event=False):
    return "event" if event else {"veryrare": "very-rare", "visceral": "ultra-rare"}.get(v["rarity"], v["rarity"])

survivors = [{"id": c["id"], "name": c["name"]} for c in chars.values() if c["role"] == "survivor"]
killer_list = [c for c in chars.values() if c["role"] == "killer"]
killers = [{"id": c["id"], "name": c["name"]} for c in killer_list]
by_index = {k: c["id"] for k, c in chars.items()}

perk_list = sorted(({"id": k, "name": p["name"], "side": p["role"], "owner": by_index.get(str(p["character"]))}
                    for k, p in perks.items()), key=lambda p: p["name"].lower())

item_list = sorted(({"id": k, "name": i["name"], "type": i["item_type"], "rarity": rarity(i, bool(i.get("event")))}
                    | ({"event": True} if i.get("event") else {})
                    for k, i in items.items() if i["type"] == "item" and i.get("bloodweb") and i["item_type"] in ITEM_TYPES),
                   key=lambda i: i["name"].lower())

item_addons = sorted(({"id": k, "name": a["name"], "type": a["item_type"], "rarity": rarity(a)}
                      for k, a in addons.items() if a["type"] == "itemaddon" and a.get("bloodweb")),
                     key=lambda a: a["name"].lower())

power = {c["item"]: c["id"] for c in killer_list}
killer_addons = sorted(({"id": k, "name": a["name"], "killer": power[a["parents"][0]], "rarity": rarity(a)}
                        for k, a in addons.items() if a["type"] == "poweraddon" and a.get("bloodweb") and a["parents"] and a["parents"][0] in power),
                       key=lambda a: a["name"].lower())

# Splinters are tagged not_available_for_<killer>, but each one belongs to that killer alone
killer_ids = {c["id"].lower(): c["id"] for c in killer_list}
def offering(k, o):
    event = bool(EVENT_OFFERING.search(k))
    out = {"id": k, "name": o["name"], "side": o["role"], "kind": o["type"], "rarity": rarity(o, event)}
    only = [killer_ids[t[18:]] for t in o.get("tags") or [] if t.startswith("not_available_for_") and t[18:] in killer_ids]
    if only: out["killer"] = only[0]
    if event: out["event"] = True
    return out
offering_list = sorted((offering(k, o) for k, o in offerings.items() if not o.get("retired")), key=lambda o: o["name"].lower())

def block(name, rows):
    return f"  {name}:[\n" + ",\n".join("    " + json.dumps(r, ensure_ascii=False, separators=(",", ":")) for r in rows) + "\n  ]"

OUT.write_text(
    "// Dead by Daylight characters, perks, items, add-ons and offerings, built by update.py from dbd.tricky.lol.\n"
    "// Don't edit by hand: run python3 games/dbd/data/update.py to bring it up to date.\n"
    "// The ids are used to save your settings, so they come straight from the game's files.\n"
    "const DBD={\n" + ",\n".join([
        block("survivors", survivors), block("killers", killers), block("perks", perk_list), block("items", item_list),
        block("itemAddons", item_addons), block("killerAddons", killer_addons), block("offerings", offering_list),
    ]) + "\n};\n", encoding="utf-8")
print(f"Wrote {OUT}: {len(survivors)} survivors, {len(killers)} killers, {len(perk_list)} perks, {len(item_list)} items, "
      f"{len(item_addons)} item add-ons, {len(killer_addons)} killer add-ons, {len(offering_list)} offerings")
