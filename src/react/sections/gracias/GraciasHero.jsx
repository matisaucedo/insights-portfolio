import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

const CHILD = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const CONTAINER = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

const VIDEO_VARIANT = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.25 },
  },
};

export default function GraciasHero() {
  const shouldReduce = useReducedMotion();
  const videoRef = useRef(null);
  const sectionRef = useRef(null);

  const { scrollY } = useScroll();
  const videoY = useTransform(scrollY, [0, 600], [0, -40]);

  function handleScrollToBooking() {
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  }

  function handleToggleSound() {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
    }
  }

  const initial = shouldReduce ? "show" : "hidden";
  const animate = "show";

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        overflow: "hidden",
        background: "#0a0a0a",
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Accent glow blob */}
      <motion.div
        aria-hidden="true"
        animate={shouldReduce ? {} : { opacity: [0.6, 0.85, 0.6] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: -80,
          left: -120,
          width: 400,
          height: 400,
          background:
            "radial-gradient(closest-side, rgba(250,128,57,0.18), transparent)",
          filter: "blur(60px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Content wrapper */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: 1200,
          margin: "0 auto",
          padding: "128px 24px 96px",
        }}
      >
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* ── LEFT: copy ──────────────────────────────────────────── */}
          <motion.div
            variants={CONTAINER}
            initial={initial}
            animate={animate}
            style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            {/* Status badge */}
            <motion.div variants={CHILD}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.45rem",
                  fontFamily: "Inter, system-ui, sans-serif",
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#c2c2c2",
                }}
              >
                <span
                  style={{
                    color: "#fa8039",
                    fontSize: 14,
                    lineHeight: 1,
                    flexShrink: 0,
                  }}
                >
                  ●
                </span>
                TU SOLICITUD FUE RECIBIDA
              </span>
            </motion.div>

            {/* H1 display */}
            <motion.div variants={CHILD}>
              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 500,
                  fontSize: "clamp(44px, 7.5vw, 96px)",
                  lineHeight: 0.95,
                  letterSpacing: "-0.03em",
                  color: "#fff",
                  margin: 0,
                }}
              >
                Creamos tu software
                <br />a medida
              </h1>
            </motion.div>

            {/* H2 italic tail */}
            <motion.div variants={CHILD}>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 400,
                  fontStyle: "italic",
                  fontSize: "clamp(32px, 5vw, 64px)",
                  lineHeight: 1.0,
                  letterSpacing: "-0.02em",
                  color: "#fff",
                  margin: 0,
                }}
              >
                En menos de 20 días
              </p>
            </motion.div>

            {/* Subtitle */}
            <motion.div variants={CHILD}>
              <p
                style={{
                  fontFamily: "Inter, system-ui, sans-serif",
                  fontSize: 16,
                  lineHeight: 1.5,
                  color: "#c2c2c2",
                  maxWidth: 520,
                  margin: 0,
                }}
              >
                Te explico en menos de 3 minutos cómo podemos tener funcionando
                un software a medida desarrollado por nuestro equipo en menos de
                20 días.
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              variants={CHILD}
              style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center" }}
            >
              {/* Primary */}
              <button
                onClick={handleScrollToBooking}
                className="touch-manipulation"
                style={{
                  background: "#fff",
                  color: "#0a0a0a",
                  border: "none",
                  borderRadius: 999,
                  padding: "14px 28px",
                  fontSize: 15,
                  fontWeight: 600,
                  fontFamily: "Inter, system-ui, sans-serif",
                  cursor: "pointer",
                  letterSpacing: "-0.01em",
                  boxShadow:
                    "0 1px 0 rgba(255,255,255,0.1) inset, 0 10px 30px -10px rgba(250,128,57,0.4)",
                  transition: "transform 0.18s ease, opacity 0.18s ease",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.03)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
                onFocus={(e) => { e.currentTarget.style.outline = "2px solid rgba(250,128,57,0.7)"; e.currentTarget.style.outlineOffset = "3px"; }}
                onBlur={(e) => { e.currentTarget.style.outline = "none"; }}
              >
                Agendá tu llamada
              </button>

              {/* Secondary */}
              <button
                onClick={handleToggleSound}
                className="touch-manipulation"
                style={{
                  background: "transparent",
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,0.14)",
                  borderRadius: 999,
                  padding: "14px 24px",
                  fontSize: 15,
                  fontWeight: 400,
                  fontFamily: "Inter, system-ui, sans-serif",
                  cursor: "pointer",
                  letterSpacing: "-0.01em",
                  transition: "border-color 0.18s ease, background 0.18s ease",
                  whiteSpace: "nowrap",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.45rem",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.32)"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)"; e.currentTarget.style.background = "transparent"; }}
                onFocus={(e) => { e.currentTarget.style.outline = "2px solid rgba(250,128,57,0.7)"; e.currentTarget.style.outlineOffset = "3px"; }}
                onBlur={(e) => { e.currentTarget.style.outline = "none"; }}
              >
                <span aria-hidden="true">▶</span>
                Ver video
              </button>
            </motion.div>
          </motion.div>

          {/* ── RIGHT: video card ────────────────────────────────────── */}
          <motion.div
            variants={VIDEO_VARIANT}
            initial={initial}
            animate={animate}
            style={{ y: shouldReduce ? 0 : videoY }}
          >
            <div
              style={{
                borderRadius: 20,
                overflow: "hidden",
                aspectRatio: "16/10",
                width: "100%",
                boxShadow:
                  "0 30px 80px -30px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(255,255,255,0.08)",
                position: "relative",
              }}
            >
              <video
                ref={videoRef}
                src="/assets/gracias-hero.mp4"
                autoPlay
                muted
                loop
                playsInline
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom divider */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 1,
          background: "rgba(255,255,255,0.08)",
        }}
      />
    </section>
  );
}
