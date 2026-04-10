import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Section from "../components/ui/Section.jsx";
import Container from "../components/ui/Container.jsx";
import SectionLabel from "../components/ui/SectionLabel.jsx";

const STEPS = [
  {
    num: "01",
    title: "Llamada inicial",
    description:
      "Auditamos tu idea juntos. Definimos el alcance real, los tiempos y las prioridades antes de escribir una sola línea de código.",
  },
  {
    num: "02",
    title: "Desarrollo iterativo",
    description:
      "Construimos en ciclos cortos. Ves el avance en tiempo real y pedís cambios antes del lanzamiento.",
  },
  {
    num: "03",
    title: "Publicación",
    description:
      "Deploy en tu dominio con todo configurado. Hosting, dominio, SSL, performance — nada queda suelto.",
  },
  {
    num: "04",
    title: "Entrega total",
    description:
      "Código fuente, documentación completa y sesión de entrenamiento. Tu equipo queda autónomo.",
  },
];

/* Exact Minta step positions on the SVG curve */
const STEP_POSITIONS = [
  { top: "10%", left: "8%" },
  { top: "32%", left: "22%" },
  { top: "48%", left: "40%" },
  { top: "72%", left: "68%" },
];

export default function RoadmapSection() {
  const containerRef = useRef(null);
  const pathRef = useRef(null);

  useEffect(() => {
    /* Animate the orange path stroke dashoffset */
    const path = pathRef.current;
    if (!path) return;

    const length = 1497.953125;
    path.style.strokeDasharray = `${length} ${length}`;
    path.style.strokeDashoffset = `${length}`;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            path.animate(
              [
                { strokeDashoffset: `${length}` },
                { strokeDashoffset: "0" },
              ],
              {
                duration: 1400,
                easing: "cubic-bezier(0.34, 1.56, 0.64, 1)",
                fill: "forwards",
              }
            );
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Section id="roadmap">
      {/* Left ambient glow */}
      <div
        className="pointer-events-none absolute top-1/3 -left-32 rounded-full"
        style={{
          width: 400,
          height: 400,
          background: "radial-gradient(circle, rgba(232,93,47,0.05) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <Container className="relative z-10">
        {/* Header */}
        <div className="mb-20 md:mb-28">
          <SectionLabel>Cómo trabajamos</SectionLabel>

          <motion.h2
            style={{
              fontSize: "clamp(28px, 4.5vw, 52px)",
              fontWeight: 400,
              letterSpacing: "-0.04em",
              lineHeight: "1.05em",
              color: "#fff",
              maxWidth: 580,
              marginBottom: 16,
            }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            De cero a lanzado.
            <br />
            En semanas.
          </motion.h2>

          <motion.p
            style={{ fontSize: 16, color: "#8a8a8a", maxWidth: 420, lineHeight: "1.5em" }}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          >
            Sin experiencia previa necesaria. Guiamos cada paso del proceso.
          </motion.p>

          <motion.button
            style={{
              marginTop: 32,
              borderRadius: 999,
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "#fff",
              fontSize: 14,
              fontWeight: 500,
              padding: "0 28px",
              height: 48,
              cursor: "pointer",
              fontFamily: "Inter, system-ui, sans-serif",
              display: "inline-flex",
              alignItems: "center",
            }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            whileHover={{ background: "rgba(255,255,255,0.14)" }}
            onClick={() => window.open("https://wa.me/5491112345678", "_blank")}
          >
            Quiero agendar →
          </motion.button>
        </div>

        {/* Roadmap Container — SVG Curve + Steps */}
        <div
          ref={containerRef}
          className="relative"
          style={{
            width: "100%",
            minHeight: 650,
            aspectRatio: "1.35 / 1",
          }}
        >
          {/* Bezier Curve SVG (Exact Minta path) */}
          <svg
            viewBox="0 0 797 591"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
            }}
            preserveAspectRatio="xMidYMid slice"
          >
            {/* Background gray static path */}
            <path
              d="M 464.449 0 C 464.449 0 -290.439 232.723 124.581 327.777 C 539.601 422.831 952.039 476.521 714.06 591"
              stroke="rgba(255, 255, 255, 0.12)"
              strokeWidth="1"
              fill="none"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeMiterlimit="4"
            />

            {/* Animated orange path */}
            <path
              ref={pathRef}
              d="M 464.449 0 C 464.449 0 -290.439 232.723 124.581 327.777 C 539.601 422.831 952.039 476.521 714.06 591"
              stroke="#fa8039"
              strokeWidth="1"
              fill="none"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeMiterlimit="4"
            />
          </svg>

          {/* Steps positioned on curve */}
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            {STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                className="absolute"
                style={{
                  top: STEP_POSITIONS[i].top,
                  left: STEP_POSITIONS[i].left,
                  transform: "translate(-50%, -50%)",
                  width: 280,
                  willChange: "transform",
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.65,
                  ease: "easeOut",
                  delay: 0.15 + i * 0.12,
                }}
              >
                {/* Step box with dashed orange left border */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 24,
                    width: 280,
                    padding: "0 0 40px 12px",
                    borderLeft: "1px dashed #fa8039",
                    position: "relative",
                  }}
                >
                  {/* Text wrapper */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 8,
                    }}
                  >
                    {/* Title */}
                    <div
                      style={{
                        fontSize: 16,
                        fontWeight: 600,
                        color: "#fff",
                        lineHeight: "1.2em",
                        letterSpacing: "normal",
                      }}
                    >
                      {step.num} · {step.title}
                    </div>

                    {/* Description */}
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 400,
                        color: "rgba(255, 255, 255, 0.7)",
                        lineHeight: "1.4em",
                        letterSpacing: "normal",
                      }}
                    >
                      {step.description}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
