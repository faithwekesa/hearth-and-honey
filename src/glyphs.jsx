export const KIND = {
  baguette: 'loaf',
  sourdough: 'loaf',
  multigrain: 'loaf',
  rolls: 'roll',
  buns: 'roll',
  bagels: 'donut',
  croissant: 'croissant',
  cinnamon: 'roll',
  danish: 'tart',
  muffin: 'muffin',
  scone: 'roll',
  doughnut: 'donut',
  slice: 'cake',
  cupcakes: 'muffin',
  cheesecake: 'cake',
  tart: 'tart',
  cookies: 'cookie',
  brownies: 'cookie',
  quiche: 'tart',
  pie: 'pie',
  sausage: 'loaf',
  scroll: 'roll',
  coffee: 'cup',
  juice: 'glass',
};

const circ = (cx, cy, r) => `M${cx - r} ${cy}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0z`;

function Floor() {
  return <ellipse cx="60" cy="104" rx="38" ry="5" fill="#2b1810" opacity=".09" />;
}

export function Glyph({ kind, color = '#e8b46a', alt = '#e0a45a' }) {
  const p = { viewBox: '0 0 120 120', className: 'glyph', 'aria-hidden': true };
  switch (kind) {
    case 'loaf':
      return (
        <svg {...p}>
          <Floor />
          <path d="M10 80C10 52 34 36 60 36s50 16 50 44c0 10-10 16-50 16S10 90 10 80z" fill={color} />
          <path d="M34 48l10 22M56 44l10 26M78 48l10 22" stroke="#fff" strokeOpacity=".6" strokeWidth="6" strokeLinecap="round" />
        </svg>
      );
    case 'roll':
      return (
        <svg {...p}>
          <Floor />
          <circle cx="60" cy="64" r="36" fill={color} />
          <path d="M40 50c8-8 24-8 32 0M36 66c10 8 38 8 48 0" stroke="#fff" strokeOpacity=".55" strokeWidth="5" strokeLinecap="round" fill="none" />
        </svg>
      );
    case 'croissant':
      return (
        <svg {...p}>
          <Floor />
          {[
            [22, 76, -58, 9, 15],
            [34, 58, -38, 11, 18],
            [50, 48, -14, 12, 20],
            [70, 48, 14, 12, 20],
            [86, 58, 38, 11, 18],
            [98, 76, 58, 9, 15],
          ].map(([x, y, r, rx, ry], i) => (
            <ellipse key={i} cx={x} cy={y + 8} rx={rx} ry={ry} transform={`rotate(${r} ${x} ${y + 8})`} fill={i % 2 ? alt : color} />
          ))}
        </svg>
      );
    case 'donut':
      return (
        <svg {...p}>
          <Floor />
          <path fillRule="evenodd" d={`${circ(60, 60, 44)}${circ(60, 60, 13)}`} fill={alt} />
          <path fillRule="evenodd" d={`${circ(60, 58, 41)}${circ(60, 58, 13)}`} fill={color} />
          {[
            [34, 44, 30],
            [48, 28, -20],
            [78, 32, 40],
            [88, 52, -30],
            [86, 76, 20],
            [64, 86, -40],
            [38, 74, 55],
            [26, 58, -10],
          ].map(([x, y, r], i) => (
            <rect key={i} x={x - 5} y={y - 1.5} width="10" height="3" rx="1.5" transform={`rotate(${r} ${x} ${y})`} fill={['#fff', '#ff4f78', '#ffd45e', '#5b6cff'][i % 4]} />
          ))}
        </svg>
      );
    case 'muffin':
      return (
        <svg {...p}>
          <Floor />
          <path d="M32 70h56l-8 32H40z" fill="#ff9db5" />
          <path d="M26 72C18 42 40 24 60 24s42 18 34 48z" fill={color} />
          <path d="M42 40c6-6 14-8 22-6" stroke="#fff" strokeOpacity=".6" strokeWidth="5" strokeLinecap="round" fill="none" />
          <circle cx="60" cy="22" r="6" fill="#d71f3c" />
        </svg>
      );
    case 'cake':
      return (
        <svg {...p}>
          <Floor />
          <rect x="16" y="72" width="88" height="22" rx="5" fill={alt} />
          <rect x="16" y="64" width="88" height="9" fill="#fff" />
          <rect x="16" y="46" width="88" height="19" rx="5" fill={alt} />
          <path d="M12 46c0-10 12-14 48-14s48 4 48 14c0 6-8 8-12 4-4 6-10 6-14 0-4 6-10 6-14 0-4 6-10 6-14 0-4 6-10 6-14 0-4 4-12 2-12-4z" fill={color} />
          <circle cx="60" cy="28" r="6" fill="#d71f3c" />
        </svg>
      );
    case 'pie':
      return (
        <svg {...p}>
          <Floor />
          <ellipse cx="60" cy="66" rx="46" ry="34" fill={alt} />
          <ellipse cx="60" cy="64" rx="36" ry="25" fill={color} />
          <g stroke={alt} strokeWidth="6" strokeLinecap="round">
            <path d="M34 54l52 22M42 46l48 22M32 66l40 16M50 40l34 14" />
            <path d="M86 54L34 76M78 46L30 68M88 66L48 82M70 40L36 54" />
          </g>
        </svg>
      );
    case 'cookie':
      return (
        <svg {...p}>
          <Floor />
          <circle cx="60" cy="62" r="42" fill={alt} />
          {[
            [44, 48],
            [72, 44],
            [58, 66],
            [82, 70],
            [38, 76],
            [64, 88],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="6" fill={color} />
          ))}
        </svg>
      );
    case 'tart':
      return (
        <svg {...p}>
          <Floor />
          <circle cx="60" cy="62" r="44" fill={alt} />
          <circle cx="60" cy="62" r="34" fill="#fff4dc" />
          {[
            [48, 50],
            [70, 50],
            [60, 66],
            [44, 72],
            [76, 72],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="8" fill={color} />
          ))}
        </svg>
      );
    case 'cup':
      return (
        <svg {...p}>
          <Floor />
          <path d="M28 50h54v24c0 16-10 26-27 26S28 90 28 74z" fill="#fff" stroke="#2b1810" strokeWidth="3" />
          <path d="M82 58h6a11 11 0 0 1 0 22h-8" stroke="#2b1810" strokeWidth="3" fill="none" />
          <ellipse cx="55" cy="52" rx="25" ry="6" fill={color} />
          <path d="M44 38c-4-6 4-8 0-14M58 38c-4-6 4-8 0-14M70 38c-4-6 4-8 0-14" stroke="#2b1810" strokeOpacity=".35" strokeWidth="3" strokeLinecap="round" fill="none" />
        </svg>
      );
    case 'glass':
      return (
        <svg {...p}>
          <Floor />
          <path d="M34 34h52l-6 64H40z" fill="#fff" fillOpacity=".7" stroke="#2b1810" strokeWidth="3" />
          <path d="M37 52h46l-4 46H41z" fill={color} />
          <path d="M70 18l-8 36" stroke="#ff4f78" strokeWidth="5" strokeLinecap="round" />
          <circle cx="86" cy="34" r="9" fill={color} stroke="#fff" strokeWidth="3" />
        </svg>
      );
    default:
      return null;
  }
}

