import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import GrainOverlay from "../components/ui/GrainOverlay.jsx";
import { PROJECTS } from "../data/projects.js";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xblzjjow";

const BUDGET_OPTIONS = [
  {
    value: "$6k — $8k USD",
    label: "$6k — $8k USD",
    sub: "Proyectos de alcance definido",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
      </svg>
    ),
  },
  {
    value: "$8k — $10k USD",
    label: "$8k — $10k USD",
    sub: "Producto con múltiples pantallas",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    value: "$10k+ USD",
    label: "$10k+ USD",
    sub: "Plataforma completa, producto a medida",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
];

const STEPS = [
  {
    key: "nombre",
    title: "¿Cómo te llamás?",
    subtitle: null,
    type: "text",
    placeholder: "Tu nombre",
    validate: (v) => v.trim().length >= 2 ? null : "Mínimo 2 caracteres",
  },
  {
    key: "email",
    title: "¿Cuál es tu email?",
    subtitle: "Te respondemos en menos de 24 horas.",
    type: "email",
    placeholder: "tu@email.com",
    validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? null : "Email inválido",
  },
  {
    key: "idea",
    title: "Contanos tu idea.",
    subtitle: "Mientras más detalle, mejor podemos ayudarte.",
    type: "textarea",
    placeholder: "Describí qué querés construir, para qué audiencia, y qué problema resuelve…",
    validate: (v) => {
      if (v.trim().length < 20) return "Mínimo 20 caracteres";
      if (v.length > 1000) return "Máximo 1000 caracteres";
      return null;
    },
  },
  {
    key: "presupuesto",
    title: "¿Cuál es tu presupuesto?",
    subtitle: "Nos ayuda a dimensionar el alcance.",
    type: "radio",
    options: BUDGET_OPTIONS,
    validate: (v) => v ? null : "Seleccioná una opción",
  },
];

const fadeSlide = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.18, ease: [0.4, 0, 1, 1] } },
};

