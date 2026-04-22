import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

const EASE  = [0.22, 1, 0.36, 1]
const EASEI = [0.4, 0, 0.2, 1]
const WA    = 'https://wa.me/5491165050505?text=Hola%2C%20quiero%20saber%20m%C3%A1s%20sobre%20LibraTrack'

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

// ── Count-up ─────────────────────────────────────────────────────────────────
function useCountUp(target, duration = 1100) {
  const [val, setVal]   = useState(0)
  const ref             = useRef(null)
  const inView          = useInView(ref, { once: true, margin: '-8% 0px' })
  useEffect(() => {
    if (!inView) return
    const start  = performance.now()
    const n      = parseInt(String(target).replace(/\D/g, ''))
    const suffix = String(target).replace(/\d/g, '')
    const raf = now => {
      const p    = Math.min((now - start) / duration, 1)
      const ease = 1 - Math.pow(1 - p, 3)
      setVal(Math.floor(ease * n) + suffix)
      if (p < 1) requestAnimationFrame(raf)
      else setVal(target)
    }
    requestAnimationFrame(raf)
  }, [inView, target, duration])
  return { val, ref }
}

// ── Orb glow ──────────────────────────────────────────────────────────────────
function Orb({ x = '50%', y = '0%', size = 900, color = 'rgba(52,211,153,0.10)', blur = 80 }) {
  return (
    <div aria-hidden style={{
      position: 'absolute', left: x, top: y,
      width: size, height: size,
      transform: 'translate(-50%, -50%)',
      background: `radial-gradient(ellipse at center, ${color} 0%, transparent 70%)`,
      filter: `blur(${blur}px)`,
      pointerEvents: 'none', zIndex: 0,
    }} />
  )
}

// ── Dashboard mockup ─────────────────────────────────────────────────────────
const MOCK_BOOKS = [
  { title: 'El Aleph',           author: 'J.L. Borges',    status: 'Prestado',   c: '#34D399' },
  { title: 'Rayuela',            author: 'J. Cortázar',    status: 'Vence hoy',  c: '#f59e0b' },
  { title: 'Ficciones',          author: 'J.L. Borges',    status: 'Disponible', c: '#34D399' },
  { title: '1984',               author: 'G. Orwell',      status: 'Vencido',    c: '#f87171' },
  { title: 'Cien años de soledad', author: 'G.G. Márquez', status: 'Prestado',   c: '#34D399' },
]

function DashboardMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.0, delay: 0.35, ease: EASE }}
      style={{
        background: '#0f1117',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 20,
        overflow: 'hidden',
        boxShadow: '0 40px 100px rgba(0,0,0,0.50), 0 0 0 1px rgba(52,211,153,0.06)',
        width: '100%', maxWidth: 500,
        position: 'relative',
      }}
    >
      {/* Subtle inner glow */}
      <div aria-hidden style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(52,211,153,0.30), transparent)' }} />

      {/* Window bar */}
      <div style={{ background: '#0d0e12', padding: '11px 16px', display: 'flex', alignItems: 'center', gap: 6, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57' }} />
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ffbd2e' }} />
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28ca41' }} />
        <div style={{ flex: 1, margin: '0 10px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 6, height: 22, display: 'flex', alignItems: 'center', padding: '0 10px' }}>
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.20)' }}>libratrack.app / panel</span>
        </div>
      </div>

      {/* Header row */}
      <div style={{ padding: '14px 18px 10px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(52,211,153,0.50)', marginBottom: 2 }}>Panel Bibliotecario</div>
          <div style={{ fontSize: 15, fontWeight: 500, color: '#fff', letterSpacing: '-0.02em' }}>Biblioteca Central</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {[{ n: '127', l: 'Préstamos' }, { n: '340', l: 'Socios' }].map(s => (
            <div key={s.l} style={{ textAlign: 'center', background: 'rgba(52,211,153,0.06)', border: '1px solid rgba(52,211,153,0.12)', borderRadius: 10, padding: '6px 14px' }}>
              <div style={{ fontSize: 18, fontWeight: 600, color: '#34D399', letterSpacing: '-0.03em', lineHeight: 1 }}>{s.n}</div>
              <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 2 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Search */}
      <div style={{ padding: '10px 18px 6px' }}>
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8, padding: '7px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.20)" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.18)' }}>Buscar por título, autor o ISBN...</span>
        </div>
      </div>

      {/* Rows */}
      <div style={{ padding: '4px 18px 16px', display: 'flex', flexDirection: 'column', gap: 5 }}>
        {MOCK_BOOKS.map((b, i) => (
          <motion.div
            key={b.title}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.55 + i * 0.07, ease: EASE }}
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: 8, padding: '8px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 24, height: 32, background: 'rgba(52,211,153,0.06)', border: '1px solid rgba(52,211,153,0.10)', borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, flexShrink: 0 }}>📖</div>
              <div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.80)', fontWeight: 500 }}>{b.title}</div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.28)' }}>{b.author}</div>
              </div>
            </div>
            <span style={{ fontSize: 10, color: b.c, background: `${b.c}18`, border: `1px solid ${b.c}28`, borderRadius: 999, padding: '2px 9px', fontWeight: 500 }}>{b.status}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

// ── Phone mockup ──────────────────────────────────────────────────────────────
function PhoneMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.85, ease: EASE }}
      style={{ position: 'relative', width: 220, flexShrink: 0 }}
    >
      <div style={{ background: '#111', border: '7px solid #1c1c1c', borderRadius: 38, overflow: 'hidden', boxShadow: '0 32px 80px rgba(0,0,0,0.50), 0 0 0 1px rgba(255,255,255,0.06), inset 0 0 0 1px rgba(255,255,255,0.04)' }}>
        {/* Notch */}
        <div style={{ height: 28, background: '#0a0f0d', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid rgba(52,211,153,0.08)' }}>
          <div style={{ width: 56, height: 10, background: '#111', borderRadius: 999 }} />
        </div>
        {/* App */}
        <div style={{ background: '#050e0a', padding: '12px 14px 8px' }}>
          <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.28)', marginBottom: 3 }}>Buen día, Matías 👋</div>
          <div style={{ fontSize: 14, fontWeight: 500, color: '#fff', letterSpacing: '-0.02em', marginBottom: 10 }}>Mis libros</div>
          <div style={{ display: 'flex', gap: 4, marginBottom: 8 }}>
            {['Prestados', 'Reservas'].map((t, i) => (
              <div key={t} style={{ fontSize: 9, padding: '3px 9px', borderRadius: 999, background: i === 0 ? 'rgba(52,211,153,0.12)' : 'transparent', color: i === 0 ? '#34D399' : 'rgba(255,255,255,0.28)', border: `1px solid ${i === 0 ? 'rgba(52,211,153,0.22)' : 'transparent'}` }}>{t}</div>
            ))}
          </div>
          {[
            { t: 'El Aleph',  a: 'Borges',   b: 'Devolver en 12 días', c: '#34D399' },
            { t: 'Rayuela',   a: 'Cortázar', b: 'Vence mañana',        c: '#f59e0b' },
            { t: 'Ficciones', a: 'Borges',   b: 'Reservado — 28/04',   c: 'rgba(255,255,255,0.28)' },
          ].map(l => (
            <div key={l.t} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(52,211,153,0.07)', borderRadius: 8, padding: '7px 10px', marginBottom: 5, display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 18, height: 24, background: 'rgba(52,211,153,0.07)', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, flexShrink: 0 }}>📚</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.80)', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{l.t}</div>
                <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.28)' }}>{l.a}</div>
                <div style={{ fontSize: 8, color: l.c, marginTop: 1 }}>{l.b}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ background: 'rgba(5,14,10,0.95)', borderTop: '1px solid rgba(255,255,255,0.05)', padding: '8px 0 12px', display: 'flex', justifyContent: 'space-around' }}>
          {[['⊞', 'Inicio', true], ['◫', 'Catálogo', false], ['○', 'Perfil', false]].map(([ic, lb, act]) => (
            <div key={lb} style={{ fontSize: 8, color: act ? '#34D399' : 'rgba(255,255,255,0.25)', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              <div style={{ width: 24, height: 20, borderRadius: 6, background: act ? 'rgba(52,211,153,0.12)' : 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10 }}>{ic}</div>
              {lb}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// ── Stat tile (WPro countdown style) ─────────────────────────────────────────
function StatTile({ value, label, delta, accent }) {
  const { val, ref } = useCountUp(value)
  return (
    <div ref={ref} style={{ textAlign: 'center', minWidth: 140 }}>
      <div style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 16,
        padding: '24px 28px 20px',
        marginBottom: 0,
        position: 'relative',
        overflow: 'hidden',
      }}>
        {accent && <div aria-hidden style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(52,211,153,0.45), transparent)' }} />}
        <div style={{ fontSize: 'clamp(40px, 5vw, 60px)', fontWeight: 300, letterSpacing: '-0.05em', lineHeight: 1, color: accent ? '#34D399' : '#fff', fontVariantNumeric: 'tabular-nums' }}>
          {val}
        </div>
      </div>
      <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'rgba(255,255,255,0.30)', fontWeight: 500, marginTop: 10 }}>{label}</div>
      {delta && <div style={{ fontSize: 11, color: '#34D399', marginTop: 4 }}>{delta}</div>}
    </div>
  )
}

// ── Feature card ──────────────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
    name: 'Catálogo ISBN automático',
    desc: 'Escaneá el código de barras y los datos del libro se cargan solos. Título, autor, editorial y portada.',
  },
  {
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    name: 'Préstamos en tiempo real',
    desc: 'Registro instantáneo de entregas y devoluciones. El stock se actualiza al segundo, sin demoras.',
  },
  {
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>,
    name: 'App móvil para socios',
    desc: 'Cada socio ve sus libros, reserva títulos y renueva préstamos desde el celular. Sin descargar nada.',
  },
  {
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    name: 'Gestión de socios',
    desc: 'Alta, baja y modificación de usuarios. Historial completo de préstamos por persona. Sin límite.',
  },
  {
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/></svg>,
    name: 'Reportes y estadísticas',
    desc: 'Libros más prestados, socios más activos, tendencias mensuales. Todo visible en un dashboard limpio.',
  },
  {
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm-8.27 4a2 2 0 0 1-3.46 0"/></svg>,
    name: 'Alertas automáticas',
    desc: 'Notificaciones de vencimiento para socios y bibliotecarios. Nunca más un libro perdido.',
  },
]

