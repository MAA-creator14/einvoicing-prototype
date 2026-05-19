// screens.jsx — Tide app surfaces: Home/Payments, Admin Invoicing,
// Add customer empty state, Add item form.

const { useState } = React;

// ─── Shared top app-header (avatar + Upgrade + Get £100 + search + chat) ───
function AppTopBar({ onSearch, onChat, notifyCount = 5, onUpgrade }) {
  return (
    <div style={{
      padding: '12px 14px',
      display: 'flex', alignItems: 'center', gap: 10,
      background: TIDE.bg,
    }}>
      <div style={{
        width: 36, height: 36, borderRadius: '50%', background: '#fff',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: FONT, fontWeight: 800, fontSize: 13, color: TIDE.ink,
        boxShadow: '0 1px 2px rgba(11,27,59,0.04)',
      }}>MA</div>
      <button onClick={onUpgrade} style={{
        background: '#fff', border: `1px solid ${TIDE.blue}`, color: TIDE.blue,
        borderRadius: 999, padding: '7px 16px', fontFamily: FONT,
        fontWeight: 700, fontSize: 13, cursor: 'pointer', whiteSpace: 'nowrap',
      }}>Upgrade</button>
      <div style={{ flex: 1 }}/>
      <button style={{
        background: '#fff', border: `1px solid ${TIDE.blue}`, color: TIDE.blue,
        borderRadius: 999, padding: '7px 14px', fontFamily: FONT,
        fontWeight: 700, fontSize: 13, cursor: 'pointer', whiteSpace: 'nowrap',
      }}>Get £100</button>
      <button onClick={onSearch} aria-label="Search" style={{ background:'transparent', border:0, cursor:'pointer', padding:4 }}>
        {Ic.search(TIDE.blue)}
      </button>
      <div style={{ position:'relative' }}>
        <button onClick={onChat} aria-label="Chat" style={{ background:'transparent', border:0, cursor:'pointer', padding:4 }}>
          {Ic.chat(TIDE.blue)}
        </button>
        {notifyCount > 0 && (
          <span style={{
            position: 'absolute', top: 0, right: 0,
            minWidth: 16, height: 16, padding: '0 4px', borderRadius: 999,
            background: TIDE.notify, color: '#fff',
            fontFamily: FONT, fontSize: 10, fontWeight: 800,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          }}>{notifyCount}</span>
        )}
      </div>
    </div>
  );
}

