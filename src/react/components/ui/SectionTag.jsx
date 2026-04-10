import { motion } from "framer-motion";

/**
 * SectionTag — matches Minta's label style exactly:
 * small pill SVG icon + uppercase spaced text in #c2c2c2.
 */
export default function SectionTag({ children, delay = 0 }) {
  return (
    <motion.div
      className="flex items-center gap-2 mb-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
    >
      {/* Pill icon — matches Minta's logo pill mark */}
      <svg width="22" height="11" viewBox="0 0 22 11" fill="none">
        <rect
          x="0.5" y="0.5" width="21" height="10" rx="5"
          fill="rgba(255,255,255,0.06)"
          stroke="rgba(255,255,255,0.14)"
        />
      </svg>
      <span
        style={{
          fontSize: 12,
          fontWeight: 400,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "#c2c2c2",
          lineHeight: "1.3em",
        }}
      >
        {children}
      </span>
    </motion.div>
  );
}
