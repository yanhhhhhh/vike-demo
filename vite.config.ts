import vercel from "vite-plugin-vercel";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import vike from "vike/plugin";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@assets": path.resolve(__dirname, "assets"),
    },
  },
  plugins: [
    vike({
      prerender: true,
    }),
    react({}),
    // vercel(),
  ],
});
