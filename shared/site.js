// Shared page extras: the light/dark theme and the site footer. Edit the footer text and links here.
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

  document.addEventListener("DOMContentLoaded", () => {
    const footer = document.createElement("footer");
    footer.className = "site-footer";
    footer.innerHTML = (script.hasAttribute("data-credit-only") ? "" : home) +
      `<p class="muted">${CREDIT}</p><button type="button" class="theme-toggle"></button>`;
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
