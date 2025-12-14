/* -------------------------------------------------------
  Atelier Élan — Minimal JS
  - Mobile nav toggle
  - Testimonials slider
  - Dynamic year
  - Subtle header elevation on scroll
  - Lightweight click tracking hooks (extendable)
-------------------------------------------------------- */

(function () {
  // Page loader
  const pageLoader = document.getElementById("pageLoader");
  const hideLoader = () => {
    if (pageLoader) {
      pageLoader.classList.add("is-hidden");
      setTimeout(() => {
        pageLoader.style.display = "none";
      }, 500);
    }
  };

  // Hide loader when page is fully loaded
  if (document.readyState === "complete") {
    setTimeout(hideLoader, 300);
  } else {
    window.addEventListener("load", () => {
      setTimeout(hideLoader, 300);
    });
  }

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

  // Mobile nav toggle
  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const isOpen = header.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", isOpen);
      nav.setAttribute("aria-hidden", !isOpen);
    });

    // Close nav when clicking a link
    const navLinks = nav.querySelectorAll("a");
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        header.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        nav.setAttribute("aria-hidden", "true");
      });
    });

    // Close nav when clicking outside
    document.addEventListener("click", (e) => {
      if (!header.contains(e.target) && header.classList.contains("is-open")) {
        header.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        nav.setAttribute("aria-hidden", "true");
      }
    });
  }

  // Testimonials slider
  const slider = document.querySelector("[data-slider]");
  if (slider) {
    const quotes = slider.querySelectorAll(".quote");
    const dotsContainer = slider.querySelector("[data-dots]");
    const prevBtn = slider.querySelector("[data-prev]");
    const nextBtn = slider.querySelector("[data-next]");

    let currentIndex = 0;

    // Create dots
    quotes.forEach((_, index) => {
      const dot = document.createElement("span");
      dot.className = "dot-pill";
      if (index === 0) dot.classList.add("is-active");
      dot.addEventListener("click", () => goToSlide(index));
      dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll(".dot-pill");

    function goToSlide(index) {
      quotes[currentIndex].classList.remove("is-active");
      dots[currentIndex].classList.remove("is-active");

      currentIndex = index;

      quotes[currentIndex].classList.add("is-active");
      dots[currentIndex].classList.add("is-active");
    }

    function nextSlide() {
      const next = (currentIndex + 1) % quotes.length;
      goToSlide(next);
    }

    function prevSlide() {
      const prev = (currentIndex - 1 + quotes.length) % quotes.length;
      goToSlide(prev);
    }

    if (prevBtn) prevBtn.addEventListener("click", prevSlide);
    if (nextBtn) nextBtn.addEventListener("click", nextSlide);

    // Auto-advance every 6 seconds
    setInterval(nextSlide, 6000);

    // Keyboard navigation
    slider.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    });
  }

  // Enhanced smooth scrolling with offset for fixed header
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href === "#" || href === "#top") return;

      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = target.offsetTop - headerHeight - 20;
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  }, observerOptions);

  // Observe sections and cards for animations
  document.querySelectorAll(".section, .card, .quote, .hero-card, .mini-card").forEach((el) => {
    el.classList.add("fade-in-element");
    observer.observe(el);
  });

  // Track CTA clicks (lightweight analytics hook)
  document.querySelectorAll("[data-track]").forEach((el) => {
    el.addEventListener("click", function () {
      const trackId = this.getAttribute("data-track");
      // Hook for analytics: console.log("CTA clicked:", trackId);
      // Replace with actual analytics code (Google Analytics, Facebook Pixel, etc.)
    });
  });

  // Floating CTA hide/show on scroll
  const floatingCta = document.querySelector(".floating-cta");
  if (floatingCta) {
    let lastScrollY = window.scrollY;
    const toggleFloatingCta = () => {
      const currentScrollY = window.scrollY;
      // Show when scrolling up or at top, hide when scrolling down
      if (currentScrollY < lastScrollY || currentScrollY < 300) {
        floatingCta.style.transform = "translateY(0)";
      } else {
        floatingCta.style.transform = "translateY(120%)";
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", toggleFloatingCta, { passive: true });
  }

  // Subtle parallax effect for hero section
  const heroVisual = document.querySelector(".hero-visual");
  if (heroVisual && window.matchMedia("(prefers-reduced-motion: no-preference)").matches) {
    const handleParallax = () => {
      const scrolled = window.scrollY;
      const rate = scrolled * 0.3;
      if (scrolled < window.innerHeight) {
        heroVisual.style.transform = `translateY(${rate}px)`;
      }
    };
    window.addEventListener("scroll", handleParallax, { passive: true });
  }

  // Add subtle hover effect to hero trust items
  const trustItems = document.querySelectorAll(".hero-trust li");
  trustItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.transform = "translateX(4px)";
    });
    item.addEventListener("mouseleave", function () {
      this.style.transform = "translateX(0)";
    });
  });

  // Preload critical images
  const preloadImages = () => {
    const imageUrls = [
      // Add your actual image URLs here when available
      // "../img/hero.jpg",
      // "../img/portrait.jpg"
    ];
    imageUrls.forEach((url) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = url;
      document.head.appendChild(link);
    });
  };

  // Initialize on DOM ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", preloadImages);
  } else {
    preloadImages();
  }
})();