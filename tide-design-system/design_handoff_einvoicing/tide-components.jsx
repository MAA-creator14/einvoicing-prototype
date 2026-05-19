// tide-components.jsx — atomic UI used across the Tide app kit.

const TIDE = {
  blue: '#2B59FF',
  bluePress: '#1C3FCC',
  blueDeep: '#00224F',
  blueLogo: '#4050FB',
  blueSoft: '#D6E0FF',
  blueSofter: '#EDF1FF',
  bg: '#F0F2F8',
  surface: '#FFFFFF',
  ink: '#0B1B3B',
  ink2: '#283656',
  ink3: '#5F6B85',
  ink4: '#8A95AE',
  divider: '#E2E6F0',
  mint: '#5BC8B0',
  notify: '#E2273A',
};

const FONT = 'Mulish, "GT Walsheim", -apple-system, system-ui, sans-serif';

// ─── Tide screen header — back arrow + sentence-case title ───
function TideHeader({ title, onBack, right }) {
  return (
    <div style={{
      background: TIDE.surface,
      padding: '12px 18px 14px',
      display: 'flex', alignItems: 'center', gap: 16,
      borderBottom: `1px solid ${TIDE.divider}`,
    }}>
      {onBack !== undefined && (
        <button onClick={onBack} aria-label="Back" style={{
          background: 'transparent', border: 0, padding: 4, cursor: 'pointer', color: TIDE.ink,
        }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
          </svg>
        </button>
      )}
      <div style={{ fontFamily: FONT, fontSize: 20, fontWeight: 700, color: TIDE.ink, flex: 1 }}>
        {title}
      </div>
      {right}
    </div>
  );
}

// ─── Tide pill button ───
function TideButton({ children, variant = 'primary', onClick, disabled, full, small, icon, style }) {
  const palette = {
    primary: { bg: disabled ? '#C4CBDB' : TIDE.blue, fg: '#fff', border: 'transparent' },
    secondary: { bg: TIDE.surface, fg: TIDE.blue, border: TIDE.blue },
    ghost: { bg: 'transparent', fg: TIDE.blue, border: 'transparent' },
  }[variant];
  return (
    <button onClick={disabled ? undefined : onClick} disabled={disabled} style={{
      fontFamily: FONT, fontWeight: 700,
      fontSize: small ? 14 : 16,
      background: palette.bg, color: palette.fg,
      border: `1px solid ${palette.border}`,
      borderRadius: 999,
      padding: small ? '8px 18px' : '15px 26px',
      width: full ? '100%' : undefined,
      cursor: disabled ? 'not-allowed' : 'pointer',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
      transition: 'background 120ms',
      ...style,
    }}>
      {icon}{children}
    </button>
  );
}

// ─── Tide form field ───
function TideField({ label, optional, children, value, onChange, placeholder, type = 'text', suffix }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
      <label style={{ fontFamily: FONT, fontSize: 16, fontWeight: 700, color: TIDE.ink }}>
        {label}{optional && <span style={{ color: TIDE.ink3, fontWeight: 400 }}> — optional</span>}
      </label>
      <div style={{
        position: 'relative', background: TIDE.surface, borderRadius: 14,
      }}>
        {children ?? (
          <input type={type} value={value ?? ''} onChange={onChange} placeholder={placeholder} style={{
            width: '100%', boxSizing: 'border-box',
            background: 'transparent', border: 0, outline: 0,
            padding: '18px 18px', borderRadius: 14,
            fontFamily: FONT, fontSize: 17, color: TIDE.ink,
          }}/>
        )}
        {suffix && <div style={{ position: 'absolute', right: 18, top: '50%', transform: 'translateY(-50%)' }}>{suffix}</div>}
      </div>
    </div>
  );
}

// ─── Select-style field (with caret) ───
function TideSelect({ label, optional, value, options = [], onChange }) {
  return (
    <TideField label={label} optional={optional} suffix={(
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={TIDE.blue} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="6 9 12 15 18 9"/>
      </svg>
    )}>
      <select value={value} onChange={onChange} style={{
        width: '100%', appearance: 'none', WebkitAppearance: 'none',
        background: 'transparent', border: 0, outline: 0,
        padding: '18px 50px 18px 18px', borderRadius: 14,
        fontFamily: FONT, fontSize: 17, color: TIDE.ink, fontWeight: 600,
      }}>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </TideField>
  );
}

