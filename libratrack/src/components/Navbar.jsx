import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Logo from './Logo'

const NAV_LINKS = [
  { label: 'Funciones', href: 'funciones' },
  { label: 'Precios',   href: 'precios'   },
  { label: 'La app',   href: 'app'        },
]

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function Navbar({ onCta }) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0,  scale: 1    }}
      transition={{ duration: 0.60, ease: [0.22, 1, 0.36, 1] }}
      style={{
        /* ── AppDrop: floating centered pill ── */
        position: 'fixed',
        top: 16,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '7px 7px 7px 18px',
        background: 'rgba(22,24,32,0.90)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: '1px solid rgba(255,255,255,0.09)',
        borderRadius: 999,
        boxShadow: '0 8px 40px rgba(0,0,0,0.45), 0 1px 0 rgba(255,255,255,0.04) inset',
        whiteSpace: 'nowrap',
      }}
    >
      {/* Logo */}
      <Link to="/" style={{ textDecoration: 'none', marginRight: 16 }}>
        <Logo size={18} light />
      </Link>

      {/* Nav links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        {NAV_LINKS.map(link => (
          <button
            key={link.label}
            onClick={() => scrollTo(link.href)}
            style={{
              fontSize: 13, fontWeight: 500,
              color: 'rgba(255,255,255,0.45)',
              background: 'none', border: 'none',
              cursor: 'pointer', padding: '5px 12px',
              borderRadius: 999,
              fontFamily: 'inherit',
              transition: 'color 0.18s, background 0.18s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = '#fff'
              e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = 'rgba(255,255,255,0.45)'
              e.currentTarget.style.background = 'none'
            }}
          >
            {link.label}
          </button>
        ))}
      </div>

      {/* CTA pill — inner button, AppDrop style */}
      <motion.button
        onClick={onCta ?? (() => scrollTo('precios'))}
        whileHover={{ background: '#10b981', scale: 1.02 }}
        whileTap={{ scale: 0.96 }}
        transition={{ duration: 0.15 }}
        style={{
          marginLeft: 8,
          display: 'inline-flex', alignItems: 'center', gap: 6,
          fontSize: 12, fontWeight: 600, color: '#0d0e12',
          background: '#34D399', border: 'none',
          borderRadius: 999, padding: '8px 18px',
          cursor: 'pointer', fontFamily: 'inherit',
          boxShadow: '0 0 16px rgba(52,211,153,0.30)',
        }}
      >
        Empezar →
      </motion.button>
    </motion.nav>
  )
}
