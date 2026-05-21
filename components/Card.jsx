export function Card({ children, style }) {
  return (
    <div style={{
      background: 'var(--ds-surface)',
      borderRadius: 'var(--ds-radius-lg)',
      padding: '4px 0',
      boxShadow: 'var(--ds-shadow-card)',
      ...style,
    }}>
      {children}
    </div>
  );
}

export function CardRow({ children, divider = true, style }) {
  return (
    <div style={{
      padding: '14px 18px',
      borderBottom: divider ? '1px solid var(--ds-divider)' : '0',
      ...style,
    }}>
      {children}
    </div>
  );
}
