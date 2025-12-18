// script.js
document.addEventListener("DOMContentLoaded", () => {
  const menuItems = document.querySelectorAll(".menu-item.has-submenu");

  const isTouchDevice = () =>
    "ontouchstart" in window || navigator.maxTouchPoints > 0;

  menuItems.forEach((item) => {
    const submenu = item.querySelector(".submenu");
    if (!submenu) return;

    const trigger = item.querySelector("a");
    if (trigger) {
      trigger.setAttribute("aria-haspopup", "true");
      trigger.setAttribute("aria-expanded", "false");
    }

    // Desktop : ouverture au survol
    if (!isTouchDevice()) {
      item.addEventListener("mouseenter", () => {
        submenu.classList.add("submenu-open");
        item.classList.add("menu-item-open");
        trigger && trigger.setAttribute("aria-expanded", "true");
      });
      item.addEventListener("mouseleave", () => {
        submenu.classList.remove("submenu-open");
        item.classList.remove("menu-item-open");
        trigger && trigger.setAttribute("aria-expanded", "false");
      });
    }

    // Mobile / tablette : ouverture au clic
    const clickTarget = trigger || item;
    clickTarget.addEventListener("click", (e) => {
      if (!submenu.classList.contains("submenu-open")) {
        // Empêche la navigation si on veut juste ouvrir le sous-menu
        e.preventDefault();
      }
      const opened = submenu.classList.toggle("submenu-open");
      item.classList.toggle("menu-item-open");
      trigger && trigger.setAttribute("aria-expanded", String(opened));
    });
  });

  // Burger
  const burger = document.querySelector(".nav-toggle");
  const menu = document.querySelector(".menu");
  if (burger && menu) {
    burger.addEventListener("click", () => {
      const isOpen = burger.classList.toggle("nav-toggle-open");
      menu.classList.toggle("menu-open");
      document.body.classList.toggle("no-scroll");
      burger.setAttribute("aria-expanded", String(isOpen));
    });
  }
});
