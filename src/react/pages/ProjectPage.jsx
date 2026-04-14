import { useState, useRef, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";

const MotionLink = motion.create(Link);
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

function BackButton() {
  return (
    <MotionLink
      to="/proyectos"
      variants={fadeItem}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        color: "rgba(255,255,255,0.38)",
        fontSize: 13,
        cursor: "pointer",
        fontFamily: "Inter, system-ui, sans-serif",
        marginBottom: 48,
        transition: "color 0.2s",
        textDecoration: "none",
      }}
      whileHover={{ color: "rgba(255,255,255,0.80)" }}
    >
      <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M19 12H5M12 19l-7-7 7-7" />
      </svg>
      Proyectos
    </MotionLink>
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
    <motion.a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      variants={fadeItem}
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
        textDecoration: "none",
      }}
      whileHover={{ background: "rgba(250,128,57,0.18)", borderColor: "rgba(250,128,57,0.55)" }}
      transition={{ duration: 0.2 }}
    >
      <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
      Contactar sobre este proyecto
    </motion.a>
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
function ProjectHero({ project, centered }) {
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
      <BackButton />

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
            fontSize: 16,
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
   MOCKUP SWITCHER — segmented control (Página Web ⇄ App)
   Animated pill slides between options via shared layoutId.
   ══════════════════════════════════════════════════════════════════════════ */
function MockupSwitcher({ value, onChange, options }) {
  function handleKeyDown(e) {
    const idx = options.findIndex((o) => o.key === value);
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      onChange(options[(idx + 1) % options.length].key);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      onChange(options[(idx - 1 + options.length) % options.length].key);
    }
  }

  return (
    <div
      role="tablist"
      aria-label="Vista del mockup"
      onKeyDown={handleKeyDown}
      style={{
        position: "relative",
        display: "inline-flex",
        padding: 4,
        borderRadius: 999,
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.025) 50%, rgba(255,255,255,0.05) 100%)",
        border: "1px solid rgba(255,255,255,0.10)",
        backdropFilter: "blur(24px) saturate(180%)",
        WebkitBackdropFilter: "blur(24px) saturate(180%)",
        boxShadow:
          "0 1px 0 rgba(255,255,255,0.10) inset, 0 0 0 1px rgba(255,255,255,0.015) inset, 0 12px 40px rgba(0,0,0,0.55), 0 2px 8px rgba(0,0,0,0.35)",
        overflow: "hidden",
      }}
    >
      {/* specular top-edge highlight — liquid glass refraction */}
      <span
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 999,
          pointerEvents: "none",
          background:
            "radial-gradient(120% 60% at 50% 0%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 55%)",
          mixBlendMode: "overlay",
          opacity: 0.9,
        }}
      />
      {options.map((opt) => {
        const active = opt.key === value;
        return (
          <button
            key={opt.key}
            type="button"
            role="tab"
            aria-selected={active}
            tabIndex={active ? 0 : -1}
            onClick={() => onChange(opt.key)}
            style={{
              position: "relative",
              zIndex: 1,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "8px 16px",
              minWidth: 100,
              fontSize: 13,
              fontWeight: 500,
              fontFamily: "Inter, system-ui, sans-serif",
              letterSpacing: "-0.01em",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: active ? "#fff" : "rgba(255,255,255,0.48)",
              transition: "color 0.4s cubic-bezier(0.22,1,0.36,1)",
              WebkitTapHighlightColor: "transparent",
            }}
            onMouseEnter={(e) => {
              if (!active) e.currentTarget.style.color = "rgba(255,255,255,0.78)";
            }}
            onMouseLeave={(e) => {
              if (!active) e.currentTarget.style.color = "rgba(255,255,255,0.48)";
            }}
          >
            {active && (
              <motion.span
                layoutId="mockup-switch-pill"
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: 999,
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.06) 45%, rgba(255,255,255,0.02) 100%)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  boxShadow:
                    "0 1px 0 rgba(255,255,255,0.35) inset, 0 -1px 0 rgba(255,255,255,0.04) inset, 0 8px 24px rgba(0,0,0,0.55), 0 2px 6px rgba(0,0,0,0.4)",
                  backdropFilter: "blur(16px) saturate(200%)",
                  WebkitBackdropFilter: "blur(16px) saturate(200%)",
                  zIndex: -1,
                }}
                transition={{ type: "spring", stiffness: 320, damping: 28, mass: 0.9 }}
              />
            )}
            <span style={{ position: "relative" }}>{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   MOCKUP BLOCK — split (switcher Mac ⇄ iPhone) or single DeviceMockup
   ══════════════════════════════════════════════════════════════════════════ */
function useContainerWidth() {
  const ref = useRef(null);
  const [width, setWidth] = useState(860);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, width];
}

