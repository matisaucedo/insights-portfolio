import { motion } from "framer-motion";

/**
 * FadeUp — canonical scroll-triggered fade+up.
 * All sections use this with optional delay for stagger control.
 */
export const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.44, 0, 0.56, 1], delay },
  }),
};

export default function FadeUp({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
}) {
  return (
    <motion.div
      className={className}
      variants={fadeUpVariants}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      style={{ willChange: "transform, opacity" }}
      viewport={{ once: true, margin: "-80px" }}
    >
      {/* Render as semantic tag if needed via wrapper — keep motion.div as outer */}
      {children}
    </motion.div>
  );
}