// ─── Deep navy hero balance card with Swell motif ───
function BalanceCard({ name = 'Tide Current Account', amount = '£2,954.01', onDetails }) {
  return (
    <div style={{
      position: 'relative', overflow: 'hidden',
      background: TIDE.blueDeep, borderRadius: 20,
      color: '#fff', padding: '20px 22px', minHeight: 152,
      fontFamily: FONT,
    }}>
      <svg viewBox="0 0 600 200" preserveAspectRatio="xMaxYMid slice"
           style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <defs><clipPath id="bcclip"><rect width="600" height="200" rx="20"/></clipPath></defs>
        <g clipPath="url(#bcclip)">
          <path d="M 600 -40 L 720 -40 L 480 240 L 360 240 Z" fill="#0B3A85" opacity="0.55"/>
          <path d="M 600 -40 L 640 -40 L 400 240 L 360 240 Z" fill="#0A2E66" opacity="0.95"/>
          <path d="M 600 60 L 660 60 L 460 340 L 400 340 Z" fill="#001A3D"/>
          <path d="M 600 100 L 650 100 L 480 340 L 430 340 Z" fill="#0B3A85" opacity="0.5"/>
        </g>
      </svg>
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
        <span style={{
          width: 26, height: 26, borderRadius: '50%', background: TIDE.blue,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 10, fontWeight: 800, letterSpacing: '-0.02em', flexShrink: 0,
        }}>tide</span>
        <span style={{ fontWeight: 700, fontSize: 15, whiteSpace: 'nowrap' }}>{name}</span>
        <span onClick={onDetails} style={{ marginLeft: 'auto', fontWeight: 700, fontSize: 15, cursor: 'pointer', whiteSpace: 'nowrap' }}>Details ›</span>
      </div>
      <div style={{
        position: 'relative', zIndex: 2,
        fontSize: 42, fontWeight: 800, letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums',
      }}>{amount}</div>
    </div>
  );
}

// ─── Quick-action solid-blue disc ───
function QuickAction({ icon, label, onClick }) {
  return (
    <button onClick={onClick} style={{
      background: 'transparent', border: 0, padding: 0, cursor: 'pointer',
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, flex: 1,
    }}>
      <div style={{
        width: 56, height: 56, borderRadius: '50%', background: TIDE.blue,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      }}>{icon}</div>
      <span style={{ fontFamily: FONT, fontWeight: 700, fontSize: 14, color: TIDE.ink }}>{label}</span>
    </button>
  );
}

// SVG icon set for quick-actions etc — stroke style, white
const Ic = {
  send: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>,
  receive: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>,
  reader: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="6" width="10" height="14" rx="2"/><rect x="13" y="3" width="8" height="11" rx="2"/></svg>,
  card: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="13" rx="2"/><line x1="2" y1="11" x2="22" y2="11"/></svg>,
  search: c => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  chat: c => <svg width="22" height="22" viewBox="0 0 24 24" fill={c} stroke={c} strokeWidth="1.5" strokeLinejoin="round"><path d="M3 6a2 2 0 012-2h14a2 2 0 012 2v9a2 2 0 01-2 2H10l-5 4v-4H5a2 2 0 01-2-2V6z"/><circle cx="8" cy="10.5" r="0.9" fill="#fff"/><circle cx="12" cy="10.5" r="0.9" fill="#fff"/><circle cx="16" cy="10.5" r="0.9" fill="#fff"/></svg>,
  back: c => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>,
  chevR: c => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>,
  plus: c => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  close: c => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg>,
  list: c => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>,
};

// ─── Bottom tab bar ───
const TabIcons = {
  Home: on => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={on ? TIDE.blue : TIDE.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/></svg>,
  Payments: on => on
    ? (<svg width="24" height="24" viewBox="0 0 24 24" fill={TIDE.blue} stroke={TIDE.blue} strokeWidth="1.4" strokeLinejoin="round"><rect x="3" y="7" width="14" height="11" rx="2" fill="#fff" stroke={TIDE.blue}/><rect x="7" y="4" width="14" height="11" rx="2"/></svg>)
    : (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={TIDE.ink3} strokeWidth="2" strokeLinejoin="round"><rect x="3" y="7" width="14" height="11" rx="2"/><rect x="7" y="4" width="14" height="11" rx="2"/></svg>),
  Sales: on => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={on ? TIDE.blue : TIDE.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 8h14l-1 12H6L5 8z"/><path d="M9 8a3 3 0 016 0"/></svg>,
  Admin: on => on
    ? (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={TIDE.blue} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7a2 2 0 012-2h5l2 2h7a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" fill={TIDE.blueSofter}/></svg>)
    : (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={TIDE.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7a2 2 0 012-2h5l2 2h7a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"/></svg>),
  Finance: on => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={on ? TIDE.blue : TIDE.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20s-7-4-7-10a5 5 0 017-4.58A5 5 0 0119 10c0 6-7 10-7 10z"/><path d="M12 11v9"/></svg>,
};

function BottomNav({ active, onSelect }) {
  const tabs = ['Home', 'Payments', 'Sales', 'Admin', 'Finance'];
  return (
    <div style={{
      background: '#fff', padding: '10px 6px 22px',
      display: 'flex', borderTop: `1px solid ${TIDE.divider}`,
    }}>
      {tabs.map(t => {
        const on = active === t;
        return (
          <button key={t} onClick={() => onSelect && onSelect(t)} style={{
            flex: 1, background: 'transparent', border: 0, padding: '6px 0',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
            cursor: 'pointer',
          }}>
            {TabIcons[t](on)}
            <span style={{
              fontFamily: FONT, fontSize: 11, fontWeight: 700,
              color: on ? TIDE.blue : TIDE.ink3,
            }}>{t}</span>
          </button>
        );
      })}
    </div>
  );
}

Object.assign(window, {
  TIDE, FONT, Ic,
  TideHeader, TideButton, TideField, TideSelect,
  BalanceCard, QuickAction, BottomNav,
});
