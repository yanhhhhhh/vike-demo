import vercel from "vite-plugin-vercel";
import react from "@vitejs/plugin-react";
import { ConfigEnv, defineConfig, loadEnv } from "vite";
import vike from "vike/plugin";
import path from "path";

export default defineConfig(({ mode }: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd());

  const baseUrl = env.VITE_API_BASE_URL;
  console.log({ env, baseUrl });
  return {
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
    server: {
      proxy: {
        [env.VITE_APP_BASE_API]: {
          // target: 'https://hero.hithium.com:8002/iot-api',
          target: baseUrl,
          changeOrigin: true,

          configure(proxy, options) {
            proxy.on("proxyRes", (proxyRes, req, res) => {
              proxyRes.headers["x-real-url"] = options.target + req.url;
            });
          },
        },
        "/dev-api": {
          // target: 'https://hero.hithium.com:8002/iot-api',
          target: baseUrl,
          changeOrigin: true,
          rewrite: (p) => p.replace(/^\/dev-api/, ""),
          configure(proxy, options) {
            proxy.on("proxyRes", (proxyRes, req, res) => {
              proxyRes.headers["x-real-url"] = options.target + req.url;
            });
          },
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
  };
});
