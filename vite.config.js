// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // <- permite acesso por IP local
    port: 5173, // pode manter o padrão
  },
});

