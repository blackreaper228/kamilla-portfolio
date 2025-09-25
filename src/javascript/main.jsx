import "../stylesheets/reset.css";
import "../stylesheets/vars.css";
import "../stylesheets/fonts.css";
import "../stylesheets/typekit.css";
import "../stylesheets/style.css";

import React from "react";
import { createRoot } from "react-dom/client";
import ParallaxSection from "../react/parallax.jsx";

import { trail } from "./trail.js";
import { carousel } from "./carousel-web-animations.js";
import { cursor } from "./cursor.js";
import { navColor } from "./navColor.js";
import { marqueeFooter } from "./marqueeFooter.js";
import { reviewsCarousel } from "./reviewsCarousel.js";

trail();
carousel();
cursor();
navColor();
marqueeFooter();
reviewsCarousel();

export function mountParallax() {
  const container = document.getElementById("parallax-mount-point");
  if (container) {
    const root = createRoot(container);
    root.render(<ParallaxSection />);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("🚀 DOM loaded, mounting parallax...");
  mountParallax();
});