// ─── HOME / PAYMENTS ───
function HomeScreen({ onAccountDetails, onAction, onSearch, onChat }) {
  return (
    <div style={{ background: TIDE.bg, minHeight: '100%' }}>
      <AppTopBar onSearch={onSearch} onChat={onChat}/>

      {/* All accounts chip */}
      <div style={{ display:'flex', justifyContent:'center', padding: '10px 0 14px' }}>
        <button style={{
          background:'#fff', border:`1px solid ${TIDE.blue}`, color: TIDE.blue,
          borderRadius: 999, padding: '9px 18px', fontFamily: FONT,
          fontWeight: 700, fontSize: 14, cursor:'pointer', whiteSpace: 'nowrap',
          display:'inline-flex', alignItems:'center', gap:8,
        }}>
          {Ic.list(TIDE.blue)} All accounts
        </button>
      </div>

      {/* Balance hero */}
      <div style={{ padding: '0 16px' }}>
        <BalanceCard onDetails={onAccountDetails}/>
      </div>

      {/* Quick actions */}
      <div style={{ padding: '20px 16px 4px', display:'flex', gap: 12 }}>
        <QuickAction icon={Ic.send} label="Send" onClick={() => onAction && onAction('send')}/>
        <QuickAction icon={Ic.receive} label="Get paid" onClick={() => onAction && onAction('receive')}/>
        <QuickAction icon={Ic.reader} label="Card reader"/>
        <QuickAction icon={Ic.card} label="Cards"/>
      </div>

      {/* Cashback card */}
      <div style={{ padding: '20px 16px 8px' }}>
        <div style={{
          background: '#fff', borderRadius: 16, padding: '14px 16px',
          display:'flex', alignItems:'center', gap: 12,
        }}>
          <svg width="44" height="44" viewBox="0 0 80 80" aria-hidden>
            <rect x="6" y="40" width="14" height="34" fill="#A6E1D2"/>
            <rect x="24" y="22" width="14" height="52" fill="#4050FB"/>
            <rect x="42" y="32" width="14" height="42" fill="#0B3A85"/>
            <rect x="60" y="48" width="14" height="26" fill="#A6E1D2"/>
            <path d="M0 40 L80 8" stroke="#5BC8B0" strokeWidth="5" fill="none"/>
          </svg>
          <div style={{
            flex:1, fontFamily: FONT, fontWeight: 700, fontSize: 16, color: TIDE.ink,
          }}>Explore your cashback offers</div>
          <div style={{
            width:30, height:30, borderRadius:'50%', background: TIDE.blueSofter,
            display:'inline-flex', alignItems:'center', justifyContent:'center',
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={TIDE.blue} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </div>
        </div>
      </div>

      {/* Transactions */}
      <div style={{ padding: '14px 16px 24px' }}>
        <div style={{ background:'#fff', borderRadius: 20, padding: '16px 16px 8px' }}>
          <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 18, color: TIDE.ink, marginBottom: 6 }}>Transactions</div>

          <TxRow logoBg="#1B1B1B" letter="C" name="Cursor, Ai Powered Ide" cat="Software and IT costs" gbp="£18.03" fx="$24.00"/>
          <div style={{
            background: TIDE.blueSoft, color: TIDE.blueDeep, padding: '10px 14px',
            borderRadius: 10, fontFamily: FONT, fontSize: 13, fontWeight: 600,
            margin: '4px 4px 8px',
          }}>You paid £0.50 in FX fees. <span style={{ color: TIDE.blue, textDecoration: 'underline' }}>Upgrade for 0% FX fees</span></div>
          <TxRow logoBg="#0E0E0E" letter="L" name="Lovable" cat="Software and IT costs" gbp="£18.44" fx="$25.00"/>
          <TxRow logoBg="linear-gradient(135deg,#F24E1E,#A259FF)" letter="F" name="Figma" cat="Software and IT costs" gbp="£21.60"/>
        </div>
      </div>
    </div>
  );
}

