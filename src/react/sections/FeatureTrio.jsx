import { motion } from "framer-motion";
import Container from "../components/ui/Container.jsx";
import Section from "../components/ui/Section.jsx";
import SectionLabel from "../components/ui/SectionLabel.jsx";
import ParallaxLayer from "../components/ui/ParallaxLayer.jsx";

/*
 * Feature Trio — matches Minta "One app. Three superpowers."
 * Card anatomy: image area (aspect ~1.1) → icon + title + desc
 * Glass card: rgba(255,255,255,0.06) bg, border rgba(255,255,255,0.12),
 * inset top highlight, backdrop blur, 16px radius.
 * Stagger from y:64, opacity 0.
 */

const CARDS = [
  {
    visualColor: "rgba(232,93,47,0.08)",
    glowColor: "rgba(232,93,47,0.22)",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <path d="M8 21h8M12 17v4"/>
      </svg>
    ),
    title: "Aplicaciones a medida",
    desc: "Construimos desde cero o mejoramos lo que ya tenés. Sin plantillas, sin límites — cada funcionalidad pensada para tu operación.",
  },
  {
    visualColor: "rgba(255,255,255,0.03)",
    glowColor: "rgba(120,120,255,0.16)",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 6h16M4 12h16M4 18h7"/>
        <circle cx="17" cy="18" r="3"/>
        <path d="M17 15v3l2 1"/>
      </svg>
    ),
    title: "Integraciones sin fricción",
    desc: "Conectamos tu software con las herramientas que ya usás. APIs, ERPs, pagos — sin duplicar trabajo ni interrumpir tu flujo.",
  },
  {
    visualColor: "rgba(232,93,47,0.05)",
    glowColor: "rgba(232,93,47,0.18)",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
    title: "IA como ventaja competitiva",
    desc: "Automatizamos decisiones repetitivas para que tu equipo se concentre en lo que importa. Cuanto más usás el sistema, más inteligente se vuelve.",
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.16, delayChildren: 0.05 } },
};

const card = {
  hidden: { opacity: 0, y: 64 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] } },
};

/* Visual area — abstract representation per card */
function CardVisual({ color, glow, index }) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "1.15 / 1",
        overflow: "hidden",
        background: "#080c0c",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {/* Base gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse 80% 70% at 50% ${index === 1 ? "60%" : "40%"}, ${color} 0%, transparent 75%)`,
        }}
      />

      {/* Center glow orb — parallax */}
      <ParallaxLayer speed={0.25}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 120,
            height: 120,
            borderRadius: "50%",
            background: glow,
            filter: "blur(40px)",
            opacity: 0.8,
          }}
        />
      </ParallaxLayer>

      {/* Decorative grid lines */}
      <svg
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.06 }}
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        {[20, 40, 60, 80].map(x => (
          <line key={x} x1={x} y1="0" x2={x} y2="100" stroke="white" strokeWidth="0.5"/>
        ))}
        {[20, 40, 60, 80].map(y => (
          <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="white" strokeWidth="0.5"/>
        ))}
      </svg>

      {/* Center icon ring */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 52,
          height: 52,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.12)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "rgba(255,255,255,0.50)",
        }}
      >
        {CARDS[index].icon}
      </div>
    </div>
  );
}

export default function FeatureTrio() {
  return (
    <Section id="features">
      <Container>
        {/* Header */}
        <div style={{ marginBottom: 56 }}>
          <SectionLabel>Lo que hacemos</SectionLabel>

          <motion.h2
            style={{
              fontSize: "clamp(28px, 3.5vw, 42px)",
              fontWeight: 400,
              letterSpacing: "-0.04em",
              lineHeight: "1.05em",
              color: "#fff",
              maxWidth: 520,
              marginBottom: 16,
            }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: "easeOut", delay: 0.05 }}
          >
            Un equipo.{" "}
            <span style={{ color: "rgba(255,255,255,0.40)" }}>Tres superpoderes.</span>
          </motion.h2>

          <motion.p
            style={{
              fontSize: 16,
              color: "#8a8a8a",
              maxWidth: 400,
              lineHeight: "1.55em",
            }}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: "easeOut", delay: 0.14 }}
          >
            Todo lo que necesitás para crecer, automatizar y diferenciarte — guiado por IA.
          </motion.p>
        </div>

        {/* 3-card grid */}
        <motion.div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 12,
          }}
          className="feat-trio-grid"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-48px" }}
        >
          {CARDS.map((c, i) => (
            <motion.div
              key={c.title}
              variants={card}
              style={{
                borderRadius: 16,
                overflow: "hidden",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.10)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                boxShadow: "inset 0px 1px 0px 0px rgba(255,255,255,0.10)",
                display: "flex",
                flexDirection: "column",
              }}
              whileHover={{
                scale: 1.025,
                y: -6,
                borderColor: "rgba(255,255,255,0.18)",
                transition: { duration: 0.28, ease: "easeOut" },
              }}
            >
              {/* Visual */}
              <CardVisual color={c.visualColor} glow={c.glowColor} index={i} />

              {/* Text */}
              <div style={{ padding: "22px 24px 28px", flex: 1 }}>
                {/* Icon + title row */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 10,
                    marginBottom: 10,
                  }}
                >
                  <div
                    style={{
                      marginTop: 1,
                      flexShrink: 0,
                      color: "#fff",
                      opacity: 0.75,
                    }}
                  >
                    {c.icon}
                  </div>
                  <p
                    style={{
                      fontSize: 16,
                      fontWeight: 500,
                      letterSpacing: "-0.02em",
                      lineHeight: "1.2em",
                      color: "#fff",
                    }}
                  >
                    {c.title}
                  </p>
                </div>
                <p
                  style={{
                    fontSize: 13.5,
                    color: "#8a8a8a",
                    lineHeight: "1.6em",
                    letterSpacing: "-0.005em",
                  }}
                >
                  {c.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>

      {/* Responsive: stack on mobile */}
      <style>{`
        @media (max-width: 809px) {
          .feat-trio-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </Section>
  );
}
