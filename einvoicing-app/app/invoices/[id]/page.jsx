'use client';

import { useRouter } from 'next/navigation';
import ScreenHeader from '@/components/ScreenHeader';
import { mockInvoices } from '@/data/mockData';
import StatusBadge from '@/components/StatusBadge';

function formatAmount(n) {
  return `£${n.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function InvoiceDetailPage({ params }) {
  const router = useRouter();
  const invoice = mockInvoices.find(i => i.id === params.id);

  if (!invoice) {
    return (
      <>
        <ScreenHeader title="Invoice" onBack={() => router.push('/')} />
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ds-ink-3)', fontSize: 'var(--ds-fs-body)' }}>
          Invoice not found
        </div>
      </>
    );
  }

  const badgeType = invoice.isEinvoice ? 'einvoice' : invoice.status;

  return (
    <>
      <ScreenHeader title={invoice.id} onBack={() => router.push('/')} />

      <div style={{ flex: 1, overflow: 'auto', padding: '20px 16px' }}>
        {/* Summary card */}
        <div style={{ background: 'var(--ds-surface)', borderRadius: 'var(--ds-radius-lg)', padding: '20px', marginBottom: 16, boxShadow: 'var(--ds-shadow-card)' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
            <div>
              <div style={{ fontWeight: 800, fontSize: 'var(--ds-fs-h3)', color: 'var(--ds-ink)', marginBottom: 4 }}>
                {invoice.customerName}
              </div>
              <div style={{ fontSize: 'var(--ds-fs-meta)', color: 'var(--ds-ink-3)' }}>
                {formatDate(invoice.date)}
              </div>
            </div>
            <StatusBadge type={badgeType} />
          </div>

          <div style={{ fontSize: 'var(--ds-fs-overline)', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ds-ink-3)', marginBottom: 4 }}>
            Amount
          </div>
          <div style={{ fontWeight: 800, fontSize: 'var(--ds-fs-h1)', color: 'var(--ds-ink)', fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.02em' }}>
            {formatAmount(invoice.amount)}
          </div>
        </div>

        {/* E-invoice status trail if applicable */}
        {invoice.isEinvoice && invoice.statusTrail && (
          <div style={{ background: 'var(--ds-surface)', borderRadius: 'var(--ds-radius-lg)', padding: '16px 18px', boxShadow: 'var(--ds-shadow-card)' }}>
            <div style={{ fontWeight: 800, fontSize: 'var(--ds-fs-body)', color: 'var(--ds-ink)', marginBottom: 14 }}>
              Delivery status
            </div>
            {invoice.statusTrail.map((step, i) => {
              const isLast = i === invoice.statusTrail.length - 1;
              const isComplete = step.state === 'complete';
              const isPending = step.state === 'pending';
              return (
                <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'stretch' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 24, flexShrink: 0 }}>
                    <div style={{ width: 24, height: 24, borderRadius: '50%', background: isComplete ? 'var(--ds-success)' : 'var(--ds-surface)', border: isPending ? '2px dashed var(--ds-ink-4)' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 2 }}>
                      {isComplete && (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      )}
                    </div>
                    {!isLast && <div style={{ flex: 1, width: 2, marginTop: 4, background: isComplete ? 'var(--ds-success)' : 'repeating-linear-gradient(180deg, var(--ds-divider) 0 4px, transparent 4px 8px)', minHeight: 24 }} />}
                  </div>
                  <div style={{ flex: 1, paddingBottom: isLast ? 0 : 18 }}>
                    <div style={{ fontWeight: 700, fontSize: 'var(--ds-fs-body-sm)', color: isPending ? 'var(--ds-ink-3)' : 'var(--ds-ink)' }}>
                      {step.title}
                      {step.tag && <span style={{ marginLeft: 8, fontSize: 'var(--ds-fs-overline)', fontWeight: 700, color: 'var(--ds-ink-4)', background: 'var(--ds-bg)', padding: '2px 8px', borderRadius: 'var(--ds-radius-pill)', textTransform: 'uppercase' }}>{step.tag}</span>}
                    </div>
                    <div style={{ fontSize: 'var(--ds-fs-caption)', color: 'var(--ds-ink-3)', marginTop: 2 }}>{step.meta}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
