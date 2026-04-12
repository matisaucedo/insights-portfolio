import { useRef, useState, useEffect } from "react";

const FRAME_SRC = "/assets/mockup/mac marco.png";
const ASPECT = 4500 / 3000; // width / height — matches frame image

// Logical viewport the embedded site renders at. Chosen so (width / height)
// equals the screen-area aspect sampled from mac screen.png (≈1.5458).
const NATIVE_WIDTH  = 1440;
const NATIVE_HEIGHT = 932;

// Screen area insets relative to the full frame image (4500×3000).
// Derived by alpha-bbox sampling mac screen.png.
const SCREEN_LEFT   = 0.272;
const SCREEN_TOP    = 0.244;
const SCREEN_RIGHT  = 0.27422;
const SCREEN_BOTTOM = 0.31567;

// MacBook display corners are nearly square — keep radius minimal.
const SCREEN_RADIUS_RATIO = 0.006;

export default function MacMockup({
  src,
  children,
  maxWidth = 720,
  className = "",
}) {
  const wrapperRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setContainerWidth(entry.contentRect.width);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const containerHeight = containerWidth > 0 ? containerWidth / ASPECT : 0;

  const screenLeft   = containerWidth  * SCREEN_LEFT;
  const screenTop    = containerHeight * SCREEN_TOP;
  const screenWidth  = containerWidth  * (1 - SCREEN_LEFT - SCREEN_RIGHT);
  const screenHeight = containerHeight * (1 - SCREEN_TOP  - SCREEN_BOTTOM);
  const screenRadius = screenWidth * SCREEN_RADIUS_RATIO;

  const scale = screenWidth > 0 ? screenWidth / NATIVE_WIDTH : 1;

  return (
    <div
      ref={wrapperRef}
      className={className}
      style={{
        position: "relative",
        width: "100%",
        maxWidth,
        aspectRatio: `4500 / 3000`,
        margin: "0 auto",
      }}
    >
      {/* Screen viewport — clipped to the MacBook screen area */}
      <div
        data-lenis-prevent
        style={{
          position: "absolute",
          left: screenLeft,
          top: screenTop,
          width: screenWidth,
          height: screenHeight,
          borderRadius: screenRadius,
          overflow: "hidden",
          zIndex: 2,
          background: "#000",
        }}
      >
        {src ? (
          <div
            style={{
              width: NATIVE_WIDTH,
              height: NATIVE_HEIGHT,
              transform: `scale(${scale})`,
              transformOrigin: "0 0",
              flexShrink: 0,
            }}
          >
            <iframe
              src={src}
              title="App preview"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
              style={{
                width: NATIVE_WIDTH,
                height: NATIVE_HEIGHT,
                border: "none",
                display: "block",
              }}
            />
          </div>
        ) : (
          children
        )}
      </div>

      {/* Device frame sits on top of the screen content */}
      <img
        src={FRAME_SRC}
        alt=""
        draggable={false}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          userSelect: "none",
          zIndex: 1,
        }}
      />
    </div>
  );
}
