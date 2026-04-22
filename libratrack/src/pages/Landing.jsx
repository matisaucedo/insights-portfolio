import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

const EASE = [0.22, 1, 0.36, 1]
const WA = 'https://wa.me/5491165050505?text=Hola%2C%20quiero%20saber%20m%C3%A1s%20sobre%20LibraTrack'

// ── Smooth scroll helper ─────────────────────────────────────────────────────
function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

// ── Count-up hook ────────────────────────────────────────────────────────────
function useCountUp(target, duration = 1200) {
  const [val, setVal] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    const n = parseInt(target.replace(/\D/g, ''))
    const suffix = target.replace(/[\d]/g, '')
    const raf = (now) => {
      const p = Math.min((now - start) / duration, 1)
      const ease = 1 - Math.pow(1 - p, 3)
      setVal(Math.floor(ease * n) + suffix)
      if (p < 1) requestAnimationFrame(raf)
      else setVal(target)
    }
    requestAnimationFrame(raf)
  }, [inView, target, duration])
  return { val, ref }
}

// ── Dashboard mockup (hero visual) ──────────────────────────────────────────
const MOCK_BOOKS = [
  { title: 'El Aleph', author: 'J.L. Borges', status: 'Prestado', color: '#34D399' },
  { title: 'Rayuela', author: 'J. Cortázar', status: 'Vence hoy', color: '#f59e0b' },
  { title: 'Ficciones', author: 'J.L. Borges', status: 'Disponible', color: '#34D399' },
  { title: '1984', author: 'G. Orwell', status: 'Vencido', color: '#f87171' },
  { title: 'Cien años de soledad', author: 'G.G. Márquez', status: 'Prestado', color: '#34D399' },
]

function DashboardMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40, y: 10 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.9, delay: 0.4, ease: EASE }}
      style={{
        background: '#080f0c',
        border: '1px solid rgba(52,211,153,0.14)',
        borderRadius: 18,
        overflow: 'hidden',
        boxShadow: '0 32px 80px rgba(0,0,0,0.18), 0 0 0 1px rgba(52,211,153,0.06)',
        width: '100%',
        maxWidth: 480,
      }}
    >
      {/* Window bar */}
      <div style={{ background: '#050e0a', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 6, borderBottom: '1px solid rgba(52,211,153,0.07)' }}>
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57' }} />
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ffbd2e' }} />
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28ca41' }} />
        <div style={{ flex: 1, margin: '0 12px', background: 'rgba(255,255,255,0.05)', borderRadius: 6, height: 20, display: 'flex', alignItems: 'center', padding: '0 10px' }}>
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)' }}>libratrack.app/panel</span>
        </div>
      </div>

      {/* Header */}
      <div style={{ padding: '14px 18px 10px', borderBottom: '1px solid rgba(52,211,153,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 10, color: 'rgba(52,211,153,0.5)', textTransform: 'uppercase', letterSpacing: '0.10em', marginBottom: 2 }}>Panel Bibliotecario</div>
          <div style={{ fontSize: 14, fontWeight: 500, color: '#fff', letterSpacing: '-0.02em' }}>Biblioteca Central</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {[
            { n: '127', l: 'Préstamos' },
            { n: '340', l: 'Socios' },
          ].map(s => (
            <div key={s.l} style={{ textAlign: 'center', background: 'rgba(52,211,153,0.06)', border: '1px solid rgba(52,211,153,0.10)', borderRadius: 8, padding: '6px 12px' }}>
              <div style={{ fontSize: 16, fontWeight: 600, color: '#34D399', letterSpacing: '-0.03em' }}>{s.n}</div>
              <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.30)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Search bar */}
      <div style={{ padding: '10px 18px 6px' }}>
        <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8, padding: '7px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.20)' }}>Buscar por título, autor o ISBN...</span>
        </div>
      </div>

      {/* Book rows */}
      <div style={{ padding: '4px 18px 16px', display: 'flex', flexDirection: 'column', gap: 5 }}>
        {MOCK_BOOKS.map((b, i) => (
          <motion.div
            key={b.title}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.6 + i * 0.07, ease: EASE }}
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: 8, padding: '8px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 24, height: 32, background: 'rgba(52,211,153,0.07)', border: '1px solid rgba(52,211,153,0.10)', borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10 }}>📖</div>
              <div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)', fontWeight: 500 }}>{b.title}</div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.30)' }}>{b.author}</div>
              </div>
            </div>
            <span style={{ fontSize: 10, color: b.color, background: `${b.color}18`, border: `1px solid ${b.color}30`, borderRadius: 999, padding: '2px 8px', fontWeight: 500 }}>{b.status}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

