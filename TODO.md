# TODO - Favicon + Logo visibility

- [ ] Read current `index.html` to see existing `<link rel="icon">` tags (done in analysis stage).
- [ ] Add favicon `<link>` tags in `index.html` referencing generated assets in `/public`.
- [ ] Add a step/command to install `sharp` and run `generate-favicon.js` to produce:
  - `public/favicon.ico`
  - `public/favicon-16x16.png`
  - `public/favicon-32x32.png`
  - `public/apple-touch-icon.png`
- [ ] Run generator and verify assets are created.
- [ ] (Optional) If favicon still looks too dark/black, regenerate with `FAVICON_BACKDROP_COLOR=#000000` or `#ffffff` and re-check.

