import { writeFile } from 'node:fs/promises';
import sharp from 'sharp';

const BG = '#0b0b0c';
const TILE = '#131315';
const INK = '#f4f4f5';
const RED = '#cd0d2e';
const out = (name) => new URL(`../public/${name}`, import.meta.url);

const glyph = `<rect x="12" y="8" width="8" height="48" fill="${INK}"/><path d="M48 23v-4a8 8 0 0 0-8-8h-4a8 8 0 0 0-8 8v26a8 8 0 0 0 8 8h4a8 8 0 0 0 8-8v-4" fill="none" stroke="${RED}" stroke-width="8"/>`;
const pixelGlyph = `<path fill="${INK}" d="M3 2h2v12H3z"/><path fill="${RED}" d="M7 2h5v1h1v3h-2V4H8v8h3v-2h2v3h-1v1H7v-1H6V3h1z"/>`;

const svg = (size, viewBox, body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="${viewBox}">${body}</svg>`;

const tile = (size) =>
  size === 16
    ? svg(16, '0 0 16 16', `<rect width="16" height="16" rx="3" fill="${TILE}"/>${pixelGlyph}`)
    : svg(size, '0 0 64 64', `<rect width="64" height="64" rx="14" fill="${TILE}"/>${glyph}`);

const square = (size, viewBox) => svg(size, viewBox, `<rect x="-100" y="-100" width="300" height="300" fill="${BG}"/>${glyph}`);

const png = (source, opts = {}) => sharp(Buffer.from(source)).png({ compressionLevel: 9, ...opts }).toBuffer();

function ico(images) {
  const header = Buffer.alloc(6 + images.length * 16);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  let offset = header.length;
  images.forEach(({ size, data }, i) => {
    const entry = 6 + i * 16;
    header.writeUInt8(size >= 256 ? 0 : size, entry);
    header.writeUInt8(size >= 256 ? 0 : size, entry + 1);
    header.writeUInt8(0, entry + 2);
    header.writeUInt8(0, entry + 3);
    header.writeUInt16LE(1, entry + 4);
    header.writeUInt16LE(32, entry + 6);
    header.writeUInt32LE(data.length, entry + 8);
    header.writeUInt32LE(offset, entry + 12);
    offset += data.length;
  });
  return Buffer.concat([header, ...images.map((image) => image.data)]);
}

const icoSizes = [16, 32, 48];
const icoImages = await Promise.all(icoSizes.map(async (size) => ({ size, data: await png(tile(size)) })));
await writeFile(out('favicon.ico'), ico(icoImages));

const flatten = { background: BG };
await writeFile(
  out('apple-touch-icon.png'),
  await sharp(Buffer.from(square(180, '-8 -8 80 80'))).flatten(flatten).png({ compressionLevel: 9 }).toBuffer(),
);
await writeFile(out('icon-192.png'), await png(tile(192)));
await writeFile(out('icon-512.png'), await png(tile(512)));
await writeFile(
  out('icon-512-maskable.png'),
  await sharp(Buffer.from(square(512, '-24 -24 112 112'))).flatten(flatten).png({ compressionLevel: 9 }).toBuffer(),
);

for (const name of ['favicon.ico', 'apple-touch-icon.png', 'icon-192.png', 'icon-512.png', 'icon-512-maskable.png']) {
  console.log(name);
}
