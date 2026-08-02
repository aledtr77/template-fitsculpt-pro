# FitSculpt Pro

A multi-page website template for physique and body-sculpting coaches. Dark
interface, built around getting the visitor to book a call.

**Live demo: [fitsculpt-pro.pages.dev](https://fitsculpt-pro.pages.dev/)**

[![FitSculpt Pro — the landing page in its dark theme](.github/preview.jpg)](https://fitsculpt-pro.pages.dev/)

The demo copy is written for a coach working with women on strength and physique,
and the sections follow that: protocols rather than a generic service list, a
metrics calculator, before-and-after results, membership tiers. Swap the text and
the same structure serves any coaching practice that sells programmes.

Written by hand in HTML, CSS and JavaScript, assembled with Vite. No framework, no
CMS, no bought theme underneath.

Published as a code reference — this is what my markup and CSS actually look like.
Read it, take it apart, build on it.

**Free to use, modify and deploy — personal projects and client work included.**
You may not redistribute or sell it as a template, theme or starter kit, modified
or not. Full terms in [LICENSE](LICENSE).

> Still being tidied up. The pages work and the build runs, but expect rough edges
> until this note comes off.

## What's in it

- **Five pages** — landing page plus about, programs, contact and a custom 404,
  all sharing one navigation bar and one footer
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
404.html                at the root, where a host looks for it
pages/                  about, programs, contact
src/styles/             theme, base, layout, components, sections, main
src/scripts/            theme, calculator, modal, animations, main
vite.config.js
```

The 404 sits at the root because that is where Cloudflare Pages, Netlify and
GitHub Pages go looking for it — under `pages/` it builds fine and is never
served. Its links are absolute for the same reason: it answers for any unknown
URL at any depth, so a relative `about.html` would resolve somewhere different
every time.

## Run it locally

Node 20.19 or newer (22.12+ on the 22 line) — what Vite 8 asks for.

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

Two more in `index.html`: `og:url` and `og:image` carry the demo's origin, because a
scraper cannot resolve a relative path — point them at your own domain, and replace
`public/og-image.jpg` with a card of your own site.

## The paid templates

This one is free. The other templates, each with its own visual direction and full
sources, are on **[Etsy](https://www.etsy.com/shop/CodedgeStudio)** — and the live
demos are browsable first at **[codedge.it/templates](https://codedge.it/templates/)**.

## Licence

Free to use, modify and deploy — personal projects and client work included. You may
not redistribute or sell it as a template, theme or starter kit, modified or not.
Full terms in [LICENSE](LICENSE).

Different terms, or a custom build? **contatti.codedge@gmail.com**
