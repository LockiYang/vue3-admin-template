import { fileURLToPath, URL } from "node:url";

import type { ConfigEnv } from "vite";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { viteMockServe } from "vite-plugin-mock";

// https://vitejs.dev/config/
export default ({ command }: ConfigEnv) => {
  return defineConfig({
    plugins: [
      vue(),
      viteMockServe({
        mockPath: "./src/mock",
        localEnabled: command === "serve",
        supportTs: true,
        watchFiles: true,
      }),
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  });
};
