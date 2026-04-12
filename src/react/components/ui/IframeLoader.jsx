import { motion } from "framer-motion";

/**
 * IframeLoader — pill-shaped loading indicator shown over a mockup screen
 * while its <iframe> is loading. Absolutely positioned, centers itself
 * within its parent (the mockup's screen div).
 */
export default function IframeLoader({ label = "Loading..." }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
        zIndex: 3,
      }}
    >
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          padding: "10px 16px 10px 12px",
          borderRadius: 9999,
          background: "rgba(20,20,20,0.72)",
          border: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
          color: "#fff",
          fontFamily: "Inter, system-ui, sans-serif",
          fontSize: 13,
          fontWeight: 500,
          letterSpacing: "-0.01em",
          lineHeight: 1,
        }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          style={{
            animation: "iframe-loader-spin 0.9s linear infinite",
            transformOrigin: "center",
            display: "block",
          }}
        >
          <circle
            cx="8"
            cy="8"
            r="6.5"
            fill="none"
            stroke="rgba(255,255,255,0.9)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="28 40"
          />
        </svg>
        <span>{label}</span>
      </div>
    </motion.div>
  );
}
