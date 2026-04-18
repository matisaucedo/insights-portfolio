import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import GrainOverlay from "../components/ui/GrainOverlay.jsx";

const fadeIn = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 },
  }),
};

export default function GraciasPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#000",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 24px 160px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <GrainOverlay />

      {/* Radial orange glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse 80% 50% at 50% 40%, rgba(250,128,57,0.08), transparent 60%)",
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          maxWidth: 960,
          width: "100%",
        }}
      >
        <motion.h1
          custom={0}
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          style={{
            fontSize: "clamp(48px, 9vw, 120px)",
            fontWeight: 700,
            letterSpacing: "-0.04em",
            lineHeight: 0.95,
            color: "#fff",
            margin: "0 0 28px",
            fontFamily: "Inter, system-ui, sans-serif",
          }}
        >
          Gracias. Vamos a crear algo increíble.
        </motion.h1>

        <motion.p
          custom={1}
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          style={{
            fontSize: "clamp(15px, 1.5vw, 18px)",
            color: "rgba(255,255,255,0.55)",
            maxWidth: 540,
            lineHeight: 1.6,
            margin: "0 0 16px",
            fontFamily: "Inter, system-ui, sans-serif",
          }}
        >
          Recibimos tu idea. Te respondemos en menos de 24 horas con un plan claro para tu software.
        </motion.p>

        <motion.p
          custom={2}
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          style={{
            fontSize: "clamp(11px, 1vw, 13px)",
            color: "rgba(255,255,255,0.4)",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            fontWeight: 500,
            margin: "0 0 48px",
            fontFamily: "Inter, system-ui, sans-serif",
          }}
        >
          CONSULTA GRATUITA · 60 MINUTOS · SIN COMPROMISO
        </motion.p>

        <motion.div
          custom={3}
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}
        >
          <Link
            to="/"
            style={{
              height: 52,
              padding: "0 28px",
              borderRadius: 999,
              background: "#fa8039",
              color: "#000",
              fontSize: 14,
              fontWeight: 500,
              fontFamily: "Inter, system-ui, sans-serif",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              letterSpacing: "-0.005em",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#ff9045")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#fa8039")}
          >
            Volver al inicio
          </Link>

          <Link
            to="/proyectos"
            style={{
              height: 52,
              padding: "0 28px",
              borderRadius: 999,
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "#fff",
              fontSize: 14,
              fontWeight: 500,
              fontFamily: "Inter, system-ui, sans-serif",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              letterSpacing: "-0.005em",
              transition: "background 0.2s, border-color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.10)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.22)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.06)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
            }}
          >
            Ver proyectos
          </Link>
        </motion.div>
      </div>

      {/* Giant wordmark at bottom */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: -20,
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: "clamp(80px, 20vw, 280px)",
          fontWeight: 900,
          color: "rgba(255,255,255,0.04)",
          letterSpacing: "-0.06em",
          lineHeight: 1,
          whiteSpace: "nowrap",
          pointerEvents: "none",
          fontFamily: "Inter, system-ui, sans-serif",
          userSelect: "none",
        }}
      >
        INSIGHTS
      </div>
    </div>
  );
}
