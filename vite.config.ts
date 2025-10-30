import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    target: "es2015", // Support Chrome 35+ (ES6/ES2015)
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "webos-tv-wrapper",
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format === "es" ? "mjs" : "cjs"}`,
    },
    rollupOptions: {
      // No external dependencies - everything is bundled
      external: [],
      output: {
        exports: "named",
      },
    },
    sourcemap: true,
    emptyOutDir: false, // Keep TypeScript declarations generated before Vite build
  },
});
