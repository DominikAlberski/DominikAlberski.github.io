// Mobile menu: swap the CSS-only checkbox fallback for an ARIA disclosure button.
(function () {
  var nav = document.querySelector(".main-nav");
  if (!nav) return;
  var toggle = nav.querySelector(".menu-toggle");
  var checkbox = nav.querySelector(".mobile-menu-check");

  function setOpen(open) {
    toggle.setAttribute("aria-expanded", String(open));
  }

  // The user may have opened the fallback menu before this script ran.
  setOpen(checkbox.checked);
  checkbox.checked = false;
  nav.classList.add("js-menu");

  toggle.addEventListener("click", function () {
    setOpen(toggle.getAttribute("aria-expanded") !== "true");
  });
  nav.querySelector("#main-menu").addEventListener("click", function (event) {
    if (event.target.closest("a")) setOpen(false);
  });
  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape" || toggle.getAttribute("aria-expanded") !== "true") return;
    setOpen(false);
    toggle.focus();
  });
})();
