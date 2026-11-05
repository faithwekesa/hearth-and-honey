import { mkdir, writeFile, access, appendFile } from 'node:fs/promises';
import { join } from 'node:path';

const PIXABAY = process.env.PIXABAY_API_KEY;
const PEXELS = process.env.PEXELS_API_KEY;
const PIXABAY_API = process.env.PIXABAY_API || 'https://pixabay.com/api/';
const PEXELS_API = process.env.PEXELS_API || 'https://api.pexels.com/v1/search';

if (!PIXABAY && !PEXELS) {
  console.error('Missing key. Get a free Pixabay key at https://pixabay.com/api/docs/ (log in and it shows on that page), then run:');
  console.error('PIXABAY_API_KEY=your_key node scripts/get-images.mjs');
  process.exit(1);
}

const OUT = join(process.cwd(), 'public', 'images');

const ITEMS = [
  ['hero-cake-1', 'vanilla cake'],
  ['hero-cake-2', 'chocolate cake'],
  ['hero-cake-3', 'strawberry cake'],
  ['hero-cake-4', 'red velvet cake'],
  ['hero-donut-1', 'glazed donut'],
  ['hero-donut-2', 'chocolate donut'],
  ['hero-donut-3', 'strawberry pink donut'],
  ['hero-donut-4', 'caramel donut'],
  ['hero-cupcake-1', 'vanilla cupcake'],
  ['hero-cupcake-2', 'chocolate cupcake'],
  ['hero-cupcake-3', 'red velvet cupcake'],
  ['hero-cupcake-4', 'blueberry cupcake'],
  ['hero-croissant-1', 'butter croissant'],
  ['hero-croissant-2', 'chocolate croissant'],
  ['hero-croissant-3', 'almond croissant'],
  ['hero-cookie-1', 'chocolate chip cookies'],
  ['hero-cookie-2', 'double chocolate cookies'],
  ['hero-cookie-3', 'oatmeal cookies'],
  ['hero-bread-1', 'sourdough bread loaf'],
  ['hero-bread-2', 'multigrain bread'],
  ['hero-bread-3', 'baguette'],
  ['story-vanilla', 'vanilla cake slice'],
  ['story-chocolate', 'chocolate cake slice'],
  ['story-strawberry', 'strawberry cake slice'],
  ['story-red-velvet', 'red velvet cake slice'],
  ['story-lemon', 'lemon cake'],
  ['story-caramel', 'salted caramel cake'],
  ['baguette', 'baguette bread'],
  ['sourdough', 'sourdough bread'],
  ['multigrain', 'multigrain bread'],
  ['rolls', 'dinner rolls bread'],
  ['buns', 'burger buns'],
  ['bagels', 'bagels'],
  ['croissant', 'butter croissant'],
  ['cinnamon', 'cinnamon roll'],
  ['danish', 'danish pastry'],
  ['muffin', 'blueberry muffin'],
  ['scone', 'scones'],
  ['doughnut', 'doughnut'],
  ['slice', 'cake slice'],
  ['cupcakes', 'cupcakes'],
  ['cheesecake', 'cheesecake slice'],
  ['tart', 'fruit tart'],
  ['cookies', 'cookies'],
  ['brownies', 'brownies'],
  ['quiche', 'quiche'],
  ['pie', 'meat pie'],
  ['sausage', 'sausage roll'],
  ['scroll', 'cheese bread roll'],
  ['coffee', 'latte coffee cup'],
  ['juice', 'fresh juice glass'],
  ['occasion-graduation', 'graduation cake'],
  ['occasion-birthday', 'birthday cake'],
  ['occasion-wedding', 'wedding cake'],
  ['occasion-baby-shower', 'baby shower cake'],
  ['occasion-anniversary', 'anniversary cake'],
  ['occasion-corporate', 'cake with logo'],
  ['about', 'bakery interior'],
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const exists = async (p) => {
  try {
    await access(p);
    return true;
  } catch (e) {
    return false;
  }
};

const luminance = (hex) => {
  const h = (hex || '#808080').replace('#', '');
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

async function searchPixabay(query) {
  const white = query.includes('white background');
  const q = query.replace(' white background', '');
  const url = `${PIXABAY_API}?key=${PIXABAY}&q=${encodeURIComponent(q)}&image_type=photo&orientation=horizontal&safesearch=true&min_width=1000&per_page=20${white ? '&colors=white' : ''}`;
  const res = await fetch(url);
  if (res.status === 429) throw new Error('Pixabay rate limit reached, wait a minute and run again');
  if (res.status === 400 || res.status === 401 || res.status === 403) throw new Error('Pixabay rejected the key, check PIXABAY_API_KEY');
  if (!res.ok) throw new Error(`Search failed with ${res.status}`);
  const data = await res.json();
  const hits = data.hits || [];
  if (!hits.length) return null;
  const best = hits[0];
  return { url: best.largeImageURL || best.webformatURL, credit: `photo by ${best.user} on Pixabay, ${best.pageURL}` };
}

async function searchPexels(query, big) {
  const url = `${PEXELS_API}?query=${encodeURIComponent(query)}&per_page=12&orientation=landscape`;
  const res = await fetch(url, { headers: { Authorization: PEXELS } });
  if (res.status === 429) throw new Error('Pexels rate limit reached, wait a few minutes and run again');
  if (res.status === 401) throw new Error('Pexels rejected the key, check PEXELS_API_KEY');
  if (!res.ok) throw new Error(`Search failed with ${res.status}`);
  const data = await res.json();
  const photos = data.photos || [];
  if (!photos.length) return null;
  const best = query.includes('white background')
    ? [...photos].sort((a, b) => luminance(b.avg_color) - luminance(a.avg_color))[0]
    : photos[0];
  return { url: big ? best.src.large2x : best.src.large, credit: `photo by ${best.photographer} on Pexels, ${best.url}` };
}

const search = (query, big) => (PIXABAY ? searchPixabay(query) : searchPexels(query, big));

async function download(url, file) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download failed with ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(file, buf);
}

await mkdir(OUT, { recursive: true });
const credits = join(OUT, 'CREDITS.txt');

let ok = 0;
let skipped = 0;
const failed = [];

for (const [name, query] of ITEMS) {
  const file = join(OUT, `${name}.jpg`);
  if (await exists(file)) {
    skipped += 1;
    console.log(`skip   ${name}.jpg (already there)`);
    continue;
  }
  try {
    const found = await search(query, /^(hero|story)-/.test(name));
    if (!found) {
      failed.push(name);
      console.log(`none   ${name}.jpg (no results for "${query}")`);
      continue;
    }
    await download(found.url, file);
    await appendFile(credits, `${name}.jpg: ${found.credit}\n`);
    ok += 1;
    console.log(`saved  ${name}.jpg`);
  } catch (e) {
    failed.push(name);
    console.log(`failed ${name}.jpg: ${e.message}`);
    if (/rate limit|rejected the key/.test(e.message)) break;
  }
  await sleep(350);
}

console.log(`\nDone. ${ok} saved, ${skipped} skipped, ${failed.length} failed.`);
if (failed.length) console.log(`Failed: ${failed.join(', ')}`);
console.log('Photos are free to use. Credits are in public/images/CREDITS.txt');