export function CakeGlyph({ tiers = 2, topper = 'candles', accent = '#ff4f78', body = '#fff6e9' }) {
  const widths = [72, 54, 38];
  const th = 20;
  const parts = [];
  let y = 98;
  for (let i = 0; i < tiers; i += 1) {
    const w = widths[i];
    parts.push(
      <g key={i}>
        <rect x={60 - w / 2} y={y - th} width={w} height={th} rx="4" fill={body} />
        <rect x={60 - w / 2} y={y - th + 7} width={w} height="5" fill={accent} />
        <path d={`M${60 - w / 2} ${y - th}c0-4 6-6 ${w / 2}-6s${w / 2} 2 ${w / 2} 6`} fill={accent} opacity=".9" />
      </g>
    );
    y -= th;
  }
  const top = y - 6;
  let deco = null;
  if (topper === 'cap') {
    deco = (
      <g>
        <rect x="46" y={top - 8} width="28" height="9" rx="2" fill="#1f1f33" />
        <path d={`M60 ${top - 24}l26 11-26 11-26-11z`} fill="#1f1f33" />
        <path d={`M82 ${top - 13}v14`} stroke="#ffd45e" strokeWidth="3" strokeLinecap="round" />
      </g>
    );
  } else if (topper === 'candles') {
    deco = (
      <g>
        {[48, 60, 72].map((x, i) => (
          <g key={x}>
            <rect x={x - 3} y={top - 18} width="6" height="18" rx="2" fill={['#5b6cff', '#ffd45e', '#4fc47f'][i]} />
            <ellipse cx={x} cy={top - 23} rx="3.5" ry="5" fill="#ffb21e" />
          </g>
        ))}
      </g>
    );
  } else if (topper === 'flowers') {
    deco = (
      <g>
        {[46, 54, 66, 74].map((x, i) => (
          <circle key={x} cx={x} cy={top - 4 - (i % 2) * 5} r="6" fill={i % 2 ? '#ff9db5' : '#ffffff'} stroke="#f3c6d2" />
        ))}
        <circle cx="60" cy={top - 8} r="8" fill="#ff6f96" />
      </g>
    );
  } else if (topper === 'star') {
    deco = <path d={`M60 ${top - 30}l5 12 13 1-10 8 4 13-12-7-12 7 4-13-10-8 13-1z`} fill="#ffd45e" />;
  } else if (topper === 'heart') {
    deco = <path d={`M60 ${top}c-22-12-18-28-6-28 5 0 6 4 6 4s1-4 6-4c12 0 16 16-6 28z`} fill="#fff" />;
  } else {
    deco = <rect x="42" y={top - 10} width="36" height="10" rx="2" fill="#e6b422" />;
  }
  return (
    <svg viewBox="0 0 120 120" className="glyph" aria-hidden="true">
      <ellipse cx="60" cy="104" rx="46" ry="5" fill="#2b1810" opacity=".12" />
      <rect x="14" y="98" width="92" height="5" rx="2.5" fill="#fff" />
      {parts}
      {deco}
    </svg>
  );
}