// ── Phone mockup (app section) ───────────────────────────────────────────────
function PhoneMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: EASE }}
      style={{ position: 'relative', width: 220, flexShrink: 0 }}
    >
      {/* Phone frame */}
      <div style={{ background: '#111', border: '8px solid #1a1a1a', borderRadius: 36, overflow: 'hidden', boxShadow: '0 24px 64px rgba(0,0,0,0.22), inset 0 0 0 1px rgba(255,255,255,0.08)' }}>
        {/* Notch */}
        <div style={{ height: 28, background: '#0a0f0d', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid rgba(52,211,153,0.07)' }}>
          <div style={{ width: 60, height: 12, background: '#111', borderRadius: 999 }} />
        </div>
        {/* App content */}
        <div style={{ background: '#050e0a', padding: '12px 14px 8px' }}>
          <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.30)', marginBottom: 2 }}>Buen día, Matías 👋</div>
          <div style={{ fontSize: 13, fontWeight: 500, color: '#fff', letterSpacing: '-0.02em', marginBottom: 10 }}>Mis libros</div>
          {/* Tabs */}
          <div style={{ display: 'flex', gap: 4, marginBottom: 8 }}>
            {['Prestados', 'Reservas'].map((t, i) => (
              <div key={t} style={{ fontSize: 9, padding: '3px 8px', borderRadius: 999, background: i === 0 ? 'rgba(52,211,153,0.12)' : 'transparent', color: i === 0 ? '#34D399' : 'rgba(255,255,255,0.30)', border: `1px solid ${i === 0 ? 'rgba(52,211,153,0.22)' : 'transparent'}` }}>{t}</div>
            ))}
          </div>
          {/* Loan cards */}
          {[
            { t: 'El Aleph', a: 'Borges', b: 'Devolver en 12 días', c: '#34D399' },
            { t: 'Rayuela', a: 'Cortázar', b: 'Vence mañana', c: '#f59e0b' },
            { t: 'Ficciones', a: 'Borges', b: 'Reservado — 28/04', c: '#a0a09c' },
          ].map(l => (
            <div key={l.t} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(52,211,153,0.06)', borderRadius: 8, padding: '7px 10px', marginBottom: 5, display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 18, height: 24, background: 'rgba(52,211,153,0.07)', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, flexShrink: 0 }}>📚</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.8)', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{l.t}</div>
                <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.30)' }}>{l.a}</div>
                <div style={{ fontSize: 8, color: l.c, marginTop: 2 }}>{l.b}</div>
              </div>
            </div>
          ))}
        </div>
        {/* Bottom nav */}
        <div style={{ background: 'rgba(5,14,10,0.95)', borderTop: '1px solid rgba(255,255,255,0.05)', padding: '8px 0 12px', display: 'flex', justifyContent: 'space-around' }}>
          {['⊞ Inicio', '◫ Catálogo', '○ Perfil'].map((item, i) => (
            <div key={item} style={{ fontSize: 8, color: i === 0 ? '#34D399' : 'rgba(255,255,255,0.28)', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              <div style={{ width: 24, height: 20, borderRadius: 6, background: i === 0 ? 'rgba(52,211,153,0.12)' : 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10 }}>{item.split(' ')[0]}</div>
              {item.split(' ')[1]}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// ── Stat item with count-up ──────────────────────────────────────────────────
function StatItem({ value, label, delta, accent }) {
  const { val, ref } = useCountUp(value)
  return (
    <div ref={ref} style={{ textAlign: 'center' }}>
      <div style={{ fontSize: 'clamp(52px, 6vw, 80px)', fontWeight: 300, letterSpacing: '-0.05em', lineHeight: 1, color: accent ? '#10b981' : '#1a1a18', marginBottom: 10, fontVariantNumeric: 'tabular-nums' }}>
        {val}
      </div>
      <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#a0a09c', fontWeight: 500, marginBottom: delta ? 4 : 0 }}>{label}</div>
      {delta && <div style={{ fontSize: 12, color: '#34D399' }}>{delta}</div>}
    </div>
  )
}

// ── Features data ────────────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
    name: 'Catálogo ISBN automático',
    desc: 'Escaneá el código de barras y los datos del libro se cargan solos. Título, autor, editorial, portada.',
  },
  {
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    name: 'Préstamos en tiempo real',
    desc: 'Registro instantáneo de entregas y devoluciones. El stock se actualiza al segundo.',
  },
  {
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>,
    name: 'App móvil para socios',
    desc: 'Cada socio ve sus libros prestados, reserva títulos y renueva desde el celular.',
  },
  {
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    name: 'Gestión de socios',
    desc: 'Alta, baja y modificación de usuarios. Historial de préstamos por persona. Sin límite de socios.',
  },
  {
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/></svg>,
    name: 'Reportes y estadísticas',
    desc: 'Libros más prestados, socios más activos, tendencias mensuales. Todo en un dashboard claro.',
  },
  {
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm-8.27 4a2 2 0 0 1-3.46 0"/></svg>,
    name: 'Alertas automáticas',
    desc: 'Notificaciones de vencimiento para socios y bibliotecarios. Sin seguimiento manual.',
  },
]

// ── Journey steps ────────────────────────────────────────────────────────────
const JOURNEY = [
  { num: '01', title: 'Cargá tu colección', desc: 'Escaneá ISBN o ingresá títulos manualmente. Organización automática por autor, género y disponibilidad. Importá catálogos existentes en minutos.' },
  { num: '02', title: 'Gestioná préstamos', desc: 'Registrá entregas y devoluciones con un clic. El sistema genera alertas automáticas y lleva el historial completo de cada libro.' },
  { num: '03', title: 'Conectá a tus socios', desc: 'Cada socio accede a su app personal. Pueden reservar, renovar y consultar su historial desde el celular, sin llamar a la biblioteca.' },
]

// ── Pricing plans ────────────────────────────────────────────────────────────
const PLANS = [
  {
    name: 'Básico',
    price: 'Gratis',
    desc: 'Para bibliotecas personales y pequeñas colecciones.',
    features: ['Hasta 500 libros', 'Catálogo digital', 'Búsqueda y filtros', '1 usuario administrador', 'App web incluida'],
    cta: 'Empezar gratis',
    href: WA,
    accent: false,
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/ mes',
    desc: 'Para bibliotecas institucionales, escuelas y organizaciones.',
    features: ['Libros ilimitados', 'Todo lo del plan Básico', 'Gestión de préstamos', 'App móvil para socios', 'Alertas automáticas', 'Reportes y estadísticas', 'Soporte prioritario'],
    cta: 'Contratar Pro',
    href: WA,
    accent: true,
  },
]


// ── Landing ──────────────────────────────────────────────────────────────────
export default function Landing() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <Navbar onCta={() => scrollTo('precios')} />

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section
        id="inicio"
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          padding: 'clamp(100px, 10vw, 140px) clamp(20px, 5vw, 72px) 80px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background glow */}
        <div aria-hidden style={{ position: 'absolute', top: 0, right: '15%', width: '50vw', height: '70vh', background: 'radial-gradient(ellipse at top right, rgba(52,211,153,0.06) 0%, transparent 65%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1128, margin: '0 auto', width: '100%', display: 'flex', alignItems: 'center', gap: 'clamp(32px, 6vw, 80px)', flexWrap: 'wrap' }}>

          {/* Left — copy */}
          <motion.div
            style={{ flex: '1 1 360px', minWidth: 280 }}
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } } }}
          >
            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } } }}
              style={{ marginBottom: 24 }}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(52,211,153,0.07)', border: '1px solid rgba(52,211,153,0.18)', color: '#10b981', fontSize: 11, fontWeight: 500, padding: '5px 14px', borderRadius: 999, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                <motion.span style={{ width: 5, height: 5, borderRadius: 999, background: '#34D399', display: 'inline-block', boxShadow: '0 0 6px rgba(52,211,153,0.6)' }} animate={{ scale: [1, 1.6, 1] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }} />
                Software para bibliotecas
              </span>
            </motion.div>

            <motion.h1
              variants={{ hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } } }}
              style={{ fontSize: 'clamp(40px, 5.5vw, 72px)', fontWeight: 300, letterSpacing: '-0.05em', lineHeight: '0.97em', color: 'var(--txt)', marginBottom: 22, margin: '0 0 22px' }}
            >
              Tu biblioteca.<br />
              <span style={{ color: '#10b981' }}>Organizada,</span><br />
              prestada, monitoreada.
            </motion.h1>

            <motion.p
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } }}
              style={{ fontSize: 16, color: 'var(--txt-muted)', lineHeight: '1.7em', maxWidth: 440, marginBottom: 36 }}
            >
              Catálogo digital con ISBN automático, préstamos en tiempo real y app móvil para tus socios. Todo en una plataforma. Instalación en el día.
            </motion.p>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } } }}
              style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}
            >
              <motion.button
                onClick={() => scrollTo('precios')}
                whileHover={{ background: 'rgba(52,211,153,0.16)', borderColor: 'rgba(52,211,153,0.55)', scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(52,211,153,0.09)', border: '1px solid rgba(52,211,153,0.28)', color: '#10b981', fontSize: 14, fontWeight: 500, padding: '12px 26px', borderRadius: 999, cursor: 'pointer', fontFamily: 'inherit' }}
              >
                Ver planes →
              </motion.button>
              <Link to="/app" style={{ textDecoration: 'none' }}>
                <motion.div
                  whileHover={{ background: 'rgba(0,0,0,0.05)' }}
                  whileTap={{ scale: 0.98 }}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'transparent', border: '1px solid rgba(0,0,0,0.10)', color: 'var(--txt-muted)', fontSize: 14, padding: '12px 26px', borderRadius: 999, cursor: 'pointer' }}
                >
                  Ver la app
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right — dashboard mockup */}
          <div style={{ flex: '1 1 320px', display: 'flex', justifyContent: 'center' }}>
            <DashboardMockup />
          </div>

        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────────────────── */}
      <section
        id="estadisticas"
        style={{ borderTop: '1px solid var(--border)', padding: '80px clamp(20px, 5vw, 72px)' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          style={{ maxWidth: 860, margin: '0 auto', display: 'flex', justifyContent: 'center', gap: 'clamp(40px, 8vw, 100px)', flexWrap: 'wrap' }}
          className="stats-row"
        >
          <StatItem value="127+" label="Préstamos activos" delta="↑ 12% este mes" accent />
          <StatItem value="340+" label="Socios registrados" />
          <StatItem value="15min" label="Tiempo de setup" delta="Instalación en el día" />
        </motion.div>
      </section>

      {/* ── FEATURES ──────────────────────────────────────────────────── */}
      <section
        id="funciones"
        style={{ borderTop: '1px solid var(--border)', padding: '80px clamp(20px, 5vw, 72px)' }}
      >
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            style={{ marginBottom: 48 }}
          >
            <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--txt-subtle)', fontWeight: 500, marginBottom: 12 }}>Funciones</div>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 300, letterSpacing: '-0.04em', color: 'var(--txt)', margin: 0, maxWidth: 520, lineHeight: '1.1em' }}>
              Todo lo que una biblioteca necesita, nada que no.
            </h2>
          </motion.div>

          <div
            className="features-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: 'var(--border)', border: '1px solid var(--border)', borderRadius: 20, overflow: 'hidden' }}
          >
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08, ease: EASE }}
                whileHover={{ background: 'rgba(52,211,153,0.025)' }}
                style={{ background: 'var(--bg-surface)', padding: '28px 24px' }}
              >
                <div style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.16)', borderRadius: 10, color: '#10b981', marginBottom: 14 }}>
                  {f.icon}
                </div>
                <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--txt)', marginBottom: 6, letterSpacing: '-0.02em' }}>{f.name}</div>
                <div style={{ fontSize: 13, color: 'var(--txt-muted)', lineHeight: '1.65em' }}>{f.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── JOURNEY ───────────────────────────────────────────────────── */}
      <section
        id="como-funciona"
        style={{ borderTop: '1px solid var(--border)', padding: '80px clamp(20px, 5vw, 72px)' }}
      >
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            style={{ marginBottom: 56 }}
          >
            <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--txt-subtle)', fontWeight: 500, marginBottom: 12 }}>Cómo funciona</div>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 300, letterSpacing: '-0.04em', color: 'var(--txt)', margin: 0, lineHeight: '1.1em' }}>
              De cero a funcionando<br />en tres pasos.
            </h2>
          </motion.div>

          {JOURNEY.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-5% 0px' }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
              className="journey-step"
              style={{ display: 'flex', alignItems: 'flex-start', gap: 'clamp(24px, 5vw, 56px)', padding: '44px 0', borderBottom: i < JOURNEY.length - 1 ? '1px solid var(--border)' : 'none' }}
            >
              <div style={{ fontSize: 'clamp(64px, 8vw, 104px)', fontWeight: 300, letterSpacing: '-0.05em', lineHeight: 1, color: 'rgba(0,0,0,0.06)', minWidth: 'clamp(80px, 10vw, 130px)', flexShrink: 0, userSelect: 'none' }}>
                {step.num}
              </div>
              <div style={{ paddingTop: 8 }}>
                <div style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 300, letterSpacing: '-0.03em', color: 'var(--txt)', marginBottom: 12 }}>{step.title}</div>
                <div style={{ fontSize: 15, color: 'var(--txt-muted)', lineHeight: '1.7em', maxWidth: 500 }}>{step.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── APP SECTION ───────────────────────────────────────────────── */}
      <section
        id="app"
        style={{ borderTop: '1px solid var(--border)', padding: '80px clamp(20px, 5vw, 72px)', background: 'rgba(0,0,0,0.015)' }}
      >
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 'clamp(32px, 6vw, 80px)', flexWrap: 'wrap', justifyContent: 'center' }}>
          <PhoneMockup />

          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
            style={{ flex: '1 1 300px', maxWidth: 460 }}
          >
            <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--txt-subtle)', fontWeight: 500, marginBottom: 16 }}>App para socios</div>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 300, letterSpacing: '-0.04em', color: 'var(--txt)', marginBottom: 16, lineHeight: '1.1em', margin: '0 0 16px' }}>
              Tus socios,<br />conectados.
            </h2>
            <p style={{ fontSize: 15, color: 'var(--txt-muted)', lineHeight: '1.7em', marginBottom: 12 }}>
              Cada socio tiene su propio panel. Pueden ver qué libros tienen prestados, qué vence pronto y hacer reservas sin necesidad de ir a la biblioteca.
            </p>
            <p style={{ fontSize: 15, color: 'var(--txt-muted)', lineHeight: '1.7em', marginBottom: 28 }}>
              Funciona desde cualquier celular. Sin descargar nada, sin contraseñas complicadas.
            </p>
            <Link to="/app" style={{ textDecoration: 'none' }}>
              <motion.div
                whileHover={{ background: 'rgba(52,211,153,0.14)', borderColor: 'rgba(52,211,153,0.50)' }}
                whileTap={{ scale: 0.98 }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.25)', color: '#10b981', fontSize: 14, fontWeight: 500, padding: '11px 24px', borderRadius: 999, cursor: 'pointer' }}
              >
                Ver demo de la app →
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── PRICING ───────────────────────────────────────────────────── */}
      <section
        id="precios"
        style={{ borderTop: '1px solid var(--border)', padding: '80px clamp(20px, 5vw, 72px)' }}
      >
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            style={{ marginBottom: 48, textAlign: 'center' }}
          >
            <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--txt-subtle)', fontWeight: 500, marginBottom: 12 }}>Precios</div>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 300, letterSpacing: '-0.04em', color: 'var(--txt)', margin: '0 0 12px', lineHeight: '1.1em' }}>
              Transparente, sin sorpresas.
            </h2>
            <p style={{ fontSize: 15, color: 'var(--txt-muted)', margin: 0 }}>
              Empezá gratis. Pasá a Pro cuando lo necesites.
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            {PLANS.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
                style={{
                  background: plan.accent ? '#fff' : 'var(--bg-surface)',
                  border: plan.accent ? '1px solid rgba(52,211,153,0.30)' : '1px solid var(--border)',
                  borderRadius: 20,
                  padding: '32px 28px',
                  position: 'relative',
                  boxShadow: plan.accent ? '0 8px 32px rgba(52,211,153,0.08)' : 'none',
                }}
              >
                {plan.accent && (
                  <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: '#10b981', color: '#fff', fontSize: 10, fontWeight: 600, padding: '4px 14px', borderRadius: 999, letterSpacing: '0.06em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                    Más popular
                  </div>
                )}
                <div style={{ marginBottom: 6 }}>
                  <span style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--txt-subtle)', fontWeight: 500 }}>{plan.name}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 8 }}>
                  <span style={{ fontSize: 40, fontWeight: 300, letterSpacing: '-0.04em', color: 'var(--txt)', lineHeight: 1 }}>{plan.price}</span>
                  {plan.period && <span style={{ fontSize: 14, color: 'var(--txt-muted)' }}>{plan.period}</span>}
                </div>
                <p style={{ fontSize: 13, color: 'var(--txt-muted)', marginBottom: 24, lineHeight: '1.5em' }}>{plan.desc}</p>
                <div style={{ borderTop: '1px solid var(--border)', paddingTop: 20, marginBottom: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {plan.features.map(f => (
                    <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 16, height: 16, borderRadius: '50%', background: 'rgba(52,211,153,0.10)', border: '1px solid rgba(52,211,153,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <svg width="8" height="8" viewBox="0 0 12 12" fill="none"><polyline points="2,6 5,9 10,3" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </div>
                      <span style={{ fontSize: 13, color: 'var(--txt-muted)' }}>{f}</span>
                    </div>
                  ))}
                </div>
                <motion.a
                  href={WA}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.01, background: plan.accent ? '#0ea572' : 'rgba(52,211,153,0.14)' }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: plan.accent ? '#10b981' : 'rgba(52,211,153,0.08)',
                    border: plan.accent ? 'none' : '1px solid rgba(52,211,153,0.25)',
                    color: plan.accent ? '#fff' : '#10b981',
                    fontSize: 14, fontWeight: 500,
                    padding: '12px 0', borderRadius: 12, textDecoration: 'none',
                    cursor: 'pointer',
                  }}
                >
                  {plan.cta} →
                </motion.a>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ textAlign: 'center', fontSize: 12, color: 'var(--txt-subtle)', marginTop: 24 }}
          >
            Sin contrato de permanencia. Cancelá cuando quieras.
          </motion.p>
        </div>
      </section>

      {/* ── CTA FINAL ─────────────────────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: EASE }}
        style={{ borderTop: '1px solid var(--border)', padding: 'clamp(80px, 10vw, 120px) clamp(20px, 5vw, 72px)', textAlign: 'center' }}
      >
        <div style={{ maxWidth: 580, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 300, letterSpacing: '-0.05em', color: 'var(--txt)', lineHeight: '0.97em', marginBottom: 18, margin: '0 0 18px' }}>
            Tu biblioteca,<br />modernizada.
          </h2>
          <p style={{ fontSize: 15, color: 'var(--txt-muted)', marginBottom: 32, lineHeight: '1.65em' }}>
            Instalación en menos de un día. Soporte incluido en todos los planes.
          </p>
          <motion.a
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ background: 'rgba(52,211,153,0.15)', borderColor: 'rgba(52,211,153,0.55)', scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(52,211,153,0.09)', border: '1px solid rgba(52,211,153,0.28)', color: '#10b981', fontSize: 15, fontWeight: 500, padding: '14px 32px', borderRadius: 999, textDecoration: 'none', marginBottom: 16 }}
          >
            Hablar con un asesor →
          </motion.a>
          <p style={{ fontSize: 12, color: 'var(--txt-subtle)', margin: 0 }}>Respondemos en menos de 24hs</p>
        </div>
      </motion.section>
    </div>
  )
}
