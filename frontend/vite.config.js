import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy requests starting with /api to the backend
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true, // Handle virtual hosted sites
        secure: false, // Allow proxying to HTTPS without verification
        // rewrite: (path) => path.replace(/^\/api/, ""), // Optional: Rewrite path
      },
    },
  },
});
