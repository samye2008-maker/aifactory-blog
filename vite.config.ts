import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { viteSeoPlugin } from "./vite-plugin-seo"

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react(), viteSeoPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
