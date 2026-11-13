// Shared page extras: the font and favicon, the light/dark theme, the hex background texture, and the site footer.
// Edit the footer text and links here. It also defines small helpers every page's own script can use (below).
// Pages include it in <head>, right after base.css: <script src="(path to)/shared/site.js"></script>
// Add data-credit-only to the script tag to leave out the home link (used on the hub page).

// Helpers for page scripts
const $ = id => document.getElementById(id);
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const pick = a => a[Math.floor(Math.random() * a.length)];
// Shuffles an array in place and returns it
const shuffle = a => {
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
};
// A short random id for saved things
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
// A name as an id: "X-Ray Vision" becomes "x-ray-vision". Saved ids come from this, so don't change it.
const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");
const plural = (n, word) => n + " " + word + (n === 1 ? "" : "s");
// The lines of a text box, trimmed, leaving out blank ones; and text with more lines added at its end
const splitLines = text => text.split("\n").map(s => s.trim()).filter(Boolean);
const appendLines = (text, lines) => text.replace(/\n*$/, text.trim() ? "\n" : "") + lines.join("\n");
// A list with x added or taken out: on says which, and leaving it out flips it
const toggleIn = (list, x, on = !list.includes(x)) => list.filter(y => y !== x).concat(on ? [x] : []);
// Light colors that sit behind black text on both themes, for wheel slices and player colors
const PALETTE = ["#ff8787", "#74c0fc", "#ffd43b", "#b197fc", "#ffa94d", "#f783ac", "#66d9e8", "#d8b48a"];
const PALETTE_NAMES = ["Red", "Blue", "Yellow", "Purple", "Orange", "Pink", "Cyan", "Tan"];

