import { defineConfig } from 'vite';
import { resolve } from 'path';

// `import.meta.dirname` rather than `__dirname`: this file is ESM, and Vite 8
// warns on every build that its next config loader will not shim the CommonJS
// globals. Needs Node 20.11+, which is below the floor Vite 8 already sets.
const here = import.meta.dirname;

export default defineConfig({
  root: '.',

  // Emitted asset URLs are absolute ("/assets/..."), which is what a site served
  // from a domain root wants — Cloudflare Pages, Netlify, Vercel, a GitHub Pages
  // user site or any custom domain. Serving from a subpath instead (a GitHub
  // Pages *project* site, https://user.github.io/repo/) needs this set to
  // '/repo/', otherwise every stylesheet, script and image 404s.
  base: '/',

  build: {
    outDir: 'dist',

    // Never inline an asset as a base64 data URI. The three testimonial avatars
    // sat under the default threshold and were embedded twice each — once per
    // place they appear — adding ~24 KB to a document that cannot be cached the
    // way a hashed file can.
    assetsInlineLimit: 0,

    rollupOptions: {
      input: {
        main: resolve(here, 'index.html'),
        privacy: resolve(here, 'pages/privacy.html'),
        disclaimer: resolve(here, 'pages/disclaimer.html'),
        notFound: resolve(here, '404.html')
      }
    }
  },

  server: {
    port: 3000,
    open: true
  }
});
