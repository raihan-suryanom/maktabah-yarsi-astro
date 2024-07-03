import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import pwa from "@vite-pwa/astro";
import icon from "astro-icon";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  output: "hybrid",
  adapter: vercel(),
  prefetch: true,
  integrations: [
    react(),
    pwa({
      base: "/",
      scope: "/",
      workbox: {
        navigateFallback: "/404",
        globPatterns: ["**/*.{css,js,html,svg,ico,woff2}"],
      },
      includeAssets: ["favicon.svg", "favicon.ico", "lpmq.woff2"],
      registerType: "autoUpdate",
      manifest: {
        name: "Maktabah YARSI | Perpustakaan Islam Digital Berbahasa Indonesia",
        short_name: "Maktabah YARSI",
        description:
          "Maktabah YARSI مكتبة يرسي merupakan aplikasi perpustakaan islam digital berbahasa Indonesia yang memungkinkan pengguna untuk mencari topik atau permasalah berdasarkan kata kunci seperti iman, sabar, shalat dan riba.",
        lang: "id",
        theme_color: "#10b981",
      },
      pwaAssets: {
        config: true,
      },
      experimental: {
        directoryAndTrailingSlashHandler: true,
      },
    }),
    tailwind(),
    icon({
      include: {
        lucide: ["search"],
      },
    }),
  ],
});
