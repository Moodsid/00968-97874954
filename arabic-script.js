/**
 * Professional CV - Arabic Version Script
 * Handles animations, interactions, and theme switching
 */

document.addEventListener("DOMContentLoaded", () => {
  setupPage();
});

/**
 * Main setup function that initializes all page functionality
 */
function setupPage() {
  setupNavigation();
  setupAnimations();
  setupThemeSwitching();
  setupControlNavbar();
}

/**
 * Sets up mobile and desktop navigation
 */
function setupNavigation() {
  // Mobile Navigation Toggle
  const mobileNavToggle = document.querySelector(".mobile-nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (mobileNavToggle && navLinks) {
    mobileNavToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        if (navLinks.classList.contains("active")) {
          navLinks.classList.remove("active");
        }
      });
    });
  }

  // Smooth Scrolling for Navigation Links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));

      if (target) {
        const navHeight = document.querySelector("nav")
          ? document.querySelector("nav").offsetHeight
          : 0;
        const offset = navHeight;

        window.scrollTo({
          top: target.offsetTop - offset,
          behavior: "smooth",
        });
      }
    });
  });

  // Back to Top Button
  const backToTopBtn = document.getElementById("backToTopBtn");
  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
}

/**
 * Sets up animations using IntersectionObserver
 */
function setupAnimations() {
  // Timeline animations
  const timelineObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.25 }
  );

  document.querySelectorAll(".timeline-item").forEach((item) => {
    timelineObserver.observe(item);
  });

  // Skill bar animations
  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const skillBars = entry.target.querySelectorAll(".skill-progress");
          skillBars.forEach((bar) => {
            const width = bar.getAttribute("data-width") + "%";
            setTimeout(() => {
              bar.style.width = width;
            }, 100);
          });
        }
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll(".skill-category").forEach((category) => {
    skillObserver.observe(category);
  });
}

/**
 * Sets up theme switching functionality
 */
function setupThemeSwitching() {
  const darkThemeBtn = document.getElementById("darkThemeBtn");
  const lightThemeBtn = document.getElementById("lightThemeBtn");
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

  // Check if user has previously set a theme preference
  const savedTheme = localStorage.getItem("theme");

  // Initialize theme based on saved preference or system preference
  if (savedTheme === "dark" || (!savedTheme && prefersDarkScheme.matches)) {
    document.body.classList.add("dark-theme");
    setActiveTheme(true);
  } else {
    document.body.classList.remove("dark-theme");
    setActiveTheme(false);
  }

  // Dark theme button
  darkThemeBtn.addEventListener("click", () => {
    document.body.classList.add("dark-theme");
    localStorage.setItem("theme", "dark");
    setActiveTheme(true);
  });

  // Light theme button
  lightThemeBtn.addEventListener("click", () => {
    document.body.classList.remove("dark-theme");
    localStorage.setItem("theme", "light");
    setActiveTheme(false);
  });

  // Helper function to set active theme button
  function setActiveTheme(isDark) {
    if (isDark) {
      darkThemeBtn.classList.add("active");
      lightThemeBtn.classList.remove("active");
    } else {
      lightThemeBtn.classList.add("active");
      darkThemeBtn.classList.remove("active");
    }
  }
}

/**
 * Sets up the control navbar responsiveness
 */
function setupControlNavbar() {
  const controlNavbar = document.querySelector(".control-navbar");

  // Toggle horizontal layout for specific viewport sizes
  const checkNavbarLayout = () => {
    if (window.innerWidth > 769) {
      controlNavbar.classList.add("horizontal");
    } else {
      controlNavbar.classList.remove("horizontal");
    }
  };

  // Initial check
  checkNavbarLayout();

  // Check on resize
  window.addEventListener("resize", checkNavbarLayout);
}
/**
 * If there are any JavaScript-based animations happening for the control navbar,
 * you might want to modify the setupControlNavbar function like this:
 */
function setupControlNavbar() {
  const controlNavbar = document.querySelector(".control-navbar");

  // Set horizontal layout directly based on current window width
  // without animations
  if (window.innerWidth > 768) {
    controlNavbar.classList.add("horizontal");
  } else {
    controlNavbar.classList.remove("horizontal");
  }

  // Add event listener for window resize
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      controlNavbar.classList.add("horizontal");
    } else {
      controlNavbar.classList.remove("horizontal");
    }
  });
}
