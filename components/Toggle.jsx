'use client';

export default function Toggle({ on, onChange, disabled, label }) {
  return (
    <button
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={() => !disabled && onChange(!on)}
      disabled={disabled}
      style={{
        width: 50,
        height: 30,
        borderRadius: 'var(--ds-radius-pill)',
        border: 0,
        padding: 3,
        background: disabled ? 'var(--ds-ink-4)' : on ? 'var(--ds-blue)' : '#C4CBDB',
        transition: 'background 160ms var(--ds-ease-out)',
        display: 'inline-flex',
        alignItems: 'center',
        cursor: disabled ? 'not-allowed' : 'pointer',
        boxSizing: 'border-box',
        boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.06)',
        flexShrink: 0,
        opacity: disabled ? 0.6 : 1,
      }}
    >
      <span style={{
        width: 24,
        height: 24,
        borderRadius: '50%',
        background: '#fff',
        transform: `translateX(${on ? 20 : 0}px)`,
        transition: 'transform 160ms var(--ds-ease-out)',
        boxShadow: '0 1px 2px rgba(11,27,59,0.18), 0 1px 0 rgba(11,27,59,0.06)',
      }} />
    </button>
  );
}
