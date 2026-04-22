import { useState } from 'react'
import { motion } from 'framer-motion'
import LoanCard from '../components/ui/LoanCard'
import Logo from '../components/Logo'
import { MY_LOANS } from '../data/mock'

const TABS = ['Prestados', 'Reservas', 'Catálogo']
const EASE = [0.22, 1, 0.36, 1]

const NAV_ITEMS = [
  { label: 'Inicio', icon: '⊞', active: true },
  { label: 'Catálogo', icon: '◫', active: false },
  { label: 'Perfil', icon: '○', active: false },
]

export default function AppView() {
  const [activeTab, setActiveTab] = useState('Prestados')

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#050e0a',
        display: 'flex',
        flexDirection: 'column',
        maxWidth: 420,
        margin: '0 auto',
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        style={{
          padding: '48px 20px 16px',
          borderBottom: '1px solid rgba(52,211,153,0.07)',
          background: '#071209',
        }}
      >
        <Logo size={18} light />
        <div style={{ marginTop: 20 }}>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.38)', marginBottom: 4 }}>
            Buen día, Matías 👋
          </div>
          <div style={{ fontSize: 20, fontWeight: 500, letterSpacing: '-0.03em', color: '#fff' }}>
            Mis libros
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <div
        style={{
          display: 'flex',
          gap: 6,
          padding: '12px 20px',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          background: '#071209',
        }}
      >
        {TABS.map((tab) => {
          const active = tab === activeTab
          return (
            <motion.button
              key={tab}
              onClick={() => setActiveTab(tab)}
              animate={{
                background: active ? 'rgba(52,211,153,0.12)' : 'transparent',
                color: active ? '#34D399' : 'rgba(255,255,255,0.40)',
                borderColor: active ? 'rgba(52,211,153,0.25)' : 'transparent',
              }}
              transition={{ duration: 0.2 }}
              style={{
                fontSize: 12,
                fontWeight: 500,
                padding: '5px 14px',
                borderRadius: 999,
                border: '1px solid transparent',
                cursor: 'pointer',
                background: 'transparent',
                fontFamily: 'inherit',
              }}
            >
              {tab}
            </motion.button>
          )
        })}
      </div>

      {/* Search bar */}
      <div style={{ padding: '12px 20px' }}>
        <div
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 10,
            padding: '9px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            color: 'rgba(255,255,255,0.22)',
            fontSize: 13,
          }}
        >
          <span>🔍</span>
          Buscar en el catálogo...
        </div>
      </div>

      {/* Loan list */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
        style={{ flex: 1, padding: '4px 20px 20px', display: 'flex', flexDirection: 'column', gap: 8 }}
      >
        {MY_LOANS.map((loan, i) => (
          <motion.div
            key={loan.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.08, ease: EASE }}
          >
            <LoanCard {...loan} />
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom nav */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          padding: '10px 0 24px',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          background: 'rgba(7,18,9,0.95)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      >
        {NAV_ITEMS.map((item) => (
          <div
            key={item.label}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              fontSize: 10,
              color: item.active ? '#34D399' : 'rgba(255,255,255,0.28)',
              cursor: 'pointer',
            }}
          >
            <div
              style={{
                width: 32,
                height: 28,
                borderRadius: 8,
                background: item.active ? 'rgba(52,211,153,0.12)' : 'rgba(255,255,255,0.04)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 14,
              }}
            >
              {item.icon}
            </div>
            {item.label}
          </div>
        ))}
      </div>
    </div>
  )
}
