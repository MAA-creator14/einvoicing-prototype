'use client';

import { useAppState } from '@/lib/AppContext';

export default function Toast() {
  const { toast } = useAppState();

  if (!toast) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: 96,
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 1000,
      background: 'var(--ds-ink)',
      color: '#fff',
      borderRadius: 'var(--ds-radius-pill)',
      padding: '12px 20px',
      fontWeight: 700,
      fontSize: 'var(--ds-fs-meta)',
      maxWidth: 360,
      width: 'calc(100% - 32px)',
      textAlign: 'center',
      boxShadow: 'var(--ds-shadow-3)',
      animation: 'tideSlideUp 220ms var(--ds-ease-out)',
      display: 'flex',
      alignItems: 'center',
      gap: 10,
    }}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--ds-mint)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
        <polyline points="20 6 9 17 4 12"/>
      </svg>
      {toast}
    </div>
  );
}
