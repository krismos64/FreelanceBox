import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      stream: "stream-browserify", // Polyfill pour Node.js
    },
    dedupe: ["react", "react-dom"], // Évite les duplications de React
  },
  optimizeDeps: {
    include: [
      "@react-pdf/renderer",
      "stream-browserify",
      "react",
      "react-dom",
      "react-router-dom",
      "framer-motion",
    ],
  },
  build: {
    sourcemap: true, // Active les sourcemaps pour faciliter le débogage
    chunkSizeWarningLimit: 1500, // Ajuste les limites des tailles de chunks
    commonjsOptions: {
      include: [/node_modules/, /@react-pdf\/renderer/],
    },
    rollupOptions: {
      external: ["react", "react-dom"], // Force l'utilisation unique de React
    },
  },
  server: {
    port: 5173,
    strictPort: true, // Évite les ports dynamiques
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false, // Désactive les vérifications SSL (si nécessaire)
      },
    },
  },
  preview: {
    port: 4173, // Port différent pour le mode preview
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
