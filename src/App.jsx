import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { BRAND } from './brand.js';
import { GROUPS } from './menu.js';
import { flavorColor, crust } from './colors.js';
import { Glyph, KIND } from './glyphs.jsx';

const money = (n) => `${BRAND.currency} ${Number(n).toLocaleString('en-KE')}`;

const waLink = (text) => `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(text)}`;

const niceDate = (v) => {
  if (!v) return '';
  const d = new Date(`${v}T00:00:00`);
  return d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });
};

const isoPlus = (days) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${m}-${day}`;
};


let revealIO = null;

function observeReveals() {
  const els = document.querySelectorAll('.rv:not(.in)');
  if (!('IntersectionObserver' in window)) {
    els.forEach((e) => e.classList.add('in'));
    return;
  }
  if (!revealIO) {
    revealIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            revealIO.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );
  }
  els.forEach((e) => revealIO.observe(e));
}

function useReveal() {
  useEffect(() => {
    observeReveals();
  });
}

function Pic({ src, alt, fallback, className = '', eager = false }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) return <div className={`pic ${className}`}>{fallback}</div>;
  return <img className={`pic ${className}`} src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} onError={() => setFailed(true)} />;
}



const CUSTOM_HELLO = 'Hello, I would like a custom order. The occasion is: ';

function Header() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const on = () => setSolid(window.scrollY > window.innerHeight - 100);
    on();
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    return () => {
      window.removeEventListener('scroll', on);
      window.removeEventListener('resize', on);
    };
  }, []);

  const links = [
    ['Our bakes', '#menu'],
    ['Full menu', '#full'],
    ['Visit', '#visit'],
  ];

  return (
    <header className={`hd ${solid ? 'solid' : ''} ${open ? 'open' : ''}`}>
      <div className="wrap hd-in">
        <a href="#top" className="logo" onClick={() => setOpen(false)}>
          <span className="logo-mark">H</span>
          <span className="logo-name">{BRAND.name}</span>
        </a>
        <nav className="nav" aria-label="Main">
          {links.map(([t, h]) => (
            <a key={h} href={h}>{t}</a>
          ))}
        </nav>
        <div className="hd-actions">
          <a href="#menu" className="btn btn-berry hd-order" onClick={() => setOpen(false)}>
            <span>Order now</span>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 5v14M6 13l6 6 6-6" /></svg>
          </a>
          <button className="burger" onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open}>
            <i /><i />
          </button>
        </div>
      </div>
      <div className="sheet">
        {links.map(([t, h]) => (
          <a key={h} href={h} onClick={() => setOpen(false)}>{t}</a>
        ))}
        <a href="#menu" className="btn btn-berry" onClick={() => setOpen(false)}>Order now</a>
      </div>
    </header>
  );
}

const ALL_ITEMS = GROUPS.flatMap((g) => g.items.map((it) => ({ ...it, group: g })));
const byId = (id) => ALL_ITEMS.find((x) => x.id === id);
const HERO_ITEMS = ['doughnut', 'sourdough', 'cookies', 'slice', 'croissant', 'cupcakes'].map(byId);
const FEATURED = ['doughnut', 'croissant', 'sourdough', 'slice', 'cupcakes', 'cookies', 'baguette', 'bagels'].map(byId);

const ITEM_COLOR = {
  baguette: '#b8842f', sourdough: '#9a6a2e', multigrain: '#7a5a35', rolls: '#c4803a', buns: '#b5702e', bagels: '#a36a3a',
  croissant: '#c27a1f', cinnamon: '#a8562f', danish: '#d1693f', muffin: '#5b57a8', scone: '#a0624a', doughnut: '#d6456b',
  slice: '#c9577a', cupcakes: '#d65f8c', cheesecake: '#d98a9a', tart: '#d9534f', cookies: '#8a5530', brownies: '#5a3322',
  quiche: '#c99a2e', pie: '#b0702d', sausage: '#a85a30', scroll: '#d08a2a', coffee: '#5a3a26', juice: '#e07a1f',
};
const itemColor = (id) => ITEM_COLOR[id] || '#b8842f';

function Photo({ item, flavor }) {
  const kind = KIND[item.id];
  const c = flavorColor(flavor || item.flavors[0]);
  return (
    <Pic
      src={`/images/${item.id}.jpg`}
      alt={item.name}
      fallback={<div className="ph-fb"><Glyph kind={kind} color={kind === 'loaf' || kind === 'roll' ? crust(c) : c} alt={kind === 'croissant' ? '#c98030' : '#e0a45a'} /></div>}
    />
  );
}

const HERO_MS = 5200;

function Hero() {
  const n = HERO_ITEMS.length;
  const [idx, setIdx] = useState(0);
  const [still, setStill] = useState(false);

  useEffect(() => {
    setStill(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useEffect(() => {
    if (still) return undefined;
    const t = setTimeout(() => setIdx((idx + 1) % n), HERO_MS);
    return () => clearTimeout(t);
  }, [idx, still, n]);

  return (
    <section className="hero" id="top">
      <div className="hero-bg" aria-hidden="true">
        {HERO_ITEMS.map((it, i) => (
          <div key={it.id} className={`hb ${i === idx ? 'on' : ''}`}>
            <Pic
              src={`/images/${it.id}.jpg`}
              alt=""
              eager
              fallback={<div className="hb-fb" style={{ background: itemColor(it.id) }} />}
            />
          </div>
        ))}
        <div className="hero-shade" />
      </div>

      <div className="wrap hero-in">
        <div className="hero-copy">
          <p className="pill hi" style={{ '--n': 0 }}><i /> Fresh from the oven, {BRAND.area}</p>
          <h1>
            <span className="ln"><span className="hi" style={{ '--n': 1 }}>Baked slowly.</span></span>
            <span className="ln"><em className="hi" style={{ '--n': 2 }}>Shared happily.</em></span>
          </h1>
          <p className="lead hi" style={{ '--n': 3 }}>
            Bread, pastries and cakes made every morning, plus custom orders for the days that matter.
          </p>
          <div className="hero-cta hi" style={{ '--n': 4 }}>
            <a href="#menu" className="btn btn-berry">See what is baking</a>
            <a href="#full" className="btn btn-line">Full menu</a>
          </div>
        </div>
      </div>

    </section>
  );
}

function Product({ item, index }) {
  const [flavor, setFlavor] = useState(item.flavors[0]);
  const color = itemColor(item.id);
  const message = `Hello, I would like to order: ${item.name} (${flavor}). Is it available today?`;
  const no = String(index + 1).padStart(2, '0');
  const flip = index % 2 === 1;

  return (
    <article className={`fp ${flip ? 'flip' : ''}`} style={{ '--c': color, '--dir': flip ? -1 : 1 }}>
      <div className="fp-photo">
        <div className="fp-block" aria-hidden="true" />
        <div className="fp-img">
          <Photo item={item} flavor={flavor} />
        </div>
      </div>

      <div className="fp-copy">
        <p className="fp-cat" style={{ '--i': 0 }}><b>{no}</b>{item.group.short}</p>
        <h3 className="fp-name" style={{ '--i': 1 }}>{item.name}</h3>
        <p className="fp-desc" style={{ '--i': 2 }}>{item.desc}</p>
        <div className="fp-chips" role="group" aria-label={`${item.name} flavours`} style={{ '--i': 3 }}>
          {item.flavors.map((f) => (
            <button key={f} type="button" className={f === flavor ? 'on' : ''} aria-pressed={f === flavor} onClick={() => setFlavor(f)}>
              {f}
            </button>
          ))}
        </div>
        <div className="fp-foot" style={{ '--i': 4 }}>
          <strong>{money(item.price)}</strong>
          <a href={waLink(message)} target="_blank" rel="noreferrer" className="btn fp-btn">
            <WaIcon />
            Order on WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
}

function Products() {
  return (
    <section className="products" id="menu">
      <div className="wrap">
        <div className="pr-head rv">
          <p className="eyebrow">Baked this morning</p>
          <h2>Pick a favourite, <em>we will wrap it up.</em></h2>
          <p className="lead">Choose a flavour, tap order and it goes straight to us on WhatsApp.</p>
        </div>
        {FEATURED.map((it, i) => (
          <Product key={it.id} item={it} index={i} />
        ))}
      </div>
    </section>
  );
}

function FullMenu() {
  return (
    <section className="full" id="full">
      <div className="wrap">
        <div className="pr-head rv">
          <p className="eyebrow">Everything we bake</p>
          <h2>The full menu</h2>
        </div>
        <div className="fm-grid">
          {GROUPS.map((g) => (
            <div key={g.id} className="fm-col rv">
              <h4>{g.title}</h4>
              <ul>
                {g.items.map((it) => (
                  <li key={it.id}>
                    <a href={waLink(`Hello, I would like to order: ${it.name}.`)} target="_blank" rel="noreferrer">
                      <span>{it.name}</span>
                      <i />
                      <b>{money(it.price)}</b>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Closing() {
  return (
    <section className="closing">
      <div className="wrap">
        <div className="cl-card rv">
          <div>
            <p className="eyebrow">Planning something bigger?</p>
            <h2>Custom cakes and <em>party orders</em></h2>
            <p className="lead">Graduations, birthdays, weddings or an office treat. Tell us the date and what you have in mind and we will take it from there. Please order {BRAND.cakeLeadDays} days ahead for cakes.</p>
          </div>
          <a href={waLink(CUSTOM_HELLO)} target="_blank" rel="noreferrer" className="btn btn-wa cl-btn">
            <WaIcon />
            Start a custom order
          </a>
        </div>
      </div>
    </section>
  );
}

const DAY_INDEX = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

const clockText = (h) => `${h % 12 === 0 ? 12 : h % 12}:00 ${h < 12 ? 'am' : 'pm'}`;

function openStatus() {
  const parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Africa/Nairobi', weekday: 'short', hour: 'numeric', minute: 'numeric', hourCycle: 'h23' }).formatToParts(new Date());
  const get = (t) => parts.find((p) => p.type === t).value;
  const day = DAY_INDEX[get('weekday')];
  const mins = Number(get('hour')) * 60 + Number(get('minute'));
  const [open, close] = BRAND.schedule[day];
  if (mins >= open * 60 && mins < close * 60) return { on: true, text: `Open now, until ${clockText(close)}` };
  if (mins < open * 60) return { on: false, text: `Closed now, opens today at ${clockText(open)}` };
  return { on: false, text: `Closed now, opens tomorrow at ${clockText(BRAND.schedule[(day + 1) % 7][0])}` };
}

function Footer() {
  const [status, setStatus] = useState(openStatus);

  useEffect(() => {
    const t = setInterval(() => setStatus(openStatus()), 60000);
    return () => clearInterval(t);
  }, []);

  return (
    <footer className="ft" id="visit">
      <div className="wrap ft-in">
        <div>
          <a href="#top" className="logo">
            <span className="logo-mark">H</span>
            <span className="logo-name">{BRAND.name}</span>
          </a>
          <p>{BRAND.tagline}</p>
        </div>
        <div>
          <h4>Opening hours</h4>
          <p className={`ft-status ${status.on ? 'on' : ''}`}><i />{status.text}</p>
          {BRAND.hours.map(([d, h]) => (
            <p key={d} className="ft-row"><span>{d}</span>{h}</p>
          ))}
        </div>
        <div>
          <h4>Find us</h4>
          <p>{BRAND.address}</p>
          <p><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${BRAND.name} ${BRAND.area}`)}`} target="_blank" rel="noreferrer">Get directions</a></p>
          <p><a href={`tel:+${BRAND.whatsapp}`}>{BRAND.phoneDisplay}</a></p>
          <p><a href={`https://instagram.com/${BRAND.instagram}`} target="_blank" rel="noreferrer">@{BRAND.instagram}</a></p>
        </div>
        <p className="copy">© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</p>
      </div>
    </footer>
  );
}

function WaIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.95L2 22l5.2-1.5A9.95 9.95 0 1 0 12.04 2zm0 1.8a8.14 8.14 0 1 1-4.2 15.1l-.3-.18-3.1.9.9-3-.2-.32A8.14 8.14 0 0 1 12.04 3.8zm-3.2 4.2c-.2 0-.5.07-.75.35-.25.27-.97.95-.97 2.3s1 2.7 1.13 2.9c.14.18 1.95 3.1 4.8 4.2 2.37.93 2.85.75 3.37.7.52-.05 1.67-.68 1.9-1.34.24-.66.24-1.22.17-1.34-.07-.12-.26-.2-.55-.34-.28-.14-1.67-.82-1.93-.92-.26-.1-.45-.14-.64.14-.19.28-.73.92-.9 1.1-.16.2-.33.22-.6.08-.3-.14-1.2-.44-2.28-1.4-.84-.75-1.4-1.67-1.57-1.95-.16-.28 0-.43.13-.57.13-.13.28-.33.42-.5.14-.16.19-.28.28-.47.1-.19.05-.35-.02-.5-.07-.14-.63-1.55-.88-2.1-.2-.5-.42-.5-.6-.5h-.5z" />
    </svg>
  );
}

const clamp01 = (v) => Math.min(1, Math.max(0, v));

