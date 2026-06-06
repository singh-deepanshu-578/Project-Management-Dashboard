import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/Project-Management-Dashboard/",
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            if (id.includes("react-dom") || id.includes("react-router"))
              return "react-vendor";
            if (id.includes("@mui") || id.includes("@emotion"))
              return "mui-vendor";
            if (id.includes("chart.js") || id.includes("react-chartjs"))
              return "chart-vendor";
            if (id.includes("react-dnd")) return "dnd-vendor";
          }
        },
      },
    },
  },
});
