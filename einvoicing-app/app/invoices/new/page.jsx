'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ScreenHeader from '@/components/ScreenHeader';
import Toggle from '@/components/Toggle';
import { Card, CardRow } from '@/components/Card';
import { useAppState } from '@/lib/AppContext';
import { customers, defaultLineItems } from '@/data/mockData';
import { countryNetworkMap } from '@/data/networkConfig';

const VAT_RATE = 0.2;

function formatGBP(n) {
  return `£${Number(n).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function CustomerAvatar({ initials }) {
  return (
    <div style={{
      width: 36,
      height: 36,
      borderRadius: 10,
      background: 'var(--ds-blue-soft)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--ds-blue)',
      fontWeight: 800,
      fontSize: 14,
      flexShrink: 0,
    }}>
      {initials}
    </div>
  );
}

function EinvoiceToggleSection({ registrationState, einvoice, setEinvoice, customer, countryConfig }) {
  const router = useRouter();

  const countryNotSupported = !countryConfig?.supported;
  const comingSoon = countryConfig?.comingSoon;
  const toggleDisabled = registrationState === 'PENDING' || countryNotSupported;

  const comingSoonLabel = comingSoon
    ? `Coming soon for clients in ${customer.countryCode}`
    : `E-invoicing not yet available for clients in ${customer.countryCode}`;

  return (
    <Card style={{ marginBottom: 18 }}>
      <div style={{ padding: '16px 18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 'var(--ds-fs-body)', color: 'var(--ds-ink)', letterSpacing: '-0.02em' }}>
              Send as e-invoice
            </div>
            <div style={{ fontSize: 'var(--ds-fs-caption)', color: 'var(--ds-ink-3)', marginTop: 2, lineHeight: 1.4 }}>
              Delivers straight into your client's accounting software
            </div>
          </div>
          <div title={countryNotSupported ? comingSoonLabel : undefined}>
            <Toggle
              on={countryNotSupported ? false : einvoice}
              onChange={setEinvoice}
              disabled={toggleDisabled}
              label="Send as e-invoice"
            />
          </div>
        </div>

        {/* Country not supported */}
        {countryNotSupported && (
          <div style={{
            marginTop: 14,
            padding: '10px 12px',
            background: 'var(--ds-bg)',
            color: 'var(--ds-ink-3)',
            borderRadius: 'var(--ds-radius-md)',
            fontSize: 'var(--ds-fs-meta)',
            fontWeight: 600,
            lineHeight: 1.4,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            {comingSoonLabel}
          </div>
        )}

        {/* State C + supported: success */}
        {!countryNotSupported && einvoice && registrationState === 'REGISTERED' && (
          <div style={{
            marginTop: 14,
            padding: '10px 12px',
            background: 'var(--ds-success-bg)',
            color: 'var(--ds-success)',
            borderRadius: 'var(--ds-radius-md)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: 10,
            fontSize: 'var(--ds-fs-meta)',
            fontWeight: 600,
            lineHeight: 1.4,
            animation: 'tideFadeIn 200ms var(--ds-ease-out)',
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            Your client will receive this directly in their accounting system
          </div>
        )}

        {/* State A: not registered nudge */}
        {!countryNotSupported && einvoice && registrationState === 'NOT_REGISTERED' && (
          <div style={{
            marginTop: 14,
            padding: '12px 14px',
            background: 'var(--ds-blue-soft)',
            color: 'var(--ds-blue-deep)',
            borderRadius: 'var(--ds-radius-md)',
            fontSize: 'var(--ds-fs-meta)',
            fontWeight: 600,
            lineHeight: 1.45,
            display: 'flex',
            alignItems: 'flex-start',
            gap: 10,
            animation: 'tideFadeIn 200ms var(--ds-ease-out)',
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" style={{ flexShrink: 0, marginTop: 2 }}>
              <circle cx="12" cy="12" r="10" fill="var(--ds-blue)"/>
              <path d="M11 17h2v-6h-2v6zm0-8h2V7h-2v2z" fill="#fff"/>
            </svg>
            <div>
              <div>Set up e-invoicing first — takes 30 seconds.</div>
              <div style={{ marginTop: 6, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <button onClick={() => router.push('/setup')} style={{ background: 'none', border: 0, padding: 0, color: 'var(--ds-blue)', fontWeight: 800, fontSize: 'inherit', textDecoration: 'underline', cursor: 'pointer' }}>
                  Set up now
                </button>
                <button onClick={() => setEinvoice(false)} style={{ background: 'none', border: 0, padding: 0, color: 'var(--ds-blue)', fontWeight: 800, fontSize: 'inherit', textDecoration: 'underline', cursor: 'pointer' }}>
                  Send the usual way
                </button>
              </div>
            </div>
          </div>
        )}

        {/* State B: pending */}
        {!countryNotSupported && registrationState === 'PENDING' && (
          <div style={{
            marginTop: 14,
            padding: '12px 14px',
            background: 'var(--ds-warning-bg)',
            color: 'var(--ds-warning)',
            borderRadius: 'var(--ds-radius-md)',
            fontSize: 'var(--ds-fs-meta)',
            fontWeight: 600,
            lineHeight: 1.45,
            display: 'flex',
            alignItems: 'flex-start',
            gap: 10,
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}>
              <circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 14"/>
            </svg>
            <div>
              <div>We're still setting up your e-invoicing — usually ready in a few minutes.</div>
              <div style={{ marginTop: 6 }}>
                <button onClick={() => setEinvoice(false)} style={{ background: 'none', border: 0, padding: 0, color: 'var(--ds-warning)', fontWeight: 800, fontSize: 'inherit', textDecoration: 'underline', cursor: 'pointer' }}>
                  Send the usual way
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}

function LineItemRow({ item, onChange, onRemove }) {
  const subtotal = item.qty * item.unitPrice;
  const vat = item.vatEnabled ? subtotal * VAT_RATE : 0;

  return (
    <CardRow style={{ padding: '12px 18px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
        <div style={{ flex: 1 }}>
          <input
            value={item.description}
            onChange={e => onChange({ ...item, description: e.target.value })}
            style={{
              width: '100%',
              border: 0,
              borderBottom: '1px solid var(--ds-divider)',
              background: 'transparent',
              fontSize: 'var(--ds-fs-body-sm)',
              fontWeight: 700,
              color: 'var(--ds-ink)',
              padding: '2px 0',
              marginBottom: 8,
              outline: 'none',
            }}
          />
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
            <input
              type="number"
              min="1"
              value={item.qty}
              onChange={e => onChange({ ...item, qty: Number(e.target.value) })}
              style={{ width: 48, border: '1px solid var(--ds-divider)', borderRadius: 6, padding: '4px 6px', fontSize: 'var(--ds-fs-caption)', fontWeight: 700, color: 'var(--ds-ink)', background: 'var(--ds-surface-2)', outline: 'none' }}
            />
            <span style={{ fontSize: 'var(--ds-fs-caption)', color: 'var(--ds-ink-3)' }}>×</span>
            <span style={{ fontSize: 'var(--ds-fs-caption)', color: 'var(--ds-ink-3)' }}>£</span>
            <input
              type="number"
              min="0"
              step="0.01"
              value={item.unitPrice}
              onChange={e => onChange({ ...item, unitPrice: Number(e.target.value) })}
              style={{ width: 72, border: '1px solid var(--ds-divider)', borderRadius: 6, padding: '4px 6px', fontSize: 'var(--ds-fs-caption)', fontWeight: 700, color: 'var(--ds-ink)', background: 'var(--ds-surface-2)', outline: 'none' }}
            />
            <label style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 'var(--ds-fs-caption)', color: 'var(--ds-ink-3)', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={item.vatEnabled}
                onChange={e => onChange({ ...item, vatEnabled: e.target.checked })}
                style={{ accentColor: 'var(--ds-blue)', width: 14, height: 14 }}
              />
              VAT 20%
            </label>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4, flexShrink: 0 }}>
          <span style={{ fontWeight: 700, fontSize: 'var(--ds-fs-body-sm)', color: 'var(--ds-ink)', fontVariantNumeric: 'tabular-nums' }}>
            {formatGBP(subtotal + vat)}
          </span>
          <button onClick={onRemove} style={{ background: 'none', border: 0, padding: 0, cursor: 'pointer', color: 'var(--ds-ink-4)' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/>
            </svg>
          </button>
        </div>
      </div>
    </CardRow>
  );
}

export default function InvoiceCreatePage() {
  const router = useRouter();
  const { registrationState, activeCustomerId, setActiveCustomerId } = useAppState();

  const [einvoice, setEinvoice] = useState(false);
  const [lineItems, setLineItems] = useState(defaultLineItems);
  const [nextId, setNextId] = useState(3);

  const customer = customers.find(c => c.id === activeCustomerId) ?? customers[0];
  const countryConfig = countryNetworkMap[customer.countryCode];

  // Auto-enable toggle when user becomes REGISTERED and country is supported
  useEffect(() => {
    if (registrationState === 'REGISTERED' && countryConfig?.supported) {
      setEinvoice(true);
    }
  }, [registrationState, countryConfig?.supported]);

  const cannotSend = einvoice && (registrationState === 'NOT_REGISTERED' || registrationState === 'PENDING') && countryConfig?.supported;

  const subtotal = lineItems.reduce((s, i) => s + i.qty * i.unitPrice, 0);
  const vatTotal = lineItems.reduce((s, i) => s + (i.vatEnabled ? i.qty * i.unitPrice * VAT_RATE : 0), 0);
  const total = subtotal + vatTotal;

  const handleSend = () => {
    const invoiceId = `INV-2026-041`;
    router.push(`/invoices/${invoiceId}/sent?customer=${customer.id}&amount=${total}&einvoice=${einvoice}`);
  };

  const updateItem = (id, updated) => setLineItems(prev => prev.map(i => i.id === id ? updated : i));
  const removeItem = (id) => setLineItems(prev => prev.filter(i => i.id !== id));
  const addItem = () => {
    setLineItems(prev => [...prev, { id: nextId, description: 'New item', qty: 1, unitPrice: 0, vatEnabled: false }]);
    setNextId(n => n + 1);
  };

  return (
    <>
      <ScreenHeader
        title="Create invoice"
        onBack={() => router.push('/')}
        trailing={
          <button style={{ background: 'none', border: 0, padding: '6px 4px', color: 'var(--ds-blue)', fontWeight: 700, fontSize: 'var(--ds-fs-meta)', cursor: 'pointer' }}>
            Save draft
          </button>
        }
      />

      <div style={{ flex: 1, overflow: 'auto', padding: '14px 16px 18px' }}>
        {/* Customer */}
        <div style={{ fontWeight: 800, fontSize: 'var(--ds-fs-overline)', color: 'var(--ds-ink-3)', letterSpacing: '0.08em', textTransform: 'uppercase', margin: '4px 4px 8px' }}>
          Customer
        </div>
        <Card style={{ marginBottom: 18 }}>
          <CardRow divider={false} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <CustomerAvatar initials={customer.initials} />
            <div style={{ flex: 1 }}>
              <select
                value={activeCustomerId}
                onChange={e => setActiveCustomerId(e.target.value)}
                style={{
                  width: '100%',
                  border: 0,
                  background: 'transparent',
                  fontSize: 'var(--ds-fs-body)',
                  fontWeight: 700,
                  color: 'var(--ds-ink)',
                  cursor: 'pointer',
                  outline: 'none',
                  appearance: 'none',
                  WebkitAppearance: 'none',
                }}
              >
                {customers.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
              <div style={{ fontSize: 'var(--ds-fs-caption)', color: 'var(--ds-ink-3)' }}>{customer.email}</div>
            </div>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--ds-ink-3)" strokeWidth="2.4" strokeLinecap="round">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </CardRow>
        </Card>

        {/* E-invoicing toggle */}
        <div style={{ fontWeight: 800, fontSize: 'var(--ds-fs-overline)', color: 'var(--ds-ink-3)', letterSpacing: '0.08em', textTransform: 'uppercase', margin: '4px 4px 8px' }}>
          Delivery
        </div>
        <EinvoiceToggleSection
          registrationState={registrationState}
          einvoice={einvoice}
          setEinvoice={setEinvoice}
          customer={customer}
          countryConfig={countryConfig}
        />

        {/* Line items */}
        <div style={{ fontWeight: 800, fontSize: 'var(--ds-fs-overline)', color: 'var(--ds-ink-3)', letterSpacing: '0.08em', textTransform: 'uppercase', margin: '4px 4px 8px' }}>
          Items
        </div>
        <Card style={{ marginBottom: 12 }}>
          {lineItems.map(item => (
            <LineItemRow
              key={item.id}
              item={item}
              onChange={updated => updateItem(item.id, updated)}
              onRemove={() => removeItem(item.id)}
            />
          ))}
          <CardRow divider={false} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button onClick={addItem} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 0, padding: 0, color: 'var(--ds-blue)', fontWeight: 700, fontSize: 'var(--ds-fs-body-sm)', cursor: 'pointer' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Add item
            </button>
          </CardRow>
        </Card>

        {/* Total */}
        <Card style={{ marginBottom: 18 }}>
          {vatTotal > 0 && (
            <CardRow style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ flex: 1, fontSize: 'var(--ds-fs-meta)', color: 'var(--ds-ink-3)' }}>Subtotal</div>
              <div style={{ fontSize: 'var(--ds-fs-meta)', color: 'var(--ds-ink-3)', fontVariantNumeric: 'tabular-nums' }}>{formatGBP(subtotal)}</div>
            </CardRow>
          )}
          {vatTotal > 0 && (
            <CardRow style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ flex: 1, fontSize: 'var(--ds-fs-meta)', color: 'var(--ds-ink-3)' }}>VAT (20%)</div>
              <div style={{ fontSize: 'var(--ds-fs-meta)', color: 'var(--ds-ink-3)', fontVariantNumeric: 'tabular-nums' }}>{formatGBP(vatTotal)}</div>
            </CardRow>
          )}
          <CardRow divider={false} style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ flex: 1, fontWeight: 800, fontSize: 'var(--ds-fs-body)', color: 'var(--ds-ink)' }}>Total</div>
            <div style={{ fontWeight: 800, fontSize: 'var(--ds-fs-h3)', color: 'var(--ds-ink)', fontVariantNumeric: 'tabular-nums' }}>
              {formatGBP(total)}
            </div>
          </CardRow>
        </Card>
      </div>

      {/* Action bar */}
      <div style={{
        padding: '12px 16px 14px',
        background: 'var(--ds-surface)',
        borderTop: '1px solid var(--ds-divider)',
        flexShrink: 0,
      }}>
        {cannotSend && (
          <div style={{
            background: registrationState === 'NOT_REGISTERED' ? 'var(--ds-blue-softer)' : 'var(--ds-warning-bg)',
            color: registrationState === 'NOT_REGISTERED' ? 'var(--ds-blue-deep)' : 'var(--ds-warning)',
            borderRadius: 'var(--ds-radius-md)',
            padding: '10px 14px',
            marginBottom: 12,
            fontSize: 'var(--ds-fs-meta)',
            fontWeight: 600,
            lineHeight: 1.4,
          }}>
            {registrationState === 'NOT_REGISTERED'
              ? "To send as an e-invoice you'll need to set up e-invoicing first. Or send this one the usual way and set up later."
              : "Your e-invoicing isn't quite ready yet. Send this one the usual way for now — we'll let you know when it's ready."}
          </div>
        )}

        {cannotSend ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {registrationState === 'NOT_REGISTERED' && (
              <button
                onClick={() => router.push('/setup')}
                style={{ width: '100%', border: 0, borderRadius: 'var(--ds-radius-pill)', padding: '17px 24px', background: 'var(--ds-blue)', color: '#fff', fontWeight: 800, fontSize: 'var(--ds-fs-body)', cursor: 'pointer' }}
              >
                Set up e-invoicing — 30 seconds
              </button>
            )}
            <button
              onClick={() => setEinvoice(false)}
              style={{ width: '100%', borderRadius: 'var(--ds-radius-pill)', padding: '15px 24px', background: '#fff', color: 'var(--ds-blue)', border: '1px solid var(--ds-blue)', fontWeight: 800, fontSize: 'var(--ds-fs-body)', cursor: 'pointer' }}
            >
              Send the usual way
            </button>
          </div>
        ) : (
          <button
            onClick={handleSend}
            style={{ width: '100%', border: 0, borderRadius: 'var(--ds-radius-pill)', padding: '17px 24px', background: 'var(--ds-blue)', color: '#fff', fontWeight: 800, fontSize: 'var(--ds-fs-body)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
          >
            {einvoice && registrationState === 'REGISTERED' ? (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 2L11 13"/><path d="M22 2L15 22 11 13 2 9l20-7z"/>
                </svg>
                Send e-invoice
              </>
            ) : 'Send invoice'}
          </button>
        )}
      </div>
    </>
  );
}
