'use client';

import { useState } from 'react';
import { useAppState } from '@/lib/AppContext';
import { customers } from '@/data/mockData';

const REG_STATES = ['NOT_REGISTERED', 'PENDING', 'REGISTERED'];

export default function DevPanel() {
  const [open, setOpen] = useState(false);
  const { registrationState, setRegistrationState, activeCustomerId, setActiveCustomerId } = useAppState();

  if (process.env.NODE_ENV !== 'development') return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: 16,
      right: 16,
      zIndex: 9999,
      fontFamily: 'var(--ds-font-sans)',
    }}>
      {open ? (
        <div style={{
          background: 'var(--ds-ink)',
          borderRadius: 16,
          padding: 16,
          width: 260,
          boxShadow: 'var(--ds-shadow-3)',
          color: '#fff',
          animation: 'tideSlideUp 180ms var(--ds-ease-out)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <span style={{ fontWeight: 800, fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ds-mint)' }}>
              Dev Panel
            </span>
            <button onClick={() => setOpen(false)} style={{ background: 'transparent', border: 0, color: 'var(--ds-ink-3)', cursor: 'pointer', padding: 0 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/>
              </svg>
            </button>
          </div>

          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ds-ink-4)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>
              Registration state
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {REG_STATES.map(s => (
                <button key={s} onClick={() => setRegistrationState(s)} style={{
                  background: registrationState === s ? 'var(--ds-blue)' : 'rgba(255,255,255,0.08)',
                  color: '#fff',
                  border: 0,
                  borderRadius: 8,
                  padding: '8px 12px',
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'background 120ms',
                }}>
                  {s === 'NOT_REGISTERED' ? 'A · Not registered' : s === 'PENDING' ? 'B · Pending' : 'C · Registered'}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ds-ink-4)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>
              Active customer
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {customers.map(c => (
                <button key={c.id} onClick={() => setActiveCustomerId(c.id)} style={{
                  background: activeCustomerId === c.id ? 'var(--ds-blue)' : 'rgba(255,255,255,0.08)',
                  color: '#fff',
                  border: 0,
                  borderRadius: 8,
                  padding: '8px 12px',
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'background 120ms',
                }}>
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => { setRegistrationState('NOT_REGISTERED'); setActiveCustomerId('acme'); }}
            style={{
              width: '100%',
              background: 'rgba(255,255,255,0.1)',
              color: 'var(--ds-ink-4)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 8,
              padding: '8px 12px',
              fontWeight: 700,
              fontSize: 12,
              cursor: 'pointer',
            }}
          >
            Reset all state
          </button>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          style={{
            background: 'var(--ds-ink)',
            color: 'var(--ds-mint)',
            border: 0,
            borderRadius: 12,
            padding: '8px 14px',
            fontWeight: 800,
            fontSize: 12,
            cursor: 'pointer',
            letterSpacing: '0.06em',
            boxShadow: 'var(--ds-shadow-3)',
          }}
        >
          DEV
        </button>
      )}
    </div>
  );
}
