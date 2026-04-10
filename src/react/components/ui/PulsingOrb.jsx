export default function PulsingOrb({ size = 242, color = "rgba(232,93,47,0.12)", className = "", style = {} }) {
  return (
    <div
      className={className}
      style={{ position: "absolute", width: size, height: size, pointerEvents: "none", ...style }}
    >
      {[0, -0.5, -1].map((delay, i) => (
        <span
          key={i}
          className="pulsing-orb-ring"
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: size,
            height: size,
            borderRadius: "50%",
            border: `1.5px solid ${color}`,
            background: `radial-gradient(circle, ${color} 0%, transparent 80%)`,
            pointerEvents: "none",
            willChange: "transform, opacity",
            animation: `pulsing-orb 4s linear ${delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
