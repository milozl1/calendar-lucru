/* -------------------------------------------------------
  Atelier Élan — Minimal JS
  - Mobile nav toggle
  - Testimonials slider
  - Dynamic year
  - Subtle header elevation on scroll
  - Lightweight click tracking hooks (extendable)
-------------------------------------------------------- */

(function () {
  const header = document.querySelector("[data-elevate]");
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector("#site-nav");

  // Year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Header elevation on scroll (premium feel)
  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("is-elevated", window.scrollY > 6);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile nav