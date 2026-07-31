import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'pages/about.html'),
        programs: resolve(__dirname, 'pages/programs.html'),
        contact: resolve(__dirname, 'pages/contact.html'),
        notFound: resolve(__dirname, 'pages/404.html')
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
});
