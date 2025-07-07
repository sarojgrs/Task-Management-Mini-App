import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"],
  },
  server: {
    proxy: {
      "/api": "http://localhost:3006", // Proxy any request to /api to backend running on port 3000
    },
  },
});
