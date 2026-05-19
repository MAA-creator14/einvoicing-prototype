const configs = {
  paid:    { label: 'Paid',           bg: 'var(--ds-success-bg)', color: 'var(--ds-success)' },
  sent:    { label: 'Sent',           bg: 'var(--ds-blue-softer)', color: 'var(--ds-blue)' },
  einvoice:{ label: 'E-invoice sent', bg: 'var(--ds-mint-soft)',   color: '#0D6E59' },
  draft:   { label: 'Draft',          bg: 'var(--ds-bg-tint)',     color: 'var(--ds-ink-3)' },
};

export default function StatusBadge({ type }) {
  const cfg = configs[type] ?? configs.draft;
  return (
    <span style={{
      display: 'inline-block',
      padding: '3px 10px',
      borderRadius: 'var(--ds-radius-pill)',
      background: cfg.bg,
      color: cfg.color,
      fontWeight: 700,
      fontSize: 'var(--ds-fs-caption)',
      letterSpacing: '0.02em',
      whiteSpace: 'nowrap',
    }}>
      {cfg.label}
    </span>
  );
}
