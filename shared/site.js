// Shared page extras: the font and favicon, the light/dark theme, the hex background texture, and the site footer.
// Edit the footer text and links here. It also defines small helpers every page's own script can use (below).
// Pages include it in <head>, right after base.css: <script src="(path to)/shared/site.js"></script>
// Add data-credit-only to the script tag to leave out the home link (used on the hub page).

// Helpers for page scripts
const $ = id => document.getElementById(id);
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const pick = a => a[Math.floor(Math.random() * a.length)];
// localStorage, but never throws (it can when the browser blocks storage).
// get/set keep plain strings; load/save keep JSON, and load gives back fallback when nothing is saved.
const store = {
  get(key) { try { return localStorage.getItem(key); } catch (_) { return null; } },
  set(key, value) { try { localStorage.setItem(key, value); } catch (_) {} },
  load(key, fallback) { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch (_) { return fallback; } },
  save(key, value) { store.set(key, JSON.stringify(value)); },
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
//   title, intro, save, load: override the heading, the text under it and the button labels
// Loading or clearing reloads the page, so it starts fresh from the new data.
const BACKUP_SITE = "spibane-tools";
function backups({ what, keys, file, renamed = {}, legacy, title, intro, save, load }) {
  const section = document.querySelector(".saves") || document.querySelector("main").appendChild(document.createElement("section"));
  section.className = "saves";
  section.setAttribute("aria-labelledby", "saves-h");
  section.innerHTML = `<h2 id="saves-h">${esc(title || "Back up your " + what)}</h2>` +
    `<p class="muted">${intro || `This page saves to this browser only. Save it to a file to move it to another device or keep it safe, or back up every tool at once from the <a href="${SITE_ROOT}">main page</a>.`}</p>` +
    `<div class="save-row"><button type="button" class="b-save">${esc(save || "Save " + what + " to a file")}</button>` +
    `<input type="file" id="saves-file" class="vh" accept=".json,application/json"><label class="button" for="saves-file">${esc(load || "Load " + what + " from a file")}</label>` +
    (keys ? `<button type="button" class="b-clear">${esc("Clear " + what)}</button>` : "") + `</div>` +
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
  section.querySelector("#saves-file").addEventListener("change", async e => {
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
    if (!confirm(keys ? `Replace your ${what} with this backup? Save yours to a file first if you might want it back.`
      : "Replace everything saved on every page of this site with this backup? Save your current progress first if you might want it back.")) return;
    try {
      if (keys) [...keys, ...Object.keys(renamed)].forEach(store.remove); else localStorage.clear();
      for (const [k, v] of entries) localStorage.setItem(k, v);
    } catch (_) { msg("Couldn’t save the backup in this browser."); return; }
    reload(keys ? `Loaded your ${what} from the file.` : "Loaded your backup into every tool.");
  });
  if (keys) section.querySelector(".b-clear").addEventListener("click", () => {
    if (!confirm(`Clear your ${what} on this page? Save it to a file first if you might want it back.`)) return;
    keys.forEach(store.remove);
    reload(`Cleared your ${what}.`);
  });
}

(() => {
  const SITE_NAME = "Spibane's Tools for Everything";
  const CREDIT = 'Made by <a href="https://github.com/Spibane">Spibane</a>';
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
  });
})();