function TxRow({ logoBg, letter, name, cat, gbp, fx }) {
  return (
    <div style={{
      display:'flex', alignItems:'center', gap: 12, padding: '10px 4px',
      borderBottom: `1px solid ${TIDE.divider}`,
    }}>
      <div style={{
        width: 36, height: 36, borderRadius: 8, background: logoBg,
        color:'#fff', fontFamily: FONT, fontWeight: 800, fontSize: 14,
        display:'inline-flex', alignItems:'center', justifyContent:'center',
      }}>{letter}</div>
      <div style={{ flex:1, minWidth: 0 }}>
        <div style={{ fontFamily: FONT, fontSize: 15, fontWeight: 700, color: TIDE.ink, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{name}</div>
        <div style={{ fontFamily: FONT, fontSize: 13, color: TIDE.ink3 }}>{cat}</div>
      </div>
      <div style={{ textAlign:'right' }}>
        <div style={{ fontFamily: FONT, fontSize: 15, fontWeight: 700, color: TIDE.ink, fontVariantNumeric:'tabular-nums' }}>{gbp}</div>
        {fx && <div style={{ fontFamily: FONT, fontSize: 13, color: TIDE.ink3, fontVariantNumeric:'tabular-nums' }}>{fx}</div>}
      </div>
    </div>
  );
}

// ─── ADMIN · Invoicing ───
function AdminInvoicingScreen({ onSearch, onChat, onCreateInvoice, onCustomers }) {
  const tabs = ['Overview', 'Accounting', 'Invoicing', 'Payroll', 'Filings'];
  const [active] = useState('Invoicing');
  return (
    <div style={{ background: TIDE.bg, minHeight: '100%' }}>
      <AppTopBar onSearch={onSearch} onChat={onChat}/>
      {/* horizontal section tabs */}
      <div style={{
        background: '#fff', padding: '0 18px',
        display:'flex', gap: 22, overflowX: 'auto',
        borderBottom: `1px solid ${TIDE.divider}`,
      }}>
        {tabs.map(t => {
          const on = active === t;
          return (
            <div key={t} style={{
              position:'relative', padding: '14px 0 12px',
              fontFamily: FONT, fontWeight: 700, fontSize: 16,
              color: on ? TIDE.blue : TIDE.ink3, whiteSpace:'nowrap', cursor:'pointer',
            }}>
              {t}
              {on && <span style={{
                position:'absolute', left:0, right:0, bottom: 0, height: 3, borderRadius: 2,
                background: TIDE.blue,
              }}/>}
            </div>
          );
        })}
      </div>

      <div style={{ padding: '18px 16px' }}>
        {/* Invoices summary card */}
        <div style={{ background:'#fff', borderRadius: 20, padding: '18px 18px 22px', marginBottom: 14 }}>
          <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 18, color: TIDE.ink, marginBottom: 10 }}>Invoices</div>
          <div style={{ display:'flex', justifyContent:'center', padding: '8px 0 4px' }}>
            <InvoiceIllustration/>
          </div>
          <div style={{ textAlign:'center', fontFamily: FONT, fontSize: 15, color: TIDE.ink, marginTop: 6 }}>
            0/3 Free invoices or Quotes sent this month
          </div>
          <div style={{ textAlign:'center', marginTop: 6 }}>
            <a style={{ color: TIDE.blue, fontFamily: FONT, fontWeight: 700, fontSize: 15, textDecoration: 'none' }}>Explore invoice assistant</a>
          </div>
          <div style={{ marginTop: 16 }}>
            <button onClick={onCreateInvoice} style={{
              width:'100%', background:'#fff', border:`1px solid ${TIDE.divider}`, color: TIDE.blue,
              borderRadius: 999, padding: '14px 0', fontFamily: FONT, fontWeight: 700, fontSize: 16,
              display:'inline-flex', alignItems:'center', justifyContent:'center', gap: 8, cursor:'pointer',
            }}>
              {Ic.plus(TIDE.blue)} Create an invoice
            </button>
          </div>
        </div>

        {/* Cross-sell */}
        <div style={{ background:'#fff', borderRadius: 20, padding: '18px', display:'flex', gap: 12, marginBottom: 14 }}>
          <div style={{ flex:1 }}>
            <div style={{ fontFamily: FONT, fontWeight: 800, fontSize: 16, color: TIDE.ink, lineHeight: 1.3 }}>Smart invoicing = Business growth! 🌐</div>
            <div style={{ fontFamily: FONT, fontSize: 13, color: TIDE.ink2, marginTop: 6, lineHeight: 1.5 }}>Time is money, and our Invoice Assistant is here to save you both. Subscribe today for premium features that drive efficiency and …</div>
            <div style={{ marginTop: 10, color: TIDE.blue, fontFamily: FONT, fontWeight: 700, fontSize: 14, cursor:'pointer' }}>Learn more ›</div>
          </div>
          <InvoiceIllustration small/>
          <div style={{ alignSelf:'flex-start', cursor:'pointer' }}>{Ic.close(TIDE.ink3)}</div>
        </div>

        {/* Settings list */}
        <div style={{ background:'#fff', borderRadius: 20, overflow: 'hidden' }}>
          <SettingsRow title="Customers" sub="Add and manage your customers" onClick={onCustomers}/>
          <SettingsRow title="Template" sub="Customise the details you send along with your invoices"/>
          <SettingsRow title="Features" sub="Automate the boring stuff and make sure you always get paid"/>
        </div>
      </div>
    </div>
  );
}

function SettingsRow({ title, sub, onClick }) {
  return (
    <div onClick={onClick} style={{
      padding: '16px 18px',
      borderBottom: `1px solid ${TIDE.divider}`,
      display:'flex', alignItems:'center', gap: 12,
      cursor: onClick ? 'pointer' : 'default',
    }}>
      <div style={{ flex:1 }}>
        <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 17, color: TIDE.ink }}>{title}</div>
        <div style={{ fontFamily: FONT, fontSize: 14, color: TIDE.ink3, marginTop: 2 }}>{sub}</div>
      </div>
      {Ic.chevR(TIDE.ink3)}
    </div>
  );
}

function InvoiceIllustration({ small }) {
  const s = small ? 70 : 120;
  return (
    <svg width={s} height={small ? 80 : 130} viewBox="0 0 120 130" aria-hidden>
      <rect x="20" y="14" width="64" height="92" fill="#4050FB"/>
      <circle cx="78" cy="72" r="22" fill="#5BC8B0"/>
      <rect x="68" y="98" width="26" height="14" fill="#00224F"/>
    </svg>
  );
}

