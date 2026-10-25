// Site footer, added to every project page. Edit the text and links here.
// Pages include it with: <script src="(path to)/shared/footer.js" defer></script>
// Add data-credit-only to the script tag to leave out the home link (used on the hub page).
(() => {
  const SITE_NAME = "Tools for everything";
  const CREDIT = 'Made by <a href="https://github.com/Spibane">Spibane</a>';

  // Work out the site root from this script's own address, so it works at any depth
  const script = document.currentScript;
  const root = new URL("../", script.src);
  const home = `<a href="${root}"><img src="${root}shared/logo.svg" alt="" width="32" height="32">${SITE_NAME}</a>`;
  const footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.innerHTML = (script.hasAttribute("data-credit-only") ? "" : home) + `<p class="muted">${CREDIT}</p>`;
  document.body.append(footer);
})();
