import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useNavigate, useLocation, Link } from "react-router-dom";
import LogoSvg from "../../assets/icons/logo.svg?url";
import StatsSection from "./sections/StatsSection.jsx";
import FeatureTrio from "./sections/FeatureTrio.jsx";
import AIFeaturesSection from "./sections/AIFeaturesSection.jsx";
import RoadmapSection from "./sections/RoadmapSection.jsx";
import SuccessCases from "./sections/SuccessCases.jsx";
import GuaranteesSection from "./sections/GuaranteesSection.jsx";
import MobileApp from "./sections/MobileApp.jsx";
import ScrollBackground from "./components/ui/ScrollBackground.jsx";
import PulsingOrb from "./components/ui/PulsingOrb.jsx";
import { PROJECTS, NICHES, WHATSAPP_URL } from "./data/projects.js";

const TEAM = [
  { key: "fede", name: "Federico", role: "Co-Fundador · CEO", desc: "Lidera la visión del producto y el desarrollo. Experto en IA aplicada al software.", img: "/assets/images/team/federico.png" },
  { key: "juan", name: "Juan", role: "Co-Fundador · Comercial", desc: "Gestiona relaciones con clientes y cierra acuerdos. Cara comercial de Insights.", img: "/assets/images/team/juan.png" },
  { key: "matias", name: "Matías", role: "VISUAL · IA", desc: "Frontend development, edición de video y dirección visual. Potencia cada workflow creativo con IA.", img: "/assets/images/team/matias.png" },
  { key: "toledo", name: "Valentín", role: "Desarrollo · IA", desc: "Programador e implementador de todos los productos. Especialista en automatización con IA.", img: "/assets/images/team/valentin.png" },
];

const TESTIMONIALS = [
  { q: "En 3 semanas teníamos el MVP listo. No podía creer la velocidad sin sacrificar calidad.", name: "Martín G.", loc: "Buenos Aires" },
  { q: "El sistema de turnos que nos hicieron redujo un 40% las ausencias. Pagó solo en dos meses.", name: "Lucia R.", loc: "Córdoba" },
  { q: "Probé con otras agencias antes. Insights es otra liga — entienden el negocio, no solo el código.", name: "Diego F.", loc: "Rosario" },
  { q: "Nuestra app de logística maneja 800 envíos diarios sin un solo bug desde el lanzamiento.", name: "Ana V.", loc: "Mendoza" },
  { q: "Me dieron exactamente lo que necesitaba, ni más ni menos. Respetan el presupuesto.", name: "Carlos M.", loc: "CABA" },
  { q: "El dashboard de métricas que hicieron es lo primero que miro cada mañana.", name: "Sofía L.", loc: "Montevideo" },
];

const PROC_STEPS = [
  { num: "01", title: "Llamada inicial", desc: "Auditamos tu idea juntos. Definimos el alcance real, los tiempos y las prioridades antes de escribir una sola línea de código." },
  { num: "02", title: "Desarrollo iterativo", desc: "Construimos en ciclos cortos. Ves el avance en tiempo real y pedís cambios antes del lanzamiento." },
  { num: "03", title: "Publicación", desc: "Deploy en tu dominio con todo configurado. Hosting, dominio, SSL, performance — nada queda suelto." },
  { num: "04", title: "Entrega total", desc: "Código fuente, documentación completa y sesión de entrenamiento. Tu equipo queda autónomo." },
];

