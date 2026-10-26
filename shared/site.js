// Shared page extras: the light/dark theme, the site footer and the save/load-everything backup. Edit the footer text and links here.
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