function useScrollFx() {
  useLayoutEffect(() => {
    const hero = document.querySelector('.hero');
    const cards = [...document.querySelectorAll('.fp')].map((el) => ({ el, e: null, p: null }));
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const heroState = { hp: 0 };
    let raf = 0;
    let last = 0;

    const ease = (cur, target, k) => (cur === null ? target : cur + (target - cur) * k);

    const frame = (now) => {
      const dt = Math.min(0.05, last ? (now - last) / 1000 : 0.016);
      last = now;
      const k = reduce ? 1 : 1 - Math.exp(-dt * 6);
      const vh = window.innerHeight;
      const amp = window.innerWidth < 860 ? 0.5 : 1;
      let moving = false;

      const hpT = reduce ? 0 : clamp01(window.scrollY / (vh * 1.1));
      heroState.hp = ease(heroState.hp, hpT, k);
      if (Math.abs(heroState.hp - hpT) > 0.0006) moving = true;
      else heroState.hp = hpT;
      if (hero) hero.style.setProperty('--hp', heroState.hp.toFixed(4));

      cards.forEach((c) => {
        const r = c.el.getBoundingClientRect();
        const eT = reduce ? 1 : clamp01((vh - r.top) / (vh * 0.8));
        const pT = reduce ? 0.5 : clamp01((vh - r.top) / (vh + r.height));
        c.e = ease(c.e, eT, k);
        c.p = ease(c.p, pT, k);
        if (Math.abs(c.e - eT) > 0.0006 || Math.abs(c.p - pT) > 0.0006) moving = true;
        else {
          c.e = eT;
          c.p = pT;
        }
        c.el.style.setProperty('--e', c.e.toFixed(4));
        c.el.style.setProperty('--p', c.p.toFixed(4));
        c.el.style.setProperty('--amp', reduce ? '0' : String(amp));
      });

      raf = moving ? requestAnimationFrame(frame) : 0;
      if (!moving) last = 0;
    };

    const wake = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };

    frame(performance.now());
    window.addEventListener('scroll', wake, { passive: true });
    window.addEventListener('resize', wake);
    return () => {
      window.removeEventListener('scroll', wake);
      window.removeEventListener('resize', wake);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
}

export default function App() {
  useReveal();
  useScrollFx();

  return (
    <>
      <Header />
      <main className="main">
        <Hero />
        <Products />
        <FullMenu />
        <Closing />
      </main>
      <Footer />
    </>
  );
}
