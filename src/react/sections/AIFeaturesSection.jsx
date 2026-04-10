import React from "react";
import { motion } from "framer-motion";
import Section from "../components/ui/Section.jsx";
import Container from "../components/ui/Container.jsx";
import SectionLabel from "../components/ui/SectionLabel.jsx";
import ParallaxLayer from "../components/ui/ParallaxLayer.jsx";

const FEATURES = [
  {
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    ),
    title: "Entiende tu negocio",
    description: "Explicamos cada funcionalidad en lenguaje simple. Sin tecnicismos, sin documentación confusa.",
  },
  {
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: "Detecta fricción antes de que aparezca",
    description: "Identificamos cuellos de botella en tus procesos. Te avisamos antes de que el problema llegue al cliente.",
  },
  {
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
    title: "Aprende y se adapta",
    description: "Cuanto más usás el software, más preciso se vuelve. La IA personaliza cada flujo a medida que crece tu operación.",
  },
];

const listStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18, delayChildren: 0.1 } },
};

const listItem = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
};

/* Minta diagonal beam visual */
function MintaBeam() {
  return (
    <>
      <style>{`
        .minta-beam-container {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }
        .minta-beam {
          position: absolute;
          width: 3px;
          height: 150%;
          background: linear-gradient(180deg, transparent 0%, rgba(250,128,57,0.8) 30%, rgba(250,128,57,0.6) 50%, rgba(250,128,57,0.2) 100%);
          transform: rotate(-35deg);
          left: 50%;
          top: -25%;
          filter: blur(2px);
          opacity: 0.7;
          margin-left: -1.5px;
        }
        .minta-beam-glow {
          position: absolute;
          width: 80px;
          height: 200%;
          background: radial-gradient(ellipse 100% 50% at 50% 50%, rgba(250,128,57,0.25) 0%, transparent 70%);
          transform: rotate(-35deg);
          left: 50%;
          top: -25%;
          filter: blur(30px);
          margin-left: -40px;
          opacity: 0.6;
        }
      `}</style>
      <div className="minta-beam-container">
        <div className="minta-beam-glow" />
        <div className="minta-beam" />
      </div>
    </>
  );
}

