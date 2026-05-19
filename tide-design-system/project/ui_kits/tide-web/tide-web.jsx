// tide-web.jsx — Tide marketing site components (single file, factored sections).

const W = {
  blue: '#2B59FF', bluePress: '#1C3FCC',
  blueDeep: '#00224F', blueDeep2: '#001A3D',
  blueLogo: '#4050FB', blueSoft: '#D6E0FF', blueSofter: '#EDF1FF',
  bg: '#F0F2F8', surface: '#FFFFFF',
  ink: '#0B1B3B', ink2: '#283656', ink3: '#5F6B85', ink4: '#8A95AE',
  divider: '#E2E6F0', mint: '#5BC8B0',
};
const WFONT = 'Mulish, "GT Walsheim", -apple-system, system-ui, sans-serif';

// ─── Top nav ───
function WebNav() {
  const items = ['Start your business', 'Business accounts', 'Credit', 'Business tools', 'Support'];
  return (
    <header style={{
      background: W.surface, borderBottom: `1px solid ${W.divider}`,
      position: 'sticky', top: 0, zIndex: 50,
    }}>
      <div style={{
        maxWidth: 1240, margin: '0 auto', padding: '16px 32px',
        display:'flex', alignItems:'center', gap: 28, fontFamily: WFONT,
      }}>
        <a href="#" style={{ display:'inline-flex' }}>
          <img src="../../assets/Tide_Logo_Blue_RGB.svg" alt="Tide" style={{ height: 28 }}/>
        </a>
        <nav style={{ display:'flex', gap: 24, marginLeft: 16 }}>
          {items.map(it => (
            <a key={it} href="#" style={{
              fontFamily: WFONT, fontWeight: 700, fontSize: 15, color: W.ink, textDecoration: 'none',
              display:'inline-flex', alignItems:'center', gap: 4, cursor: 'pointer', whiteSpace: 'nowrap',
            }}>
              {it}
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={W.ink} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
            </a>
          ))}
        </nav>
        <div style={{ flex: 1 }}/>
        <a href="#" style={{ color: W.blue, fontWeight: 700, fontSize: 15, textDecoration: 'none', whiteSpace: 'nowrap' }}>Log in</a>
        <a href="#" style={{
          background: W.blue, color: '#fff', borderRadius: 999,
          padding: '12px 22px', fontWeight: 800, fontSize: 15, textDecoration: 'none', whiteSpace: 'nowrap',
        }}>Open an account</a>
      </div>
    </header>
  );
}

// ─── Hero ───
function WebHero() {
  return (
    <section style={{ background: W.bg, padding: '64px 32px 80px' }}>
      <div style={{
        maxWidth: 1240, margin: '0 auto',
        display:'grid', gridTemplateColumns: '1.05fr 1fr', gap: 48, alignItems:'center',
        fontFamily: WFONT,
      }}>
        <div>
          <div style={{
            display:'inline-flex', alignItems:'center', gap: 8,
            background: W.surface, border: `1px solid ${W.divider}`,
            borderRadius: 999, padding: '6px 14px',
            fontFamily: WFONT, fontWeight: 700, fontSize: 12, color: W.ink2,
            marginBottom: 24, letterSpacing: '0.02em',
          }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: W.mint }}/>
            FSCS‑Protected Bank Account by ClearBank
          </div>
          <h1 style={{
            fontFamily: WFONT, fontWeight: 800, fontSize: 64, lineHeight: 1.04,
            letterSpacing: '-0.02em', color: W.ink, margin: '0 0 20px',
          }}>One account<br/>for all things<br/>business</h1>
          <p style={{
            fontFamily: WFONT, fontSize: 20, lineHeight: 1.45, color: W.ink2, margin: '0 0 32px', maxWidth: 480,
          }}>Everything your business needs, in one powerful business account. Apply in minutes.</p>
          <div style={{ display:'flex', gap: 14, alignItems:'center', flexWrap: 'wrap' }}>
            <a href="#" style={{
              background: W.blue, color:'#fff', borderRadius: 999,
              padding: '18px 30px', fontFamily: WFONT, fontWeight: 800, fontSize: 17,
              textDecoration:'none', whiteSpace: 'nowrap',
            }}>Open an account</a>
            <a href="#" style={{
              background:'#fff', color: W.blue, border: `1px solid ${W.blue}`, borderRadius: 999,
              padding: '17px 28px', fontFamily: WFONT, fontWeight: 800, fontSize: 17,
              textDecoration:'none', whiteSpace: 'nowrap',
            }}>Compare plans</a>
          </div>
          <div style={{ marginTop: 32, fontFamily: WFONT, fontSize: 14, color: W.ink3 }}>
            Trusted by over <strong style={{ color: W.ink }}>1.5 million</strong> small businesses worldwide.
          </div>
        </div>
        <WebPhoneMockup/>
      </div>
    </section>
  );
}