function MockupBlock({ mockup }) {
  const isSplit = mockup.device === "split";
  const [view, setView] = useState("web");
  const [containerRef, containerWidth] = useContainerWidth();

  if (!isSplit) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 48 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
        style={{ width: "100%", marginTop: "clamp(40px, 8vw, 88px)" }}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <DeviceMockup src={mockup.src} maxHeight={560} />
        </div>
      </motion.div>
    );
  }

  const options = [
    { key: "web", label: mockup.macLabel || "Página Web" },
    { key: "app", label: mockup.iphoneLabel || "App" },
  ];

  const MAC_MAX = Math.min(540, containerWidth * 0.62);
  const IPHONE_MAX = Math.min(620, containerWidth * 0.85);

  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
      style={{
        width: "100%",
        marginTop: 72,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <MockupSwitcher value={view} onChange={setView} options={options} />

      <div
        ref={containerRef}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "min(860px, 100%)",
          marginTop: 40,
          minHeight: IPHONE_MAX,
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <motion.div
          aria-hidden={view !== "web"}
          animate={{
            opacity: view === "web" ? 1 : 0,
            y: view === "web" ? 0 : 14,
            scale: view === "web" ? 1 : 0.965,
            filter: view === "web" ? "blur(0px)" : "blur(14px)",
          }}
          transition={{
            opacity: { duration: 0.6, ease: EASE },
            y: { duration: 0.7, ease: EASE },
            scale: { duration: 0.7, ease: EASE },
            filter: { duration: 0.5, ease: EASE },
          }}
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: view === "web" ? "auto" : "none",
            willChange: "transform, opacity, filter",
          }}
        >
          <MacMockup src={mockup.macSrc} maxHeight={MAC_MAX} />
        </motion.div>

        <motion.div
          aria-hidden={view !== "app"}
          animate={{
            opacity: view === "app" ? 1 : 0,
            y: view === "app" ? 0 : 14,
            scale: view === "app" ? 1 : 0.965,
            filter: view === "app" ? "blur(0px)" : "blur(14px)",
          }}
          transition={{
            opacity: { duration: 0.6, ease: EASE },
            y: { duration: 0.7, ease: EASE },
            scale: { duration: 0.7, ease: EASE },
            filter: { duration: 0.5, ease: EASE },
          }}
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: view === "app" ? "auto" : "none",
            willChange: "transform, opacity, filter",
          }}
        >
          <DeviceMockup src={mockup.iphoneSrc} maxHeight={IPHONE_MAX} />
        </motion.div>
      </div>
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

function MockupLayout({ project }) {
  return (
    <section
      className="section-py project-hero-pad"
      style={{ minHeight: "100vh", background: "#000", position: "relative", overflow: "hidden" }}
    >
      <HeroGlow />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Container>
          <ProjectHero project={project} centered />
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
function DefaultLayout({ project }) {
  return (
    <section className="section-py project-hero-pad" style={{ minHeight: "100vh", background: "#000" }}>
      <Container>
        <div style={{ marginBottom: 64 }}>
          <ProjectHero project={project} centered={false} />
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
        <Link
          to="/proyectos"
          style={{
            marginTop: 24,
            display: "inline-block",
            color: "#fa8039",
            fontSize: 13,
            cursor: "pointer",
            fontFamily: "Inter, system-ui, sans-serif",
            textDecoration: "none",
          }}
        >
          ← Volver a proyectos
        </Link>
      </div>
    );
  }

  if (project.mockup) {
    return <MockupLayout project={project} />;
  }
  return <DefaultLayout project={project} />;
}
