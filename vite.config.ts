export default defineConfig({
  plugins: [react()],
  base: './', // ✅ corrige les chemins relatifs en production
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  build: {
    target: "esnext",
    minify: "esbuild",
    cssMinify: true,
    outDir: "dist",
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("three") || id.includes("@react-three")) return "three";
            if (id.includes("framer-motion")) return "motion";
            if (id.includes("supabase")) return "supabase";
            return "vendor";
          }
        },
      },
    },
  },
  optimizeDeps: {
    include: ["react", "react-dom"],
    exclude: ["lucide-react"],
  },
});
