import { VitePWAOptions } from "vite-plugin-pwa";
export { VitePWA } from "vite-plugin-pwa";

export const VitePWAConfig: Partial<VitePWAOptions> = {
  mode: "production",
  registerType: "autoUpdate",

  // injectRegister: 'inline',
  // strategies: 'injectManifest',
  // srcDir: './service-worker',
  // filename: 'sw.js',

  manifest: {
    name: "HiTHIUM HeroEE",
    short_name: "HiTHIUM HeroEE",
    theme_color: "#242424",
    icons: [
      {
        src: "/intro/images/logo/logo36.png",
        sizes: "36x36",
        type: "image/png",
      },
      {
        src: "/intro/images/logo/logo48.png",
        sizes: "48x48",
        type: "image/png",
      },
      {
        src: "/intro/images/logo/logo72.png",
        sizes: "72x72",
        type: "image/png",
      },
      {
        src: "/intro/images/logo/logo96.png",
        sizes: "96x96",
        type: "image/png",
      },
      {
        src: "/intro/images/logo/logo144.png",
        sizes: "144x144",
        type: "image/png",
      },
      {
        src: "/intro/images/logo/logo192.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
  },
  workbox: {
    cleanupOutdatedCaches: true,
    maximumFileSizeToCacheInBytes: 4 * 1024 * 1024, //添加此项配置，增加需要缓存的最大文件大小
    globPatterns: ["**/*.{wasm,html,css,png,jpg,svg,json}"],

    runtimeCaching: [
      {
        urlPattern: ({ url, request }) => {
          const api = ["/oss"];
          return api.some((item) => url.pathname.includes(item)) && request.method === "GET";
        },
        handler: "NetworkFirst",
        options: {
          cacheName: "oss-cache",
          expiration: {
            maxEntries: 100, // 100条
            maxAgeSeconds: 60 * 60 * 24, // 24 hours
          },
          cacheableResponse: {
            statuses: [0, 200, 206, 304],
          },
        },
      },
      {
        urlPattern: ({ url, request }) => {
          const api = ["/api"];

          return api.some((item) => url.pathname.includes(item)) && request.method === "GET";
        },

        handler: "NetworkFirst",
        options: {
          cacheName: "api-cache",
          expiration: {
            maxEntries: 100, // 100条
            maxAgeSeconds: 60 * 60 * 24, // 24 hours
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
      {
        urlPattern: /.*\.js$/,
        handler: "StaleWhileRevalidate", // 网络优先，同时缓存请求，下次请求时，如果有缓存，直接返回缓存，同时再次请求网络，更新缓存
        options: {
          cacheName: "js",
          expiration: {
            maxEntries: 60, // 最多缓存30个，超过的按照LRU原则删除
            maxAgeSeconds: 60 * 60 * 24, // 24 hours
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
    ],
  },
  devOptions: {
    enabled: false,
    navigateFallback: "index.html",
    suppressWarnings: true,
    type: "module",
  },
};
