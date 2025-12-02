import "../stylesheets/reset.css";
import "../stylesheets/vars.css";
import "../stylesheets/fonts.css";
import "../stylesheets/typekit.css";
import "../stylesheets/style.css";
import "../stylesheets/responsive.css";

import React from "react";
import { createRoot } from "react-dom/client";
import ParallaxSection from "../react/parallax.jsx";
import Navigation from "../react/Navigation.jsx";

import { trail } from "./trail.js";
import { carousel } from "./carousel-web-animations.js";
import { cursor } from "./cursor.js";
import { navColor } from "./navColor.js";
import { marqueeFooter } from "./marqueeFooter.js";
import { reviewsCarousel } from "./reviewsCarousel.js";
import { burgerMenu } from "./burgerMenu.js";

// Инициализируем скрипты, которые не зависят от навигации
trail();
carousel();
cursor();
marqueeFooter();
reviewsCarousel();

export function mountParallax() {
  const container = document.getElementById("parallax-mount-point");
  if (container) {
    const root = createRoot(container);
    root.render(<ParallaxSection />);
  }
}

export function mountNavigation() {
  const container = document.getElementById("navigation-mount-point");
  if (container) {
    const root = createRoot(container);
    root.render(<Navigation />);

    let scriptsInitialized = false;

    const initializeScripts = () => {
      if (scriptsInitialized) return;

      const navBG = document.querySelector(".navBG");
      const mainNav = document.querySelector(
        "nav:not(.navBG):not(.navTransparent)"
      );
      const burgerIcon = document.querySelector(".burgerIcon");
      const burgerMenuElement = document.querySelector(".burgerMenu");
      const photosBtn = document.querySelector("#photosBurgerDropDownBtn");

      console.log("🔍 Elements check:", {
        navBG: !!navBG,
        mainNav: !!mainNav,
        burgerIcon: !!burgerIcon,
        burgerMenu: !!burgerMenuElement,
        photosBtn: !!photosBtn,
      });

      const hasNavElements =
        navBG && mainNav && burgerIcon && burgerMenuElement && photosBtn;

      if (hasNavElements) {
        console.log("🔧 Initializing navigation scripts...");
        navColor();
        burgerMenu();
        console.log("✅ Navigation scripts initialized");
        scriptsInitialized = true;
        return true;
      }
      return false;
    };

    // Немедленная попытка инициализации
    if (initializeScripts()) {
      return;
    }

    // Если не получилось сразу, пробуем каждые 100ms
    let attempts = 0;
    const maxAttempts = 50; // 5 секунд максимум

    const retryInterval = setInterval(() => {
      attempts++;
      if (initializeScripts() || attempts >= maxAttempts) {
        clearInterval(retryInterval);
        if (attempts >= maxAttempts) {
          console.warn(
            "⚠️ Failed to initialize navigation scripts after maximum attempts"
          );
        }
      }
    }, 100);

    // Используем MutationObserver как дополнительную проверку
    const observer = new MutationObserver((mutations) => {
      if (!scriptsInitialized) {
        initializeScripts();
      }
    });

    observer.observe(container, {
      childList: true,
      subtree: true,
    });

    // Отключаем observer через 5 секунд
    setTimeout(() => {
      observer.disconnect();
    }, 5000);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("🚀 DOM loaded, mounting parallax...");
  mountParallax();
  mountNavigation();
});
