const RULES = [
  [/cream cheese/i, '#fff3dc'],
  [/red velvet/i, '#b3202f'],
  [/cookies and cream/i, '#cfc8c0'],
  [/chocolate|brownie|fudge|ganache/i, '#5a3222'],
  [/strawberry/i, '#ff7a95'],
  [/blueberry/i, '#6b6fd8'],
  [/cranberry/i, '#b8304f'],
  [/pistachio/i, '#a8d37a'],
  [/lemon/i, '#ffd84a'],
  [/salted caramel|caramel/i, '#c98a3d'],
  [/coconut/i, '#f3efe4'],
  [/carrot/i, '#e8923f'],
  [/passion|mango|orange/i, '#ffa733'],
  [/pineapple/i, '#ffd95e'],
  [/apricot/i, '#f6a94a'],
  [/mixed|berry|fruit/i, '#e2557a'],
  [/almond|walnut|pecan|banana|oatmeal|raisin|shortbread/i, '#d9a86c'],
  [/spinach|herb/i, '#8dbb5a'],
  [/cheese|cheddar/i, '#f4c542'],
  [/beef|minced/i, '#8a4a2b'],
  [/chicken|mushroom/i, '#e6c48a'],
  [/americano|latte|cappuccino|coffee/i, '#7b4a2e'],
  [/whole wheat|multigrain|whole|sliced/i, '#a8703a'],
  [/olive/i, '#9aa05a'],
  [/vanilla|custard|plain|classic|glazed|cream|sesame|seeded|everything|country|brioche/i, '#ffe9b8'],
];

export function flavorColor(name) {
  for (const [re, c] of RULES) if (re.test(name || '')) return c;
  return '#e8b46a';
}

const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));

export function crust(color) {
  const a = hex('#d4903f');
  const b = hex(color);
  const lum = (0.2126 * b[0] + 0.7152 * b[1] + 0.0722 * b[2]) / 255;
  const t = lum > 0.78 ? 0.06 : 0.3;
  const m = a.map((v, i) => Math.round(v + (b[i] - v) * t));
  return `#${m.map((v) => v.toString(16).padStart(2, '0')).join('')}`;
}
