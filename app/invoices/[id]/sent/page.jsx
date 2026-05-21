'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import ScreenHeader from '@/components/ScreenHeader';
import { customers } from '@/data/mockData';

function SuccessBadge() {
  return (
    <div style={{
      width: 76,
      height: 76,
      borderRadius: '50%',
      background: 'var(--ds-success-bg)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    }}>
      <span style={{
        position: 'absolute',
        inset: -6,
        borderRadius: '50%',
        border: '2px solid var(--ds-success)',
        opacity: 0.18,
      }} />
      <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="var(--ds-success)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
    </div>
  );
}

function TimelineRow({ step, last }) {
  const isComplete = step.state === 'complete';
  const isActive = step.state === 'active';
  const isPending = step.state === 'pending';

  return (
    <div style={{ display: 'flex', gap: 14, alignItems: 'stretch' }}>
      {/* Dot + connector */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, width: 24 }}>
        <div style={{ position: 'relative', width: 24, height: 24, marginTop: 2 }}>
          {isActive && (
            <>
              <span style={{
                position: 'absolute',
                inset: -2,
                borderRadius: '50%',
                background: 'var(--ds-blue)',
                opacity: 0.18,
                animation: 'tidePulse 1.6s ease-out infinite',
              }} />
              <span style={{ position: 'absolute', inset: 2, borderRadius: '50%', border: '2px solid var(--ds-blue)', background: '#fff' }} />
              <span style={{ position: 'absolute', top: 7, left: 7, width: 10, height: 10, borderRadius: '50%', background: 'var(--ds-blue)' }} />
            </>
          )}
          {isComplete && (
            <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--ds-success)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
          )}
          {isPending && (
            <div style={{ width: 20, height: 20, borderRadius: '50%', margin: 2, background: '#fff', border: '2px dashed var(--ds-ink-4)' }} />
          )}
        </div>
        {!last && (
          <div style={{
            flex: 1,
            width: 2,
            marginTop: 4,
            background: isComplete
              ? 'var(--ds-success)'
              : 'repeating-linear-gradient(180deg, var(--ds-divider) 0 4px, transparent 4px 8px)',
            minHeight: 28,
          }} />
        )}
      </div>

      {/* Content */}
      <div style={{ flex: 1, paddingBottom: last ? 4 : 22 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <span style={{ fontWeight: 700, fontSize: 'var(--ds-fs-body-sm)', color: isPending ? 'var(--ds-ink-3)' : 'var(--ds-ink)', lineHeight: 1.3 }}>
            {step.title}
          </span>
          {step.tag && (
            <span style={{
              fontWeight: 700,
              fontSize: 'var(--ds-fs-overline)',
              color: 'var(--ds-ink-3)',
              background: 'var(--ds-bg)',
              padding: '2px 8px',
              borderRadius: 'var(--ds-radius-pill)',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}>
              {step.tag}
            </span>
          )}
        </div>
        <div style={{ fontSize: 'var(--ds-fs-caption)', color: 'var(--ds-ink-3)', marginTop: 3 }}>
          {step.meta}
        </div>
      </div>
    </div>
  );
}

function SentContent({ params }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const invoiceId = params.id;

  const customerId = searchParams.get('customer') ?? 'acme';
  const amount = parseFloat(searchParams.get('amount') ?? '0');
  const isEinvoice = searchParams.get('einvoice') === 'true';

  const customer = customers.find(c => c.id === customerId) ?? customers[0];

  const formattedAmount = `£${amount.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const steps = isEinvoice ? [
    { state: 'complete', title: 'Sent', meta: `Today, ${new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}` },
    { state: 'active',   title: `Delivered to ${customer.name}'s accounting system`, meta: 'Usually instant' },
    { state: 'pending',  title: `Acknowledged by ${customer.name}`, meta: 'Optional — not needed for payment', tag: 'Optional' },
  ] : [
    { state: 'complete', title: 'Sent by email', meta: `Today, ${new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}` },
    { state: 'active',   title: 'Awaiting payment', meta: 'Your client will receive an email with the invoice attached' },
  ];

  return (
    <>
      <ScreenHeader title="" leading="close" onBack={() => router.push('/')} />

      <div style={{ flex: 1, overflow: 'auto', padding: '0 16px 18px' }}>
        {/* Hero */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '24px 16px 22px' }}>
          <SuccessBadge />
          <div style={{ fontWeight: 800, fontSize: 'var(--ds-fs-h2)', color: 'var(--ds-ink)', marginTop: 18, letterSpacing: '-0.015em' }}>
            Invoice sent
          </div>
          <div style={{ fontSize: 'var(--ds-fs-body-sm)', color: 'var(--ds-ink-2)', marginTop: 8, lineHeight: 1.45, maxWidth: 280 }}>
            {isEinvoice
              ? <>Delivered to <span style={{ fontWeight: 700, color: 'var(--ds-ink)' }}>{customer.name}</span>'s accounting system</>
              : <>Sent to <span style={{ fontWeight: 700, color: 'var(--ds-ink)' }}>{customer.name}</span> by email</>
            }
          </div>
          <div style={{ marginTop: 14, padding: '6px 14px', background: 'var(--ds-surface)', borderRadius: 'var(--ds-radius-pill)', fontWeight: 700, fontSize: 'var(--ds-fs-caption)', color: 'var(--ds-ink)', fontVariantNumeric: 'tabular-nums' }}>
            {formattedAmount} · {invoiceId}
          </div>
        </div>

        {/* Status trail */}
        <div style={{ background: 'var(--ds-surface)', borderRadius: 'var(--ds-radius-lg)', padding: '6px 0', boxShadow: 'var(--ds-shadow-card)' }}>
          <div style={{ padding: '16px 18px 8px' }}>
            <div style={{ fontWeight: 800, fontSize: 'var(--ds-fs-body)', color: 'var(--ds-ink)' }}>Delivery status</div>
          </div>
          <div style={{ padding: '4px 18px 16px' }}>
            {steps.map((step, i) => (
              <TimelineRow key={i} step={step} last={i === steps.length - 1} />
            ))}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div style={{ padding: '10px 16px 14px', background: 'var(--ds-surface)', borderTop: '1px solid var(--ds-divider)', display: 'flex', flexDirection: 'column', gap: 10, flexShrink: 0 }}>
        <button
          onClick={() => router.push('/')}
          style={{ width: '100%', border: 0, borderRadius: 'var(--ds-radius-pill)', padding: '17px 24px', background: 'var(--ds-blue)', color: '#fff', fontWeight: 800, fontSize: 'var(--ds-fs-body)', cursor: 'pointer' }}
        >
          Back to invoices
        </button>
        <button
          onClick={() => router.push(`/invoices/${invoiceId}`)}
          style={{ width: '100%', border: '1px solid var(--ds-blue)', borderRadius: 'var(--ds-radius-pill)', padding: '13px 24px', background: '#fff', color: 'var(--ds-blue)', fontWeight: 700, fontSize: 'var(--ds-fs-body-sm)', cursor: 'pointer' }}
        >
          View invoice details
        </button>
      </div>
    </>
  );
}

export default function InvoiceSentPage({ params }) {
  return (
    <Suspense fallback={<div style={{ flex: 1 }} />}>
      <SentContent params={params} />
    </Suspense>
  );
}
