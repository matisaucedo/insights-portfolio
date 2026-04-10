export default function Section({ children, className = "", id, backgroundElement }) {
  return (
    <section id={id} className={`section-py relative overflow-hidden ${className}`}>
      {backgroundElement && (
        <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}>
          {backgroundElement}
        </div>
      )}
      <div style={{ position: "relative", zIndex: 1 }}>
        {children}
      </div>
    </section>
  );
}