export default function AIFeaturesSection() {
  return (
    <Section id="ai" style={{ paddingTop: 140, paddingBottom: 140 }}>
      {/* Top ambient glow — parallax */}
      <ParallaxLayer speed={0.3} className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 z-0">
        <div
          style={{
            width: 700,
            height: 320,
            background: "radial-gradient(ellipse 65% 55% at 50% 0%, rgba(232,93,47,0.065) 0%, transparent 70%)",
          }}
        />
      </ParallaxLayer>

      <Container className="relative z-10">

        {/* ── Centered header ── */}
        <div style={{ textAlign: "center", marginBottom: 80 }}>
          <SectionLabel center>Insights AI</SectionLabel>

          <motion.h2
            style={{
              fontSize: "clamp(30px, 4.5vw, 52px)",
              fontWeight: 400,
              letterSpacing: "-0.04em",
              lineHeight: "1.02em",
              color: "#fff",
              marginBottom: 20,
            }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            Tu guía. En cada paso.
          </motion.h2>

          <motion.p
            style={{
              fontSize: 15,
              color: "rgba(255,255,255,0.42)",
              maxWidth: 380,
              margin: "0 auto",
              lineHeight: "1.6em",
              letterSpacing: "-0.005em",
            }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            La mayoría del software te deja solo. El nuestro no.
          </motion.p>
        </div>

        {/* ── Split grid ── */}
        <div className="ai-split-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>

          {/* ── Left panel ── */}
          <motion.div
            style={{
              position: "relative",
              borderRadius: 24,
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.16)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              aspectRatio: "1 / 1",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Outer diffused glow — very soft */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "radial-gradient(ellipse 70% 70% at 50% 50%, rgba(232,93,47,0.06) 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />

            {/* Minta diagonal beam */}
            <MintaBeam />

            {/* Circular orb with pulsing rings — exact Minta replica */}
            <div
              style={{
                position: "relative",
                zIndex: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 256,
                height: 256,
              }}
            >
              {/* Pulsing rings container */}
              <div
                style={{
                  height: "100%",
                  width: "100%",
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "visible",
                }}
              >
                {[0, -0.5, -1].map((delay, i) => (
                  <span
                    key={i}
                    style={{
                      position: "absolute",
                      left: "50%",
                      top: "50%",
                      width: 242,
                      height: 242,
                      borderRadius: "50%",
                      border: "2px solid rgba(255,255,255,0.2)",
                      background: "radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 80%)",
                      pointerEvents: "none",
                      willChange: "transform, opacity",
                      animation: `pulsing-orb 4s linear ${delay}s infinite`,
                    }}
                  />
                ))}

                {/* Center orb container */}
                <div
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 10,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    gap: 8,
                    borderRadius: "50%",
                    border: "1px solid rgba(255,255,255,0.16)",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                    background: "rgba(255,255,255,0.06)",
                    width: 128,
                    height: 128,
                  }}
                >
                  {/* Icon from Minta assets - Sparkles */}
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M 9.019 0.816 C 9.108 0.343 9.521 0 10.002 0 C 10.484 0 10.897 0.343 10.985 0.816 L 12.036 6.374 C 12.189 7.183 12.822 7.816 13.63 7.968 L 19.188 9.019 C 19.662 9.108 20.005 9.521 20.005 10.002 C 20.005 10.484 19.662 10.897 19.188 10.985 L 13.63 12.036 C 12.822 12.189 12.189 12.822 12.036 13.63 L 10.985 19.188 C 10.897 19.662 10.484 20.005 10.002 20.005 C 9.521 20.005 9.108 19.662 9.019 19.188 L 7.968 13.63 C 7.816 12.822 7.183 12.189 6.374 12.036 L 0.816 10.985 C 0.343 10.897 0 10.484 0 10.002 C 0 9.521 0.343 9.108 0.816 9.019 L 6.374 7.968 C 7.183 7.816 7.816 7.183 7.968 6.374 Z" transform="translate(1.998 1.998)" />
                    <path d="M 0 0 L 0 4" transform="translate(20 2)" />
                    <path d="M 4 0 L 0 0" transform="translate(18 4)" />
                    <path d="M 0 2 C 0 0.895 0.895 0 2 0 C 3.105 0 4 0.895 4 2 C 4 3.105 3.105 4 2 4 C 0.895 4 0 3.105 0 2 Z" transform="translate(2 18)" />
                  </svg>

                  {/* Label */}
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 500,
                      color: "rgba(255,255,255,0.9)",
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                      lineHeight: 1,
                    }}
                  >
                    Insights
                  </span>
                </div>
              </div>

              {/* keyframes defined globally in index.css */}
            </div>

            {/* Grain */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: "url('/assets/grain.png')",
                backgroundSize: "180px",
                opacity: 0.03,
                pointerEvents: "none",
              }}
            />
          </motion.div>

          {/* ── Right column ── */}
          <div>
            {/* Intro paragraph */}
            <motion.p
              style={{
                fontSize: "clamp(15px, 1.35vw, 17px)",
                color: "rgba(255,255,255,0.52)",
                letterSpacing: "-0.015em",
                lineHeight: "1.65em",
                marginBottom: 52,
              }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            >
              La IA explica cada decisión en lenguaje claro, detecta problemas
              antes de que ocurran y aprende de tus hábitos con el tiempo.
              Cuanto más lo usás, más inteligente se vuelve.
            </motion.p>

            {/* Feature list */}
            <motion.ul
              style={{ display: "flex", flexDirection: "column", gap: 40, listStyle: "none", padding: 0, margin: 0 }}
              variants={listStagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
            >
              {FEATURES.map((f) => (
                <motion.li
                  key={f.title}
                  variants={listItem}
                  style={{ display: "flex", gap: 14, alignItems: "flex-start" }}
                  whileHover={{
                    y: -4,
                    scale: 1.015,
                    transition: { duration: 0.22, ease: "easeOut" },
                  }}
                >
                  {/* Icon box — rounded square, low contrast */}
                  <div
                    style={{
                      flexShrink: 0,
                      marginTop: 1,
                      width: 30,
                      height: 30,
                      borderRadius: 8,
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "rgba(255,255,255,0.38)",
                    }}
                  >
                    {f.icon}
                  </div>

                  {/* Text */}
                  <div style={{ paddingTop: 2 }}>
                    <div
                      style={{
                        fontSize: 14.5,
                        fontWeight: 500,
                        color: "#fff",
                        letterSpacing: "-0.02em",
                        lineHeight: "1.25em",
                        marginBottom: 7,
                      }}
                    >
                      {f.title}
                    </div>
                    <div
                      style={{
                        fontSize: 13.5,
                        color: "rgba(255,255,255,0.38)",
                        lineHeight: "1.65em",
                        letterSpacing: "-0.005em",
                      }}
                    >
                      {f.description}
                    </div>
                  </div>
                </motion.li>
              ))}
            </motion.ul>

            {/* CTA — Minta: border 1.5px rgba(255,255,255,0.16), blur(5px), radius 100px */}
            <motion.button
              style={{
                marginTop: 52,
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                borderRadius: 100,
                background: "rgba(255,255,255,0.05)",
                border: "1.5px solid rgba(255,255,255,0.13)",
                backdropFilter: "blur(5px)",
                WebkitBackdropFilter: "blur(5px)",
                color: "rgba(255,255,255,0.75)",
                fontSize: 13,
                fontWeight: 500,
                padding: "0 22px",
                height: 42,
                cursor: "pointer",
                fontFamily: "Inter, system-ui, sans-serif",
                letterSpacing: "-0.005em",
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.55 }}
              whileHover={{
                background: "rgba(255,255,255,0.10)",
                borderColor: "rgba(255,255,255,0.20)",
                color: "#fff",
                transition: { duration: 0.18 },
              }}
              onClick={() => {
                const el = document.querySelector("#guarantees");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Hablar con el equipo
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </motion.button>
          </div>
        </div>
      </Container>

      <style>{`
        @media (max-width: 809px) {
          .ai-split-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </Section>
  );
}
