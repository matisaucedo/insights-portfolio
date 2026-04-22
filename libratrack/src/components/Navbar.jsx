import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Logo from './Logo'

const NAV_LINKS = [
  { label: 'Funciones', href: 'funciones' },
  { label: 'Cómo funciona', href: 'como-funciona' },
  { label: 'Precios', href: 'precios' },
]

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function Navbar({ onCta }) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 clamp(20px, 5vw, 64px)',
        height: 60,
        background: 'rgba(247,245,242,0.92)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(0,0,0,0.07)',
      }}
    >
      <Link to="/" style={{ textDecoration: 'none' }}>
        <Logo size={20} />
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
        {NAV_LINKS.map((link) => (
          <button
            key={link.label}
            onClick={() => scrollTo(link.href)}
            style={{
              fontSize: 13,
              color: '#a0a09c',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              fontFamily: 'inherit',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.target.style.color = '#1a1a18')}
            onMouseLeave={(e) => (e.target.style.color = '#a0a09c')}
          >
            {link.label}
          </button>
        ))}

        <motion.button
          onClick={onCta ?? (() => scrollTo('precios'))}
          whileHover={{ background: 'rgba(52,211,153,0.12)', borderColor: 'rgba(52,211,153,0.45)' }}
          transition={{ duration: 0.2 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 12,
            fontWeight: 500,
            color: '#10b981',
            background: 'rgba(52,211,153,0.07)',
            border: '1px solid rgba(52,211,153,0.25)',
            borderRadius: 999,
            padding: '6px 16px',
            cursor: 'pointer',
            fontFamily: 'inherit',
          }}
        >
          Empezar →
        </motion.button>
      </div>
    </motion.nav>
  )
}
