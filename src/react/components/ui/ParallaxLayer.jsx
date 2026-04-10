import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ParallaxLayer({ children, speed = 0.5, className = "" }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [speed * 80, speed * -80]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ y, willChange: "transform" }}
    >
      {children}
    </motion.div>
  );
}
