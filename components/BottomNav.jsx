'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabs = [
  {
    label: 'Home',
    href: '/',
    icon: (on) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={on ? 'var(--ds-blue)' : 'var(--ds-ink-3)'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/>
      </svg>
    ),
  },
  {
    label: 'Payments',
    href: '/payments',
    icon: (on) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={on ? 'var(--ds-blue)' : 'var(--ds-ink-3)'} strokeWidth="2" strokeLinejoin="round">
        <rect x="3" y="7" width="14" height="11" rx="2"/><rect x="7" y="4" width="14" height="11" rx="2"/>
      </svg>
    ),
  },
  {
    label: 'Sales',
    href: '/invoices',
    icon: (on) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={on ? 'var(--ds-blue)' : 'var(--ds-ink-3)'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 8h14l-1 12H6L5 8z"/><path d="M9 8a3 3 0 016 0"/>
      </svg>
    ),
  },
  {
    label: 'Admin',
    href: '/admin',
    icon: (on) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={on ? 'var(--ds-blue)' : 'var(--ds-ink-3)'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 7a2 2 0 012-2h5l2 2h7a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"/>
      </svg>
    ),
  },
];

export default function BottomNav() {
  const pathname = usePathname();

  const isActive = (href) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <nav style={{
      background: 'var(--ds-surface)',
      borderTop: '1px solid var(--ds-divider)',
      display: 'flex',
      padding: '10px 6px 22px',
      flexShrink: 0,
    }}>
      {tabs.map((tab) => {
        const on = isActive(tab.href);
        return (
          <Link key={tab.label} href={tab.href} style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
            padding: '6px 0',
          }}>
            {tab.icon(on)}
            <span style={{
              fontSize: 'var(--ds-fs-overline)',
              fontWeight: 700,
              color: on ? 'var(--ds-blue)' : 'var(--ds-ink-3)',
            }}>{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