// Colors people pick are kept as "#rrggbb". hexColor tidies a typed one ("4FA", "#4fa3ff"), or gives null when it isn't one.
const hexColor = s => {
  let h = String(s ?? "").trim().replace(/^#/, "").toLowerCase();
  if (/^[0-9a-f]{3}$/.test(h)) h = h.replace(/./g, "$&$&");
  return /^[0-9a-f]{6}$/.test(h) ? "#" + h : null;
};
const rgbOf = hex => [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16));
const luminance = hex => {
  const [r, g, b] = rgbOf(hex).map(v => (v /= 255) <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
// Black or white text, whichever reads better on every color given
const inkOn = (...hexes) => {
  const ls = hexes.map(luminance);
  const black = Math.min(...ls.map(l => (l + 0.05) / 0.0563)), white = Math.min(...ls.map(l => 1.05 / (l + 0.05)));
  return black >= white ? "#121212" : "#ffffff";
};
// The color with its hue turned by deg, keeping how bright and strong it is
function turnHue(hex, deg) {
  const [r, g, b] = rgbOf(hex).map(v => v / 255), max = Math.max(r, g, b), min = Math.min(r, g, b), l = (max + min) / 2, d = max - min;
  if (!d) return hex;
  const s = d / (1 - Math.abs(2 * l - 1));
  let h = max === r ? ((g - b) / d) % 6 : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
  h = ((h * 60 + deg) % 360 + 360) % 360;
  const c = (1 - Math.abs(2 * l - 1)) * s, x = c * (1 - Math.abs((h / 60) % 2 - 1)), m = l - c / 2;
  const [r2, g2, b2] = h < 60 ? [c, x, 0] : h < 120 ? [x, c, 0] : h < 180 ? [0, c, x] : h < 240 ? [0, x, c] : h < 300 ? [x, 0, c] : [c, 0, x];
  return "#" + [r2, g2, b2].map(v => Math.round((v + m) * 255).toString(16).padStart(2, "0")).join("");
}
// A gradient like the site's lime to mint, from any color, as CSS variables for a style attribute:
// --c1 and --c2 are its ends (the hue turned a little further round) and --c-ink the text color that reads on it
const colorVars = hex => { const b = turnHue(hex, 40); return `--c1:${hex};--c2:${b};--c-ink:${inkOn(hex, b)}`; };

// A color choice for a form: the palette as swatches, then Custom with the browser's picker and a hex box.
// none names a first option for no color of its own (the site's gradient); leave it out to always need a color.
function colorField(name, value, { label = "Color", none = "" } = {}) {
  const v = hexColor(value), custom = v && !PALETTE.includes(v), start = v || PALETTE[0];
  const sw = (val, title, bg, on, cls = "") =>
    `<label class="sw${cls}" title="${title}"><input type="radio" name="${name}" value="${val}"${on ? " checked" : ""} aria-label="${title}"><span style="background:${bg}"></span></label>`;
  return `<fieldset class="color-field"><legend>${esc(label)}</legend><div class="swatches">` +
    (none ? sw("", esc(none), "var(--brand)", !v) : "") +
    PALETTE.map((c, i) => sw(c, PALETTE_NAMES[i], c, v === c)).join("") +
    sw("custom", "Custom", "conic-gradient(#ff8787,#ffd43b,#8ce99a,#66d9e8,#74c0fc,#b197fc,#f783ac,#ff8787)", custom || (!v && !none), " sw-custom") +
    `</div><div class="custom-row"><input type="color" value="${start}" aria-label="Pick a custom color">` +
    `<input type="text" class="hex" value="${start}" maxlength="7" spellcheck="false" autocomplete="off" aria-label="Hex color" pattern="#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})" title="A hex color, like #4fa3ff"></div></fieldset>`;
}
// What a color field is set to: "#rrggbb", or "" for its no-color option
const colorFieldValue = field => {
  const on = field.querySelector("input[type=radio]:checked");
  return !on ? "" : on.value === "custom" ? hexColor(field.querySelector(".hex").value) || field.querySelector("input[type=color]").value : on.value;
};
// Keeps a color field's picker, hex box and Custom swatch in step: picking or typing a color chooses Custom,
// and choosing a swatch puts its color in the custom boxes so you can adjust from there
document.addEventListener("input", e => {
  const f = e.target.closest && e.target.closest(".color-field");
  if (!f) return;
  const pick = f.querySelector("input[type=color]"), hex = f.querySelector(".hex"), custom = f.querySelector(".sw-custom input");
  if (e.target === pick) { hex.value = pick.value; custom.checked = true; }
  else if (e.target === hex) { const h = hexColor(hex.value); if (h) { pick.value = h; custom.checked = true; } }
  else if (e.target.type === "radio" && hexColor(e.target.value)) pick.value = hex.value = e.target.value;
});
// Asks for a color in a small dialog. Resolves with "#rrggbb", or null when cancelled.
function pickColor(value, label) {
  return new Promise(done => {
    const d = document.createElement("dialog");
    d.className = "color-dialog";
    d.innerHTML = `<form method="dialog">${colorField("color", value, { label })}` +
      `<div class="button-row"><button value="ok" class="primary">Done</button><button value="" formnovalidate>Cancel</button></div></form>`;
    d.addEventListener("close", () => { done(d.returnValue === "ok" ? colorFieldValue(d.querySelector(".color-field")) : null); d.remove(); });
    document.body.append(d);
    d.showModal();
    // Start on the color it has now, not the first swatch
    d.querySelector("input[type=radio]:checked")?.focus();
  });
}

// Asks a yes or no question in a small dialog, and resolves true only when it is confirmed.
// This exists because the browser's own confirm() is suppressed in some embedded and in-app
// browsers: it returns false at once without ever showing anything, so the button it guards
// looks broken. A dialog of our own always shows. Cancel takes focus, so a stray Enter or
// Escape cancels rather than confirming something that can't be undone.
function ask(question, { confirm = "Delete", cancel = "Cancel" } = {}) {
  return new Promise(done => {
    const d = document.createElement("dialog");
    d.className = "ask-dialog";
    d.innerHTML = `<form method="dialog"><p class="ask-q"></p>` +
      `<div class="button-row"><button value="ok" class="primary"></button><button value="" formnovalidate></button></div></form>`;
    // Set as text, never markup: the question carries names people typed in
    d.querySelector(".ask-q").textContent = question;
    const [yes, no] = d.querySelectorAll("button");
    yes.textContent = confirm;
    no.textContent = cancel;
    d.addEventListener("close", () => { done(d.returnValue === "ok"); d.remove(); });
    document.body.append(d);
    d.showModal();
    no.focus();
  });
}

// A lock button for a randomizer's result row: an open padlock, or a closed one when locked.
// attrs is the data attribute that says which row it's on, like 'data-s="rig"'.
const padlock = shackle => '<svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2">' +
  '<path d="' + shackle + '"/><rect x="2.5" y="7" width="11" height="8" fill="currentColor" stroke="none"/></svg>';
const LOCK_ICONS = { true: padlock("M4.5 7V4.5a3.5 3.5 0 0 1 7 0V7"), false: padlock("M4.5 7V4.5a3.5 3.5 0 0 1 7 0") };
const lockButton = (attrs, name, locked) => `<button type="button" class="lock" ${attrs} aria-pressed="${locked}" aria-label="${esc("Lock " + name)}" ` +
  `title="${locked ? "Unlock" : "Lock"}">${LOCK_ICONS[locked]}</button>`;

// Full screen: button makes panel cover the page (adding .full to it), using the browser's full screen when it has one,
// and keeps the screen awake. onChange runs after each switch.
function fullScreen(panel, button, onChange) {
  let full = false, lock = null;
  const wake = async () => { try { if (navigator.wakeLock) lock = await navigator.wakeLock.request("screen"); } catch (_) {} };
  async function set(on) {
    if (on === full) return; full = on;
    panel.classList.toggle("full", on); document.body.classList.toggle("full-open", on);
    button.textContent = on ? "Exit" : "Full screen";
    try {
      if (on) { if (panel.requestFullscreen) await panel.requestFullscreen(); }
      else if (document.fullscreenElement) await document.exitFullscreen();
    } catch (_) {}
    if (on) await wake(); else if (lock) { lock.release(); lock = null; }
    if (onChange) onChange();
  }
  button.addEventListener("click", () => set(!full));
  document.addEventListener("fullscreenchange", () => { if (!document.fullscreenElement) set(false); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") set(false); });
  // The browser lets go of the wake lock when the page is hidden, so take it again on coming back
  document.addEventListener("visibilitychange", () => { if (full && document.visibilityState === "visible") wake(); });
}

// localStorage, but never throws (it can when the browser blocks storage).
// get/set keep plain strings; load/save keep JSON, and load gives back fallback when nothing is saved.
const store = {
  get(key) { try { return localStorage.getItem(key); } catch (_) { return null; } },
  // set and save say whether it worked. A browser can refuse to store, by blocking it outright or
  // by being full, and the tools that keep a lot (lists of names, big checklists) should be able
  // to say so rather than let someone keep typing into something that isn't being kept.
  set(key, value) { try { localStorage.setItem(key, value); return true; } catch (_) { return false; } },
  load(key, fallback) { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch (_) { return fallback; } },
  save(key, value) { return store.set(key, JSON.stringify(value)); },
  remove(key) { try { localStorage.removeItem(key); } catch (_) {} },
  // Moves saved data from old key names to new ones, given as {old: new}. Run it before reading anything.
  rename(names) {
    for (const [from, to] of Object.entries(names)) {
      const v = store.get(from);
      if (v === null) continue;
      if (store.get(to) === null) store.set(to, v);
      store.remove(from);
    }
  },
};
// Downloads data as a JSON file
const downloadJSON = (filename, data) => {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([JSON.stringify(data, null, 1)], { type: "application/json" }));
  a.download = filename; a.click(); URL.revokeObjectURL(a.href);
};

// The site root, worked out from this script's own address so it works at any depth
const SITE_ROOT = new URL("../", document.currentScript.src);

// Backups: fills the page's <section class="saves">, or adds one at the end of <main>, with Save, Load and Clear buttons.
// Every backup file is {site, saved, data: {key: value}}, the saved data exactly as stored. A tool's file holds just its own keys,
// and the hub's holds everything, so a tool page can also load its part out of a site-wide file.
//   what     what the tool saves, in a few words ("relic progress"), used in the heading, buttons and messages
//   keys     every key the tool saves; leave it out on the hub page to back up the whole site
//   file     the download's file name
//   renamed  {old key: new key} for keys the tool has renamed, so older backup files still load
//   legacy   turns an older kind of backup file into {key: value} data, or returns nothing
//   merge    adds a file's {key: value} data to what's saved without removing anything, and returns a message.
//            Giving it adds an Import button; it throws if the data can't be used.
//   title, intro, save, load: override the heading, the text under it and the button labels
// Loading or clearing reloads the page, so it starts fresh from the new data. Importing leaves the redraw to merge.
const BACKUP_SITE = "spibane-tools";
function backups({ what, keys, file, renamed = {}, legacy, merge, title, intro, save, load }) {
  const section = document.querySelector(".saves") || document.querySelector("main").appendChild(document.createElement("section"));
  section.className = "saves";
  section.setAttribute("aria-labelledby", "saves-h");
  section.innerHTML = `<h2 id="saves-h">${esc(title || "Back up your " + what)}</h2>` +
    `<p class="muted">${intro || `Saved in this browser only. Back up every tool at once from the <a href="${SITE_ROOT}">main page</a>.`}` +
    (merge ? ` Import adds a file’s ${esc(what)} to yours.` : "") + `</p>` +
    `<div class="save-row"><button type="button" class="b-save">${esc(save || "Save")}</button>` +
    `<input type="file" id="saves-file" class="vh" accept=".json,application/json"><label class="button" for="saves-file">${esc(load || "Load")}</label>` +
    (merge ? `<input type="file" id="saves-import" class="vh" accept=".json,application/json"><label class="button" for="saves-import">Import</label>` : "") +
    (keys ? `<button type="button" class="b-clear">Clear</button>` : "") + `</div>` +
    `<p class="muted" aria-live="polite"></p>`;
  const msg = t => { section.querySelector("[aria-live]").textContent = t; };
  const mine = k => !keys || keys.includes(k);
  // Loading and clearing reload the page, so their message is carried across in sessionStorage
  try { msg(sessionStorage.getItem("backup-msg") || ""); sessionStorage.removeItem("backup-msg"); } catch (_) {}
  const reload = t => { try { sessionStorage.setItem("backup-msg", t); } catch (_) {} location.reload(); };

  section.querySelector(".b-save").addEventListener("click", () => {
    const data = {};
    try { for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (mine(k)) data[k] = localStorage.getItem(k); } }
    catch (_) { msg("Couldn’t read your saved data in this browser."); return; }
    if (!Object.keys(data).length) { msg("There’s nothing saved yet."); return; }
    downloadJSON(file, { site: BACKUP_SITE, saved: new Date().toISOString(), data });
    msg(keys ? `Saved your ${what} to a file.` : `Saved everything from every tool (${Object.keys(data).length} items) to a file.`);
  });
  // The tool's own {key: value} entries from a chosen backup file, or nothing after saying what was wrong
  const read = async e => {
    const f = e.target.files[0]; e.target.value = "";
    if (!f) return;
    let entries;
    try {
      const file = JSON.parse(await f.text());
      const data = file && file.site === BACKUP_SITE && file.data && typeof file.data === "object" ? file.data : legacy && legacy(file);
      if (!data) throw 0;
      entries = Object.entries(data).filter(([, v]) => typeof v === "string").map(([k, v]) => [renamed[k] || k, v]).filter(([k]) => mine(k));
    } catch (_) { msg("That file isn’t a backup from this site."); return; }
    if (!entries.length) { msg(`That backup doesn’t have any ${what || "saved data"} in it.`); return; }
    return entries;
  };
  section.querySelector("#saves-file").addEventListener("change", async e => {
    const entries = await read(e);
    if (!entries) return;
    if (!await ask(keys ? `Replace your ${what} with this backup? Save yours to a file first if you might want it back.`
      : "Replace everything saved on every page of this site with this backup? Save your current progress first if you might want it back.", { confirm: "Replace" })) return;
    try {
      if (keys) [...keys, ...Object.keys(renamed)].forEach(store.remove); else localStorage.clear();
      for (const [k, v] of entries) localStorage.setItem(k, v);
    } catch (_) { msg("Couldn’t save the backup in this browser."); return; }
    reload(keys ? `Loaded your ${what} from the file.` : "Loaded your backup into every tool.");
  });
  if (merge) section.querySelector("#saves-import").addEventListener("change", async e => {
    const entries = await read(e);
    if (!entries) return;
    try { msg(merge(Object.fromEntries(entries))); }
    catch (_) { msg("That file isn’t a backup from this site."); }
  });
  if (keys) section.querySelector(".b-clear").addEventListener("click", async () => {
    if (!await ask(`Clear your ${what} on this page? Save it to a file first if you might want it back.`, { confirm: "Clear" })) return;
    keys.forEach(store.remove);
    reload(`Cleared your ${what}.`);
  });
}

(() => {
  const SITE_NAME = "Spibane's Tools for Everything";
  const CREDIT = 'Made by <a href="https://github.com/Spibane">Spibane</a> · <a href="https://ko-fi.com/spibane">Ko-fi</a>';
  const FONT = "https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@400;600;700&display=swap";

  const script = document.currentScript;
  const root = SITE_ROOT;

  // Favicon and font, added to <head> while it's still loading
  document.head.insertAdjacentHTML("beforeend",
    `<link rel="icon" href="${root}shared/logo.svg" type="image/svg+xml">` +
    `<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>` +
    `<link rel="stylesheet" href="${FONT}">`);

  // Theme: a saved choice wins, otherwise the page follows the device setting.
  // Runs before the page draws, so a saved dark theme doesn't flash light first.
  const html = document.documentElement;
  const system = matchMedia("(prefers-color-scheme: dark)");
  const saved = store.get("theme");
  if (saved === "light" || saved === "dark") html.dataset.theme = saved;
  const current = () => html.dataset.theme || (system.matches ? "dark" : "light");

  // Background texture: a faint hex grid like the site banner, laid out at random on each visit.
  // One layout is drawn as an SVG tile per theme, and base.css shows the one for the current theme.
  // Plain cells are left transparent so --bg shows through; only the lighter and darker cells are drawn.
  const hexTile = () => {
    const COLS = 20, ROWS = 12, R = 24, S3 = Math.sqrt(3); // 48px-wide flat-top hexes; an even column count lets the tile wrap
    const TW = COLS * 1.5, TH = ROWS * S3;
    const cells = [];
    for (let c = 0; c < COLS; c++) for (let r = 0; r < ROWS; r++)
      cells.push({ x: c * 1.5, y: r * S3 + (c % 2 ? S3 / 2 : 0), raw: Math.random() });
    // Blend each cell with its six neighbours so light cells clump, then rank them into a few shade levels
    const wrap = (d, span) => { d = Math.abs(d) % span; return Math.min(d, span - d); };
    for (const a of cells) {
      const near = cells.filter(b => b !== a && Math.hypot(wrap(a.x - b.x, TW), wrap(a.y - b.y, TH)) < S3 * 1.05);
      a.s = 0.45 * a.raw + 0.55 * near.reduce((t, b) => t + b.raw, 0) / near.length;
    }
    [...cells].sort((a, b) => a.s - b.s).forEach((cell, i, all) => {
      const p = i / (all.length - 1);
      cell.v = p < 0.15 ? -0.5 : p < 0.58 ? 0 : Math.round((0.25 + 0.75 * (p - 0.58) / 0.42) * 4) / 4;
    });
    const hex = (cx, cy) => "M" + [0, 1, 2, 3, 4, 5].map(i =>
      `${(cx + 1.02 * Math.cos(Math.PI / 3 * i)).toFixed(2)} ${(cy + 1.02 * Math.sin(Math.PI / 3 * i)).toFixed(2)}`).join("L") + "Z";
    // Cells touching an edge are drawn again on the far side so the tile repeats without seams
    const copies = (p, span) => p < 1.1 ? [0, span] : p > span - 1.1 ? [0, -span] : [0];
    const w = Math.round(TW * R), h = Math.round(TH * R);
    // base is the theme's --bg grey (0-255); amp is how far the lightest and darkest cells move from it
    const tile = (base, amp) => {
      const paths = {};
      for (const cell of cells) {
        if (!cell.v) continue;
        const g = Math.round(base + cell.v * amp);
        for (const ox of copies(cell.x, TW)) for (const oy of copies(cell.y, TH))
          paths[g] = (paths[g] || "") + hex(cell.x + ox, cell.y + oy);
      }
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${TW} ${TH}" preserveAspectRatio="none">` +
        Object.entries(paths).map(([g, d]) => `<path fill="rgb(${g},${g},${g})" d="${d}"/>`).join("") + `</svg>`;
      return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
    };
    html.style.setProperty("--hex-light", tile(216, 12));
    html.style.setProperty("--hex-dark", tile(18, 4.8));
    html.style.setProperty("--hex-size", `${w}px ${h}px`);
  };
  hexTile();


  // Every tool on the site, in the hub's own groups. The breadcrumb bar's switcher
  // is built from this, so adding a tool means adding it here and in index.html.
  const TOOLS = [
    ["Pick at random", [["randomizer/", "Randomizer"], ["dice/", "Dice Roller"], ["bingo/", "Bingo Cards"],
                        ["names/", "Character Names", "Beta"]]],
    ["Run a session", [["turns/", "Turn Tracker"], ["score/", "Score Pad"], ["brackets/", "Brackets"]]],
    ["Keep track", [["tasks/", "Tasks and Events"], ["odds/", "Drop Odds"]]],
    ["Games", [["games/aniimo/", "Aniimo"], ["games/dbd/", "Dead by Daylight"],
               ["games/ffxiv/", "Final Fantasy XIV"], ["games/marvel-rivals/", "Marvel Rivals"],
               ["games/outlast-trials/", "The Outlast Trials"]]],
  ];

  // The breadcrumb bar: where you are, and a way to any other tool. It is built from
  // the page's own back links, so ancestors stay right without a per-page list, and it
  // replaces them in place. The <a class="back"> markup stays in the HTML as the
  // fallback for when this script doesn't run.
  const crumbBar = () => {
    const backs = [...document.querySelectorAll("main .back")];
    const main = document.querySelector("main");
    if (!backs.length || !main) return;

    const trail = backs.map(a => ({ href: a.getAttribute("href"), name: a.textContent.replace(/^Back to /, "") }));
    trail[0].name = "Tools"; // the first back link always points at the hub
    const h1 = document.querySelector("h1");
    // Without the tag: the crumb is the page's name, not "Character Names Beta"
    const title = h1 && h1.cloneNode(true);
    if (title) title.querySelectorAll(".tag").forEach(t => t.remove());
    const here = (title ? title.textContent : document.title).trim();

    const path = location.pathname;
    // A third item on a TOOLS entry is a tag to show beside its name, like Beta
    const entry = ([href, name, tag]) => {
      const to = new URL(href, root).pathname;
      const label = name + (tag ? ` <span class="tag">${tag}</span>` : "");
      return path.startsWith(to)
        ? `<li><span aria-current="page">${label}</span></li>`
        : `<li><a href="${to}">${label}</a></li>`;
    };

    const nav = document.createElement("nav");
    nav.className = "crumbs";
    nav.setAttribute("aria-label", "Breadcrumb");
    nav.innerHTML =
      `<img class="mark" src="${root}shared/logo.svg" alt="" width="22" height="22">` +
      `<ol>${trail.map(c => `<li><a href="${c.href}"></a></li>`).join("")}<li><span aria-current="page"></span></li></ol>` +
      `<button type="button" class="switch" aria-expanded="false">Switch tool</button>` +
      `<div class="switcher" hidden>${TOOLS.map(([group, items]) =>
        `<section><h2>${group}</h2><ul>${items.map(entry).join("")}</ul></section>`).join("")}</div>`;
    // Names out of the page go in as text, not markup
    nav.querySelectorAll("ol a").forEach((a, i) => { a.textContent = trail[i].name; });
    nav.querySelector('ol [aria-current="page"]').textContent = here;

    const toggle = nav.querySelector(".switch");
    const panel = nav.querySelector(".switcher");
    const open = on => { panel.hidden = !on; toggle.setAttribute("aria-expanded", String(on)); };
    toggle.addEventListener("click", () => open(panel.hidden));
    document.addEventListener("click", e => { if (!nav.contains(e.target)) open(false); });
    document.addEventListener("keydown", e => {
      if (e.key === "Escape" && !panel.hidden) { open(false); toggle.focus(); }
    });

    (backs[0].closest(".backs") || backs[0]).replaceWith(nav);
    backs.forEach(a => a.remove());
  };

  const home = `<a href="${root}"><img src="${root}shared/logo.svg" alt="" width="32" height="32">${SITE_NAME}</a>`;

  document.addEventListener("DOMContentLoaded", () => {
    const footer = document.createElement("footer");
    footer.className = "site-footer";
    footer.innerHTML = (script.hasAttribute("data-credit-only") ? "" : home) +
      `<p class="muted">${CREDIT}</p><button type="button" class="theme-toggle"></button>`;
    const toggle = footer.querySelector(".theme-toggle");
    const label = () => { toggle.textContent = current() === "dark" ? "Light mode" : "Dark mode"; };
    toggle.addEventListener("click", () => {
      html.dataset.theme = current() === "dark" ? "light" : "dark";
      store.set("theme", html.dataset.theme);
      label();
    });
    system.addEventListener("change", label);
    label();
    document.body.append(footer);

    crumbBar();

    // To the top: shows once the page is scrolled down a little
    const top = document.createElement("button");
    top.type = "button";
    top.className = "to-top";
    top.textContent = "↑";
    top.setAttribute("aria-label", "To the top");
    top.title = "To the top";
    top.addEventListener("click", () => scrollTo({ top: 0, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" }));
    const shown = () => top.classList.toggle("shown", scrollY > 200);
    addEventListener("scroll", shown, { passive: true });
    shown();
    document.body.append(top);

    // Settings sections start closed, then stay how you left them on each page
    document.querySelectorAll("details.settings").forEach((d, i) => {
      const key = `settings-open:${location.pathname}:${i}`;
      d.open = store.get(key) === "1";
      d.addEventListener("toggle", () => store.set(key, d.open ? "1" : "0"));
    });
  });
})();
