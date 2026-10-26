// Shared page extras: the light/dark theme, the hex background texture, the site footer and the save/load-everything backup. Edit the footer text and links here.
// Pages include it in <head>, right after base.css: <script src="(path to)/shared/site.js"></script>
// Add data-credit-only to the script tag to leave out the home link (used on the hub page).
(() => {
  const SITE_NAME = "Spibane's Tools for Everything";
  const CREDIT = 'Made by <a href="https://github.com/Spibane">Spibane</a>';

  // Theme: a saved choice wins, otherwise the page follows the device setting.
  // Runs before the page draws, so a saved dark theme doesn't flash light first.
  const html = document.documentElement;
  const system = matchMedia("(prefers-color-scheme: dark)");
  let saved = null;
  try { saved = localStorage.getItem("theme"); } catch (_) {}
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

  // Work out the site root from this script's own address, so it works at any depth
  const script = document.currentScript;
  const root = new URL("../", script.src);
  const home = `<a href="${root}"><img src="${root}shared/logo.svg" alt="" width="32" height="32">${SITE_NAME}</a>`;

  // Backup: every page saves to this site's localStorage, so one file holds everything.
  // The file is {site, saved, data: {key: value}}; loading it replaces all saved data.
  const BACKUP_SITE = "spibane-tools";
  const backup = () => {
    const data = {};
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      data[k] = localStorage.getItem(k);
    }
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify({ site: BACKUP_SITE, saved: new Date().toISOString(), data }, null, 1)], { type: "application/json" }));
    a.download = "spibane-tools-backup.json"; a.click(); URL.revokeObjectURL(a.href);
    return Object.keys(data).length;
  };
  const restore = async file => {
    const { site, data } = JSON.parse(await file.text());
    if (site !== BACKUP_SITE || !data || typeof data !== "object") throw 0;
    const entries = Object.entries(data).filter(([, v]) => typeof v === "string");
    localStorage.clear();
    for (const [k, v] of entries) localStorage.setItem(k, v);
  };

  document.addEventListener("DOMContentLoaded", () => {
    const footer = document.createElement("footer");
    footer.className = "site-footer";
    footer.innerHTML = `<div class="footer-tools">` +
      `<button type="button" class="backup-save">Save all progress</button>` +
      `<button type="button" class="backup-load">Load all progress</button>` +
      `<input type="file" accept=".json,application/json" hidden></div>` +
      (script.hasAttribute("data-credit-only") ? "" : home) +
      `<p class="muted">${CREDIT}</p><button type="button" class="theme-toggle"></button>` +
      `<p class="muted backup-msg" aria-live="polite"></p>`;
    const msg = footer.querySelector(".backup-msg");
    const picker = footer.querySelector("input[type=file]");
    // A load reloads the page, so its message is carried across in sessionStorage
    try { msg.textContent = sessionStorage.getItem("backup-msg") || ""; sessionStorage.removeItem("backup-msg"); } catch (_) {}
    footer.querySelector(".backup-save").addEventListener("click", () => {
      try { msg.textContent = `Saved everything from every page (${backup()} items) to a file.`; }
      catch (_) { msg.textContent = "Couldn’t read your saved data in this browser."; }
    });
    footer.querySelector(".backup-load").addEventListener("click", () => picker.click());
    picker.addEventListener("change", async () => {
      const file = picker.files[0]; picker.value = "";
      if (!file) return;
      if (!confirm("Replace everything saved on every page of this site with this backup? Save your current progress first if you might want it back.")) return;
      try {
        await restore(file);
        try { sessionStorage.setItem("backup-msg", "Loaded your backup on every page."); } catch (_) {}
        location.reload();
      } catch (_) { msg.textContent = "That file isn’t a backup from this site."; }
    });
    const toggle = footer.querySelector(".theme-toggle");
    const label = () => { toggle.textContent = current() === "dark" ? "Light mode" : "Dark mode"; };
    toggle.addEventListener("click", () => {
      html.dataset.theme = current() === "dark" ? "light" : "dark";
      try { localStorage.setItem("theme", html.dataset.theme); } catch (_) {}
      label();
    });
    system.addEventListener("change", label);
    label();
    document.body.append(footer);
  });
})();
