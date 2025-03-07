import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Backend server URL and port
        changeOrigin: true,
        // Uncomment the line below if you're using self-signed certificates
        // secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
