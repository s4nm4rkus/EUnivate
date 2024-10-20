import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const backendBaseUrl = process.env.VITE_REACT_APP_BACKEND_BASEURL;

export default defineConfig({
  plugins: [react()],
  preview: {
    host: '0.0.0.0',
    port: process.env.PORT || 4173,
  },
  server: {
    host: '0.0.0.0',
    port: process.env.PORT || 5173,
    proxy: {
      '/api': {
        target: backendBaseUrl,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
