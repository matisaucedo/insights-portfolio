import React from "react";
import { motion } from "framer-motion";

/*
 * SectionLabel — exact Minta style:
 * → GETTING STARTED  (small arrow SVG + spaced caps text)
 * Minta uses a small right-pointing arrow icon before the text.
 * Color: rgba(255,255,255,0.40), 11px, tracking 0.14em, uppercase.
 */
export default function SectionLabel({ children, center = false }) {
  return (
    <motion.div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        marginBottom: 20,
        justifyContent: center ? "center" : "flex-start",
        width: center ? "100%" : undefined,
      }}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Arrow — exact Minta decorative prefix */}
      <svg
        width="10"
        height="10"
        viewBox="0 0 10 10"
        fill="none"
        style={{ color: "rgba(255,255,255,0.28)", flexShrink: 0 }}
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
        {children}
      </span>
    </motion.div>
  );
}