function WebPhoneMockup() {
  // a stylised 'phone' showing the deep-navy account card on lavender
  return (
    <div style={{
      position: 'relative', width: 360, justifySelf: 'end',
      borderRadius: 44, overflow: 'hidden',
      background: W.bg, padding: 22,
      boxShadow: '0 30px 80px rgba(11, 27, 59, 0.18), 0 0 0 8px #fff, 0 0 0 9px rgba(11, 27, 59, 0.08)',
      fontFamily: WFONT,
    }}>
      <div style={{ height: 24 }}/>
      <div style={{
        position:'relative', overflow:'hidden',
        background: W.blueDeep, borderRadius: 20, color:'#fff',
        padding: '22px 22px',
      }}>
        <svg viewBox="0 0 600 240" preserveAspectRatio="xMaxYMid slice" style={{ position:'absolute', inset:0, width:'100%', height:'100%' }}>
          <defs><clipPath id="hp"><rect width="600" height="240" rx="20"/></clipPath></defs>
          <g clipPath="url(#hp)">
            <path d="M 600 -40 L 720 -40 L 480 280 L 360 280 Z" fill="#0B3A85" opacity="0.55"/>
            <path d="M 600 -40 L 640 -40 L 400 280 L 360 280 Z" fill="#0A2E66" opacity="0.95"/>
            <path d="M 600 60 L 660 60 L 460 360 L 400 360 Z" fill="#001A3D"/>
          </g>
        </svg>
        <div style={{ position:'relative', zIndex:2, display:'flex', alignItems:'center', gap: 8, marginBottom: 14 }}>
          <span style={{
            width: 26, height: 26, borderRadius: '50%', background: W.blue,
            display:'inline-flex', alignItems:'center', justifyContent:'center',
            fontSize: 10, fontWeight: 800, letterSpacing: '-0.02em',
          }}>tide</span>
          <span style={{ fontWeight: 700, fontSize: 14, whiteSpace: 'nowrap' }}>Tide Current Account</span>
        </div>
        <div style={{ position:'relative', zIndex:2, fontSize: 36, fontWeight: 800, letterSpacing:'-0.02em', fontVariantNumeric:'tabular-nums' }}>£18,420.91</div>
      </div>

      <div style={{ display:'flex', gap: 12, padding: '20px 4px' }}>
        {['Send','Get paid','Reader','Cards'].map(l => (
          <div key={l} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap: 6 }}>
            <div style={{ width: 48, height: 48, borderRadius:'50%', background: W.blue }}/>
            <span style={{ fontFamily: WFONT, fontWeight: 700, fontSize: 12, color: W.ink, textAlign:'center' }}>{l}</span>
          </div>
        ))}
      </div>

      <div style={{ background: '#fff', borderRadius: 16, padding: '12px 14px', display:'flex', alignItems:'center', gap: 10 }}>
        <svg width="32" height="32" viewBox="0 0 80 80" aria-hidden>
          <rect x="6" y="40" width="14" height="34" fill="#A6E1D2"/>
          <rect x="24" y="22" width="14" height="52" fill="#4050FB"/>
          <rect x="42" y="32" width="14" height="42" fill="#0B3A85"/>
          <rect x="60" y="48" width="14" height="26" fill="#A6E1D2"/>
        </svg>
        <div style={{ flex:1, fontFamily: WFONT, fontWeight: 700, fontSize: 13, color: W.ink }}>Cashback offers</div>
      </div>
    </div>
  );
}

