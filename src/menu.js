export const GROUPS = [
  {
    id: 'breads',
    title: 'Breads & Daily Staples',
    short: 'Breads',
    blurb: 'Crusty loaves, soft rolls and morning breads, baked fresh before we open.',
    tone: ['#f3e3cb', '#e7c99c'],
    panel: '#ffcf5c',
    soft: '#fff1cc',
    obj: 'loaf',
    items: [
      { id: 'baguette', name: 'Classic Baguette', desc: 'Crackling crust, soft open crumb.', price: 180, flavors: ['Plain', 'Sesame', 'Garlic and herb'] },
      { id: 'sourdough', name: 'Sourdough Loaf', desc: 'Slow fermented for two days.', price: 520, flavors: ['Country white', 'Seeded', 'Olive and rosemary', 'Whole wheat'] },
      { id: 'multigrain', name: 'Multigrain Loaf', desc: 'Oats, flax and sunflower seeds.', price: 380, flavors: ['Sliced', 'Whole'] },
      { id: 'rolls', name: 'Dinner Rolls (6)', desc: 'Pillow soft, brushed with butter.', price: 300, flavors: ['Plain', 'Sesame', 'Herb butter'] },
      { id: 'buns', name: 'Burger Buns (4)', desc: 'Glossy tops, sturdy and soft.', price: 280, flavors: ['Plain', 'Sesame', 'Brioche'] },
      { id: 'bagels', name: 'Bagels (4)', desc: 'Boiled then baked for a chewy bite.', price: 360, flavors: ['Plain', 'Sesame', 'Everything'] },
    ],
  },
  {
    id: 'pastries',
    title: 'Morning Pastries',
    short: 'Pastries',
    blurb: 'Buttery layers, warm spice and fruit, made for slow mornings.',
    tone: ['#f7e6d6', '#ecc3a1'],
    panel: '#ff9f7a',
    soft: '#ffe4d8',
    obj: 'croissant',
    items: [
      { id: 'croissant', name: 'Butter Croissant', desc: 'Flaky, golden, layered by hand.', price: 250, flavors: ['Plain', 'Chocolate', 'Almond', 'Cheese'] },
      { id: 'cinnamon', name: 'Cinnamon Roll', desc: 'Soft swirl with a thick glaze.', price: 320, flavors: ['Cream cheese', 'Caramel pecan', 'Apple'] },
      { id: 'danish', name: 'Danish Pastry', desc: 'Light pastry with a sweet centre.', price: 300, flavors: ['Apricot', 'Mixed berry', 'Vanilla custard'] },
      { id: 'muffin', name: 'Muffin', desc: 'Tall, tender and generously filled.', price: 280, flavors: ['Blueberry', 'Double chocolate', 'Banana nut', 'Lemon poppy seed'] },
      { id: 'scone', name: 'Scone', desc: 'Crumbly outside, soft inside.', price: 260, flavors: ['Cranberry orange', 'Blueberry', 'Plain with jam'] },
      { id: 'doughnut', name: 'Doughnut', desc: 'Fried fresh and finished by hand.', price: 200, flavors: ['Glazed', 'Chocolate', 'Strawberry', 'Cream filled'] },
    ],
  },
  {
    id: 'sweets',
    title: 'Cakes, Cookies & Desserts',
    short: 'Cakes & Desserts',
    blurb: 'Slices, boxes and little treats to share, or not.',
    tone: ['#fbe8e4', '#f0b9ad'],
    panel: '#ff7fa3',
    soft: '#ffdfe8',
    obj: 'cupcake',
    items: [
      { id: 'slice', name: 'Cake Slice', desc: 'A generous slice, layered and frosted.', price: 450, flavors: ['Vanilla', 'Chocolate', 'Red velvet', 'Strawberry', 'Lemon', 'Caramel'] },
      { id: 'cupcakes', name: 'Cupcakes (box of 6)', desc: 'Piled high with buttercream.', price: 1200, flavors: ['Vanilla buttercream', 'Chocolate ganache', 'Strawberry', 'Cookies and cream'] },
      { id: 'cheesecake', name: 'Cheesecake Slice', desc: 'Creamy, set on a buttery base.', price: 520, flavors: ['Plain', 'Strawberry', 'Blueberry', 'Caramel'] },
      { id: 'tart', name: 'Fruit Tart', desc: 'Crisp shell, vanilla cream, fresh fruit.', price: 480, flavors: ['Mixed fruit', 'Lemon', 'Strawberry'] },
      { id: 'cookies', name: 'Cookies (box of 6)', desc: 'Chewy middles and crisp edges.', price: 650, flavors: ['Chocolate chip', 'Oatmeal raisin', 'Double chocolate', 'Shortbread'] },
      { id: 'brownies', name: 'Brownies (box of 4)', desc: 'Dense, fudgy and rich.', price: 600, flavors: ['Fudge', 'Walnut', 'Salted caramel'] },
    ],
  },
  {
    id: 'savory',
    title: 'Savory Bakes & Drinks',
    short: 'Savory & Drinks',
    blurb: 'Something warm for lunch and something to sip alongside it.',
    tone: ['#eef0dc', '#d3d9a8'],
    panel: '#a6d86a',
    soft: '#eaf5d6',
    obj: 'pie',
    items: [
      { id: 'quiche', name: 'Quiche Slice', desc: 'Buttery shell, silky egg filling.', price: 480, flavors: ['Spinach and feta', 'Chicken and mushroom', 'Cheese and onion'] },
      { id: 'pie', name: 'Meat Pie', desc: 'Golden pastry, slow cooked filling.', price: 350, flavors: ['Beef', 'Chicken', 'Minced beef and cheese'] },
      { id: 'sausage', name: 'Sausage Roll', desc: 'Flaky pastry around a seasoned sausage.', price: 250, flavors: ['Classic', 'Cheese'] },
      { id: 'scroll', name: 'Cheese Scroll', desc: 'Soft swirl with melted cheese.', price: 280, flavors: ['Cheddar', 'Cheese and herb'] },
      { id: 'coffee', name: 'Coffee', desc: 'Freshly brewed, hot or iced.', price: 300, flavors: ['Americano', 'Latte', 'Cappuccino', 'Iced latte'] },
      { id: 'juice', name: 'Fresh Juice', desc: 'Pressed to order, never from concentrate.', price: 320, flavors: ['Passion', 'Mango', 'Orange', 'Pineapple and mint'] },
    ],
  },
];

