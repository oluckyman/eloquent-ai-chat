import { defineConfig } from "tsup";

export default defineConfig([
  // Library build: ESM + CJS, React external
  {
    entry: { index: "src/index.ts" },
    format: ["esm", "cjs"],
    dts: true,
    external: ["react", "react-dom"],
    clean: true,
    target: "es2020",
    platform: "browser",
    minify: true,
    sourcemap: true,
    loader: { ".css": "text" },
  },
  // IIFE build: for <script> tag, React bundled inside
  {
    entry: { "eloquent-chat": "src/embed.ts" },
    format: ["iife"],
    globalName: "EloquentChat",
    noExternal: ["react", "react-dom"],
    target: "es2020",
    platform: "browser",
    minify: true,
    sourcemap: true,
    define: { "process.env.NODE_ENV": '"production"' },
    loader: { ".css": "text" },
  },
]);