// ── Journey ───────────────────────────────────────────────────────────────────
const JOURNEY = [
  { num: '01', title: 'Cargá tu colección', desc: 'Escaneá ISBN o ingresá títulos manualmente. Organización automática por autor, género y disponibilidad. Importá catálogos existentes en minutos.' },
  { num: '02', title: 'Gestioná préstamos', desc: 'Registrá entregas y devoluciones con un clic. El sistema genera alertas automáticas y lleva el historial completo de cada libro y socio.' },
  { num: '03', title: 'Conectá a tus socios', desc: 'Cada socio accede a su panel personal. Reservan, renuevan y consultan su historial desde cualquier celular, sin necesidad de ir a la biblioteca.' },
]

// ── Pricing ───────────────────────────────────────────────────────────────────
const PLANS = [
  {
    name: 'Básico', price: 'Gratis', desc: 'Para bibliotecas personales y pequeñas colecciones.',
    features: ['Hasta 500 libros', 'Catálogo digital', 'Búsqueda y filtros', '1 usuario administrador', 'App web incluida'],
    cta: 'Empezar gratis', accent: false,
  },
  {
    name: 'Pro', price: '$29', period: '/ mes', desc: 'Para bibliotecas institucionales, escuelas y organizaciones.',
    features: ['Libros ilimitados', 'Todo el plan Básico', 'Gestión de préstamos', 'App móvil para socios', 'Alertas automáticas', 'Reportes y estadísticas', 'Soporte prioritario'],
    cta: 'Contratar Pro', accent: true,
  },
]

