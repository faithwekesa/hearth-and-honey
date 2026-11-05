# Hearth & Honey

A one-page website for a neighbourhood bakery in Nairobi. It is a practice project that I built to pitch to a real bakery, so the name, prices and contact details are samples.

Visitors scroll through the bakes, pick a flavour and tap order. The order goes straight to the bakery on WhatsApp as a ready-written message, so there is no basket, no sign up and no payment to set up.

Live site: https://hearth-and-honey.vercel.app

## What it does

- A full-screen hero that opens from a rounded photo card, then fades gently between six bakes
- Eight featured bakes that animate as you scroll: the photo slides in from its side, the image drifts slowly inside its frame and the text lifts in line by line
- Flavour options on every product, with an accent colour for each product
- Order buttons that open WhatsApp with the product and the chosen flavour already written
- A full price list of 24 items, grouped as breads, pastries, cakes and desserts, and savoury bakes and drinks
- A custom order card for graduations, birthdays, weddings and office orders
- A footer with opening hours, a live open or closed status in Nairobi time, a directions link and contact details
- A layout that works on phones, tablets and desktops
- Animations that switch off for visitors who have reduced motion turned on

## Built with

- React 19
- Vite
- Plain CSS with custom properties, no UI library
- Scroll animation written by hand with requestAnimationFrame and CSS variables

## Run it on your computer

You need Node.js 20 or newer. In the project folder, run these two commands:

    npm install
    npm run dev

Then open the address the terminal prints, usually http://localhost:5173. If that port is busy, start it on another one:

    npm run dev -- --port 5199 --strictPort

To check the production build:

    npm run build
    npm run preview

## Photos

The site reads one photo per product from the public/images folder, named after the product, for example doughnut.jpg, croissant.jpg, sourdough.jpg, slice.jpg, cupcakes.jpg, cookies.jpg, baguette.jpg and bagels.jpg. If a photo is missing, a simple coloured illustration shows in its place, so nothing breaks.

To download a starter set of free photos from Pixabay, make a free account at https://pixabay.com, copy your API key from https://pixabay.com/api/docs/ and run this in the project folder:

    PIXABAY_API_KEY=your_key node scripts/get-images.mjs

The script saves the photos into public/images and writes a CREDITS.txt file there with the photographers. Files that already exist are skipped, so you can swap in your own photos and run it again safely.

The photos are from Pixabay and are used under the Pixabay licence. When the bakery has its own photos, they should replace these.

## Project structure

    index.html          page title, description and share preview
    public/images/      product photos
    scripts/            photo download script
    src/App.jsx         header, hero, products, price list, custom order and footer
    src/brand.js        bakery details such as name, hours and phone number
    src/menu.js         menu items, flavours and prices
    src/colors.js       the colour each flavour turns into
    src/glyphs.jsx      fallback illustrations when a photo is missing
    src/index.css       all the styles

## Deploy

The project is set up for Vercel. Push it to GitHub, import the repository in Vercel and deploy. Vercel detects Vite on its own.

## Notes

This is a demo. The names, prices, address and phone number are placeholders until a real bakery uses it. Ordering works through WhatsApp only, and there is no stock tracking or online payment.
