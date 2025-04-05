
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Base path configuration
  // For custom domain in production, use '/'
  // For local development, use '/'
  // If you ever need to deploy to GitHub Pages without a custom domain,
  // you would change this to '/repository-name/'
  base: '/',
  
  // Development server configuration
  server: {
    host: "::", // Allows connections via IPv6
    port: 8080, // Port for local development
  },
  
  // Plugins
  plugins: [
    react(), // React support with SWC compiler
    // Component tagger only enabled in development
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  
  // Path aliases for cleaner imports
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  
  // Build configuration
  build: {
    outDir: 'dist', // Output directory
    sourcemap: mode === 'development', // Generate sourcemaps in development
  },
}));
