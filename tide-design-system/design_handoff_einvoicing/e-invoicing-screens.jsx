// e-invoicing-screens.jsx — three mobile mockups extending Tide's invoice flow.
// Uses tokens + atoms from tide-components.jsx (window.TIDE, FONT, TideButton, ...).

const { useState, useEffect, useRef } = React;

// ─────────────────────────────────────────────────────────────
// iPhone-style status bar (sentence case time, signal/wifi/battery)
// ─────────────────────────────────────────────────────────────
function StatusBar() {
  return (
    <div style={{
      height: 44, padding: '0 22px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: TIDE.surface, color: TIDE.ink,
      fontFamily: '-apple-system, "SF Pro Text", system-ui',
      fontSize: 15, fontWeight: 600,
    }}>
      <span>9:41</span>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
        <svg width="17" height="11" viewBox="0 0 17 11"><rect x="0" y="7" width="3" height="4" rx="0.7" fill={TIDE.ink}/><rect x="4.5" y="5" width="3" height="6" rx="0.7" fill={TIDE.ink}/><rect x="9" y="2.5" width="3" height="8.5" rx="0.7" fill={TIDE.ink}/><rect x="13.5" y="0" width="3" height="11" rx="0.7" fill={TIDE.ink}/></svg>
        <svg width="16" height="11" viewBox="0 0 17 12"><path d="M8.5 3.2C10.8 3.2 12.9 4.1 14.4 5.6L15.5 4.5C13.7 2.7 11.2 1.5 8.5 1.5C5.8 1.5 3.3 2.7 1.5 4.5L2.6 5.6C4.1 4.1 6.2 3.2 8.5 3.2Z" fill={TIDE.ink}/><path d="M8.5 6.8C9.9 6.8 11.1 7.3 12 8.2L13.1 7.1C11.8 5.9 10.2 5.1 8.5 5.1C6.8 5.1 5.2 5.9 3.9 7.1L5 8.2C5.9 7.3 7.1 6.8 8.5 6.8Z" fill={TIDE.ink}/><circle cx="8.5" cy="10.5" r="1.5" fill={TIDE.ink}/></svg>
        <svg width="25" height="12" viewBox="0 0 27 13"><rect x="0.5" y="0.5" width="23" height="12" rx="3.5" stroke={TIDE.ink} strokeOpacity="0.4" fill="none"/><rect x="2" y="2" width="20" height="9" rx="2" fill={TIDE.ink}/><path d="M25 4.5V8.5C25.8 8.2 26.5 7.2 26.5 6.5C26.5 5.8 25.8 4.8 25 4.5Z" fill={TIDE.ink} fillOpacity="0.4"/></svg>
      </span>
    </div>
  );
}

