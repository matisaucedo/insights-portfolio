import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import GrainOverlay from "../components/ui/GrainOverlay.jsx";
import { PROJECTS } from "../data/projects.js";

// TODO: reemplazar con form ID real de Formspree creado por el user
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xblzjjow";

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
    subtitle: "Nos ayuda a dimensionar el alcance del proyecto.",
    type: "radio",
    options: ["$6k — $8k USD", "$8k — $10k USD", "$10k+ USD"],
    validate: (v) => v ? null : "Seleccioná una opción",
  },
];

const fadeSlide = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2, ease: [0.4, 0, 1, 1] } },
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
    if (errors[currentStep.key]) {
      setErrors((e) => ({ ...e, [currentStep.key]: null }));
    }
  }

  function handleNext() {
    const err = currentStep.validate(currentValue);
    if (err) {
      setErrors((e) => ({ ...e, [currentStep.key]: err }));
      return;
    }
    if (step < STEPS.length - 1) {
      setStep((s) => s + 1);
    } else {
      handleSubmit();
    }
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
        background: "#000",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 20px 40px",
        position: "relative",
      }}
    >
      <GrainOverlay />

      {/* Back to home */}
      <div style={{ position: "absolute", top: 24, left: 24 }}>
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
          maxWidth: 560,
          background: "rgba(16,16,18,0.6)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 24,
          padding: "clamp(32px, 6vw, 56px)",
          position: "relative",
        }}
      >
        {/* Project context badge */}
        {project && (
          <div
            style={{
              fontSize: 12,
              color: "rgba(250,128,57,0.8)",
              fontFamily: "Inter, system-ui, sans-serif",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              fontWeight: 500,
              marginBottom: 20,
              background: "rgba(250,128,57,0.08)",
              border: "1px solid rgba(250,128,57,0.18)",
              borderRadius: 8,
              padding: "6px 12px",
              display: "inline-block",
            }}
          >
            Contactando sobre: {project.name}
          </div>
        )}

        {/* Progress dots */}
        <div
          style={{ display: "flex", gap: 8, marginBottom: 36 }}
          role="progressbar"
          aria-valuenow={step + 1}
          aria-valuemin={1}
          aria-valuemax={STEPS.length}
        >
          {STEPS.map((_, i) => (
            <div
              key={i}
              style={{
                width: i === step ? 24 : 8,
                height: 8,
                borderRadius: 999,
                background: i === step ? "#fa8039" : i < step ? "rgba(250,128,57,0.4)" : "rgba(255,255,255,0.15)",
                transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
              }}
            />
          ))}
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
            <h1
              style={{
                fontFamily: "var(--font-display, 'Cormorant Garamond', Georgia, serif)",
                fontSize: "clamp(26px, 3.5vw, 36px)",
                fontWeight: 400,
                letterSpacing: "-0.03em",
                color: "#fff",
                lineHeight: 1.15,
                margin: "0 0 8px",
              }}
            >
              {currentStep.title}
            </h1>

            {currentStep.subtitle && (
              <p
                style={{
                  fontSize: 14,
                  color: "rgba(255,255,255,0.5)",
                  lineHeight: 1.5,
                  margin: "0 0 28px",
                  fontFamily: "Inter, system-ui, sans-serif",
                }}
              >
                {currentStep.subtitle}
              </p>
            )}
            {!currentStep.subtitle && <div style={{ marginBottom: 28 }} />}

            {/* Input / Textarea */}
            {currentStep.type === "text" || currentStep.type === "email" ? (
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
                    height: 52,
                    padding: "0 18px",
                    background: "rgba(255,255,255,0.04)",
                    border: `1px solid ${err ? "rgba(255,80,80,0.5)" : "rgba(255,255,255,0.08)"}`,
                    borderRadius: 12,
                    color: "#fff",
                    fontSize: 15,
                    fontFamily: "Inter, system-ui, sans-serif",
                    outline: "none",
                    boxSizing: "border-box",
                    transition: "border-color 0.2s, box-shadow 0.2s",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "rgba(250,128,57,0.55)";
                    e.target.style.boxShadow = "0 0 0 3px rgba(250,128,57,0.12)";
                  }}
                  onBlur={(e) => {
                    if (!err) {
                      e.target.style.borderColor = "rgba(255,255,255,0.08)";
                      e.target.style.boxShadow = "none";
                    }
                  }}
                />
                <style>{`
                  input::placeholder { color: rgba(255,255,255,0.32); }
                  textarea::placeholder { color: rgba(255,255,255,0.32); }
                `}</style>
              </div>
            ) : currentStep.type === "textarea" ? (
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
                    minHeight: 140,
                    padding: "14px 18px",
                    background: "rgba(255,255,255,0.04)",
                    border: `1px solid ${err ? "rgba(255,80,80,0.5)" : "rgba(255,255,255,0.08)"}`,
                    borderRadius: 12,
                    color: "#fff",
                    fontSize: 15,
                    fontFamily: "Inter, system-ui, sans-serif",
                    outline: "none",
                    resize: "vertical",
                    boxSizing: "border-box",
                    lineHeight: 1.6,
                    transition: "border-color 0.2s, box-shadow 0.2s",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "rgba(250,128,57,0.55)";
                    e.target.style.boxShadow = "0 0 0 3px rgba(250,128,57,0.12)";
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
                    right: 14,
                    fontSize: 11,
                    color: currentValue.length > 900 ? "rgba(250,128,57,0.7)" : "rgba(255,255,255,0.25)",
                    fontFamily: "Inter, system-ui, sans-serif",
                    pointerEvents: "none",
                  }}
                >
                  {currentValue.length}/1000
                </span>
              </div>
            ) : (
              /* Radio options */
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {currentStep.options.map((opt) => {
                  const selected = currentValue === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => handleChange(opt)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        height: 64,
                        padding: "0 20px",
                        background: selected ? "rgba(250,128,57,0.08)" : "rgba(255,255,255,0.02)",
                        border: `1px solid ${selected ? "rgba(250,128,57,0.55)" : "rgba(255,255,255,0.08)"}`,
                        borderRadius: 14,
                        color: selected ? "#fff" : "rgba(255,255,255,0.75)",
                        fontSize: 15,
                        fontFamily: "Inter, system-ui, sans-serif",
                        fontWeight: selected ? 500 : 400,
                        cursor: "pointer",
                        textAlign: "left",
                        transition: "all 0.18s ease",
                        outline: "none",
                      }}
                      onMouseEnter={(e) => {
                        if (!selected) e.currentTarget.style.borderColor = "rgba(250,128,57,0.35)";
                      }}
                      onMouseLeave={(e) => {
                        if (!selected) e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.boxShadow = "0 0 0 3px rgba(250,128,57,0.12)";
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.boxShadow = "none";
                      }}
                      role="radio"
                      aria-checked={selected}
                    >
                      {opt}
                      {selected && (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fa8039" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Validation error */}
            {err && (
              <p
                role="alert"
                style={{
                  fontSize: 13,
                  color: "rgba(255,80,80,0.9)",
                  marginTop: 8,
                  fontFamily: "Inter, system-ui, sans-serif",
                }}
              >
                {err}
              </p>
            )}

            {/* Submit error */}
            {submitError && (
              <p
                role="alert"
                style={{
                  fontSize: 13,
                  color: "rgba(255,80,80,0.9)",
                  marginTop: 12,
                  fontFamily: "Inter, system-ui, sans-serif",
                }}
              >
                {submitError}
              </p>
            )}

            {/* Actions */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: step > 0 ? "space-between" : "flex-end",
                marginTop: 32,
                gap: 16,
              }}
            >
              {step > 0 && (
                <button
                  type="button"
                  onClick={handleBack}
                  style={{
                    background: "none",
                    border: "none",
                    color: "rgba(255,255,255,0.5)",
                    fontSize: 14,
                    fontFamily: "Inter, system-ui, sans-serif",
                    cursor: "pointer",
                    padding: 0,
                    transition: "color 0.18s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
                  onFocus={(e) => (e.currentTarget.style.color = "#fff")}
                  onBlur={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
                >
                  ← Atrás
                </button>
              )}

              <button
                type="button"
                onClick={handleNext}
                disabled={submitting}
                style={{
                  height: 52,
                  padding: "0 28px",
                  borderRadius: 999,
                  background: submitting ? "rgba(255,255,255,0.08)" : "#fa8039",
                  color: submitting ? "rgba(255,255,255,0.3)" : "#000",
                  fontSize: 14,
                  fontWeight: 500,
                  fontFamily: "Inter, system-ui, sans-serif",
                  border: "none",
                  cursor: submitting ? "not-allowed" : "pointer",
                  transition: "background 0.2s",
                  letterSpacing: "-0.005em",
                }}
                onMouseEnter={(e) => {
                  if (!submitting) e.currentTarget.style.background = "#ff9045";
                }}
                onMouseLeave={(e) => {
                  if (!submitting) e.currentTarget.style.background = "#fa8039";
                }}
              >
                {submitting ? "Enviando…" : isLast ? "Enviar" : "Continuar →"}
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