// ── Landing ───────────────────────────────────────────────────────────────────
export default function Landing() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', overflowX: 'hidden' }}>
      <Navbar onCta={() => scrollTo('precios')} />

      {/* ═══════════════════════════ HERO ════════════════════════════════════ */}
      <section id="inicio" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', padding: 'clamp(100px,10vw,140px) clamp(20px,5vw,72px) 80px', position: 'relative', overflow: 'hidden' }}>
        {/* Main orb — WPro-style giant glow */}
        <Orb x="60%" y="30%" size={900} color="rgba(52,211,153,0.09)" blur={100} />
        <Orb x="60%" y="30%" size={500} color="rgba(52,211,153,0.07)" blur={60} />
        {/* Secondary accent orb */}
        <Orb x="20%" y="60%" size={500} color="rgba(52,211,153,0.04)" blur={80} />

        <div className="hero-inner" style={{ maxWidth: 1128, margin: '0 auto', width: '100%', display: 'flex', alignItems: 'center', gap: 'clamp(32px,6vw,80px)', position: 'relative', zIndex: 1 }}>
          {/* Left — copy */}
          <motion.div
            style={{ flex: '1 1 380px', minWidth: 280 }}
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.11, delayChildren: 0.05 } } }}
          >
            {/* Badge */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } } }}
              style={{ marginBottom: 28 }}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.20)', color: '#34D399', fontSize: 11, fontWeight: 500, padding: '5px 14px', borderRadius: 999, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                <motion.span style={{ width: 5, height: 5, borderRadius: 999, background: '#34D399', display: 'inline-block', boxShadow: '0 0 8px rgba(52,211,153,0.70)' }} animate={{ scale: [1, 1.7, 1], opacity: [1, 0.6, 1] }} transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }} />
                Software para bibliotecas
              </span>
            </motion.div>

            {/* H1 */}
            <motion.h1
              variants={{ hidden: { opacity: 0, y: 36 }, visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } } }}
              style={{ fontSize: 'clamp(42px,5.5vw,76px)', fontWeight: 300, letterSpacing: '-0.05em', lineHeight: '0.96em', color: '#fff', margin: '0 0 24px' }}
            >
              Tu biblioteca.<br />
              <span style={{ color: '#34D399' }}>Organizada,</span><br />
              prestada, monitoreada.
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } }}
              style={{ fontSize: 16, color: 'rgba(255,255,255,0.50)', lineHeight: '1.70em', maxWidth: 440, margin: '0 0 36px' }}
            >
              Catálogo digital con ISBN automático, préstamos en tiempo real y app móvil para tus socios. Instalación en el día.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } } }}
              style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}
            >
              <motion.button
                onClick={() => scrollTo('precios')}
                whileHover={{ background: '#10b981', scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.18 }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#34D399', border: 'none', color: '#0d0e12', fontSize: 14, fontWeight: 600, padding: '13px 28px', borderRadius: 999, cursor: 'pointer', fontFamily: 'inherit' }}
              >
                Ver planes →
              </motion.button>
              <Link to="/app" style={{ textDecoration: 'none' }}>
                <motion.div
                  whileHover={{ background: 'rgba(255,255,255,0.07)', borderColor: 'rgba(255,255,255,0.16)' }}
                  whileTap={{ scale: 0.97 }}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.10)', color: 'rgba(255,255,255,0.65)', fontSize: 14, padding: '13px 28px', borderRadius: 999, cursor: 'pointer' }}
                >
                  Ver la app
                </motion.div>
              </Link>
            </motion.div>

            {/* Social proof */}
            <motion.div
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.6, delay: 0.5 } } }}
              style={{ marginTop: 32, display: 'flex', alignItems: 'center', gap: 10 }}
            >
              <div style={{ display: 'flex' }}>
                {['#34D399', '#6e96fb', '#f59e0b', '#f87171'].map((c, i) => (
                  <div key={i} style={{ width: 28, height: 28, borderRadius: '50%', background: c, border: '2px solid #0d0e12', marginLeft: i > 0 ? -8 : 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11 }}>
                    {['📚', '🏫', '📖', '🎓'][i]}
                  </div>
                ))}
              </div>
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.40)' }}>
                Usado por <span style={{ color: 'rgba(255,255,255,0.75)' }}>+40 bibliotecas</span> en Argentina
              </span>
            </motion.div>
          </motion.div>

          {/* Right — dashboard mockup */}
          <div style={{ flex: '1 1 340px', display: 'flex', justifyContent: 'center', position: 'relative' }}>
            {/* Glow behind mockup */}
            <div aria-hidden style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 400, height: 400, background: 'radial-gradient(ellipse, rgba(52,211,153,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
            <DashboardMockup />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ STATS ═══════════════════════════════════ */}
      <section id="estadisticas" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '72px clamp(20px,5vw,72px)' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="stats-row"
          style={{ maxWidth: 800, margin: '0 auto', display: 'flex', justifyContent: 'center', gap: 20, flexWrap: 'wrap' }}
        >
          <StatTile value="127+" label="Préstamos activos"   delta="↑ 12% este mes" accent />
          <StatTile value="340+" label="Socios registrados"  />
          <StatTile value="15min" label="Tiempo de setup"    delta="Instalación en el día" />
        </motion.div>
      </section>

      {/* ═══════════════════════════ FEATURES ════════════════════════════════ */}
      <section id="funciones" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '80px clamp(20px,5vw,72px)', position: 'relative', overflow: 'hidden' }}>
        <Orb x="80%" y="50%" size={600} color="rgba(52,211,153,0.05)" blur={80} />

        <div style={{ maxWidth: 1000, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            style={{ marginBottom: 48 }}
          >
            <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'rgba(52,211,153,0.60)', fontWeight: 500, marginBottom: 12 }}>Funciones</div>
            <h2 style={{ fontSize: 'clamp(28px,3.5vw,46px)', fontWeight: 300, letterSpacing: '-0.04em', color: '#fff', margin: 0, maxWidth: 500, lineHeight: '1.08em' }}>
              Todo lo que una biblioteca<br />necesita, nada que no.
            </h2>
          </motion.div>

          <div className="features-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: (i % 3) * 0.08, ease: EASE }}
                whileHover={{ borderColor: 'rgba(52,211,153,0.20)', y: -3 }}
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: '26px 22px', transition: 'border-color 0.2s' }}
              >
                <div style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.14)', borderRadius: 10, color: '#34D399', marginBottom: 14 }}>
                  {f.icon}
                </div>
                <div style={{ fontSize: 14, fontWeight: 500, color: '#fff', marginBottom: 7, letterSpacing: '-0.02em' }}>{f.name}</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.42)', lineHeight: '1.65em' }}>{f.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ JOURNEY ════════════════════════════════ */}
      <section id="como-funciona" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '80px clamp(20px,5vw,72px)' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            style={{ marginBottom: 56 }}
          >
            <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'rgba(52,211,153,0.60)', fontWeight: 500, marginBottom: 12 }}>Cómo funciona</div>
            <h2 style={{ fontSize: 'clamp(28px,3.5vw,46px)', fontWeight: 300, letterSpacing: '-0.04em', color: '#fff', margin: 0, lineHeight: '1.08em' }}>
              De cero a funcionando<br />en tres pasos.
            </h2>
          </motion.div>

          {JOURNEY.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, x: -36 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-5% 0px' }}
              transition={{ duration: 0.7, delay: i * 0.10, ease: EASE }}
              className="journey-step"
              style={{ display: 'flex', alignItems: 'flex-start', gap: 'clamp(24px,5vw,56px)', padding: '44px 0', borderBottom: i < JOURNEY.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}
            >
              <div style={{ fontSize: 'clamp(64px,8vw,108px)', fontWeight: 300, letterSpacing: '-0.05em', lineHeight: 1, color: 'rgba(255,255,255,0.05)', minWidth: 'clamp(80px,10vw,136px)', flexShrink: 0, userSelect: 'none' }}>
                {step.num}
              </div>
              <div style={{ paddingTop: 8 }}>
                <div style={{ fontSize: 'clamp(20px,2.5vw,28px)', fontWeight: 300, letterSpacing: '-0.03em', color: '#fff', marginBottom: 12 }}>{step.title}</div>
                <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.45)', lineHeight: '1.70em', maxWidth: 500 }}>{step.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════ APP SECTION ════════════════════════════ */}
      <section id="app" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '80px clamp(20px,5vw,72px)', position: 'relative', overflow: 'hidden' }}>
        <Orb x="15%" y="50%" size={600} color="rgba(52,211,153,0.06)" blur={80} />

        <div className="app-inner" style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 'clamp(32px,6vw,80px)', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
          <PhoneMockup />

          <motion.div
            initial={{ opacity: 0, x: 36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease: EASE }}
            style={{ flex: '1 1 300px', maxWidth: 460 }}
          >
            <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'rgba(52,211,153,0.60)', fontWeight: 500, marginBottom: 16 }}>App para socios</div>
            <h2 style={{ fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 300, letterSpacing: '-0.04em', color: '#fff', margin: '0 0 18px', lineHeight: '1.05em' }}>
              Tus socios,<br />conectados.
            </h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.45)', lineHeight: '1.70em', marginBottom: 12 }}>
              Cada socio tiene su propio panel. Pueden ver qué libros tienen prestados, qué vence pronto y hacer reservas sin ir a la biblioteca.
            </p>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.45)', lineHeight: '1.70em', marginBottom: 28 }}>
              Funciona desde cualquier celular. Sin descargar nada, sin contraseñas complicadas.
            </p>
            <Link to="/app" style={{ textDecoration: 'none' }}>
              <motion.div
                whileHover={{ background: 'rgba(52,211,153,0.12)', borderColor: 'rgba(52,211,153,0.35)' }}
                whileTap={{ scale: 0.97 }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(52,211,153,0.07)', border: '1px solid rgba(52,211,153,0.20)', color: '#34D399', fontSize: 14, fontWeight: 500, padding: '12px 24px', borderRadius: 999 }}
              >
                Ver demo de la app →
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════ PRICING ════════════════════════════════ */}
      <section id="precios" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '80px clamp(20px,5vw,72px)', position: 'relative', overflow: 'hidden' }}>
        <Orb x="50%" y="0%" size={700} color="rgba(52,211,153,0.06)" blur={100} />

        <div style={{ maxWidth: 860, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            style={{ textAlign: 'center', marginBottom: 48 }}
          >
            <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'rgba(52,211,153,0.60)', fontWeight: 500, marginBottom: 12 }}>Precios</div>
            <h2 style={{ fontSize: 'clamp(28px,3.5vw,46px)', fontWeight: 300, letterSpacing: '-0.04em', color: '#fff', margin: '0 0 12px', lineHeight: '1.05em' }}>
              Transparente, sin sorpresas.
            </h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.40)', margin: 0 }}>Empezá gratis. Pasá a Pro cuando lo necesites.</p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 16 }}>
            {PLANS.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.10, ease: EASE }}
                style={{
                  background: plan.accent ? 'rgba(52,211,153,0.04)' : 'rgba(255,255,255,0.02)',
                  border: `1px solid ${plan.accent ? 'rgba(52,211,153,0.25)' : 'rgba(255,255,255,0.08)'}`,
                  borderRadius: 20, padding: '32px 28px', position: 'relative',
                  boxShadow: plan.accent ? '0 0 60px rgba(52,211,153,0.06)' : 'none',
                }}
              >
                {plan.accent && (
                  <>
                    <div aria-hidden style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,rgba(52,211,153,0.50),transparent)', borderRadius: '20px 20px 0 0' }} />
                    <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: '#34D399', color: '#0d0e12', fontSize: 10, fontWeight: 700, padding: '4px 14px', borderRadius: 999, letterSpacing: '0.07em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                      Más popular
                    </div>
                  </>
                )}

                <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.35)', fontWeight: 500, marginBottom: 8 }}>{plan.name}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 8 }}>
                  <span style={{ fontSize: 42, fontWeight: 300, letterSpacing: '-0.04em', color: '#fff', lineHeight: 1 }}>{plan.price}</span>
                  {plan.period && <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.35)' }}>{plan.period}</span>}
                </div>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.38)', marginBottom: 24, lineHeight: '1.5em' }}>{plan.desc}</p>

                <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 20, marginBottom: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {plan.features.map(f => (
                    <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 16, height: 16, borderRadius: '50%', background: 'rgba(52,211,153,0.10)', border: '1px solid rgba(52,211,153,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <svg width="8" height="8" viewBox="0 0 12 12" fill="none"><polyline points="2,6 5,9 10,3" stroke="#34D399" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </div>
                      <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.50)' }}>{f}</span>
                    </div>
                  ))}
                </div>

                <motion.a
                  href={WA} target="_blank" rel="noopener noreferrer"
                  whileHover={{ scale: 1.01, background: plan.accent ? '#10b981' : 'rgba(52,211,153,0.12)' }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: plan.accent ? '#34D399' : 'rgba(255,255,255,0.04)',
                    border: plan.accent ? 'none' : '1px solid rgba(255,255,255,0.09)',
                    color: plan.accent ? '#0d0e12' : 'rgba(255,255,255,0.65)',
                    fontSize: 14, fontWeight: plan.accent ? 600 : 400,
                    padding: '13px 0', borderRadius: 12, textDecoration: 'none', cursor: 'pointer',
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
            style={{ textAlign: 'center', fontSize: 12, color: 'rgba(255,255,255,0.22)', marginTop: 24 }}
          >
            Sin contrato de permanencia. Cancelá cuando quieras.
          </motion.p>
        </div>
      </section>

      {/* ═══════════════════════════ CTA FINAL ══════════════════════════════ */}
      <motion.section
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: EASE }}
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: 'clamp(80px,10vw,120px) clamp(20px,5vw,72px)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}
      >
        {/* Giant centered orb — WPro CTA glow */}
        <Orb x="50%" y="50%" size={800} color="rgba(52,211,153,0.08)" blur={120} />

        <div style={{ maxWidth: 560, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontSize: 'clamp(38px,5vw,64px)', fontWeight: 300, letterSpacing: '-0.05em', color: '#fff', lineHeight: '0.96em', margin: '0 0 20px' }}>
            Tu biblioteca,<br />modernizada.
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.42)', marginBottom: 36, lineHeight: '1.65em' }}>
            Instalación en menos de un día. Soporte incluido en todos los planes.
          </p>
          <motion.a
            href={WA} target="_blank" rel="noopener noreferrer"
            whileHover={{ background: '#10b981', scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#34D399', color: '#0d0e12', fontSize: 15, fontWeight: 600, padding: '15px 36px', borderRadius: 999, textDecoration: 'none' }}
          >
            Hablar con un asesor →
          </motion.a>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.22)', marginTop: 18 }}>Respondemos en menos de 24hs</p>
        </div>
      </motion.section>

      {/* ═══════════════════════════ FOOTER ═════════════════════════════════ */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '24px clamp(20px,5vw,72px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.20)' }}>© 2026 — LibraTrack by Insights</span>
        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.20)' }}>Hecho con ♥ en Argentina</span>
      </footer>
    </div>
  )
}