export default function ContactoPage() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const project = projectId ? PROJECTS.find((p) => p.id === projectId) : null;

  const [step, setStep] = useState(0);
  const [data, setData] = useState({ nombre: "", email: "", idea: "", presupuesto: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const currentStep = STEPS[step];
  const currentValue = data[currentStep.key];

  function handleChange(val) {
    setData((d) => ({ ...d, [currentStep.key]: val }));
    if (errors[currentStep.key]) setErrors((e) => ({ ...e, [currentStep.key]: null }));
  }

  function handleNext() {
    const err = currentStep.validate(currentValue);
    if (err) { setErrors((e) => ({ ...e, [currentStep.key]: err })); return; }
    if (step < STEPS.length - 1) { setStep((s) => s + 1); } else { handleSubmit(); }
  }

  function handleBack() {
    if (step > 0) setStep((s) => s - 1);
  }

  async function handleSubmit() {
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          nombre: data.nombre,
          email: data.email,
          idea: data.idea,
          presupuesto: data.presupuesto,
          proyecto: projectId || "general",
        }),
      });
      if (!res.ok) throw new Error("Error al enviar");
      navigate("/gracias");
    } catch {
      setSubmitError("Algo salió mal. Intentá de nuevo.");
      setSubmitting(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && currentStep.type !== "textarea") handleNext();
  }

  const isLast = step === STEPS.length - 1;
  const err = errors[currentStep.key];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0a0a0c",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "72px 20px 48px",
        position: "relative",
      }}
    >
      <GrainOverlay />

      {/* Radial orange glow behind card */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse 70% 50% at 50% 55%, rgba(250,128,57,0.12), transparent 65%)",
          pointerEvents: "none",
        }}
      />

      {/* Back to home */}
      <div style={{ position: "absolute", top: 24, left: 24, zIndex: 2 }}>
        <Link
          to="/"
          style={{
            fontSize: 13,
            color: "rgba(255,255,255,0.4)",
            textDecoration: "none",
            letterSpacing: "-0.005em",
            fontFamily: "Inter, system-ui, sans-serif",
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            transition: "color 0.18s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Insights
        </Link>
      </div>

      {/* Card */}
      <div
        style={{
          width: "100%",
          maxWidth: 460,
          background: "rgba(24,24,28,0.75)",
          backdropFilter: "blur(24px) saturate(1.2)",
          WebkitBackdropFilter: "blur(24px) saturate(1.2)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 16,
          padding: "clamp(24px, 4vw, 32px)",
          position: "relative",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04), 0 24px 64px rgba(0,0,0,0.5)",
        }}
      >
        {/* Project context pill */}
        {project && (
          <div
            style={{
              fontSize: 11,
              color: "rgba(250,128,57,0.85)",
              fontFamily: "Inter, system-ui, sans-serif",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              fontWeight: 500,
              marginBottom: 16,
              background: "rgba(250,128,57,0.08)",
              border: "1px solid rgba(250,128,57,0.18)",
              borderRadius: 999,
              padding: "4px 10px",
              display: "inline-block",
            }}
          >
            {project.name}
          </div>
        )}

        {/* Progress dots + step label row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            marginBottom: 20,
          }}
          role="progressbar"
          aria-valuenow={step + 1}
          aria-valuemin={1}
          aria-valuemax={STEPS.length}
        >
          {STEPS.map((_, i) => (
            <div
              key={i}
              style={{
                width: i === step ? 20 : 5,
                height: 5,
                borderRadius: 999,
                background: i === step ? "#fa8039" : i < step ? "rgba(250,128,57,0.35)" : "rgba(255,255,255,0.12)",
                transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
                flexShrink: 0,
              }}
            />
          ))}
          <span
            style={{
              marginLeft: 6,
              fontSize: 11,
              color: "rgba(255,255,255,0.3)",
              fontFamily: "Inter, system-ui, sans-serif",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            {step + 1} / {STEPS.length}
          </span>
        </div>

        {/* Step content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            variants={fadeSlide}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Title inside card */}
            <h2
              style={{
                fontFamily: "Inter, system-ui, sans-serif",
                fontSize: "clamp(17px, 2.2vw, 20px)",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                color: "#fff",
                lineHeight: 1.3,
                margin: "0 0 6px",
              }}
            >
              {currentStep.title}
            </h2>

            {currentStep.subtitle ? (
              <p
                style={{
                  fontSize: 13,
                  color: "rgba(255,255,255,0.45)",
                  lineHeight: 1.5,
                  margin: "0 0 20px",
                  fontFamily: "Inter, system-ui, sans-serif",
                }}
              >
                {currentStep.subtitle}
              </p>
            ) : (
              <div style={{ marginBottom: 20 }} />
            )}

            {/* Text / email input */}
            {(currentStep.type === "text" || currentStep.type === "email") && (
              <div>
                <label
                  htmlFor={`field-${currentStep.key}`}
                  style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0,0,0,0)" }}
                >
                  {currentStep.title}
                </label>
                <input
                  id={`field-${currentStep.key}`}
                  type={currentStep.type}
                  value={currentValue}
                  onChange={(e) => handleChange(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={currentStep.placeholder}
                  aria-invalid={!!err}
                  autoFocus
                  style={{
                    width: "100%",
                    height: 46,
                    padding: "0 16px",
                    background: "rgba(255,255,255,0.04)",
                    border: `1px solid ${err ? "rgba(255,80,80,0.5)" : "rgba(255,255,255,0.08)"}`,
                    borderRadius: 10,
                    color: "#fff",
                    fontSize: 14,
                    fontFamily: "Inter, system-ui, sans-serif",
                    outline: "none",
                    boxSizing: "border-box",
                    transition: "border-color 0.2s, box-shadow 0.2s",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "rgba(250,128,57,0.5)";
                    e.target.style.boxShadow = "0 0 0 3px rgba(250,128,57,0.10)";
                  }}
                  onBlur={(e) => {
                    if (!err) {
                      e.target.style.borderColor = "rgba(255,255,255,0.08)";
                      e.target.style.boxShadow = "none";
                    }
                  }}
                />
                <style>{`input::placeholder{color:rgba(255,255,255,0.3)}textarea::placeholder{color:rgba(255,255,255,0.3)}`}</style>
              </div>
            )}

            {/* Textarea */}
            {currentStep.type === "textarea" && (
              <div style={{ position: "relative" }}>
                <label
                  htmlFor={`field-${currentStep.key}`}
                  style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0,0,0,0)" }}
                >
                  {currentStep.title}
                </label>
                <textarea
                  id={`field-${currentStep.key}`}
                  value={currentValue}
                  onChange={(e) => handleChange(e.target.value)}
                  placeholder={currentStep.placeholder}
                  aria-invalid={!!err}
                  autoFocus
                  maxLength={1000}
                  style={{
                    width: "100%",
                    minHeight: 120,
                    padding: "12px 16px",
                    background: "rgba(255,255,255,0.04)",
                    border: `1px solid ${err ? "rgba(255,80,80,0.5)" : "rgba(255,255,255,0.08)"}`,
                    borderRadius: 10,
                    color: "#fff",
                    fontSize: 14,
                    fontFamily: "Inter, system-ui, sans-serif",
                    outline: "none",
                    resize: "vertical",
                    boxSizing: "border-box",
                    lineHeight: 1.6,
                    transition: "border-color 0.2s, box-shadow 0.2s",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "rgba(250,128,57,0.5)";
                    e.target.style.boxShadow = "0 0 0 3px rgba(250,128,57,0.10)";
                  }}
                  onBlur={(e) => {
                    if (!err) {
                      e.target.style.borderColor = "rgba(255,255,255,0.08)";
                      e.target.style.boxShadow = "none";
                    }
                  }}
                />
                <span
                  style={{
                    position: "absolute",
                    bottom: 10,
                    right: 12,
                    fontSize: 11,
                    color: currentValue.length > 900 ? "rgba(250,128,57,0.7)" : "rgba(255,255,255,0.22)",
                    fontFamily: "Inter, system-ui, sans-serif",
                    pointerEvents: "none",
                  }}
                >
                  {currentValue.length}/1000
                </span>
              </div>
            )}

            {/* Radio — budget rows with icon */}
            {currentStep.type === "radio" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {currentStep.options.map((opt) => {
                  const selected = currentValue === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => handleChange(opt.value)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        padding: "12px 16px",
                        background: selected ? "rgba(250,128,57,0.07)" : "rgba(255,255,255,0.025)",
                        border: `1px solid ${selected ? "rgba(250,128,57,0.4)" : "rgba(255,255,255,0.07)"}`,
                        borderRadius: 10,
                        color: "#fff",
                        cursor: "pointer",
                        textAlign: "left",
                        transition: "all 0.18s ease",
                        outline: "none",
                      }}
                      onMouseEnter={(e) => {
                        if (!selected) e.currentTarget.style.borderColor = "rgba(250,128,57,0.28)";
                      }}
                      onMouseLeave={(e) => {
                        if (!selected) e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                      }}
                      onFocus={(e) => { e.currentTarget.style.boxShadow = "0 0 0 3px rgba(250,128,57,0.10)"; }}
                      onBlur={(e) => { e.currentTarget.style.boxShadow = "none"; }}
                      role="radio"
                      aria-checked={selected}
                    >
                      {/* Icon circle */}
                      <div
                        style={{
                          width: 34,
                          height: 34,
                          borderRadius: "50%",
                          background: selected ? "rgba(250,128,57,0.15)" : "rgba(255,255,255,0.05)",
                          border: `1px solid ${selected ? "rgba(250,128,57,0.3)" : "rgba(255,255,255,0.08)"}`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          color: selected ? "#fa8039" : "rgba(255,255,255,0.45)",
                          transition: "all 0.18s ease",
                        }}
                      >
                        {opt.icon}
                      </div>

                      {/* Labels */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            fontSize: 14,
                            fontWeight: selected ? 600 : 400,
                            color: selected ? "#fff" : "rgba(255,255,255,0.8)",
                            fontFamily: "Inter, system-ui, sans-serif",
                            letterSpacing: "-0.01em",
                            lineHeight: 1.3,
                          }}
                        >
                          {opt.label}
                        </div>
                        <div
                          style={{
                            fontSize: 12,
                            color: "rgba(255,255,255,0.38)",
                            fontFamily: "Inter, system-ui, sans-serif",
                            marginTop: 2,
                            lineHeight: 1.3,
                          }}
                        >
                          {opt.sub}
                        </div>
                      </div>

                      {/* Check */}
                      {selected && (
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fa8039" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}>
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Errors */}
            {err && (
              <p role="alert" style={{ fontSize: 12, color: "rgba(255,80,80,0.9)", marginTop: 8, fontFamily: "Inter, system-ui, sans-serif" }}>
                {err}
              </p>
            )}
            {submitError && (
              <p role="alert" style={{ fontSize: 12, color: "rgba(255,80,80,0.9)", marginTop: 10, fontFamily: "Inter, system-ui, sans-serif" }}>
                {submitError}
              </p>
            )}

            {/* Actions */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: step > 0 ? "space-between" : "flex-end",
                marginTop: 24,
                gap: 12,
              }}
            >
              {step > 0 && (
                <button
                  type="button"
                  onClick={handleBack}
                  style={{
                    background: "none",
                    border: "none",
                    color: "rgba(255,255,255,0.4)",
                    fontSize: 13,
                    fontFamily: "Inter, system-ui, sans-serif",
                    cursor: "pointer",
                    padding: 0,
                    transition: "color 0.18s",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 5,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
                  onFocus={(e) => (e.currentTarget.style.color = "#fff")}
                  onBlur={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M19 12H5M12 5l-7 7 7 7" />
                  </svg>
                  Atrás
                </button>
              )}

              <button
                type="button"
                onClick={handleNext}
                disabled={submitting}
                style={{
                  height: 44,
                  padding: "0 22px",
                  borderRadius: 999,
                  background: submitting ? "rgba(255,255,255,0.08)" : "#fa8039",
                  color: submitting ? "rgba(255,255,255,0.3)" : "#000",
                  fontSize: 13,
                  fontWeight: 500,
                  fontFamily: "Inter, system-ui, sans-serif",
                  border: "none",
                  cursor: submitting ? "not-allowed" : "pointer",
                  transition: "background 0.2s, transform 0.15s",
                  letterSpacing: "-0.005em",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                }}
                onMouseEnter={(e) => {
                  if (!submitting) { e.currentTarget.style.background = "#ff9045"; e.currentTarget.style.transform = "translateY(-1px)"; }
                }}
                onMouseLeave={(e) => {
                  if (!submitting) { e.currentTarget.style.background = "#fa8039"; e.currentTarget.style.transform = "translateY(0)"; }
                }}
              >
                {submitting ? "Enviando…" : isLast ? "Enviar" : (
                  <>
                    Continuar
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
