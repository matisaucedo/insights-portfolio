import React from "react";
import { motion } from "framer-motion";
import Section from "../components/ui/Section.jsx";
import Container from "../components/ui/Container.jsx";
import SectionLabel from "../components/ui/SectionLabel.jsx";

/*
 * Success Cases — Minta: "Early Access Voices / People who stepped in first."
 * 3 testimonial cards. Dark bg, no heavy borders.
 * Card layout: quote text, then author row at bottom.
 * Hover: subtle lift (y -4px) + slight border brighten.
 */

const TESTIMONIALS = [
  {
    quote:
      "Nos entregaron el dashboard en 3 semanas. Ahora vemos en 2 minutos lo que antes tardábamos un día en consolidar.",
    name: "Martín R.",
    role: "Director de Operaciones",
    company: "Fintech · Buenos Aires",
    initials: "MR",
  },
  {
    quote:
      "Nunca pensé que automatizar nuestro flujo de pedidos fuera tan simple. El equipo de Insights lo hizo parecer obvio.",
    name: "Carolina S.",
    role: "CEO & Co-fundadora",
    company: "E-commerce · Córdoba",
    initials: "CS",
  },
  {
    quote:
      "El sistema de turnos que construyeron redujo nuestros no-shows un 40%. La IA de recordatorios es un antes y un después.",
    name: "Diego M.",
    role: "Dueño",
    company: "Salud · Mendoza",
    initials: "DM",
  },
];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13 } },
};

const card = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
};

export default function SuccessCases() {
  return (
    <Section id="nosotros">
      <Container>
        {/* Header — centered */}
        <div className="text-center mb-16 md:mb-20">
          <SectionLabel center>Lo que dicen nuestros clientes</SectionLabel>

          <motion.h2
            style={{
              fontSize: "clamp(28px, 4.5vw, 52px)",
              fontWeight: 400,
              letterSpacing: "-0.04em",
              lineHeight: "1.05em",
              color: "#fff",
            }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            Los que entraron primero.
          </motion.h2>
        </div>

        {/* Cards grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-3"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {TESTIMONIALS.map((t) => (
            <motion.div
              key={t.name}
              variants={card}
              style={{
                borderRadius: 20,
                background: "#0d0d0d",
                border: "1px solid rgba(255,255,255,0.08)",
                padding: "32px 28px 28px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: 240,
              }}
              whileHover={{
                y: -4,
                borderColor: "rgba(255,255,255,0.16)",
                boxShadow: "0 0 0 1px rgba(255,255,255,0.10)",
                transition: { duration: 0.25, ease: "easeOut" },
              }}
            >
              {/* Quote */}
              <p
                style={{
                  fontSize: 16,
                  color: "rgba(255,255,255,0.72)",
                  lineHeight: "1.55em",
                  letterSpacing: "-0.01em",
                  flex: 1,
                  marginBottom: 32,
                }}
              >
                "{t.quote}"
              </p>

              {/* Author row */}
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                {/* Avatar */}
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: "rgba(232,93,47,0.16)",
                    color: "rgba(232,93,47,0.85)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 11,
                    fontWeight: 600,
                    flexShrink: 0,
                    letterSpacing: "0.02em",
                  }}
                >
                  {t.initials}
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 500,
                      color: "#fff",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {t.name}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "#8a8a8a",
                      marginTop: 1,
                    }}
                  >
                    {t.role} · {t.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