// ─── MTD strip ───
function WebMTDStrip() {
  return (
    <section style={{ background: '#fff', padding: '48px 32px', borderTop: `1px solid ${W.divider}`, borderBottom: `1px solid ${W.divider}` }}>
      <div style={{
        maxWidth: 1240, margin: '0 auto', display:'flex', alignItems:'center', gap: 48, fontFamily: WFONT,
      }}>
        <div style={{
          display:'inline-flex', alignItems:'center', gap: 10,
          fontFamily: WFONT, fontWeight: 800, fontSize: 12, color: W.ink3, letterSpacing: '0.12em', textTransform: 'uppercase',
        }}>Free MTD‑ready tools</div>
        <div style={{ flex:1, fontFamily: WFONT, fontWeight: 700, fontSize: 22, lineHeight: 1.3, color: W.ink, letterSpacing: '-0.01em' }}>
          Making Tax Digital just got easier. Automate your bookkeeping and file your returns for free with our HMRC‑recognised tools.
        </div>
        <a href="#" style={{ color: W.blue, fontWeight: 800, fontSize: 16, textDecoration:'none', whiteSpace:'nowrap' }}>Learn more →</a>
      </div>
    </section>
  );
}

// ─── Everything-you-need grid ───
function WebFeatures() {
  const items = [
    { t: 'Make and receive payments faster', s: 'Send and request money in seconds with built‑in payment tools.' },
    { t: 'Manage all your business expenses', s: 'Track spend, issue expense cards, categorise everything in‑app.' },
    { t: 'Create invoices and do your accounting', s: 'HMRC‑recognised invoicing and accounting, all in one place.' },
    { t: 'No monthly recurring fees', s: 'Get started for free. Upgrade plans when you need more.' },
    { t: '24/7 in‑app chat support', s: 'Real members of our team — fast, on your time.' },
    { t: 'FSCS protection via ClearBank', s: 'Eligible deposits covered up to £120,000.' },
  ];
  return (
    <section style={{ background: W.bg, padding: '96px 32px' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', fontFamily: WFONT }}>
        <div style={{
          fontFamily: WFONT, fontWeight: 800, fontSize: 12, color: W.ink3, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 16,
        }}>Built for founders</div>
        <h2 style={{
          fontFamily: WFONT, fontWeight: 800, fontSize: 48, lineHeight: 1.1, letterSpacing: '-0.02em', color: W.ink, margin: '0 0 16px', maxWidth: 720,
        }}>Everything you need to run your business</h2>
        <p style={{ fontFamily: WFONT, fontSize: 18, color: W.ink2, maxWidth: 640, margin: '0 0 48px', lineHeight: 1.5 }}>
          Apply in minutes and unlock a suite of finance management tools — from payments to payroll.
        </p>
        <div style={{ display:'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {items.map((it, i) => (
            <div key={i} style={{
              background: '#fff', borderRadius: 20, padding: '28px 28px 32px',
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10, background: W.blueSofter,
                display:'inline-flex', alignItems:'center', justifyContent:'center', marginBottom: 18,
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={W.blue} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <div style={{ fontFamily: WFONT, fontWeight: 800, fontSize: 20, color: W.ink, lineHeight: 1.25, margin: '0 0 8px' }}>{it.t}</div>
              <div style={{ fontFamily: WFONT, fontSize: 15, color: W.ink2, lineHeight: 1.55 }}>{it.s}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Member quote ───
function WebQuote() {
  return (
    <section style={{ background: W.blueDeep, padding: '80px 32px', position: 'relative', overflow: 'hidden' }}>
      <svg viewBox="0 0 1600 400" preserveAspectRatio="xMaxYMid slice" style={{ position:'absolute', inset:0, width:'100%', height:'100%' }}>
        <defs><clipPath id="qcl"><rect width="1600" height="400"/></clipPath></defs>
        <g clipPath="url(#qcl)">
          <path d="M 1600 -40 L 1800 -40 L 1240 460 L 1040 460 Z" fill="#0B3A85" opacity="0.4"/>
          <path d="M 1600 -40 L 1700 -40 L 1140 460 L 1040 460 Z" fill="#0A2E66" opacity="0.85"/>
          <path d="M 1600 100 L 1700 100 L 1240 560 L 1140 560 Z" fill="#001A3D"/>
        </g>
      </svg>
      <div style={{ maxWidth: 1240, margin: '0 auto', position: 'relative', fontFamily: WFONT, color:'#fff' }}>
        <div style={{ fontFamily: WFONT, fontWeight: 800, fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.7, marginBottom: 16 }}>
          Member spotlight · Claire Pedley, The Poured Project
        </div>
        <blockquote style={{
          fontFamily: WFONT, fontWeight: 700, fontSize: 38, lineHeight: 1.2,
          letterSpacing: '-0.015em', maxWidth: 900, margin: 0,
        }}>
          “Once I'd filled in the application online, the account was active in about an hour. I can't stress how easy Tide is to use.”
        </blockquote>
        <div style={{ marginTop: 28 }}>
          <a href="#" style={{
            background: W.blue, color:'#fff', borderRadius: 999,
            padding: '14px 26px', fontFamily: WFONT, fontWeight: 800, fontSize: 15,
            textDecoration:'none',
          }}>Open an account</a>
        </div>
      </div>
    </section>
  );
}

// ─── Stay in the loop ───
function WebNewsletter() {
  return (
    <section style={{ background: W.bg, padding: '64px 32px' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', fontFamily: WFONT }}>
        <div style={{
          background: '#fff', borderRadius: 24, padding: '40px 48px',
          display:'flex', alignItems:'center', gap: 48,
        }}>
          <div style={{ flex:1 }}>
            <h3 style={{ fontFamily: WFONT, fontWeight: 800, fontSize: 28, color: W.ink, margin: '0 0 8px', letterSpacing: '-0.01em' }}>Stay in the loop</h3>
            <p style={{ fontFamily: WFONT, fontSize: 15, color: W.ink2, margin: 0, lineHeight: 1.5, maxWidth: 480 }}>
              Get access to our latest features, offers and business tips.
            </p>
          </div>
          <form style={{ display:'flex', gap: 10, flex: '0 0 auto' }} onSubmit={e => e.preventDefault()}>
            <input type="email" placeholder="you@yourbusiness.co.uk" style={{
              background: W.bg, border: 0, borderRadius: 14, padding: '15px 18px',
              fontFamily: WFONT, fontSize: 15, color: W.ink, width: 280, outline: 0,
            }}/>
            <button type="submit" style={{
              background: W.blue, color:'#fff', borderRadius: 999, border: 0,
              padding: '15px 24px', fontFamily: WFONT, fontWeight: 800, fontSize: 15, cursor:'pointer',
            }}>Subscribe</button>
          </form>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───
function WebFooter() {
  const cols = [
    { h: 'Company', l: ['About Tide','Blog','Newsroom','Careers','Partner with Tide'] },
    { h: 'Products', l: ['Tide Accounting','Invoicing','Business Loans','Payroll','Expense Cards','Card Reader'] },
    { h: 'Help & Support', l: ['Small Business Tips','Help Centre','Refer a Friend','Service Status','Contact Us'] },
    { h: 'Legal', l: ['Terms and Conditions','Privacy Policy','Cookie Policy','Modern Slavery Statement'] },
  ];
  return (
    <footer style={{ background: '#fff', padding: '64px 32px 24px', borderTop: `1px solid ${W.divider}` }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', fontFamily: WFONT }}>
        <div style={{ display:'grid', gridTemplateColumns:'1.4fr 1fr 1fr 1fr 1fr', gap: 32 }}>
          <div>
            <div style={{
              background: W.blueDeep, borderRadius: 14, padding: '20px 20px',
              display: 'inline-flex', alignItems: 'center',
            }}>
              <img src="../../assets/tide-dwyl.svg" alt="Tide — Do what you love." style={{ height: 50 }}/>
            </div>
          </div>
          {cols.map(c => (
            <div key={c.h}>
              <div style={{ fontFamily: WFONT, fontWeight: 800, fontSize: 13, color: W.ink, marginBottom: 14, letterSpacing: '0.02em' }}>{c.h}</div>
              {c.l.map(li => (
                <div key={li} style={{ marginBottom: 10 }}>
                  <a href="#" style={{ fontFamily: WFONT, fontSize: 14, color: W.ink2, textDecoration:'none' }}>{li}</a>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop: `1px solid ${W.divider}`, marginTop: 40, paddingTop: 24, fontFamily: WFONT, fontSize: 12, color: W.ink3, lineHeight: 1.6, maxWidth: 980 }}>
          Tide Platform Limited (Tide) designs and operates the Tide website and app. Tide is not a bank. Tide is authorised by the Financial Conduct Authority (FCA) under the Electronic Money Regulations 2011 under firm reference number 900843. Eligible deposits with ClearBank are protected up to a total of £120,000 by the Financial Services Compensation Scheme (FSCS).
        </div>
      </div>
    </footer>
  );
}

// ─── Page ───
function WebPage() {
  return (
    <div style={{ fontFamily: WFONT, background: W.bg, color: W.ink }}>
      <WebNav/>
      <WebHero/>
      <WebMTDStrip/>
      <WebFeatures/>
      <WebQuote/>
      <WebNewsletter/>
      <WebFooter/>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<WebPage/>);
