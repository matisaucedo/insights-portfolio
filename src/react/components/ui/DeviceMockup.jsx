import { useRef, useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import IframeLoader from "./IframeLoader";

/**
 * DeviceMockup — reusable iPhone 16 frame template.
 *
 * Props:
 *   src?:        string — iframe URL rendered inside the phone screen
 *   children?:   ReactNode — fallback content when no `src`
 *   maxHeight?:  number (default 680) — caps rendered height; width derives from aspect
 *   className?:  string
 *
 * Z-index rule: the frame PNG has an opaque screen region, so the iframe
 * container sits at z:2 (above) while the frame <img> stays at z:1 (below).
 * Do not invert this — it breaks transparency and clipping.
 */

const FRAME_SRC = "/assets/mockup/marcos.png";
const ASPECT = 1288 / 2614; // width / height — matches frame image

// iPhone 16 logical viewport — the app is built for this device
const NATIVE_WIDTH  = 390;
const NATIVE_HEIGHT = 844;

// Screen area insets relative to the full frame image (1288×2614px).
// Derived from pixel analysis of the frame image bezels.
const SCREEN_LEFT   = 0.0559;
const SCREEN_TOP    = 0.0298;
const SCREEN_RIGHT  = 0.0668;
const SCREEN_BOTTOM = 0.022;

// iPhone 16 screen corner radius as fraction of screen width (~44pt / 390pt)
const SCREEN_RADIUS_RATIO = 0.113;

export default function DeviceMockup({
  src,
  children,
  maxHeight = 680,
  className = "",
}) {
  const wrapperRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
  }, [src]);

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

  // Screen area pixel dimensions at current render size
  const screenLeft   = containerWidth  * SCREEN_LEFT;
  const screenTop    = containerHeight * SCREEN_TOP;
  const screenWidth  = containerWidth  * (1 - SCREEN_LEFT - SCREEN_RIGHT);
  const screenHeight = containerHeight * (1 - SCREEN_TOP  - SCREEN_BOTTOM);
  const screenRadius = screenWidth * SCREEN_RADIUS_RATIO;

  // Scale the 390px app to fit exactly within the visible screen width
  const scale = screenWidth > 0 ? screenWidth / NATIVE_WIDTH : 1;

  return (
    <div
      ref={wrapperRef}
      className={className}
      style={{
        position: "relative",
        width: "100%",
        maxWidth: maxHeight * ASPECT,
        aspectRatio: `1288 / 2614`,
        maxHeight,
        margin: "0 auto",
      }}
    >
      {/* Screen viewport — clipped to the phone screen area */}
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
          /* Render at iPhone 16 native size (390×844), then scale to fit screen area */
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
              onLoad={() => setLoaded(true)}
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
        <AnimatePresence>
          {src && !loaded && <IframeLoader key="loader" />}
        </AnimatePresence>
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
