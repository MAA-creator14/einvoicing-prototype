export default function EinvoiceIllustration() {
  return (
    <svg width="220" height="170" viewBox="0 0 220 170" aria-hidden="true">
      {/* Receiving system doc — deep navy */}
      <rect x="124" y="34" width="76" height="100" rx="6" fill="var(--ds-blue-deep)"/>
      <rect x="134" y="50" width="44" height="5" fill="#0B3A85"/>
      <rect x="134" y="62" width="56" height="5" fill="#0B3A85"/>
      <rect x="134" y="74" width="36" height="5" fill="#0B3A85"/>
      {/* Mint accent disc */}
      <circle cx="170" cy="108" r="18" fill="var(--ds-mint)"/>
      {/* Front invoice doc — logo blue */}
      <rect x="20" y="22" width="76" height="100" rx="6" fill="var(--ds-blue-logo)"/>
      <rect x="30" y="38" width="44" height="5" fill="#fff" opacity="0.55"/>
      <rect x="30" y="50" width="56" height="5" fill="#fff" opacity="0.55"/>
      <rect x="30" y="62" width="36" height="5" fill="#fff" opacity="0.55"/>
      <rect x="30" y="92" width="56" height="14" rx="2" fill="#fff" opacity="0.18"/>
      <text x="58" y="103" textAnchor="middle" fill="#fff" fontFamily="Mulish, sans-serif" fontSize="11" fontWeight="800">£1,960.00</text>
      {/* Arrow — Tide blue */}
      <path d="M 92 76 L 116 76 M 108 68 L 116 76 L 108 84" stroke="var(--ds-blue)" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
