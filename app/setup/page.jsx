'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ScreenHeader from '@/components/ScreenHeader';
import Spinner from '@/components/Spinner';
import EinvoiceIllustration from '@/components/EinvoiceIllustration';
import { useAppState } from '@/lib/AppContext';

function Bullet({ children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 'var(--ds-fs-meta)', color: 'var(--ds-ink)', lineHeight: 1.4 }}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--ds-blue)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
        <polyline points="20 6 9 17 4 12"/>
      </svg>
      <span>{children}</span>
    </div>
  );
}

export default function EinvoicingSetupPage() {
  const router = useRouter();
  const { setRegistrationState, showToast } = useAppState();
  const [phase, setPhase] = useState('idle');

  const handleSetup = () => {
    setPhase('loading');
    setRegistrationState('PENDING');

    setTimeout(() => {
      setRegistrationState('REGISTERED');
      showToast('E-invoicing is ready — your invoices will now be delivered automatically');
      router.push('/invoices/new');
    }, 3000);
  };

  return (
    <>
      <ScreenHeader
        title=""
        leading="close"
        onBack={() => phase === 'idle' && router.back()}
      />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '8px 24px 0', overflow: 'auto' }}>
        {/* Illustration */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '20px 0 28px' }}>
          <EinvoiceIllustration />
        </div>

        {/* Headline */}
        <div style={{ fontWeight: 800, fontSize: 'var(--ds-fs-h2)', color: 'var(--ds-ink)', lineHeight: 1.15, letterSpacing: '-0.015em', marginBottom: 14 }}>
          Get paid faster with e-invoicing
        </div>

        {/* Body */}
        <div style={{ fontSize: 'var(--ds-fs-body)', color: 'var(--ds-ink-2)', lineHeight: 1.5, marginBottom: 18 }}>
          Your invoices land directly in your clients' accounting software — no chasing, no manual entry on their end. We'll set this up using your business details. Nothing else needed from you.
        </div>

        {/* Reassurance bullets */}
        <div style={{
          background: 'var(--ds-surface)',
          borderRadius: 18,
          padding: '14px 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          marginBottom: 'auto',
        }}>
          <Bullet>Uses the business details Tide already has — no forms to fill</Bullet>
          <Bullet>Works alongside your usual email invoices</Bullet>
        </div>

        {/* CTAs */}
        <div style={{ padding: '20px 0 8px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {phase === 'idle' ? (
            <>
              <button
                onClick={handleSetup}
                style={{
                  width: '100%',
                  border: 0,
                  borderRadius: 'var(--ds-radius-pill)',
                  padding: '17px 24px',
                  background: 'var(--ds-blue)',
                  color: '#fff',
                  fontWeight: 800,
                  fontSize: 'var(--ds-fs-body)',
                  cursor: 'pointer',
                }}
              >
                Set up e-invoicing
              </button>

              <button
                onClick={() => router.back()}
                style={{
                  width: '100%',
                  border: 0,
                  background: 'transparent',
                  padding: '8px 24px',
                  color: 'var(--ds-blue)',
                  fontWeight: 700,
                  fontSize: 'var(--ds-fs-body-sm)',
                  cursor: 'pointer',
                }}
              >
                Not now
              </button>

              <div style={{ fontSize: 'var(--ds-fs-caption)', color: 'var(--ds-ink-3)', textAlign: 'center', marginTop: -4, marginBottom: 4 }}>
                Usually ready in a few minutes
              </div>
            </>
          ) : (
            <>
              <button
                disabled
                style={{
                  width: '100%',
                  border: 0,
                  borderRadius: 'var(--ds-radius-pill)',
                  padding: '17px 24px',
                  background: 'var(--ds-blue)',
                  color: '#fff',
                  fontWeight: 800,
                  fontSize: 'var(--ds-fs-body)',
                  cursor: 'progress',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 12,
                }}
              >
                <Spinner size={18} color="#fff" />
                <span>Setting up your e-invoicing…</span>
                {/* Indeterminate progress bar */}
                <span style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 3, background: 'rgba(255,255,255,0.18)', overflow: 'hidden' }}>
                  <span style={{ position: 'absolute', top: 0, bottom: 0, width: '40%', background: 'rgba(255,255,255,0.9)', animation: 'tideShimmer 1.4s cubic-bezier(0.4,0,0.2,1) infinite' }} />
                </span>
              </button>

              <div style={{ fontSize: 'var(--ds-fs-caption)', color: 'var(--ds-ink-3)', textAlign: 'center', padding: '4px 24px' }}>
                You can leave this screen — we'll let you know when it's ready
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
