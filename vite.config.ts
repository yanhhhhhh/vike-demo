import vercel from "vite-plugin-vercel";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import vike from "vike/plugin";
import path from "path";
import { VitePWAConfig, VitePWA } from "./plugins/pwa";
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        additionalData: `@import "${path.resolve(__dirname, "src/assets/styles/variables.less")}";`,
      },
    },
  },
  plugins: [
    vike({
      prerender: true,
    }),
    react({}),
    // VitePWA(VitePWAConfig),
    // vercel(),
  ],
});
