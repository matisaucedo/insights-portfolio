import { motion } from "framer-motion";
import Container from "../components/ui/Container.jsx";
import Section from "../components/ui/Section.jsx";
import FadeUp from "../components/ui/FadeUp.jsx";
import { childVariants } from "../components/ui/StaggerGrid.jsx";

// Lucide SVG paths — same icons Minta uses
const BellIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
  </svg>
);

const KeyIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="7.5" cy="15.5" r="5.5"/>
    <path d="m21 2-9.6 9.6"/>
    <path d="m15.5 7.5 3 3L22 7l-3-3"/>
  </svg>
);

const FingerprintIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4"/>
    <path d="M14 13.12c0 2.38 0 6.38-1 8.88"/>
    <path d="M17.29 21.02c.12-.6.43-2.3.5-3.02"/>
    <path d="M2 12a10 10 0 0 1 18-6"/>
    <path d="M2 16h.01"/>
    <path d="M21.8 16c.2-2 .131-5.354 0-6"/>
    <path d="M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2"/>
    <path d="M8.65 22c.21-.66.45-1.32.57-2"/>
    <path d="M9 6.8a6 6 0 0 1 9 5.2v2"/>
  </svg>
);

const FEATURES = [
  {
    icon: <BellIcon />,
    title: "Apps listas para crecer",
    desc: "Cada aplicación está optimizada para escalar desde el día uno, sin fricciones.",
  },
  {
    icon: <KeyIcon />,
    title: "Experiencia fluida",
    desc: "Interfaces intuitivas diseñadas alrededor de tu flujo de trabajo, no al revés.",
  },
  {
    icon: <FingerprintIcon />,
    title: "Seguridad y control",
    desc: "Código fuente completo entregado. Tu aplicación, tu control total.",
  },
];

export default function MobileApp() {
  return (
    <Section id="mobile-app">
      <Container>
        {/* Centered header */}
        <div className="text-center mb-20 md:mb-24">
          <FadeUp delay={0.05}>
            <h2 className="t-h2 mb-6">
              La experiencia completa,
              <br />
              <span style={{ color: "#c2c2c2" }}>en tu bolsillo.</span>
            </h2>
          </FadeUp>

          <FadeUp delay={0.12}>
            <p className="t-body mx-auto" style={{ maxWidth: 500 }}>
              Construimos aplicaciones a medida, listas para escalar desde el día uno. Rápidas, intuitivas y diseñadas alrededor de tu negocio.
            </p>
          </FadeUp>
        </div>

        {/* Split layout — Minta exact: flexbox, phone cropped bottom with CSS mask */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 48,
            alignItems: "center",
          }}
        >
          {/* LEFT: Phone mockup — height 440px clips bottom, CSS mask fades bottom */}
          <motion.div
            initial={{ opacity: 0, y: 48 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease: "easeOut" }}
            style={{
              flex: "1.5 0 0px",
              height: 440,
              overflow: "clip",
              position: "relative",
              WebkitMask: "linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 66%)",
              mask: "linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 66%)",
            }}
          >
            <img
              src="/ref/phm5fx1mcnnvyhsv1wbiigpka.png"
              alt="App mobile"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center top",
                display: "block",
              }}
            />
          </motion.div>

          {/* RIGHT: Feature list */}
          <motion.div
            style={{ flex: "1 0 0px", display: "flex", flexDirection: "column", gap: 40 }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.12,
                  delayChildren: 0.1,
                },
              },
            }}
          >
            {FEATURES.map((f) => (
              <motion.div
                key={f.title}
                variants={childVariants}
                style={{ display: "flex", flexDirection: "column", gap: 8 }}
              >
                {/* Icon + Title row */}
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ color: "#fff", flexShrink: 0, lineHeight: 0 }}>
                    {f.icon}
                  </span>
                  <p
                    style={{
                      fontSize: 16,
                      fontWeight: 500,
                      color: "#fff",
                      lineHeight: "1.3em",
                      letterSpacing: "-0.02em",
                      margin: 0,
                    }}
                  >
                    {f.title}
                  </p>
                </div>
                {/* Description — indented under icon */}
                <p
                  style={{
                    fontSize: 14,
                    fontWeight: 400,
                    color: "#c2c2c2",
                    lineHeight: "1.55em",
                    margin: 0,
                    paddingLeft: 28,
                  }}
                >
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
