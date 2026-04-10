import { motion } from "framer-motion";
import Section from "../components/ui/Section.jsx";
import Container from "../components/ui/Container.jsx";
import SectionLabel from "../components/ui/SectionLabel.jsx";
import FadeUp from "../components/ui/FadeUp.jsx";
import { childVariants } from "../components/ui/StaggerGrid.jsx";

const GUARANTEES = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>
        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
      </svg>
    ),
    title: "Garantía de devolución",
    desc: "Si no quedás conforme con el resultado, te devolvemos el 100% de tu inversión. Sin preguntas.",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    title: "Transparencia total",
    desc: "Sabés qué se construye, cuándo y por qué. Sin sorpresas de alcance ni cobros inesperados.",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4"/>
        <path d="M14 13.12c0 2.38 0 6.38-1 8.88"/>
        <path d="M17.29 21.02c.12-.6.43-2.3.5-3.02"/>
        <path d="M2 12a10 10 0 0 1 18-6"/>
        <path d="M2 16h.01"/>
        <path d="M21.8 16c.2-2 .131-5.354 0-6"/>
        <path d="M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2"/>
        <path d="M8.65 22c.21-.66.45-1.32.57-2"/>
        <path d="M9 6.8a6 6 0 0 1 9 5.2v2"/>
      </svg>
    ),
    title: "Tuyo para siempre",
    desc: "Código fuente completo, documentación y sesión de traspaso. Sin dependencia de Insights.",
  },
];

export default function GuaranteesSection() {
  return (
    <Section id="guarantees" style={{ position: "relative", overflow: "hidden" }}>

      {/* Background image — Minta exact: opacity 0.47, CSS mask fade in/out */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.47,
          overflow: "hidden",
          WebkitMask: "linear-gradient(#0000 0%, #000000e3 45%, #0000 100%)",
          mask: "linear-gradient(#0000 0%, #000000e3 45%, #0000 100%)",
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.47 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.img
          src="/ref/security-bg.jpg"
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            display: "block",
          }}
          initial={{ y: -64, scale: 1.1 }}
          whileInView={{ y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        />
      </motion.div>

      {/* Header — centered via Container */}
      <div style={{ position: "relative", zIndex: 1, paddingTop: 96 }}>
        <Container>
          <div style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: 16, alignItems: "center" }}>
            <FadeUp delay={0.05}>
              <SectionLabel center>Garantías</SectionLabel>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2
                style={{
                  fontSize: "clamp(32px, 4.5vw, 56px)",
                  fontWeight: 400,
                  letterSpacing: "-0.04em",
                  lineHeight: "1.05em",
                  color: "#fff",
                  margin: 0,
                }}
              >
                Si no te gusta, te devolvemos toda la plata.
              </h2>
            </FadeUp>
            <FadeUp delay={0.15}>
              <p style={{ fontSize: 16, color: "#c2c2c2", maxWidth: 400, margin: 0, lineHeight: "1.5em" }}>
                Sin letra chica, sin excusas. Si no quedás conforme, te devolvemos el 100%.
              </p>
            </FadeUp>
          </div>
        </Container>
      </div>

      {/* Bottom: shield (absolute, full-width ref) + trust bar */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          paddingTop: 192,
          paddingBottom: 96,
        }}
      >
        {/* Shield — outer div handles centering, inner motion.div handles animation */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            WebkitMask: "linear-gradient(#000 46.2%, rgba(0,0,0,0.09) 76%, #0000 95%)",
            mask: "linear-gradient(#000 46.2%, rgba(0,0,0,0.09) 76%, #0000 95%)",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 48 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
          >
            <svg width="256" height="256" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </motion.div>
        </div>

        {/* Trust bar — 3 columns inside Container */}
        <Container>
          <motion.div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 16,
              maxWidth: 760,
              margin: "0 auto",
              position: "relative",
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
            }}
          >
            {GUARANTEES.map((g) => (
              <motion.div
                key={g.title}
                variants={childVariants}
                style={{ flex: "1 0 0px", display: "flex", flexDirection: "column", gap: 8 }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ color: "#fff", flexShrink: 0, lineHeight: 0 }}>{g.icon}</span>
                  <p style={{ fontSize: 15, fontWeight: 500, color: "#fff", letterSpacing: "-0.02em", lineHeight: "1.3em", margin: 0 }}>
                    {g.title}
                  </p>
                </div>
                <p style={{ fontSize: 14, color: "#c2c2c2", lineHeight: "1.55em", margin: 0, paddingLeft: 26 }}>
                  {g.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </div>
    </Section>
  );
}