// ─── Add customer empty state ───
function AddCustomerEmpty({ onBack, onImport, onAdd }) {
  return (
    <div style={{ background: TIDE.bg, minHeight: '100%', display:'flex', flexDirection:'column' }}>
      <TideHeader title="Add customer" onBack={onBack}/>
      <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding: '40px 32px' }}>
        <CursorIllustration/>
        <div style={{
          fontFamily: FONT, fontSize: 16, color: TIDE.ink,
          textAlign:'center', maxWidth: 280, marginTop: 24, lineHeight: 1.4,
        }}>Add or import a customer to see them here</div>
      </div>
      <div style={{ padding: '14px 16px 24px', background: TIDE.bg, display:'flex', gap: 10 }}>
        <TideButton variant="secondary" full onClick={onImport}>Import contact</TideButton>
        <TideButton variant="primary" full onClick={onAdd}>Add customer</TideButton>
      </div>
    </div>
  );
}

function CursorIllustration() {
  return (
    <svg width="220" height="160" viewBox="0 0 220 160" aria-hidden>
      <rect x="68" y="20" width="92" height="112" fill="#D5D9E3"/>
      <rect x="36" y="62" width="48" height="70" fill="#9EA6BB"/>
      <rect x="26" y="124" width="28" height="8" fill="#0B1B3B"/>
      <rect x="86" y="48" width="48" height="6" fill="#9EA6BB"/>
      <rect x="86" y="62" width="40" height="6" fill="#9EA6BB"/>
      <path d="M 138 46 L 138 96 L 152 84 L 162 106 L 172 102 L 162 80 L 178 80 Z" fill="#B6CCFF"/>
      <rect x="158" y="80" width="20" height="30" fill="#2B59FF" transform="rotate(20 168 95)"/>
    </svg>
  );
}

// ─── Add item form ───
function AddItemScreen({ onBack, onConfirm }) {
  const [desc, setDesc] = useState('');
  const [qty, setQty] = useState('1');
  const [unit, setUnit] = useState('Units');
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const valid = desc.trim().length > 0 && Number(price) > 0;
  const subtotal = (Number(price) || 0) * (Number(qty) || 0);
  const total = subtotal * (1 - (Number(discount) || 0) / 100);
  return (
    <div style={{ background: TIDE.bg, minHeight: '100%', display:'flex', flexDirection:'column' }}>
      <TideHeader title="Add item" onBack={onBack}/>
      <div style={{ flex:1, padding: '14px 16px 16px', overflow:'auto' }}>
        <TideField label="Item description" value={desc} onChange={e => setDesc(e.target.value)} placeholder="Max 1000 characters"/>
        <TideField label="Quantity" value={qty} onChange={e => setQty(e.target.value)}/>
        <TideSelect label="Unit type" optional value={unit} onChange={e => setUnit(e.target.value)} options={['Units','Hours','Days','Kg','Litres']}/>
        <TideField label="Unit price" value={price} onChange={e => setPrice(e.target.value)} placeholder="£"/>
        <TideField label="Discount" optional value={discount} onChange={e => setDiscount(e.target.value)} placeholder="0%"/>

        <div style={{ background:'#fff', borderRadius: 14, padding: '14px 16px', marginTop: 4 }}>
          <div style={{ display:'flex', justifyContent:'space-between', fontFamily: FONT, fontSize: 16, color: TIDE.ink }}>
            <span>Sub total</span><span style={{ fontWeight: 700, fontVariantNumeric:'tabular-nums' }}>£{subtotal.toFixed(2)}</span>
          </div>
          <div style={{ borderTop: `1px dashed ${TIDE.blueSoft}`, margin: '10px 0' }}/>
          <div style={{ display:'flex', justifyContent:'space-between', fontFamily: FONT, fontSize: 16, color: TIDE.ink }}>
            <span>Total</span><span style={{ fontWeight: 700, fontVariantNumeric:'tabular-nums' }}>£{total.toFixed(2)}</span>
          </div>
        </div>
      </div>
      <div style={{ padding: '14px 16px 24px' }}>
        <TideButton variant="primary" full disabled={!valid} onClick={() => valid && onConfirm && onConfirm()}>Confirm</TideButton>
      </div>
    </div>
  );
}

Object.assign(window, {
  AppTopBar, HomeScreen, AdminInvoicingScreen, AddCustomerEmpty, AddItemScreen,
});
