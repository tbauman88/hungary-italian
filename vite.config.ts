import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'custom-mime-sw',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/sw.js') {
            res.setHeader('Content-Type', 'application/javascript');
          }
          next();
        });
      },
    },
  ],
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api/uploader': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'react': ['react', 'react-dom', 'react-router-dom'],
          'react-form': ['react-hook-form'],
          'apollo': ['@apollo/client', 'graphql'],
          'ui': ['@headlessui/react', '@heroicons/react', 'tailwindcss'],
        },
      },
    },
  }
})
