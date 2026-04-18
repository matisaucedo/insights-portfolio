import { useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

const SPRING = (delay = 0) => ({
  type: "spring",
  damping: 70,
  stiffness: 240,
  mass: 1,
  delay,
});

// Badge slides from slightly above (y: -20)
const EYEBROW = {
  hidden: { opacity: 0, y: -20 },
  show: { opacity: 1, y: 0, transition: SPRING(0.1) },
};
// H1, italic H2, subtitle, CTAs — standard y: 20 rise
const ITEM = (delay) => ({
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: SPRING(delay) },
});

const VIDEO_VARIANT = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: SPRING(0.85) },
};

const CTA_STYLE = `
.cta-editr {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  border: none;
  outline: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  white-space: nowrap;
  font-family: Inter, system-ui, sans-serif;
  font-weight: 700;
  font-size: 16px;
  line-height: 1;
  padding: 14px 24px;
  border-radius: 12px;
  transition:
    background 0.35s cubic-bezier(0.22, 1, 0.36, 1),
    color 0.35s cubic-bezier(0.22, 1, 0.36, 1),
    border-color 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}
.cta-editr__labels {
  position: relative;
  overflow: hidden;
  height: 1em;
  display: flex;
  flex-direction: column;
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}
.cta-editr__label {
  display: block;
  height: 1em;
  line-height: 1em;
  flex-shrink: 0;
}
.cta-editr:hover .cta-editr__labels {
  transform: translateY(-100%);
}
/* Primary */
.cta-primary {
  background: rgba(250,128,57,0.14);
  color: #fa8039;
  border: 1px solid rgba(250,128,57,0.42) !important;
  backdrop-filter: blur(24px) saturate(200%);
  -webkit-backdrop-filter: blur(24px) saturate(200%);
  box-shadow:
    0 0 28px rgba(250,128,57,0.30),
    0 8px 28px -4px rgba(250,128,57,0.22),
    inset 0 1px 0 rgba(255,255,255,0.18);
}
.cta-primary:hover {
  background: rgba(250,128,57,0.24);
  color: #fa8039;
  box-shadow:
    0 0 40px rgba(250,128,57,0.45),
    0 12px 36px -4px rgba(250,128,57,0.30),
    inset 0 1px 0 rgba(255,255,255,0.22);
}
.cta-primary:focus-visible {
  outline: 2px solid rgba(250,128,57,0.75);
  outline-offset: 3px;
}
/* Secondary */
.cta-secondary {
  background: transparent;
  color: #fff;
  border: 1px solid rgba(255,255,255,0.14);
  box-shadow: none;
}
.cta-secondary:hover {
  border-color: rgba(255,255,255,0.4);
  background: rgba(255,255,255,0.04);
}
.cta-secondary:focus-visible {
  outline: 2px solid rgba(250,128,57,0.75);
  outline-offset: 3px;
}
`;

export default function GraciasHero() {
  const shouldReduce = useReducedMotion();
  const videoRef = useRef(null);
  const sectionRef = useRef(null);

  const { scrollY } = useScroll();
  const videoY = useTransform(scrollY, [0, 600], [0, -40]);
  const [playing, setPlaying] = useState(false);

  function handleScrollToBooking() {
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  }

  function handlePlay() {
    if (videoRef.current) {
      videoRef.current.play();
      setPlaying(true);
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
      <style>{CTA_STYLE}</style>

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* ── LEFT: copy ──────────────────────────────────────────── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {/* Eyebrow — spring delay 0.1, y: -20 */}
            <motion.div
              variants={EYEBROW}
              initial={initial}
              animate={animate}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.45rem",
                  fontFamily: "Inter, system-ui, sans-serif",
                  fontSize: 12,
                  fontWeight: 700,
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

            {/* H1 — spring delay 0.25, weight 400, letter-spacing -0.04em */}
            <motion.div
              variants={ITEM(0.25)}
              initial={initial}
              animate={animate}
            >
              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 400,
                  fontSize: "clamp(44px, 7.5vw, 96px)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.04em",
                  color: "#fff",
                  margin: 0,
                }}
              >
                Creamos tu software
                <br />a medida
              </h1>
            </motion.div>

            {/* Italic H2 — spring delay 0.4, weight 300 */}
            <motion.div
              variants={ITEM(0.4)}
              initial={initial}
              animate={animate}
            >
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 300,
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

            {/* Subtitle — spring delay 0.55, weight 400 */}
            <motion.div
              variants={ITEM(0.55)}
              initial={initial}
              animate={animate}
            >
              <p
                style={{
                  fontFamily: "Inter, system-ui, sans-serif",
                  fontSize: 16,
                  fontWeight: 400,
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

            {/* CTAs — spring delay 0.7 */}
            <motion.div
              variants={ITEM(0.7)}
              initial={initial}
              animate={animate}
              style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center" }}
            >
              {/* Primary — vertical label slide */}
              <button
                onClick={handleScrollToBooking}
                className="cta-editr cta-primary touch-manipulation"
              >
                <span className="cta-editr__labels">
                  <span className="cta-editr__label">Agendá tu llamada</span>
                  <span className="cta-editr__label" aria-hidden="true">Agendá tu llamada</span>
                </span>
              </button>

            </motion.div>
          </div>

          {/* ── RIGHT: video card — spring delay 0.85, y: 40 ───────── */}
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
                loop
                playsInline
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
              {!playing && (
                <button
                  onClick={handlePlay}
                  aria-label="Reproducir video"
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    background: "rgba(0,0,0,0.28)",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div style={{
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.18)",
                    backdropFilter: "blur(12px) saturate(180%)",
                    WebkitBackdropFilter: "blur(12px) saturate(180%)",
                    border: "1px solid rgba(255,255,255,0.30)",
                    boxShadow: "0 0 32px rgba(250,128,57,0.35), inset 0 1px 0 rgba(255,255,255,0.22)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff" style={{ marginLeft: 3 }}>
                      <path d="M5 3l14 9-14 9V3z"/>
                    </svg>
                  </div>
                </button>
              )}
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
