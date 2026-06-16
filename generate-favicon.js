/*
  Generate favicon assets from LogoCloseback.png
  - Creates: public/favicon.ico, public/favicon-16x16.png, public/favicon-32x32.png, public/apple-touch-icon.png
  - Optional: tries to fix "too black" look by adding a light background layer behind the logo.

  Usage (Windows):
    node generate-favicon.js

  Notes:
  - This script uses the 'sharp' package. Install once:
      npm i sharp
*/

const fs = require('fs');
const path = require('path');

const sharp = require('sharp');

const ROOT = __dirname;
const SRC = path.join(ROOT, 'LogoCloseback.png');
const OUT_DIR = path.join(ROOT, 'public');

async function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

async function main() {
  if (!fs.existsSync(SRC)) {
    console.error('Missing source logo:', SRC);
    process.exit(1);
  }

  await ensureDir(OUT_DIR);

  // If the logo is too dark/black on transparent backgrounds, setting a dark/light backdrop can help.
  // Change this to '#000000' if you prefer dark backing; '#ffffff' usually improves browser tab visibility.
  const BACKDROP_COLOR = process.env.FAVICON_BACKDROP_COLOR || '#ffffff';

  // Load once
  const img = sharp(SRC);
  const metadata = await img.metadata();

  // Composite onto a backdrop so the output favicon isn't fully dependent on transparency
  const onBackdrop = (w, h) => {
    return sharp(SRC)
      .resize(w, h, { fit: 'cover', position: 'center' })
      .flatten({ background: BACKDROP_COLOR });
  };

  // favicon-16x16.png
  await onBackdrop(16, 16)
    .png()
    .toFile(path.join(OUT_DIR, 'favicon-16x16.png'));

  // favicon-32x32.png
  await onBackdrop(32, 32)
    .png()
    .toFile(path.join(OUT_DIR, 'favicon-32x32.png'));

  // apple-touch-icon.png (180x180)
  await onBackdrop(180, 180)
    .png()
    .toFile(path.join(OUT_DIR, 'apple-touch-icon.png'));

  // favicon.ico - multi-size
  // We'll generate a single ICO containing 16 & 32 sizes.
  const buf16 = await onBackdrop(16, 16).png().toBuffer();
  const buf32 = await onBackdrop(32, 32).png().toBuffer();

  // sharp build ini tidak mendukung .toFormat('ico') di sistem ini.
  // Jadi kita generate favicon.ico pakai buffer png 16x16 sebagai fallback sederhana.
  // (Browser tetap akan bisa pakai favicon.ico walau hanya 1 ukuran.)
  await onBackdrop(16, 16)
    .png()
    .toFile(path.join(OUT_DIR, 'favicon.ico'));

  // Fallback: some sharp versions only embed the current size into ICO.
  // If multi-size ICO is needed, uncomment the block below.
  //
  // const buf180 = await onBackdrop(180, 180).png().toBuffer();
  // await sharp({
  //   create: {
  //     width: 256,
  //     height: 256,
  //     channels: 4,
  //     background: { r: 0, g: 0, b: 0, alpha: 0 }
  //   }
  // })
  // .composite([
  //   { input: buf16, left: 0, top: 0 },
  //   { input: buf32, left: 0, top: 0 }
  // ])
  // .toFormat('ico')
  // .toFile(path.join(OUT_DIR, 'favicon.ico'));

  console.log('Done. Generated favicon assets in:', OUT_DIR);
  console.log('Source metadata:', metadata);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

