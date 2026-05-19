'use client';

import Link from 'next/link';
import { mockInvoices } from '@/data/mockData';
import StatusBadge from '@/components/StatusBadge';
import BottomNav from '@/components/BottomNav';

function formatAmount(n) {
  return `£${n.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

function InvoiceRow({ invoice }) {
  const badgeType = invoice.isEinvoice ? 'einvoice' : invoice.status;
  return (
    <Link href={`/invoices/${invoice.id}`} style={{ display: 'block', textDecoration: 'none' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        padding: '14px 18px',
        borderBottom: '1px solid var(--ds-divider)',
        background: 'var(--ds-surface)',
      }}>
        {/* Avatar */}
        <div style={{
          width: 40,
          height: 40,
          borderRadius: 12,
          background: 'var(--ds-blue-softer)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--ds-blue)',
          fontWeight: 800,
          fontSize: 14,
          flexShrink: 0,
        }}>
          {invoice.customerName.split(' ').map(w => w[0]).slice(0, 2).join('')}
        </div>

        {/* Details */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 700, fontSize: 'var(--ds-fs-body-sm)', color: 'var(--ds-ink)', marginBottom: 2 }}>
            {invoice.customerName}
          </div>
          <div style={{ fontSize: 'var(--ds-fs-caption)', color: 'var(--ds-ink-3)' }}>
            {invoice.id} · {formatDate(invoice.date)}
          </div>
        </div>

        {/* Amount + badge */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4, flexShrink: 0 }}>
          <span style={{ fontWeight: 800, fontSize: 'var(--ds-fs-body-sm)', color: 'var(--ds-ink)', fontVariantNumeric: 'tabular-nums' }}>
            {formatAmount(invoice.amount)}
          </span>
          <StatusBadge type={badgeType} />
        </div>
      </div>
    </Link>
  );
}

function EmptyState() {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 32px', textAlign: 'center' }}>
      {/* Geometric illustration */}
      <svg width="140" height="120" viewBox="0 0 140 120" aria-hidden="true" style={{ marginBottom: 24 }}>
        <rect x="30" y="20" width="60" height="78" rx="6" fill="var(--ds-blue-softer)"/>
        <rect x="40" y="34" width="32" height="5" rx="2" fill="var(--ds-blue-soft)"/>
        <rect x="40" y="46" width="40" height="5" rx="2" fill="var(--ds-blue-soft)"/>
        <rect x="40" y="58" width="24" height="5" rx="2" fill="var(--ds-blue-soft)"/>
        <rect x="40" y="76" width="40" height="10" rx="3" fill="var(--ds-blue)"/>
        <circle cx="104" cy="36" r="20" fill="var(--ds-mint-soft)"/>
        <path d="M96 36 L102 42 L112 30" stroke="var(--ds-mint)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </svg>
      <div style={{ fontWeight: 800, fontSize: 'var(--ds-fs-h3)', color: 'var(--ds-ink)', marginBottom: 8 }}>
        No invoices yet
      </div>
      <div style={{ fontSize: 'var(--ds-fs-meta)', color: 'var(--ds-ink-3)', lineHeight: 'var(--ds-lh-loose)', marginBottom: 28 }}>
        Create your first invoice and send it directly into your client's accounting software.
      </div>
      <Link href="/invoices/new" style={{
        display: 'inline-block',
        background: 'var(--ds-blue)',
        color: '#fff',
        borderRadius: 'var(--ds-radius-pill)',
        padding: '14px 28px',
        fontWeight: 800,
        fontSize: 'var(--ds-fs-body)',
        textDecoration: 'none',
      }}>
        Create invoice
      </Link>
    </div>
  );
}

export default function InvoiceListPage() {
  const invoices = mockInvoices;

  return (
    <>
      {/* Header */}
      <div style={{
        background: 'var(--ds-surface)',
        padding: '16px 18px 14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid var(--ds-divider)',
        flexShrink: 0,
      }}>
        <div>
          <div style={{ fontSize: 'var(--ds-fs-overline)', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ds-blue)', marginBottom: 2 }}>
            Tide
          </div>
          <div style={{ fontWeight: 800, fontSize: 'var(--ds-fs-h3)', color: 'var(--ds-ink)', letterSpacing: '-0.01em' }}>
            Invoices
          </div>
        </div>
        <Link href="/invoices/new" style={{
          background: 'var(--ds-blue)',
          color: '#fff',
          borderRadius: 'var(--ds-radius-pill)',
          padding: '10px 18px',
          fontWeight: 800,
          fontSize: 'var(--ds-fs-meta)',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          textDecoration: 'none',
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          New
        </Link>
      </div>

      {/* List */}
      <div style={{ flex: 1, overflow: 'auto' }}>
        {invoices.length === 0 ? (
          <EmptyState />
        ) : (
          <div style={{ background: 'var(--ds-surface)', borderRadius: 'var(--ds-radius-lg)', margin: '16px 16px 0', overflow: 'hidden', boxShadow: 'var(--ds-shadow-card)' }}>
            {invoices.map((inv) => (
              <InvoiceRow key={inv.id} invoice={inv} />
            ))}
          </div>
        )}

        {/* FAB */}
        <div style={{ height: 100 }} />
      </div>

      {/* Floating action button */}
      <Link href="/invoices/new" style={{
        position: 'fixed',
        bottom: 90,
        right: 20,
        width: 56,
        height: 56,
        borderRadius: '50%',
        background: 'var(--ds-blue)',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: 'var(--ds-shadow-3)',
        textDecoration: 'none',
        zIndex: 100,
      }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
      </Link>

      <BottomNav />
    </>
  );
}