/* ─── Nav ─────────────────────────────────────────────────────────────────── */
export function Nav() {
  const navigate = useNavigate();
  const location = useLocation();
  const active = location.pathname.split("/")[1] || "home";
  const links = [
    { id: "proyectos", label: "Proyectos", path: "/proyectos" },
    { id: "nosotros", label: "Nosotros", path: "/nosotros" },
  ];

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 32px",
        height: 56,
        background: "rgba(0,0,0,0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {/* Logo */}
      <button
        onClick={() => navigate("/")}
        style={{ background: "none", border: "none", padding: 0, cursor: "pointer", display: "flex", alignItems: "center" }}
      >
        <img
          src={LogoSvg}
          alt="Insights Software"
          style={{ height: 26, width: "auto", display: "block" }}
        />
      </button>

      {/* Center links */}
      <nav style={{ display: "flex", alignItems: "center", gap: 4 }}>
        {links.map(({ id, label, path }) => (
          <button
            key={id}
            onClick={() => navigate(path)}
            style={{
              border: "none",
              padding: "6px 14px",
              borderRadius: 8,
              fontSize: 13.5,
              fontWeight: 400,
              color: active === id ? "#fff" : "rgba(255,255,255,0.46)",
              cursor: "pointer",
              transition: "color 0.2s, background 0.2s",
              letterSpacing: "-0.005em",
              fontFamily: "Inter, system-ui, sans-serif",
              background: active === id ? "rgba(255,255,255,0.06)" : "transparent",
            }}
            onMouseEnter={e => {
              if (active !== id) e.currentTarget.style.color = "rgba(255,255,255,0.80)";
            }}
            onMouseLeave={e => {
              if (active !== id) e.currentTarget.style.color = "rgba(255,255,255,0.46)";
            }}
          >
            {label}
          </button>
        ))}
      </nav>

      {/* CTA pill */}
      <motion.button
        style={{
          fontSize: 13,
          fontWeight: 500,
          color: "#fff",
          padding: "0 18px",
          height: 34,
          borderRadius: 999,
          background: "rgba(255,255,255,0.09)",
          border: "1px solid rgba(255,255,255,0.14)",
          cursor: "pointer",
          letterSpacing: "-0.005em",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
        whileHover={{ background: "rgba(255,255,255,0.15)", borderColor: "rgba(255,255,255,0.22)" }}
        transition={{ duration: 0.18 }}
        onClick={() => window.open(WHATSAPP_URL, "_blank")}
      >
        Hablar con el equipo
      </motion.button>
    </header>
  );
}

/* ─── Screen wrapper ─────────────────────────────────────────────────────── */
export const screenVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.22, ease: "easeIn" } },
};

/* ─── Home screen ────────────────────────────────────────────────────────── */
export function HomeScreen() {
  const mainRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: mainRef });

  return (
    <main ref={mainRef} style={{ paddingTop: 56 }}>
      <ScrollBackground scrollYProgress={scrollYProgress} />
      <Hero />
      <StatsSection />
      <FeatureTrio />
      <AIFeaturesSection />
      <RoadmapSection />
      <MobileApp />
      <SuccessCases />
      <GuaranteesSection />
      <Footer />
    </main>
  );
}

