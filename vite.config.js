import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  base: "/",
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        // Фото страницы
        fashion: resolve(__dirname, "pages/photos/fashion.html"),
        ecommerce: resolve(__dirname, "pages/photos/e-commerce.html"),
        events: resolve(__dirname, "pages/photos/events.html"),
        magazine: resolve(__dirname, "pages/photos/magazine.html"),
        reportage: resolve(__dirname, "pages/photos/reportage.html"),
        personal: resolve(__dirname, "pages/photos/personal.html"),
        interior: resolve(__dirname, "pages/photos/interior.html"),
        food: resolve(__dirname, "pages/photos/food.html"),
        product: resolve(__dirname, "pages/photos/product.html"),
        bts: resolve(__dirname, "pages/photos/bts.html"),
        // Видео страница
        videos: resolve(__dirname, "pages/videos/videos.html"),
      },
    },
  },
});
