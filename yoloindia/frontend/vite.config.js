import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/framer-motion')) return 'animation';
          if (id.includes('node_modules/swiper'))        return 'slider';
          if (id.includes('node_modules/lucide-react'))  return 'icons';
          if (id.includes('node_modules/react-dom'))     return 'vendor';
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-router')) return 'vendor';
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
  server: {
    port: 3002,
    strictPort: true,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
});