export function Garnish({ kind }) {
  const p = { viewBox: '0 0 80 80', className: 'glyph', 'aria-hidden': true };
  switch (kind) {
    case 'pistachio':
      return (
        <svg {...p}>
          <ellipse cx="40" cy="40" rx="20" ry="27" transform="rotate(35 40 40)" fill="#e3d3ad" />
          <ellipse cx="40" cy="40" rx="12" ry="19" transform="rotate(35 40 40)" fill="#9fcf6b" />
          <path d="M33 26c4 6 6 14 4 26" stroke="#e3d3ad" strokeWidth="2" fill="none" transform="rotate(35 40 40)" />
        </svg>
      );
    case 'strawberry':
      return (
        <svg {...p}>
          <path d="M40 72C16 56 12 34 23 25c6-4 13-2 17 4 4-6 11-8 17-4 11 9 7 31-17 47z" fill="#e5384f" />
          <path d="M28 24l12 6 12-6-6-8-6 4-6-4z" fill="#4fa34a" />
          {[[30, 40], [44, 38], [37, 50], [50, 50], [32, 58], [44, 62]].map(([x, y], i) => (
            <ellipse key={i} cx={x} cy={y} rx="1.8" ry="2.6" fill="#ffd9a0" />
          ))}
        </svg>
      );
    case 'blueberry':
      return (
        <svg {...p}>
          <circle cx="40" cy="42" r="26" fill="#4a56c9" />
          <circle cx="40" cy="42" r="26" fill="#8d97ff" opacity=".25" />
          <path d="M40 30l5 6h-10zM33 36l-4 5M47 36l4 5" stroke="#2c3490" strokeWidth="3" strokeLinecap="round" fill="none" />
          <ellipse cx="31" cy="32" rx="6" ry="3.5" fill="#fff" opacity=".35" transform="rotate(-30 31 32)" />
        </svg>
      );
    case 'lemon':
      return (
        <svg {...p}>
          <circle cx="40" cy="40" r="32" fill="#ffd84a" />
          <circle cx="40" cy="40" r="27" fill="#fff3a8" />
          <g stroke="#ffd84a" strokeWidth="2.4" strokeLinecap="round">
            <path d="M40 14v52M14 40h52M21 21l38 38M59 21L21 59" />
          </g>
          <circle cx="40" cy="40" r="4" fill="#ffd84a" />
        </svg>
      );
    case 'cranberry':
      return (
        <svg {...p}>
          <circle cx="40" cy="42" r="25" fill="#c4304f" />
          <ellipse cx="31" cy="32" rx="7" ry="4" fill="#fff" opacity=".4" transform="rotate(-30 31 32)" />
          <path d="M40 17c2-5 6-7 9-6" stroke="#4fa34a" strokeWidth="3" strokeLinecap="round" fill="none" />
        </svg>
      );
    case 'raspberry':
      return (
        <svg {...p}>
          {[[30, 30], [46, 30], [24, 44], [40, 42], [56, 44], [32, 58], [48, 58], [40, 70]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="9" fill={i % 2 ? '#e2557a' : '#d63f68'} />
          ))}
          <path d="M30 20l10 6 10-6-5-7-5 3-5-3z" fill="#4fa34a" />
        </svg>
      );
    default:
      return null;
  }
}
