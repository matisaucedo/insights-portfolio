import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Gallery({ images = [] }) {
  const [activeIdx, setActiveIdx] = useState(0);

  if (!images.length) return null;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "4px",
        width: "100%",
        height: "400px",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {images.map((image, i) => {
        const isActive = activeIdx === i;
        return (
          <div
            key={i}
            onMouseEnter={() => setActiveIdx(i)}
            style={{
              position: "relative",
              width: isActive ? "50%" : "8%",
              height: "100%",
              flexShrink: 0,
              borderRadius: "12px",
              overflow: "hidden",
              cursor: isActive ? "default" : "pointer",
              transition: "width 0.5s ease-in-out",
            }}
          >
            {/* Image */}
            <img
              src={image.src}
              alt={image.title || image.caption}
              loading="lazy"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "12px",
                display: "block",
              }}
              onError={(e) => {
                e.target.style.background = "#1a1a1a";
              }}
            />

            {/* Overlay — only on active card */}
            <AnimatePresence>
              {isActive && (
                <motion.div
                  key="overlay"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    padding: "16px",
                    borderRadius: "12px",
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.52) 0%, rgba(0,0,0,0.18) 40%, transparent 80%)",
                    overflow: "hidden",
                    pointerEvents: "none",
                  }}
                >
                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.28, ease: "easeOut", delay: 0.12 }}
                    style={{
                      margin: "0 0 6px",
                      color: "#fff",
                      fontFamily: "Inter, system-ui, sans-serif",
                      fontSize: "24px",
                      fontWeight: 600,
                      letterSpacing: "-0.01em",
                      lineHeight: "1.2em",
                    }}
                  >
                    {image.title}
                  </motion.h3>

                  {image.caption && (
                    <motion.p
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.28, ease: "easeOut", delay: 0.18 }}
                      style={{
                        margin: 0,
                        color: "rgba(255,255,255,0.85)",
                        fontFamily: "Inter, system-ui, sans-serif",
                        fontSize: "15px",
                        fontWeight: 500,
                        letterSpacing: "-0.01em",
                        lineHeight: "1.3em",
                      }}
                    >
                      {image.caption}
                    </motion.p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
