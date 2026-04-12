import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { PROJECTS, WHATSAPP_URL } from "../data/projects.js";
import Container from "../components/ui/Container.jsx";
import SectionLabel from "../components/ui/SectionLabel.jsx";
import Gallery from "../components/ui/Gallery.jsx";
import DeviceMockup from "../components/ui/DeviceMockup.jsx";
import MacMockup from "../components/ui/MacMockup.jsx";

/* ────────────────────────────────────────────────────────────────────────────
   ProjectPage — reusable template for /proyectos/:id
   Consumes the project schema documented at the top of data/projects.js.
   Visual + motion language matches the home page sections:
     - whileInView entries with cubic ease [0.22,1,0.36,1]
     - title clamp(36px, 5.5vw, 64px), tracking -0.04em, lh 1.02
     - section padding via .section-py (64/56/48 responsive)
     - SectionLabel / Container reused from the design system
   ──────────────────────────────────────────────────────────────────────────── */

const EASE = [0.22, 1, 0.36, 1];

const staggerParent = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const fadeItem = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

/* ── Shared subcomponents ─────────────────────────────────────────────────── */

function BackButton({ navigate }) {
  return (
    <motion.button
      variants={fadeItem}
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
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M19 12H5M12 19l-7-7 7-7" />
      </svg>
      Proyectos
    </motion.button>
  );
}

function Tags({ tags, center = false }) {
  return (
    <motion.div
      variants={fadeItem}
      style={{
        display: "flex",
        gap: 6,
        flexWrap: "wrap",
        ...(center && { justifyContent: "center" }),
      }}
    >
      {tags.map((t) => (
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
  );
}

function CtaButton() {
  return (
    <motion.button
      variants={fadeItem}
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
      whileHover={{ background: "rgba(250,128,57,0.18)", borderColor: "rgba(250,128,57,0.55)" }}
      transition={{ duration: 0.2 }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
      Contactar sobre este proyecto
    </motion.button>
  );
}

function MockupCaption({ label }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        marginBottom: 24,
        width: "100%",
      }}
    >
      <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.07)" }} />
      <span
        style={{
          fontSize: 11,
          color: "rgba(255,255,255,0.32)",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          fontWeight: 500,
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        {label}
      </span>
      <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.07)" }} />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   HERO — title, subtitle, description, tags (shared by both layouts)
   ══════════════════════════════════════════════════════════════════════════ */
function ProjectHero({ project, navigate, centered }) {
  return (
    <motion.div
      variants={staggerParent}
      initial="hidden"
      animate="visible"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: centered ? "center" : "flex-start",
        textAlign: centered ? "center" : "left",
      }}
    >
      <BackButton navigate={navigate} />

      <SectionLabel center={centered}>{project.nl}</SectionLabel>

      <motion.h1
        variants={fadeItem}
        style={{
          fontSize: "clamp(44px, 7.2vw, 88px)",
          fontWeight: 300,
          letterSpacing: "-0.05em",
          lineHeight: "0.98em",
          color: "#fff",
          marginBottom: 24,
          maxWidth: centered ? 880 : 880,
        }}
      >
        {project.title}
      </motion.h1>

      <motion.div
        variants={fadeItem}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          marginBottom: centered ? 28 : 28,
          alignSelf: centered ? "center" : "flex-start",
        }}
      >
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: 999,
            background: "#fa8039",
            boxShadow: "0 0 14px rgba(250,128,57,0.55)",
          }}
        />
        <span
          style={{
            fontSize: 15,
            fontWeight: 500,
            color: "rgba(255,255,255,0.62)",
            letterSpacing: "-0.01em",
          }}
        >
          {project.sub}
        </span>
      </motion.div>

      {centered && (
        <motion.p
          variants={fadeItem}
          style={{
            fontSize: 16,
            color: "rgba(255,255,255,0.48)",
            lineHeight: "1.7em",
            maxWidth: 560,
            marginBottom: 32,
          }}
        >
          {project.desc}
        </motion.p>
      )}

      <Tags tags={project.tags} center={centered} />
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   MOCKUP BLOCK — split (Mac + iPhone) or single DeviceMockup
   ══════════════════════════════════════════════════════════════════════════ */
function MockupBlock({ mockup }) {
  const isSplit = mockup.device === "split";

  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
      style={{ width: "100%", marginTop: 88 }}
    >
      {isSplit ? (
        <div
          className="mockup-split"
          style={{
            display: "grid",
            gridTemplateColumns: "1.55fr 1fr",
            gap: 40,
            alignItems: "start",
            width: "100%",
            maxWidth: 1400,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
            <MockupCaption label={mockup.macLabel || "Página Web"} />
            <MacMockup src={mockup.macSrc} maxHeight={540} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
            <MockupCaption label={mockup.iphoneLabel || "App"} />
            <DeviceMockup src={mockup.iphoneSrc} maxHeight={540} />
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <DeviceMockup src={mockup.src} maxHeight={560} />
        </div>
      )}
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   MOCKUP LAYOUT — centered hero, device mockup as the protagonist
   ══════════════════════════════════════════════════════════════════════════ */
function HeroGlow() {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        top: -120,
        left: "50%",
        transform: "translateX(-50%)",
        width: 900,
        height: 600,
        background:
          "radial-gradient(ellipse at center, rgba(250,128,57,0.10) 0%, rgba(250,128,57,0.04) 30%, rgba(0,0,0,0) 65%)",
        pointerEvents: "none",
        zIndex: 0,
        filter: "blur(20px)",
      }}
    />
  );
}

function MockupLayout({ project, navigate }) {
  return (
    <section
      className="section-py project-hero-pad"
      style={{ minHeight: "100vh", background: "#000", position: "relative", overflow: "hidden" }}
    >
      <HeroGlow />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Container>
          <ProjectHero project={project} navigate={navigate} centered />
          <MockupBlock mockup={project.mockup} />
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
            style={{ display: "flex", justifyContent: "center", marginTop: 80 }}
          >
            <CtaButton />
          </motion.div>
        </Container>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   DEFAULT LAYOUT — gallery-driven, used when a project has no mockup
   ══════════════════════════════════════════════════════════════════════════ */
function DefaultLayout({ project, navigate }) {
  return (
    <section className="section-py project-hero-pad" style={{ minHeight: "100vh", background: "#000" }}>
      <Container>
        <div style={{ marginBottom: 64 }}>
          <ProjectHero project={project} navigate={navigate} centered={false} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <MockupCaption label="Galería" />
          <Gallery images={project.gallery} />
        </motion.div>

        <motion.div
          className="project-footer-grid"
          variants={staggerParent}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px" }}
        >
          <motion.p
            variants={fadeItem}
            style={{
              fontSize: 16,
              color: "rgba(255,255,255,0.50)",
              lineHeight: "1.65em",
              maxWidth: 580,
            }}
          >
            {project.desc}
          </motion.p>
          <CtaButton />
        </motion.div>
      </Container>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   PAGE ENTRY
   ══════════════════════════════════════════════════════════════════════════ */
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

  if (project.mockup) {
    return <MockupLayout project={project} navigate={navigate} />;
  }
  return <DefaultLayout project={project} navigate={navigate} />;
}
