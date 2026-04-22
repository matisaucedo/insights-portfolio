// Lines + Dot logo — supports light (dark bg) and dark (light bg) contexts
export default function Logo({ size = 24, className = '', light = false }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 26 26"
        fill="none"
        aria-hidden="true"
      >
        <rect x="4" y="7" width="18" height="3" rx="1.5" fill="#34D399" />
        <rect x="4" y="12" width="13" height="3" rx="1.5" fill="#34D399" opacity="0.55" />
        <rect x="4" y="17" width="8" height="3" rx="1.5" fill="#34D399" opacity="0.25" />
        <circle cx="21" cy="18.5" r="2.5" fill="#34D399" />
      </svg>
      <span
        style={{
          fontSize: size * 0.75,
          fontWeight: 300,
          letterSpacing: '-0.05em',
          lineHeight: 1,
          color: light ? '#fff' : '#1a1a18',
        }}
      >
        Libra<span style={{ color: '#34D399' }}>Track</span>
      </span>
    </div>
  )
}