function HomeIndicator() {
  return (
    <div style={{
      height: 28, display: 'flex', justifyContent: 'center', alignItems: 'flex-end',
      paddingBottom: 8, background: 'transparent',
    }}>
      <div style={{ width: 134, height: 5, borderRadius: 99, background: 'rgba(11,27,59,0.35)' }}/>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// iPhone frame
// ─────────────────────────────────────────────────────────────
function Phone({ children, label }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
      <div style={{
        fontFamily: FONT, fontWeight: 800, fontSize: 13, letterSpacing: '0.12em',
        textTransform: 'uppercase', color: TIDE.ink3,
      }}>{label}</div>
      <div style={{
        width: 375, height: 812, borderRadius: 44, overflow: 'hidden',
        position: 'relative', background: TIDE.bg,
        boxShadow: '0 30px 70px rgba(11,27,59,0.18), 0 0 0 8px #0B1B3B, 0 0 0 9px #1a2a4a',
        display: 'flex', flexDirection: 'column',
      }}>
        <StatusBar/>
        <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
          {children}
        </div>
        <HomeIndicator/>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Tide app screen header — back chevron + sentence-case title + close
// ─────────────────────────────────────────────────────────────
function ScreenHeader({ title, leading = 'back', trailing }) {
  return (
    <div style={{
      background: TIDE.surface, padding: '6px 16px 12px',
      display: 'flex', alignItems: 'center', gap: 12,
    }}>
      <button aria-label="Back" style={{
        background: 'transparent', border: 0, padding: 6, cursor: 'pointer', color: TIDE.ink,
      }}>
        {leading === 'close' ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
        )}
      </button>
      <div style={{ fontFamily: FONT, fontSize: 19, fontWeight: 800, color: TIDE.ink, flex: 1, letterSpacing: '-0.01em' }}>
        {title}
      </div>
      {trailing}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Tide-style toggle switch (pill, blue when on, grey when off)
// ─────────────────────────────────────────────────────────────
function Toggle({ on, onChange, label }) {
  return (
    <button
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={() => onChange(!on)}
      style={{
        width: 50, height: 30, borderRadius: 999, border: 0, padding: 3,
        background: on ? TIDE.blue : '#C4CBDB',
        transition: 'background 160ms cubic-bezier(0.22,0.61,0.36,1)',
        display: 'inline-flex', alignItems: 'center',
        cursor: 'pointer', boxSizing: 'border-box',
        boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.06)',
      }}
    >
      <span style={{
        width: 24, height: 24, borderRadius: '50%', background: '#fff',
        transform: `translateX(${on ? 20 : 0}px)`,
        transition: 'transform 160ms cubic-bezier(0.22,0.61,0.36,1)',
        boxShadow: '0 1px 2px rgba(11,27,59,0.18), 0 1px 0 rgba(11,27,59,0.06)',
      }}/>
    </button>
  );
}

// ─────────────────────────────────────────────────────────────
// Section card — white tile with optional title row
// ─────────────────────────────────────────────────────────────
function Card({ children, style }) {
  return (
    <div style={{
      background: TIDE.surface, borderRadius: 20, padding: '4px 0',
      boxShadow: '0 1px 0 rgba(11,27,59,0.02)',
      ...style,
    }}>{children}</div>
  );
}
function CardRow({ children, divider = true, style }) {
  return (
    <div style={{
      padding: '14px 18px',
      borderBottom: divider ? `1px solid ${TIDE.divider}` : '0',
      ...style,
    }}>{children}</div>
  );
}

// ─────────────────────────────────────────────────────────────
// SCREEN 1 — Create invoice form with e-invoice toggle
// ─────────────────────────────────────────────────────────────
function Screen1({ userState, setUserState, einvoice, setEinvoice }) {
  // userState: 'A' (not registered) | 'B' (pending) | 'C' (registered)
  // Default toggle state respects user state: off for A, on for C; B inherits previous.
  const cannotSend = einvoice && (userState === 'A' || userState === 'B');

  return (
    <div data-screen-label="01 Create invoice" style={{ background: TIDE.bg, flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
      <ScreenHeader title="Create invoice" trailing={(
        <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 14, color: TIDE.blue, padding: '6px 4px', cursor: 'pointer' }}>Save draft</div>
      )}/>

      <div style={{ flex: 1, overflow: 'auto', minHeight: 0, padding: '14px 16px 18px' }}>
        {/* Customer selector — assume existing */}
        <div style={{ fontFamily: FONT, fontWeight: 800, fontSize: 13, color: TIDE.ink3, letterSpacing: '0.08em', textTransform: 'uppercase', margin: '4px 4px 8px' }}>Customer</div>
        <Card style={{ marginBottom: 18 }}>
          <CardRow divider={false} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10, background: TIDE.blueSofter,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              color: TIDE.blue, fontFamily: FONT, fontWeight: 800, fontSize: 14,
            }}>AS</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 16, color: TIDE.ink }}>Acme Studios Ltd</div>
              <div style={{ fontFamily: FONT, fontSize: 13, color: TIDE.ink3 }}>finance@acmestudios.co.uk</div>
            </div>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={TIDE.ink3} strokeWidth="2.4" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
          </CardRow>
        </Card>

        {/* ── NEW: e-invoice section ─────────────────────────── */}
        <div style={{ fontFamily: FONT, fontWeight: 800, fontSize: 13, color: TIDE.ink3, letterSpacing: '0.08em', textTransform: 'uppercase', margin: '4px 4px 8px' }}>Delivery</div>
        <Card style={{ marginBottom: 18 }}>
          <div style={{ padding: '16px 18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 16, color: TIDE.ink }}>Send as e-invoice</div>
                <div style={{ fontFamily: FONT, fontSize: 13, color: TIDE.ink3, marginTop: 2, lineHeight: 1.4 }}>Delivers straight into your client's accounting software</div>
              </div>
              <Toggle on={einvoice} onChange={setEinvoice} label="Send as e-invoice"/>
            </div>

            {/* Inline confirmation / nudge / pending — only when toggle is ON */}
            {einvoice && userState === 'C' && (
              <div style={{
                marginTop: 14, padding: '10px 12px',
                background: TIDE.success ? 'var(--ds-success-bg)' : '#E2F3EA',
                color: 'var(--ds-success)', borderRadius: 12,
                display: 'flex', alignItems: 'flex-start', gap: 10,
                fontFamily: FONT, fontSize: 13, fontWeight: 600, lineHeight: 1.4,
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>Your client will receive this directly in their accounting system</span>
              </div>
            )}
            {einvoice && userState === 'A' && (
              <div style={{
                marginTop: 14, padding: '12px 14px',
                background: TIDE.blueSoft, color: TIDE.blueDeep,
                borderRadius: 12,
                fontFamily: FONT, fontSize: 13, fontWeight: 600, lineHeight: 1.45,
                display: 'flex', alignItems: 'flex-start', gap: 10,
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill={TIDE.blue} style={{ flexShrink: 0, marginTop: 1 }}>
                  <circle cx="12" cy="12" r="10" fill={TIDE.blue}/>
                  <text x="12" y="17" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="800" fontFamily="Mulish, sans-serif">i</text>
                </svg>
                <div>
                  <div>Set up e-invoicing first — takes 30 seconds.</div>
                  <div style={{ marginTop: 6, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                    <a onClick={(e) => { e.preventDefault(); document.getElementById('screen-2-anchor').scrollIntoView({ block: 'start' }); }} style={{ color: TIDE.blue, fontWeight: 800, textDecoration: 'underline', cursor: 'pointer' }}>Set up now</a>
                    <a onClick={(e) => { e.preventDefault(); setEinvoice(false); }} style={{ color: TIDE.blue, fontWeight: 800, textDecoration: 'underline', cursor: 'pointer' }}>Send the usual way</a>
                  </div>
                </div>
              </div>
            )}
            {einvoice && userState === 'B' && (
              <div style={{
                marginTop: 14, padding: '12px 14px',
                background: 'var(--ds-warning-bg)', color: 'var(--ds-warning)',
                borderRadius: 12,
                fontFamily: FONT, fontSize: 13, fontWeight: 600, lineHeight: 1.45,
                display: 'flex', alignItems: 'flex-start', gap: 10,
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}>
                  <circle cx="12" cy="12" r="9"/>
                  <polyline points="12 7 12 12 15 14"/>
                </svg>
                <div>
                  <div>We're still setting up your e-invoicing — usually ready in a few minutes.</div>
                  <div style={{ marginTop: 6 }}>
                    <a onClick={(e) => { e.preventDefault(); setEinvoice(false); }} style={{ color: 'var(--ds-warning)', fontWeight: 800, textDecoration: 'underline', cursor: 'pointer' }}>Send the usual way</a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Line items — assume existing pattern */}
        <div style={{ fontFamily: FONT, fontWeight: 800, fontSize: 13, color: TIDE.ink3, letterSpacing: '0.08em', textTransform: 'uppercase', margin: '4px 4px 8px' }}>Items</div>
        <Card style={{ marginBottom: 12 }}>
          <CardRow style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 15, color: TIDE.ink }}>Brand identity design</div>
              <div style={{ fontFamily: FONT, fontSize: 13, color: TIDE.ink3 }}>1 × £1,200.00</div>
            </div>
            <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 15, color: TIDE.ink, fontVariantNumeric: 'tabular-nums' }}>£1,200.00</div>
          </CardRow>
          <CardRow style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 15, color: TIDE.ink }}>Web design — 8 hours</div>
              <div style={{ fontFamily: FONT, fontSize: 13, color: TIDE.ink3 }}>8 × £95.00</div>
            </div>
            <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 15, color: TIDE.ink, fontVariantNumeric: 'tabular-nums' }}>£760.00</div>
          </CardRow>
          <CardRow divider={false} style={{ display: 'flex', alignItems: 'center', gap: 8, color: TIDE.blue }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={TIDE.blue} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            <span style={{ fontFamily: FONT, fontWeight: 700, fontSize: 15 }}>Add item</span>
          </CardRow>
        </Card>

        {/* Total */}
        <Card style={{ marginBottom: 18 }}>
          <CardRow divider={false} style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ flex: 1, fontFamily: FONT, fontWeight: 800, fontSize: 16, color: TIDE.ink }}>Total</div>
            <div style={{ fontFamily: FONT, fontWeight: 800, fontSize: 20, color: TIDE.ink, fontVariantNumeric: 'tabular-nums' }}>£1,960.00</div>
          </CardRow>
        </Card>
      </div>

      {/* Sticky action bar — gives the user a real path in every state */}
      <div style={{
        padding: '12px 16px 14px', background: TIDE.surface,
        borderTop: `1px solid ${TIDE.divider}`,
      }}>
        {cannotSend && (
          <div style={{
            background: userState === 'A' ? TIDE.blueSofter : 'var(--ds-warning-bg)',
            color: userState === 'A' ? TIDE.blueDeep : 'var(--ds-warning)',
            borderRadius: 12, padding: '10px 12px', marginBottom: 12,
            display: 'flex', alignItems: 'flex-start', gap: 10,
            fontFamily: FONT, fontSize: 13, fontWeight: 600, lineHeight: 1.4,
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}>
              {userState === 'A'
                ? (<><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="13"/><line x1="12" y1="16" x2="12.01" y2="16"/></>)
                : (<><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 14"/></>)}
            </svg>
            <span>
              {userState === 'A'
                ? 'To send as an e-invoice you\'ll need to set up e-invoicing first. Or send this one the usual way and set up later.'
                : 'Your e-invoicing isn\'t quite ready yet. Send this one the usual way for now — we\'ll let you know when it\'s ready.'}
            </span>
          </div>
        )}

        {cannotSend ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {userState === 'A' && (
              <button
                onClick={() => document.getElementById('screen-2-anchor').scrollIntoView({ block: 'start' })}
                style={{
                  width: '100%', border: 0, borderRadius: 999, padding: '17px 24px',
                  background: TIDE.blue, color: '#fff',
                  fontFamily: FONT, fontWeight: 800, fontSize: 16, cursor: 'pointer',
                }}
              >Set up e-invoicing — 30 seconds</button>
            )}
            <button
              onClick={() => setEinvoice(false)}
              style={{
                width: '100%', borderRadius: 999, padding: '15px 24px',
                background: '#fff', color: TIDE.blue, border: `1px solid ${TIDE.blue}`,
                fontFamily: FONT, fontWeight: 800, fontSize: 16, cursor: 'pointer',
              }}
            >Send the usual way</button>
          </div>
        ) : (
          <button
            style={{
              width: '100%', border: 0, borderRadius: 999, padding: '17px 24px',
              background: TIDE.blue, color: '#fff',
              fontFamily: FONT, fontWeight: 800, fontSize: 16, cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}
          >Send invoice</button>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SCREEN 2 — Onboarding nudge + async holding state
// ─────────────────────────────────────────────────────────────
function Screen2({ phase, setPhase }) {
  // phase: 'idle' (CTA visible) | 'loading' (registering)
  return (
    <div data-screen-label="02 Set up e-invoicing" style={{ background: TIDE.bg, flex: 1, display: 'flex', flexDirection: 'column' }}>
      <ScreenHeader title="" leading="close"/>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '8px 24px 0' }}>
        {/* Illustration */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '20px 0 28px' }}>
          <EinvoiceIllustration/>
        </div>

        {/* Headline + body */}
        <div style={{ fontFamily: FONT, fontWeight: 800, fontSize: 28, color: TIDE.ink, lineHeight: 1.15, letterSpacing: '-0.015em', marginBottom: 14 }}>
          Get paid faster with e-invoicing
        </div>
        <div style={{ fontFamily: FONT, fontSize: 16, color: TIDE.ink2, lineHeight: 1.5, marginBottom: 18 }}>
          Your invoices land directly in your clients' accounting software — no chasing, no manual entry on their end. We'll set this up using your business details. Nothing else needed from you.
        </div>

        {/* Two reassurance bullets (kept minimal — match brand tone of 'plain warm') */}
        <div style={{
          background: TIDE.surface, borderRadius: 18, padding: '14px 16px',
          display: 'flex', flexDirection: 'column', gap: 10,
          marginBottom: 'auto',
        }}>
          <Bullet>Uses the business details Tide already has — no forms to fill</Bullet>
          <Bullet>Works alongside your usual email invoices</Bullet>
        </div>

        {/* CTAs pinned bottom */}
        <div style={{ padding: '20px 0 8px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {phase === 'idle' ? (
            <button
              onClick={() => setPhase('loading')}
              style={{
                width: '100%', border: 0, borderRadius: 999,
                padding: '17px 24px',
                background: TIDE.blue, color: '#fff',
                fontFamily: FONT, fontWeight: 800, fontSize: 16, cursor: 'pointer',
              }}
            >
              Set up e-invoicing
            </button>
          ) : (
            <button
              disabled
              style={{
                width: '100%', border: 0, borderRadius: 999,
                padding: '17px 24px',
                background: TIDE.blue, color: '#fff',
                fontFamily: FONT, fontWeight: 800, fontSize: 16,
                cursor: 'progress', position: 'relative', overflow: 'hidden',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 12,
              }}
            >
              <Spinner/>
              <span>Setting up your e-invoicing…</span>
              {/* indeterminate bar across the bottom of the button */}
              <span style={{
                position: 'absolute', left: 0, right: 0, bottom: 0, height: 3,
                background: 'rgba(255,255,255,0.18)', overflow: 'hidden',
              }}>
                <span style={{
                  position: 'absolute', top: 0, bottom: 0, width: '40%',
                  background: 'rgba(255,255,255,0.9)',
                  animation: 'tideShimmer 1.4s cubic-bezier(0.4,0,0.2,1) infinite',
                }}/>
              </span>
            </button>
          )}

          {phase === 'idle' ? (
            <button
              onClick={() => setPhase('idle')}
              style={{
                width: '100%', border: 0, background: 'transparent',
                padding: '8px 24px',
                color: TIDE.blue, fontFamily: FONT, fontWeight: 700, fontSize: 15, cursor: 'pointer',
              }}
            >
              Not now
            </button>
          ) : (
            <button
              onClick={() => setPhase('idle')}
              style={{
                width: '100%', border: 0, background: 'transparent',
                padding: '8px 24px',
                color: TIDE.ink3, fontFamily: FONT, fontWeight: 600, fontSize: 14, cursor: 'pointer',
              }}
            >
              You can leave this screen — we'll let you know when it's ready
            </button>
          )}

          {phase === 'idle' && (
            <div style={{
              fontFamily: FONT, fontSize: 13, color: TIDE.ink3, textAlign: 'center',
              marginTop: -4, marginBottom: 4,
            }}>Usually ready in a few minutes</div>
          )}
        </div>
      </div>
    </div>
  );
}

function Bullet({ children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontFamily: FONT, fontSize: 14, color: TIDE.ink, lineHeight: 1.4 }}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={TIDE.blue} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
        <polyline points="20 6 9 17 4 12"/>
      </svg>
      <span>{children}</span>
    </div>
  );
}

function Spinner() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" style={{ animation: 'tideSpin 0.9s linear infinite' }}>
      <circle cx="12" cy="12" r="9" stroke="rgba(255,255,255,0.3)" strokeWidth="3" fill="none"/>
      <path d="M21 12a9 9 0 0 0-9-9" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

// Geometric flat illustration — invoice + chevron arrow + mint disc
function EinvoiceIllustration() {
  return (
    <svg width="220" height="170" viewBox="0 0 220 170" aria-hidden>
      {/* back doc / receiving system */}
      <rect x="124" y="34" width="76" height="100" rx="6" fill={TIDE.blueDeep}/>
      <rect x="134" y="50" width="44" height="5" fill="#0B3A85"/>
      <rect x="134" y="62" width="56" height="5" fill="#0B3A85"/>
      <rect x="134" y="74" width="36" height="5" fill="#0B3A85"/>
      {/* mint accent disc */}
      <circle cx="170" cy="108" r="18" fill={TIDE.mint}/>
      {/* front invoice doc */}
      <rect x="20" y="22" width="76" height="100" rx="6" fill={TIDE.blueLogo}/>
      <rect x="30" y="38" width="44" height="5" fill="#fff" opacity="0.55"/>
      <rect x="30" y="50" width="56" height="5" fill="#fff" opacity="0.55"/>
      <rect x="30" y="62" width="36" height="5" fill="#fff" opacity="0.55"/>
      <rect x="30" y="92" width="56" height="14" rx="2" fill="#fff" opacity="0.18"/>
      <text x="58" y="103" textAnchor="middle" fill="#fff" fontFamily="Mulish, sans-serif" fontSize="11" fontWeight="800">£1,960.00</text>
      {/* arrow chevron — using Tide blue */}
      <path d="M 92 76 L 116 76 M 108 68 L 116 76 L 108 84" stroke={TIDE.blue} strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// SCREEN 3 — Sent confirmation + status trail (State C)
// ─────────────────────────────────────────────────────────────
function Screen3() {
  return (
    <div data-screen-label="03 Invoice sent" style={{ background: TIDE.bg, flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
      <ScreenHeader title="" leading="close"/>

      <div style={{ flex: 1, overflow: 'auto', minHeight: 0, padding: '0 16px 18px' }}>
        {/* Section A — confirmation hero */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '14px 16px 22px' }}>
          <SuccessBadge/>
          <div style={{ fontFamily: FONT, fontWeight: 800, fontSize: 26, color: TIDE.ink, marginTop: 18, letterSpacing: '-0.015em' }}>
            Invoice sent
          </div>
          <div style={{ fontFamily: FONT, fontSize: 15, color: TIDE.ink2, marginTop: 8, lineHeight: 1.45, maxWidth: 280 }}>
            Delivered to <span style={{ fontWeight: 700, color: TIDE.ink }}>Acme Studios</span>' accounting system
          </div>
          <div style={{
            marginTop: 14, padding: '6px 12px',
            background: TIDE.surface, borderRadius: 999,
            fontFamily: FONT, fontWeight: 700, fontSize: 13, color: TIDE.ink,
            fontVariantNumeric: 'tabular-nums',
          }}>£1,960.00 · INV-2026-041</div>
        </div>

        {/* Section B — status trail */}
        <Card style={{ padding: '6px 0 6px' }}>
          <div style={{ padding: '16px 18px 8px' }}>
            <div style={{ fontFamily: FONT, fontWeight: 800, fontSize: 16, color: TIDE.ink }}>Delivery status</div>
          </div>
          <Timeline/>
        </Card>
      </div>

      <div style={{ padding: '10px 16px 14px', background: TIDE.surface, borderTop: `1px solid ${TIDE.divider}`, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <button style={{
          width: '100%', border: 0, borderRadius: 999, padding: '17px 24px',
          background: TIDE.blue, color: '#fff',
          fontFamily: FONT, fontWeight: 800, fontSize: 16, cursor: 'pointer',
        }}>Back to invoices</button>
        <button style={{
          width: '100%', border: `1px solid ${TIDE.blue}`, borderRadius: 999, padding: '12px 24px',
          background: '#fff', color: TIDE.blue,
          fontFamily: FONT, fontWeight: 700, fontSize: 15, cursor: 'pointer',
        }}>View invoice details</button>
      </div>
    </div>
  );
}

function SuccessBadge() {
  return (
    <div style={{
      width: 76, height: 76, borderRadius: '50%',
      background: 'var(--ds-success-bg)',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative',
    }}>
      {/* outer expanding ring */}
      <span style={{
        position: 'absolute', inset: -6, borderRadius: '50%',
        border: '2px solid var(--ds-success)',
        opacity: 0.18,
      }}/>
      <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="var(--ds-success)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
    </div>
  );
}

function Timeline() {
  // Steps:
  // 1. Sent (complete, timestamp)
  // 2. Delivered to accounting system (active, pulsing)
  // 3. Acknowledged by Acme Studios (pending, optional)
  const steps = [
    {
      state: 'complete',
      title: 'Sent',
      meta: 'Today, 09:41',
    },
    {
      state: 'active',
      title: "Delivered to Acme Studios' accounting system",
      meta: 'Usually instant',
    },
    {
      state: 'pending',
      title: 'Acknowledged by Acme Studios',
      meta: 'Optional — not needed for payment',
      tag: 'Optional',
    },
  ];
  return (
    <div style={{ padding: '4px 18px 16px', position: 'relative' }}>
      {steps.map((s, i) => (
        <TimelineRow key={i} step={s} last={i === steps.length - 1}/>
      ))}
    </div>
  );
}

function TimelineRow({ step, last }) {
  const isComplete = step.state === 'complete';
  const isActive = step.state === 'active';
  const isPending = step.state === 'pending';

  return (
    <div style={{ display: 'flex', gap: 14, alignItems: 'stretch', position: 'relative' }}>
      {/* Dot + connector */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, width: 24 }}>
        <div style={{ position: 'relative', width: 24, height: 24, marginTop: 2 }}>
          {isActive && (
            <>
              <span style={{
                position: 'absolute', inset: -2, borderRadius: '50%',
                background: TIDE.blue, opacity: 0.18,
                animation: 'tidePulse 1.6s ease-out infinite',
              }}/>
              <span style={{
                position: 'absolute', inset: 2, borderRadius: '50%',
                border: `2px solid ${TIDE.blue}`,
                background: '#fff',
              }}/>
              <span style={{
                position: 'absolute', top: 7, left: 7, width: 10, height: 10, borderRadius: '50%',
                background: TIDE.blue,
              }}/>
            </>
          )}
          {isComplete && (
            <div style={{
              width: 24, height: 24, borderRadius: '50%',
              background: 'var(--ds-success)',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
          )}
          {isPending && (
            <div style={{
              width: 20, height: 20, borderRadius: '50%', margin: 2,
              background: '#fff',
              border: `2px dashed ${TIDE.ink4}`,
            }}/>
          )}
        </div>
        {!last && (
          <div style={{
            flex: 1, width: 2, marginTop: 4,
            background: isComplete
              ? 'var(--ds-success)'
              : `repeating-linear-gradient(180deg, ${TIDE.divider} 0 4px, transparent 4px 8px)`,
            minHeight: 28,
          }}/>
        )}
      </div>

      {/* Content */}
      <div style={{ flex: 1, paddingBottom: last ? 4 : 22 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <span style={{
            fontFamily: FONT, fontWeight: 700, fontSize: 15,
            color: isPending ? TIDE.ink3 : TIDE.ink,
            lineHeight: 1.3,
          }}>{step.title}</span>
          {step.tag && (
            <span style={{
              fontFamily: FONT, fontWeight: 700, fontSize: 11,
              color: TIDE.ink3, background: TIDE.bg,
              padding: '2px 8px', borderRadius: 999,
              letterSpacing: '0.04em', textTransform: 'uppercase',
            }}>{step.tag}</span>
          )}
        </div>
        <div style={{
          fontFamily: FONT, fontSize: 13, color: TIDE.ink3, marginTop: 3,
        }}>{step.meta}</div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// State controls — sit ABOVE each phone so reviewers can see all states
// ─────────────────────────────────────────────────────────────
function StateSwitcher({ value, onChange, options }) {
  return (
    <div style={{
      display: 'inline-flex', background: TIDE.surface, borderRadius: 999, padding: 4,
      boxShadow: '0 1px 0 rgba(11,27,59,0.04)', border: `1px solid ${TIDE.divider}`,
      fontFamily: FONT,
    }}>
      {options.map(o => {
        const on = value === o.value;
        return (
          <button key={o.value} onClick={() => onChange(o.value)} style={{
            background: on ? TIDE.blue : 'transparent', color: on ? '#fff' : TIDE.ink2,
            border: 0, padding: '7px 14px', borderRadius: 999,
            fontFamily: FONT, fontWeight: 700, fontSize: 12, cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}>{o.label}</button>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Root app — three phones stacked vertically
// ─────────────────────────────────────────────────────────────
function App() {
  // Screen 1 controls
  const [s1State, setS1State] = useState('A'); // A | B | C
  const [s1Toggle, setS1Toggle] = useState(true); // ON by default to show inline UI immediately

  // Screen 2 controls
  const [s2Phase, setS2Phase] = useState('idle'); // idle | loading

  return (
    <div style={{
      background: TIDE.bg, minHeight: '100vh',
      padding: '40px 24px 80px', fontFamily: FONT,
    }}>
      <header style={{ maxWidth: 900, margin: '0 auto 36px' }}>
        <div style={{ fontFamily: FONT, fontWeight: 800, fontSize: 11, color: TIDE.blue, letterSpacing: '0.16em', textTransform: 'uppercase' }}>Tide · Invoicing · Day 2</div>
        <h1 style={{ fontFamily: FONT, fontWeight: 800, fontSize: 32, color: TIDE.ink, margin: '6px 0 8px', letterSpacing: '-0.015em' }}>E-invoicing — three screens</h1>
        <p style={{ fontFamily: FONT, fontSize: 15, color: TIDE.ink2, margin: 0, maxWidth: 620, lineHeight: 1.5 }}>
          Smallest surface-area change to the existing Create invoice flow. No new jargon. Tide absorbs the compliance complexity. Toggle and CTAs are live — controls above each phone let you switch between the three registration states.
        </p>
      </header>

      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 60,
      }}>
        {/* ── SCREEN 1 ─────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
            <StateSwitcher
              value={s1State}
              onChange={setS1State}
              options={[
                { value: 'A', label: 'A · Not registered' },
                { value: 'B', label: 'B · Pending' },
                { value: 'C', label: 'C · Registered' },
              ]}
            />
          </div>
          <Phone label="Screen 1 · Create invoice — e-invoice toggle">
            <Screen1
              userState={s1State}
              setUserState={setS1State}
              einvoice={s1Toggle}
              setEinvoice={setS1Toggle}
            />
          </Phone>
          <Caption text="Tap the toggle to switch the inline state. The state switcher above changes the registration context (A → nudge · B → still-setting-up · C → success confirmation)."/>
        </div>

        <div id="screen-2-anchor"/>

        {/* ── SCREEN 2 ─────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <StateSwitcher
              value={s2Phase}
              onChange={setS2Phase}
              options={[
                { value: 'idle', label: 'Idle' },
                { value: 'loading', label: 'Registering…' },
              ]}
            />
          </div>
          <Phone label="Screen 2 · Set up e-invoicing">
            <Screen2 phase={s2Phase} setPhase={setS2Phase}/>
          </Phone>
          <Caption text="Tap the primary CTA to trigger the in-place loading state. Same screen, no new layout."/>
        </div>

        {/* ── SCREEN 3 ─────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
          <Phone label="Screen 3 · Invoice sent — delivery status">
            <Screen3/>
          </Phone>
          <Caption text="Step 3 uses a dashed-ring 'optional' marker + microcopy so it never reads as an error if no acknowledgement comes back."/>
        </div>
      </div>
    </div>
  );
}

function Caption({ text }) {
  return (
    <div style={{
      fontFamily: FONT, fontSize: 13, color: TIDE.ink3, textAlign: 'center',
      maxWidth: 420, lineHeight: 1.45,
    }}>{text}</div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
