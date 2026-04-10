import { motion, useTransform } from "framer-motion";

const LAYERS = [
  {
    gradient: "radial-gradient(ellipse 80% 50% at 50% 20%, rgba(232,93,47,0.08) 0%, transparent 70%)",
    scrollRange: [0, 0.15],
    opacityRange: [0.8, 0],
    yRange: [0, -60],
    zIndex: 1,
  },
  {
    gradient: "radial-gradient(ellipse 70% 40% at 40% 50%, rgba(80,60,180,0.06) 0%, transparent 70%)",
    scrollRange: [0.18, 0.35, 0.52],
    opacityRange: [0, 0.45, 0],
    yRange: [30, -30],
    zIndex: 1,
  },
  {
    gradient: "radial-gradient(ellipse 60% 45% at 60% 50%, rgba(232,93,47,0.05) 0%, transparent 65%)",
    scrollRange: [0.48, 0.65, 0.82],
    opacityRange: [0, 0.35, 0],
    yRange: [20, -20],
    zIndex: 1,
  },
];

function BackgroundLayer({ layer, scrollYProgress }) {
  const opacity = useTransform(scrollYProgress, layer.scrollRange, layer.opacityRange);
  const yInput = layer.scrollRange.length === 3
    ? [layer.scrollRange[0], layer.scrollRange[2]]
    : layer.scrollRange;
  const y = useTransform(scrollYProgress, yInput, layer.yRange);

  return (
    <motion.div
      style={{
        position: "fixed",
        inset: 0,
        background: layer.gradient,
        opacity,
        y,
        zIndex: layer.zIndex,
        pointerEvents: "none",
        willChange: "transform, opacity",
      }}
    />
  );
}

export default function ScrollBackground({ scrollYProgress }) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
      {LAYERS.map((layer, i) => (
        <BackgroundLayer key={i} layer={layer} scrollYProgress={scrollYProgress} />
      ))}
    </div>
  );
}
