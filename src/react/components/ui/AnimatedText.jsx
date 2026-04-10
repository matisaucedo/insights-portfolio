import React from "react";
import { motion } from "framer-motion";

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

/**
 * Animates a heading or block of text on scroll entry.
 */
export default function AnimatedText({
  as: Tag = "p",
  children,
  className = "",
  delay = 0,
  duration = 0.6,
}) {
  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration, ease: "easeOut", delay }}
    >
      <Tag className={className}>{children}</Tag>
    </motion.div>
  );
}
