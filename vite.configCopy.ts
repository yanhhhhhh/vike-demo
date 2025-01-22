import { ConfigEnv, defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

import { VitePWAConfig, VitePWA } from "../";
import viteCompression from "vite-plugin-compression";
import legacy from "@vitejs/plugin-legacy";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

import postCssPxToRem from "postcss-pxtorem";

const timestamp = new Date().getTime();

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd());

  const baseUrl = env.VITE_API_BASE_URL;

  // console.log('baseUrl', baseUrl);
  return {
    // base: command == 'serve' ? '' : '/intro/',
    base: "/intro/",
    plugins: [
      react(),
      legacy({
        targets: ["chrome >= 64", "edge >= 79", "safari >= 11.1", "firefox >= 67"], // compatible with modern browsers only
        renderLegacyChunks: false, // no need to generate legacy browser compatibility chunks
        modernPolyfills: false, // auto detect polyfills required by modern browsers in the current target range
      }),

      viteCompression({
        algorithm: "gzip",
        threshold: 1024,
        verbose: false,
        ext: ".gz",
        deleteOriginFile: false,
      }),
      VitePWA(VitePWAConfig),
    ],

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        "~@": path.resolve(__dirname, "src"),
      },
    },

    server: {
      host: "0.0.0.0",
      port: 5174,

      proxy: {
        [env.VITE_APP_BASE_API]: {
          // target: 'https://hero.hithium.com:8002/iot-api',
          target: baseUrl,
          changeOrigin: true,

          // rewrite: (p) =>
          //   p.replace(
          //     new RegExp(`^${env.VITE_APP_BASE_API}`, 'g'),
          //     VITE_APP_VERSION === 'test' || VITE_APP_VERSION === 'dev'
          //       ? ''
          //       : env.VITE_APP_BASE_API
          //   ),
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
    css: {
      postcss: {
        plugins: [
          tailwindcss,
          autoprefixer,
          postCssPxToRem({
            rootValue: 100,
            propList: ["*"],
          }),
        ],
      },
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          additionalData: `@import "${path.resolve(__dirname, "src/assets/styles/variables.less")}";`,
        },
      },
    },

    build: {
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: true, // 删除console
          drop_debugger: true, // 删除debugger
        },
      },

      target: "esnext",
      cssTarget: ["chrome58", "firefox57", "safari11", "edge16", "ios11"],
      rollupOptions: {
        // external: ['antd', 'react', 'react-dom', 'react-router-dom'],
        output: {
          // globals: {
          //   react: 'React',
          //   'react-dom': 'ReactDOM',
          //   antd: 'antd',
          // }, // 全局变量
          // 入口文件名
          entryFileNames: `assets/[name].js`,
          // 块文件名
          chunkFileNames: `assets/[name]-[hash].js`,
          // 资源文件名 css 图片等等
          assetFileNames: `assets/[name]-[hash].[ext]`,
          //优化打包——拆包
          manualChunks: {
            /**
             * 1.以对象的方式使用
             * 将 react 模块打包成一个 chunk，名称是 react
             */
            react: ["react"],
            "react-dom": ["react-dom"],
            "react-router-dom": ["react-router-dom"],
            ahooks: ["ahooks"],

            axios: ["axios"],
            jotai: ["jotai"],
            antd: ["antd"],
            "@ant-design/icons": ["@ant-design/icons"],
            "@ant-design/cssinjs": ["@ant-design/cssinjs"],

            "lodash-es": ["lodash-es"],
            i18next: ["i18next"],
            "react-i18next": ["react-i18next"],
            "i18next-browser-languagedetector": ["i18next-browser-languagedetector"],

            dayjs: ["dayjs"],

            uuid: ["uuid"],

            qs: ["qs"],
            "react-lazyload": ["react-lazyload"],
            "react-slick": ["react-slick"],

            "@dnd-kit/core": ["@dnd-kit/core"],
            "@dnd-kit/modifiers": ["@dnd-kit/modifiers"],
            "@dnd-kit/sortable": ["@dnd-kit/sortable"],
            "es-toolkit": ["es-toolkit"],
          },
        },
        // output: {
        //   manualChunks(id) {
        //     if (id.includes('node_modules')) {
        //       return id
        //         .toString()
        //         .split('node_modules/')[1]
        //         .split('/')[0]
        //         .toString();
        //     }
        //   },
        // },
      },
    },
  };
});