/* ─── Hero ───────────────────────────────────────────────────────────────── */
function Hero() {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const bgOpacity = useTransform(heroProgress, [0, 0.8], [1, 0]);
  const bgY = useTransform(heroProgress, [0, 1], [0, -80]);

  return (
    <section
      ref={heroRef}
      id="home"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
        paddingBottom: 80,
        overflow: "hidden",
        background: "#000",
      }}
    >
      {/* BG — parallax */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/assets/hero-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
          zIndex: 0,
          opacity: bgOpacity,
          y: bgY,
          willChange: "transform, opacity",
        }}
      />
      {/* Gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background: "linear-gradient(180deg, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.06) 30%, rgba(0,0,0,0.78) 76%, #000 100%)",
        }}
      />
      {/* Warm ray */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          background: "radial-gradient(ellipse 90% 55% at 68% 38%, rgba(232,93,47,0.10) 0%, transparent 55%)",
          pointerEvents: "none",
        }}
      />
      {/* Pulsing Orb */}
      <PulsingOrb
        size={300}
        className="gpu-layer"
        style={{ left: "50%", top: "40%", transform: "translate(-50%, -50%)", zIndex: 3 }}
      />
      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          padding: "0 24px",
          maxWidth: 760,
          margin: "0 auto",
        }}
      >
        <motion.h1
          style={{
            fontSize: "clamp(36px, 5.5vw, 56px)",
            fontWeight: 400,
            letterSpacing: "-0.04em",
            lineHeight: "1.1em",
            color: "#fff",
            marginBottom: 28,
          }}
          initial={{ opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
        >
          Aplicaciones que transforman negocios.
        </motion.h1>

        <motion.p
          style={{
            fontSize: 17,
            lineHeight: "1.6em",
            color: "rgba(255,255,255,0.50)",
            maxWidth: 460,
            margin: "0 auto 36px",
          }}
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.45 }}
        >
          Construimos software a medida con IA como ventaja competitiva. De la primera idea al lanzamiento.
        </motion.p>

        <motion.div
          style={{ display: "flex", justifyContent: "center", gap: 12 }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.65 }}
        >
          <motion.button
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              borderRadius: 999,
              background: "rgba(255,255,255,0.10)",
              border: "1px solid rgba(255,255,255,0.16)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              color: "#fff",
              fontSize: 14,
              fontWeight: 500,
              padding: "0 28px",
              height: 48,
              cursor: "pointer",
              letterSpacing: "-0.01em",
              fontFamily: "Inter, system-ui, sans-serif",
            }}
            whileHover={{ background: "rgba(255,255,255,0.16)", borderColor: "rgba(255,255,255,0.24)" }}
            transition={{ duration: 0.2 }}
            onClick={() => navigate("/proyectos")}
          >
            Ver proyectos
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Proyectos Screen ───────────────────────────────────────────────────── */
export function ProyectosScreen() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [filterOpen, setFilterOpen] = useState(false);
  const dropRef = useRef(null);

  const filtered = activeFilter === "all" ? PROJECTS : PROJECTS.filter(p => p.niche === activeFilter);
  const activeLabel = NICHES.find(n => n.key === activeFilter)?.label || "Todos";

  useEffect(() => {
    function handler(e) {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setFilterOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div style={{ paddingTop: 56, minHeight: "100vh" }}>
      {/* Hero strip — same style as Home hero */}
      <div
        style={{
          position: "relative",
          minHeight: "60vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "80px 0 64px",
          overflow: "hidden",
          background: "#000",
        }}
      >
        {/* BG image */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url('/assets/bg%20carp.png')",
            backgroundSize: "cover",
            backgroundPosition: "center 85%",
            zIndex: 0,
          }}
        />
        {/* Gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            background: "linear-gradient(180deg, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.06) 30%, rgba(0,0,0,0.78) 76%, #000 100%)",
          }}
        />
        <div className="container-minta" style={{ position: "relative", zIndex: 2 }}>
          <motion.div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              marginBottom: 16,
            }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ color: "rgba(255,255,255,0.28)" }}>
              <path d="M1 5h8M5 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.40)" }}>
              +100 proyectos entregados
            </span>
          </motion.div>

          <motion.h1
            style={{
              fontSize: "clamp(32px, 5vw, 60px)",
              fontWeight: 400,
              letterSpacing: "-0.04em",
              lineHeight: "1.1em",
              color: "#fff",
              marginBottom: 16,
              maxWidth: 640,
            }}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          >
            Experiencia en{" "}
            <em style={{ fontStyle: "italic", color: "rgba(255,255,255,0.65)" }}>todas las industrias.</em>
          </motion.h1>

          <motion.p
            style={{ fontSize: 16, color: "rgba(255,255,255,0.46)", maxWidth: 460, lineHeight: "1.55em" }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          >
            Salud, logística, finanzas, retail, educación — llevamos software a medida a cada sector. Cada proyecto tiene nombre, historia y resultado real.
          </motion.p>
        </div>
      </div>

      {/* Filter + grid */}
      <div className="container-minta" style={{ paddingTop: 48, position: "relative", zIndex: 2 }}>
        {/* Filter dropdown */}
        <div ref={dropRef} style={{ position: "relative", display: "inline-block", marginBottom: 40 }}>
          <button
            onClick={() => setFilterOpen(o => !o)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 16px",
              borderRadius: 10,
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.10)",
              color: "#fff",
              fontSize: 13,
              fontWeight: 400,
              cursor: "pointer",
              fontFamily: "Inter, system-ui, sans-serif",
            }}
          >
            {activeLabel}
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              style={{ transform: filterOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}
            >
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </button>

          {filterOpen && (
            <div
              style={{
                position: "absolute",
                top: "calc(100% + 6px)",
                left: 0,
                minWidth: 180,
                background: "#111",
                border: "1px solid rgba(255,255,255,0.10)",
                borderRadius: 12,
                padding: 6,
                zIndex: 50,
                boxShadow: "0 12px 40px rgba(0,0,0,0.6)",
              }}
            >
              {NICHES.map(n => (
                <button
                  key={n.key}
                  onClick={() => { setActiveFilter(n.key); setFilterOpen(false); }}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "left",
                    padding: "8px 12px",
                    borderRadius: 8,
                    background: activeFilter === n.key ? "rgba(255,255,255,0.08)" : "transparent",
                    border: "none",
                    color: activeFilter === n.key ? "#fff" : "rgba(255,255,255,0.55)",
                    fontSize: 13,
                    cursor: "pointer",
                    fontFamily: "Inter, system-ui, sans-serif",
                    transition: "background 0.15s, color 0.15s",
                  }}
                  onMouseEnter={e => { if (activeFilter !== n.key) e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
                  onMouseLeave={e => { if (activeFilter !== n.key) e.currentTarget.style.background = "transparent"; }}
                >
                  {n.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 40 }}>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.07)" }} />
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.28)", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 500 }}>
            Proyectos destacados
          </span>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.07)" }} />
        </div>

        {/* Project grid */}
        <motion.div
          style={{ display: "flex", flexDirection: "column", gap: 2 }}
          layout
        >
          {filtered.map((p, i) => (
            <ProjectRow key={p.id} project={p} index={i} />
          ))}
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}

function ProjectRow({ project, index }) {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut", delay: index * 0.05 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr auto",
        alignItems: "center",
        gap: 32,
        padding: "32px 0",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        cursor: "default",
        transition: "background 0.2s",
        borderRadius: 4,
        background: hovered ? "rgba(255,255,255,0.018)" : "transparent",
      }}
    >
      <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
        {/* Image thumb */}
        <div
          style={{
            width: 140,
            height: 96,
            borderRadius: 12,
            overflow: "hidden",
            flexShrink: 0,
            background: "#111",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <img
            src={project.img}
            alt={project.title}
            loading="lazy"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            onError={e => { e.target.style.display = "none"; }}
          />
        </div>

        {/* Text */}
        <div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.30)", letterSpacing: "0.10em", textTransform: "uppercase", fontWeight: 500, marginBottom: 4 }}>
            {project.nl}
          </div>
          <div
            style={{
              fontSize: 19,
              fontWeight: 500,
              color: hovered ? "#fff" : "rgba(255,255,255,0.88)",
              letterSpacing: "-0.02em",
              marginBottom: 4,
              transition: "color 0.2s",
            }}
          >
            {project.title}
            <span style={{ fontSize: 13, fontWeight: 400, color: "rgba(255,255,255,0.35)", marginLeft: 10 }}>
              {project.sub}
            </span>
          </div>
          <div style={{ fontSize: 14, color: "#8a8a8a", lineHeight: "1.5em", maxWidth: 520 }}>
            {project.desc}
          </div>
        </div>
      </div>

      {/* Right: tags + CTA */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 12 }}>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "flex-end" }}>
          {project.tags.map(t => (
            <span
              key={t}
              style={{
                fontSize: 11,
                padding: "3px 10px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.10)",
                color: "rgba(255,255,255,0.38)",
                whiteSpace: "nowrap",
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Ver proyecto button */}
        <button
          onClick={() => navigate(`/proyectos/${project.id}`)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "7px 14px",
            borderRadius: 8,
            border: "1px solid rgba(255,255,255,0.12)",
            background: "transparent",
            color: "rgba(255,255,255,0.50)",
            fontSize: 12,
            cursor: "pointer",
            fontFamily: "Inter, system-ui, sans-serif",
            transition: "color 0.2s, border-color 0.2s",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.color = "#fa8039";
            e.currentTarget.style.borderColor = "rgba(250,128,57,0.45)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.color = "rgba(255,255,255,0.50)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
          }}
        >
          Ver proyecto
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </motion.div>
  );
}

/* ─── Proceso Screen ─────────────────────────────────────────────────────── */
function ProcesoScreen() {
  const OFFSETS = ["0%", "14%", "28%", "42%"];

  return (
    <div style={{ paddingTop: 120, paddingBottom: 140, minHeight: "100vh" }}>
      <div className="container-minta">
        {/* Header */}
        <div style={{ marginBottom: 80 }}>
          <motion.div
            style={{ display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 20 }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ color: "rgba(255,255,255,0.28)" }}>
              <path d="M1 5h8M5 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.40)" }}>
              Cómo trabajamos
            </span>
          </motion.div>

          <motion.h1
            style={{
              fontSize: "clamp(32px, 5vw, 64px)",
              fontWeight: 400,
              letterSpacing: "-0.04em",
              lineHeight: "1.1em",
              color: "#fff",
              marginBottom: 20,
              maxWidth: 540,
            }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          >
            4 pasos simples.{" "}
            <span style={{ color: "rgba(255,255,255,0.45)" }}>Con transparencia.</span>
          </motion.h1>

          <motion.p
            style={{ fontSize: 16, color: "#8a8a8a", maxWidth: 420, lineHeight: "1.55em" }}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut", delay: 0.2 }}
          >
            Desde la primera llamada hasta la entrega, sabés exactamente qué pasa en cada momento.
          </motion.p>
        </div>

        {/* Steps diagonal */}
        <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 64 }}>
          {/* Vertical line */}
          <motion.div
            style={{
              position: "absolute",
              left: 4,
              top: 10,
              bottom: 10,
              width: 1,
              background: "rgba(255,255,255,0.07)",
              transformOrigin: "top",
            }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.6, ease: "easeOut", delay: 0.3 }}
          />

          {PROC_STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              style={{
                position: "relative",
                paddingLeft: `calc(${OFFSETS[i]} + 28px)`,
              }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: "easeOut", delay: 0.15 + i * 0.16 }}
            >
              {/* Dot */}
              <div
                style={{
                  position: "absolute",
                  left: `calc(${OFFSETS[i]} + 9px)`,
                  top: 7,
                  width: 9,
                  height: 9,
                  borderRadius: "50%",
                  background: "#000",
                  border: "1.5px solid rgba(255,255,255,0.28)",
                }}
              />
              {/* Text */}
              <div>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 400,
                    color: "rgba(255,255,255,0.65)",
                    letterSpacing: "-0.01em",
                    marginBottom: 8,
                  }}
                >
                  <span style={{ color: "rgba(255,255,255,0.28)", marginRight: 8 }}>{step.num} ·</span>
                  {step.title}
                </div>
                <div style={{ fontSize: 14, color: "#8a8a8a", lineHeight: "1.6em", maxWidth: 320 }}>
                  {step.desc}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          style={{ marginTop: 80, display: "flex", justifyContent: "flex-start" }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut", delay: 0.9 }}
        >
          <motion.button
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
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
            }}
            whileHover={{ background: "rgba(255,255,255,0.14)" }}
            transition={{ duration: 0.2 }}
            onClick={() => window.open(WHATSAPP_URL, "_blank")}
          >
            Quiero agendar →
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

