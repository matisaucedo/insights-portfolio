import { useReducedMotion, motion } from 'framer-motion';

export default function GraciasBooking() {
  const reduced = useReducedMotion();

  const initial = reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 };
  const animate = { opacity: 1, y: 0 };
  const transition = {
    duration: 0.8,
    ease: [0.22, 1, 0.36, 1],
  };

  return (
    <section
      id="booking"
      style={{
        paddingTop: 'clamp(64px, 8vw, 128px)',
        paddingBottom: 'clamp(64px, 8vw, 128px)',
        paddingLeft: 'clamp(24px, 5vw, 40px)',
        paddingRight: 'clamp(24px, 5vw, 40px)',
      }}
    >
      <motion.div
        initial={initial}
        whileInView={animate}
        viewport={{ once: true, margin: '-80px' }}
        transition={transition}
        style={{ maxWidth: 1100, margin: '0 auto' }}
      >
        {/* Heading block */}
        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center', marginBottom: 48 }}>
          <p
            style={{
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.45)',
              marginBottom: 24,
            }}
          >
            ● AGENDÁ TU LLAMADA
          </p>

          <h2
            style={{
              fontSize: 'clamp(40px, 6vw, 72px)',
              fontWeight: 500,
              letterSpacing: '-0.03em',
              lineHeight: 1.08,
              color: '#fff',
              margin: '0 0 20px',
            }}
          >
            Elegí el horario que mejor te quede
          </h2>

          <p
            style={{
              fontSize: 'clamp(15px, 1.8vw, 18px)',
              color: 'rgba(255,255,255,0.45)',
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            La sesión es gratuita, dura 60 minutos y salís con un plan claro para tu software.
          </p>
        </div>

        {/* Iframe card */}
        <div
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 16,
            padding: 8,
            boxShadow: '0 30px 80px -30px rgba(0,0,0,0.55)',
          }}
        >
          <iframe
            src="https://api.highlevelowcost.com/widget/booking/XfVaKDBm7P3pAliHpagk"
            style={{
              width: '100%',
              minHeight: 820,
              border: 0,
              borderRadius: 10,
              display: 'block',
              touchAction: 'manipulation',
            }}
            loading="lazy"
            allow="clipboard-read; clipboard-write"
            title="Agenda tu llamada con Insights Software"
          />
        </div>
      </motion.div>
    </section>
  );
}
