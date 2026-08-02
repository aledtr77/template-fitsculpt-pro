# FitSculpt Pro

A multi-page website template for fitness coaches and personal trainers. Dark
interface, built around getting the visitor to book a call.

**Live demo: [fitsculpt-pro.pages.dev](https://fitsculpt-pro.pages.dev/)**

[![FitSculpt Pro — the landing page in its dark theme](.github/preview.jpg)](https://fitsculpt-pro.pages.dev/)

Written by hand in HTML, CSS and JavaScript, assembled with Vite. No framework, no
CMS, no bought theme underneath.

**The source is public and free to build sites with, client work included.**
Reselling it as a template is not allowed — see [LICENSE](LICENSE).

> Still being tidied up. The pages work and the build runs, but expect rough edges
> until this note comes off.

## What's in it

- **Five pages** — landing page plus about, programs, contact and a custom 404
- **BMI and calorie calculator** — height, weight and activity level in, result out,
  without leaving the page
- **Filterable program grid** for splitting training plans by type
- **Monthly / annual pricing toggle**
- **Consultation modal** with client-side validation for booking requests
- **Light and dark themes** — the first visit follows `prefers-color-scheme`, the
  choice is then remembered in `localStorage` and applied before first paint

## Stack

Vanilla JavaScript and modular CSS, bundled with Vite. Styles are split by concern —
tokens, reset, layout, components, sections — and scripts by feature.

```
index.html              landing page
pages/                  about, programs, contact, 404
src/styles/             theme, base, layout, components, sections, main
src/scripts/            theme, calculator, modal, animations, main
vite.config.js
```

## Run it locally

Node 18 or newer.

```bash
git clone https://github.com/aledtr77/template-fitsculpt-pro.git
cd template-fitsculpt-pro
npm install
npm run dev      # http://localhost:3000
npm run build    # static output in dist/
```

The build is plain static files — deploy them on Cloudflare Pages, Netlify, Vercel or
GitHub Pages without changes. The demo linked above is that `dist/` folder, unedited.

## Before you publish it

The images bundled here are placeholders so the pages can be previewed as intended.
**They are not covered by the licence — replace them with your own** before putting
anything online. The same goes for the copy: every headline, price and testimonial is
filler text.

## The paid templates

This one is free. The other templates, each with its own visual direction and full
sources, are on **[Etsy](https://www.etsy.com/shop/CodedgeStudio)** — and the live
demos are browsable first at **[codedge.it/templates](https://codedge.it/templates/)**.

## Licence

Source-available, not open source: build what you like with it, don't redistribute it
as a template. Full terms in [LICENSE](LICENSE).

Different terms, or a custom build? **contatti.codedge@gmail.com**