/* ─── Team Spotlight ─────────────────────────────────────────────────────── */
function TeamSpotlight() {
  const [active, setActive] = useState(0);
  const n = TEAM.length;

  // Circular offset: always in range [-floor(n/2), ceil(n/2)]
  const getOffset = (i) => {
    let d = i - active;
    if (d > n / 2) d -= n;
    if (d < -n / 2) d += n;
    return d;
  };

  const prev = () => setActive(i => (i - 1 + n) % n);
  const next = () => setActive(i => (i + 1) % n);

  // Exact values reverse-engineered from reference (team-spotlight.framer.website)
  const CARD_W = 280;
  const CARD_H = 420; // ~3:4.5 portrait

  const getConfig = (offset) => {
    const abs = Math.abs(offset);
    const sign = offset === 0 ? 0 : offset > 0 ? 1 : -1;
    if (abs === 0) return { x: 0,          scale: 1,   rotate: 0,        opacity: 1,   blur: 0, z: 5 };
    if (abs === 1) return { x: sign * 130,  scale: 0.9, rotate: sign * 4, opacity: 0.9, blur: 2, z: 4 };
    if (abs === 2) return { x: sign * 240,  scale: 0.8, rotate: sign * 4, opacity: 0.8, blur: 5, z: 3 };
    return               { x: sign * 340,  scale: 0.7, rotate: sign * 6, opacity: 0,   blur: 8, z: 0 };
  };

  return (
    <div style={{ userSelect: "none", marginBottom: 80 }}>

      {/* ── Glow behind carousel ───────────────────────── */}
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
        {/* Amber radial glow matching reference */}
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(ellipse at center, rgba(250,128,57,0.13) 0%, rgba(250,128,57,0.04) 45%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }} />

        {/* ── Carousel track — no overflow hidden, cards float ── */}
        <div style={{
          position: "relative",
          height: CARD_H,
          width: "100%",
          zIndex: 1,
        }}>
          {TEAM.map((member, i) => {
            const offset = getOffset(i);
            const { x, scale, rotate, opacity, blur, z } = getConfig(offset);
            const isActive = offset === 0;

            return (
              <motion.div
                key={member.key}
                style={{
                  position: "absolute",
                  width: CARD_W,
                  height: CARD_H,
                  left: "50%",
                  top: 0,
                  marginLeft: -(CARD_W / 2),
                  borderRadius: 20,
                  overflow: "hidden",
                  transformOrigin: "center center",
                  cursor: isActive ? "default" : "pointer",
                  willChange: "transform, filter, opacity",
                  // Fallback bg for broken images
                  background: "#111",
                }}
                animate={{
                  x,
                  scale,
                  rotate,
                  opacity,
                  filter: `blur(${blur}px)`,
                  zIndex: z,
                }}
                transition={{ duration: 0.52, ease: [0.4, 0, 0.2, 1] }}
                onClick={() => !isActive && setActive(i)}
              >
                <img
                  src={member.img}
                  alt={member.name}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center top",
                    display: "block",
                    pointerEvents: "none",
                  }}
                  onError={e => { e.target.style.display = "none"; }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* ── Info row: [←]  Name / Role  [→] ──────────── */}
        <div style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 28,
          marginTop: 28,
        }}>
          {/* Prev */}
          <motion.button
            onClick={prev}
            whileHover={{ background: "rgba(255,255,255,0.13)", borderColor: "rgba(255,255,255,0.20)" }}
            whileTap={{ scale: 0.90 }}
            transition={{ duration: 0.18 }}
            style={{
              flexShrink: 0,
              width: 40, height: 40, borderRadius: "50%",
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.10)",
              color: "#fff", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </motion.button>

          {/* Name + Role */}
          <div style={{ textAlign: "center", minWidth: 240 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.26, ease: "easeOut" }}
              >
                <div style={{
                  fontSize: 28, fontWeight: 400,
                  letterSpacing: "-0.04em",
                  color: "#fff",
                  lineHeight: "1.1em",
                  marginBottom: 6,
                  fontFamily: "Inter, system-ui, sans-serif",
                }}>
                  {TEAM[active].name}
                </div>
                <div style={{
                  fontSize: 12,
                  color: "rgba(250,128,57,0.9)",
                  fontWeight: 500,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  fontFamily: "Inter, system-ui, sans-serif",
                }}>
                  {TEAM[active].role}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Next */}
          <motion.button
            onClick={next}
            whileHover={{ background: "rgba(255,255,255,0.13)", borderColor: "rgba(255,255,255,0.20)" }}
            whileTap={{ scale: 0.90 }}
            transition={{ duration: 0.18 }}
            style={{
              flexShrink: 0,
              width: 40, height: 40, borderRadius: "50%",
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.10)",
              color: "#fff", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </motion.button>
        </div>

        {/* ── Description ─────────────────────────────── */}
        <AnimatePresence mode="wait">
          <motion.p
            key={`d-${active}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, delay: 0.05 }}
            style={{
              position: "relative",
              zIndex: 2,
              textAlign: "center",
              marginTop: 14,
              fontSize: 14,
              color: "#8a8a8a",
              lineHeight: "1.65em",
              maxWidth: 320,
            }}
          >
            {TEAM[active].desc}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─── Nosotros Screen ────────────────────────────────────────────────────── */
export function NosotrosScreen() {
  return (
    <div style={{ paddingTop: 56, minHeight: "100vh" }}>
      <div className="container-minta">
        {/* Intro */}
        <div style={{ maxWidth: 600, marginBottom: 72 }}>
          <motion.div
            style={{ display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 20 }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ color: "rgba(255,255,255,0.28)" }}>
              <path d="M1 5h8M5 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.40)" }}>
              Nuestro equipo
            </span>
          </motion.div>

          <motion.h1
            style={{
              fontSize: "clamp(32px, 5vw, 60px)",
              fontWeight: 400,
              letterSpacing: "-0.04em",
              lineHeight: "1.1em",
              color: "#fff",
              marginBottom: 20,
            }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          >
            Cuatro personas.
            <br />
            <em style={{ fontStyle: "italic", color: "rgba(255,255,255,0.55)" }}>Más de 100 proyectos.</em>
          </motion.h1>

          <motion.p
            style={{ fontSize: 16, color: "#8a8a8a", lineHeight: "1.6em" }}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut", delay: 0.2 }}
          >
            No necesitás un equipo de 20 para hacer software de calidad. Necesitás cuatro personas con IA como ventaja competitiva.
          </motion.p>
        </div>

        {/* Team Spotlight */}
        <TeamSpotlight />

        {/* Stats bar */}
        <motion.div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 1,
            borderRadius: 16,
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.07)",
            marginBottom: 80,
          }}
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut", delay: 0.4 }}
        >
          {[
            { num: "+100", label: "Proyectos entregados" },
            { num: "+12",  label: "Sectores distintos" },
            { num: "4",    label: "Personas en el equipo" },
            { num: "+3",   label: "Años de experiencia" },
          ].map((s, i) => (
            <div
              key={s.label}
              style={{
                padding: "32px 24px",
                background: "#0d0d0d",
                textAlign: "center",
                borderRight: i < 3 ? "1px solid rgba(255,255,255,0.07)" : "none",
              }}
            >
              <div
                style={{
                  fontFamily: '"Geist Mono", monospace',
                  fontFeatureSettings: "'zero' on, 'tnum' on",
                  fontSize: "clamp(24px, 3vw, 36px)",
                  fontWeight: 300,
                  letterSpacing: "-0.02em",
                  color: "#fff",
                  marginBottom: 6,
                }}
              >
                {s.num}
              </div>
              <div style={{ fontSize: 13, color: "#8a8a8a", lineHeight: "1.3em" }}>
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Speaker section */}
        <motion.div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 48,
            alignItems: "center",
            marginBottom: 96,
          }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.5 }}
        >
          {/* Photo */}
          <div style={{ position: "relative" }}>
            <div
              style={{
                borderRadius: 20,
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <img
                src="/assets/images/speaker.jpg"
                alt="Charla en Buenos Aires sobre IA"
                loading="lazy"
                style={{ width: "100%", display: "block", objectFit: "cover", aspectRatio: "4/3" }}
                onError={e => { e.target.parentElement.style.background = "#111"; e.target.style.display = "none"; }}
              />
            </div>
            {/* Badge */}
            <div
              style={{
                position: "absolute",
                bottom: 16,
                left: 16,
                right: 16,
                borderRadius: 12,
                background: "rgba(0,0,0,0.75)",
                backdropFilter: "blur(8px)",
                padding: "12px 16px",
                border: "1px solid rgba(255,255,255,0.10)",
              }}
            >
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", marginBottom: 2 }}>Charla · Buenos Aires</div>
              <div style={{ fontSize: 13, color: "#fff", fontWeight: 500 }}>"El software con IA es el futuro"</div>
            </div>
          </div>

          {/* Quote */}
          <div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.30)", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 500, marginBottom: 16 }}>
              En mis últimas charlas siempre expliqué lo mismo
            </div>
            <h2
              style={{
                fontSize: "clamp(24px, 3vw, 36px)",
                fontWeight: 400,
                letterSpacing: "-0.03em",
                lineHeight: "1.15em",
                color: "#fff",
                marginBottom: 20,
              }}
            >
              El que no use IA va a quedar en el pasado.
            </h2>
            <p style={{ fontSize: 15, color: "#8a8a8a", lineHeight: "1.65em", marginBottom: 24 }}>
              El que no use software con IA va a trabajar más lento, perder más tiempo y pagarle a más equipo para hacer menos cosas.
            </p>
            <blockquote
              style={{
                borderLeft: "2px solid rgba(232,93,47,0.50)",
                paddingLeft: 16,
                fontSize: 14,
                fontStyle: "italic",
                color: "rgba(255,255,255,0.55)",
                lineHeight: "1.6em",
              }}
            >
              "El que use software con IA va a trabajar mucho más. El que no lo use va a quedar atrás."
            </blockquote>
          </div>
        </motion.div>

        {/* Testimonials */}
        <div style={{ marginBottom: 80 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 48 }}>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.07)" }} />
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.28)", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 500 }}>
              Lo que dicen nuestros clientes
            </span>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.07)" }} />
          </div>

          <motion.div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: 12,
            }}
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          >
            {TESTIMONIALS.map(t => (
              <motion.div
                key={t.name}
                variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } } }}
                style={{
                  borderRadius: 20,
                  background: "#0d0d0d",
                  border: "1px solid rgba(255,255,255,0.07)",
                  padding: "32px 28px 28px",
                }}
                whileHover={{ y: -4, borderColor: "rgba(255,255,255,0.13)", transition: { duration: 0.22 } }}
              >
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.68)", lineHeight: "1.55em", marginBottom: 20 }}>
                  "{t.q}"
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      background: "rgba(232,93,47,0.14)",
                      color: "rgba(232,93,47,0.80)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: "0.02em",
                    }}
                  >
                    {t.name.split(" ").map(w => w[0]).join("")}
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 500, color: "#fff", letterSpacing: "-0.01em" }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: "#8a8a8a" }}>{t.loc}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Closing CTA */}
        <motion.div
          style={{ textAlign: "center", paddingTop: 40 }}
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut", delay: 0.6 }}
        >
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 52px)",
              fontWeight: 400,
              letterSpacing: "-0.04em",
              lineHeight: "1.05em",
              color: "#fff",
              marginBottom: 16,
            }}
          >
            ¿Tenés una idea?
            <br />
            <em style={{ fontStyle: "italic", color: "rgba(255,255,255,0.50)" }}>Nosotros la construimos.</em>
          </h2>
          <p style={{ fontSize: 16, color: "#8a8a8a", marginBottom: 36, lineHeight: "1.5em" }}>
            En menos de una llamada definimos qué necesitás, cuánto cuesta y cuándo lo tenés listo.
          </p>
          <motion.button
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              borderRadius: 999,
              background: "rgba(255,255,255,0.09)",
              border: "1px solid rgba(255,255,255,0.14)",
              color: "#fff",
              fontSize: 14,
              fontWeight: 500,
              padding: "0 32px",
              height: 52,
              cursor: "pointer",
              fontFamily: "Inter, system-ui, sans-serif",
            }}
            whileHover={{ background: "rgba(255,255,255,0.15)", borderColor: "rgba(255,255,255,0.22)" }}
            transition={{ duration: 0.2 }}
            onClick={() => window.open(WHATSAPP_URL, "_blank")}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
            </svg>
            Hablar con el equipo
          </motion.button>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}

/* ─── Footer ─────────────────────────────────────────────────────────────── */
const FOOTER_LINKS = [
  { heading: "Navegación", links: [
    { label: "Proyectos",  path: "/proyectos" },
    { label: "Nosotros",   path: "/nosotros" },
    { label: "Privacidad", path: null },
    { label: "Términos",   path: null },
  ]},
];

function Footer() {
  const navigate = useNavigate();
  return (
    <footer style={{ borderTop: "1px solid rgba(255,255,255,0.07)", background: "#000" }}>
      <div
        className="container-minta footer-grid"
        style={{
          paddingTop: 64,
          paddingBottom: 64,
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: "48px 80px",
          alignItems: "start",
        }}
      >
        {/* Logo */}
        <div>
          <div style={{ marginBottom: 12 }}>
            <img src={LogoSvg} alt="Insights Software" style={{ height: 26, width: "auto", display: "block" }} />
          </div>
          <p style={{ fontSize: 13, color: "#8a8a8a", lineHeight: "1.55em", maxWidth: 220 }}>
            Software a medida con IA como ventaja competitiva.
          </p>
        </div>
        {/* Columns */}
        {FOOTER_LINKS.map(col => (
          <div key={col.heading}>
            <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.10em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", marginBottom: 16 }}>
              {col.heading}
            </div>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
              {col.links.map(l => (
                <li key={l.label}>
                  <button
                    onClick={() => l.path ? navigate(l.path) : null}
                    style={{
                      background: "none",
                      border: "none",
                      padding: 0,
                      fontSize: 13,
                      color: "#8a8a8a",
                      cursor: l.path ? "pointer" : "default",
                      fontFamily: "Inter, system-ui, sans-serif",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={e => l.path && (e.target.style.color = "#fff")}
                    onMouseLeave={e => l.path && (e.target.style.color = "#8a8a8a")}
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div
        className="container-minta"
        style={{
          paddingTop: 24,
          paddingBottom: 32,
          borderTop: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <p style={{ fontSize: 12, color: "#8a8a8a" }}>
          © {new Date().getFullYear()} Insights Software. Todos los derechos reservados.
        </p>
        <div style={{ display: "flex", gap: 20 }}>
          {["Privacidad", "Términos"].map(l => (
            <a key={l} href="#" style={{ fontSize: 12, color: "#8a8a8a", textDecoration: "none" }}>{l}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}

/* ─── Legacy default export (unused — routing handled by main.jsx) ────────── */
export default function HomePage() {
  return <HomeScreen />;
}
