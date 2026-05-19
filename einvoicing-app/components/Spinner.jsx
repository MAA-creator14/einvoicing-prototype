export default function Spinner({ size = 18, color = '#fff' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      style={{ animation: 'tideSpin 0.9s linear infinite', flexShrink: 0 }}
    >
      <circle cx="12" cy="12" r="9" stroke={`${color}4D`} strokeWidth="3" fill="none"/>
      <path d="M21 12a9 9 0 0 0-9-9" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round"/>
    </svg>
  );
}
