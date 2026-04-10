import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Section from "../components/ui/Section.jsx";
import Container from "../components/ui/Container.jsx";

const STATS = [
  { value: 100, prefix: "+", suffix: "", label: "Proyectos entregados" },
  { value: 12,  prefix: "+", suffix: "", label: "Sectores distintos" },
  { value: 4,   prefix: "",  suffix: "", label: "Personas en el equipo" },
  { value: 3,   prefix: "+", suffix: "", label: "Años de experiencia" },
];

/* Easing helper — ease out cubic */
function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

function useCountUp(target, duration = 1600, enabled = false) {
  const [count, setCount] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!enabled) return;
    const startTime = performance.now();

    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);
      setCount(Math.round(easedProgress * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration, enabled]);

  return count;
}

function StatItem({ value, prefix, suffix, label, delay }) {
  const [triggered, setTriggered] = useState(false);
  const count = useCountUp(value, 1600, triggered);

  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: "easeOut", delay }}
      onAnimationComplete={() => setTriggered(true)}
    >
      {/* Number — Geist Mono, weight 300, exact Minta spec */}
      <div
        style={{
          fontFamily: '"Geist Mono", monospace',
          fontFeatureSettings: "'zero' on, 'tnum' on",
          fontSize: "clamp(32px, 4.5vw, 40px)",
          fontWeight: 300,
          letterSpacing: "-0.02em",
          lineHeight: "1.1em",
          color: "#fff",
        }}
      >
        {prefix}{count}{suffix}
      </div>

      {/* Label */}
      <div
        className="mt-3 text-sm font-normal"
        style={{ color: "#8a8a8a", letterSpacing: 0, lineHeight: "1.3em" }}
      >
        {label}
      </div>
    </motion.div>
  );
}

export default function StatsSection() {
  return (
    <Section id="stats">
      <Container>
        {/* Headline — two lines centered */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h2
            style={{
              fontSize: "clamp(32px, 5vw, 56px)",
              fontWeight: 400,
              letterSpacing: "-0.04em",
              lineHeight: "1.05em",
              color: "#fff",
            }}
          >
            Resultados reales.
            <br />
            <span style={{ color: "rgba(255,255,255,0.45)" }}>En proyectos reales.</span>
          </h2>
        </motion.div>

        {/* 4-column stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-6">
          {STATS.map((s, i) => (
            <StatItem key={s.label} {...s} delay={i * 0.1} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