export const OCCASIONS = [
  { id: 'graduation', title: 'Graduation', bg: '#5b6cff', fg: '#ffffff', accent: '#5b6cff', topper: 'cap', tiers: 2, desc: 'Mortarboards, books and class colours, finished with your name.', from: 3200 },
  { id: 'birthday', title: 'Birthday', bg: '#ff7fa3', fg: '#2b1810', accent: '#ff7fa3', topper: 'candles', tiers: 2, desc: 'From simple and sweet to a full showstopper with toppers.', from: 2800 },
  { id: 'wedding', title: 'Wedding', bg: '#fff1e0', fg: '#2b1810', accent: '#f4a6b8', topper: 'flowers', tiers: 3, desc: 'Elegant tiers, fresh flowers and a tasting before the day.', from: 14000 },
  { id: 'baby-shower', title: 'Baby Shower', bg: '#9fd8ff', fg: '#2b1810', accent: '#7cc6f5', topper: 'star', tiers: 1, desc: 'Soft pastels and gentle details for the newest arrival.', from: 3500 },
  { id: 'anniversary', title: 'Anniversary', bg: '#ff5a5f', fg: '#ffffff', accent: '#ff5a5f', topper: 'heart', tiers: 2, desc: 'A small, romantic cake for two or a bigger one for the family.', from: 3000 },
  { id: 'corporate', title: 'Corporate & Custom', bg: '#ffd45e', fg: '#2b1810', accent: '#f2b705', topper: 'plaque', tiers: 1, desc: 'Branded cakes, cupcakes and treat boxes for your team.', from: 4000 },
];

export const CAKE_FLAVORS = ['Vanilla', 'Chocolate', 'Red velvet', 'Strawberry', 'Lemon', 'Caramel', 'Carrot', 'Coconut'];

export const CAKE_FILLINGS = [
  'Vanilla buttercream',
  'Chocolate ganache',
  'Strawberry jam and cream',
  'Blueberry compote',
  'Cranberry and orange',
  'Salted caramel',
  'Lemon curd',
  'Cream cheese frosting',
];

export const CAKE_SIZES = [
  { id: '1kg', label: '1 kg', note: 'Serves 8 to 10', from: 3200 },
  { id: '2kg', label: '2 kg', note: 'Serves 18 to 20', from: 5800 },
  { id: '3kg', label: '3 kg', note: 'Serves 28 to 30', from: 8500 },
  { id: 'two-tier', label: 'Two tier', note: 'Serves 40 or more', from: 14000 },
  { id: 'three-tier', label: 'Three tier', note: 'Serves 80 or more', from: 24000 },
];

export const STEPS = [
  { n: '01', title: 'Choose', text: 'Pick from the menu or design a cake for your occasion.' },
  { n: '02', title: 'Send on WhatsApp', text: 'Your order opens as a ready message. Just press send.' },
  { n: '03', title: 'Confirm and collect', text: 'We confirm the price and time, then bake it fresh for you.' },
];

export const PROMISES = [
  { title: 'Baked every morning', text: 'Nothing sits overnight.' },
  { title: 'Real ingredients', text: 'Butter, eggs and vanilla, no shortcuts.' },
  { title: 'Cakes made your way', text: 'Flavours, fillings and sizes you choose.' },
  { title: 'Order in one tap', text: 'Straight to our WhatsApp.' },
];
