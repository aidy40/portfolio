
(() => {
  "use strict";

  // Portfolio settings
  const SETTINGS = {
    themeKey: "portfolio-theme",
    darkClass: "dark-mode"
  };

  // Page elements
  const elements = {
    body: document.body,
    themeButton: document.querySelector("#theme-toggle"),
    themeText: document.querySelector("#theme-label"),
    themeSymbol: document.querySelector("#theme-icon"),
    year: document.querySelector("#current-year")
  };

  // Get the preferred theme
  function getPreferredTheme() {
    try {
      const storedTheme = localStorage.getItem(SETTINGS.themeKey);

      if (storedTheme === "light" || storedTheme === "dark") {
        return storedTheme;
      }
    } catch (error) {
      console.info("Using the system theme instead.");
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  // Update the page theme
  function changeTheme(theme, remember = true) {
    const darkMode = theme === "dark";

    elements.body.classList.toggle(SETTINGS.darkClass, darkMode);

    if (elements.themeText) {
      elements.themeText.textContent = darkMode
        ? "Light mode"
        : "Dark mode";
    }

    if (elements.themeSymbol) {
      elements.themeSymbol.textContent = darkMode ? "☀" : "◐";
    }

    if (elements.themeButton) {
      elements.themeButton.setAttribute("aria-pressed", String(darkMode));
      elements.themeButton.setAttribute(
        "aria-label",
        darkMode ? "Switch to light mode" : "Switch to dark mode"
      );
    }

    if (remember) {
      try {
        localStorage.setItem(SETTINGS.themeKey, theme);
      } catch (error) {
        console.info("Theme preference could not be saved.");
      }
    }
  }

  // Set up the theme button
  function initializeTheme() {
    changeTheme(getPreferredTheme(), false);

    if (!elements.themeButton) return;

    elements.themeButton.addEventListener("click", () => {
      const currentlyDark = elements.body.classList.contains(
        SETTINGS.darkClass
      );

      changeTheme(currentlyDark ? "light" : "dark");
    });
  }

  // Display the current year in the footer
  function initializeFooter() {
    if (elements.year) {
      elements.year.textContent = String(new Date().getFullYear());
    }
  }

  // Start the portfolio
  function initializePortfolio() {
    initializeTheme();
    initializeFooter();
  }

  document.addEventListener("DOMContentLoaded", initializePortfolio);
})();
