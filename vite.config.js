import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  root: ".",
  build: {
    outDir: "dist",
    assetsDir: "static",
    rollupOptions: {
      input: "index.html",
    },
  },
  server: {
    port: 5173,
    middlewareMode: false,
  },
});
