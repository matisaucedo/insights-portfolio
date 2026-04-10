import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { PROJECTS, WHATSAPP_URL } from "../data/projects.js";
import Gallery from "../components/ui/Gallery.jsx";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay: d },
  }),
};

export default function ProjectPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = PROJECTS.find((p) => p.id === id);

  if (!project) {
    return (
      <div
        style={{
          paddingTop: 140,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "rgba(255,255,255,0.45)",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        <p style={{ fontSize: 15 }}>Proyecto no encontrado.</p>
        <button
          onClick={() => navigate("/proyectos")}
          style={{
            marginTop: 24,
            background: "none",
            border: "none",
            color: "#fa8039",
            fontSize: 13,
            cursor: "pointer",
            fontFamily: "Inter, system-ui, sans-serif",
          }}
        >
          ← Volver a proyectos
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        paddingTop: 80,
        minHeight: "100vh",
        paddingBottom: 120,
        background: "#000",
      }}
    >
      <div
        className="container-minta"
        style={{ paddingTop: 48 }}
      >
        {/* Back button */}
        <motion.button
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          onClick={() => navigate("/proyectos")}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "none",
            border: "none",
            padding: 0,
            color: "rgba(255,255,255,0.38)",
            fontSize: 13,
            cursor: "pointer",
            fontFamily: "Inter, system-ui, sans-serif",
            marginBottom: 48,
            transition: "color 0.2s",
          }}
          whileHover={{ color: "rgba(255,255,255,0.80)" }}
          transition={{ duration: 0.18 }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Proyectos
        </motion.button>

        {/* Header */}
        <div style={{ marginBottom: 64 }}>
          <motion.div
            custom={0.05}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              marginBottom: 16,
            }}
          >
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              style={{ color: "rgba(255,255,255,0.28)" }}
            >
              <path
                d="M1 5h8M5 1l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span
              style={{
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.40)",
              }}
            >
              {project.nl}
            </span>
          </motion.div>

          <motion.h1
            custom={0.1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            style={{
              fontSize: "clamp(32px, 5vw, 62px)",
              fontWeight: 400,
              letterSpacing: "-0.04em",
              lineHeight: "1.0em",
              color: "#fff",
              marginBottom: 12,
            }}
          >
            {project.title}
          </motion.h1>

          <motion.p
            custom={0.18}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            style={{
              fontSize: 16,
              color: "rgba(255,255,255,0.42)",
              letterSpacing: "-0.01em",
              marginBottom: 20,
            }}
          >
            {project.sub}
          </motion.p>

          {/* Tags */}
          <motion.div
            custom={0.24}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            style={{ display: "flex", gap: 6, flexWrap: "wrap" }}
          >
            {project.tags.map((t) => (
              <span
                key={t}
                style={{
                  fontSize: 11,
                  padding: "4px 12px",
                  borderRadius: 999,
                  border: "1px solid rgba(255,255,255,0.10)",
                  color: "rgba(255,255,255,0.38)",
                  fontFamily: "Inter, system-ui, sans-serif",
                  letterSpacing: "0.02em",
                }}
              >
                {t}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Gallery section label */}
        <motion.div
          custom={0.3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 24,
          }}
        >
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.07)" }} />
          <span
            style={{
              fontSize: 11,
              color: "rgba(255,255,255,0.28)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              fontWeight: 500,
              fontFamily: "Inter, system-ui, sans-serif",
            }}
          >
            Galería
          </span>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.07)" }} />
        </motion.div>

        {/* Gallery */}
        <Gallery images={project.gallery} />

        {/* Description + CTA */}
        <div
          style={{
            marginTop: 64,
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: 48,
            alignItems: "end",
            borderTop: "1px solid rgba(255,255,255,0.07)",
            paddingTop: 48,
          }}
        >
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{
              fontSize: 16,
              color: "rgba(255,255,255,0.50)",
              lineHeight: "1.65em",
              maxWidth: 580,
            }}
          >
            {project.desc}
          </motion.p>

          <motion.button
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            onClick={() => window.open(WHATSAPP_URL, "_blank")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              borderRadius: 999,
              background: "rgba(250,128,57,0.10)",
              border: "1px solid rgba(250,128,57,0.30)",
              color: "#fa8039",
              fontSize: 13,
              fontWeight: 500,
              padding: "0 24px",
              height: 44,
              cursor: "pointer",
              fontFamily: "Inter, system-ui, sans-serif",
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
            whileHover={{
              background: "rgba(250,128,57,0.18)",
              borderColor: "rgba(250,128,57,0.55)",
            }}
            transition={{ duration: 0.2 }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
            </svg>
            Contactar sobre este proyecto
          </motion.button>
        </div>
      </div>
    </div>
  );
}
