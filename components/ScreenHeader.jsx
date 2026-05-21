'use client';

import { useRouter } from 'next/navigation';

export default function ScreenHeader({ title, leading = 'back', trailing, onBack }) {
  const router = useRouter();

  const handleBack = onBack ?? (() => router.back());

  return (
    <div style={{
      background: 'var(--ds-surface)',
      padding: '12px 18px 14px',
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      borderBottom: '1px solid var(--ds-divider)',
    }}>
      <button
        aria-label={leading === 'close' ? 'Close' : 'Back'}
        onClick={handleBack}
        style={{
          background: 'transparent',
          border: 0,
          padding: 6,
          cursor: 'pointer',
          color: 'var(--ds-ink)',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {leading === 'close' ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
            <line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/>
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
          </svg>
        )}
      </button>
      <div style={{
        fontWeight: 700,
        fontSize: 20,
        color: 'var(--ds-ink)',
        flex: 1,
        letterSpacing: '-0.02em',
      }}>
        {title}
      </div>
      {trailing}
    </div>
  );
}
