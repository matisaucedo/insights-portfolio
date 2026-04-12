import { useRef, useState, useEffect } from "react";
import IframeLoader from "./IframeLoader";

/**
 * MacMockup — reusable MacBook frame template.
 *
 * Props:
 *   src?:        string — iframe URL rendered inside the screen area
 *   children?:   ReactNode — fallback content (used when no `src`)
 *   maxHeight?:  number — caps the rendered height (maxWidth is derived via aspect)
 *   maxWidth?:   number — caps width directly (overrides maxHeight derivation)
 *   className?:  string
 *
 * Z-index rule: the frame PNG has an opaque screen region, so the iframe
 * container sits at z:2 (above the frame) while the frame <img> stays at
 * z:1 (below). Do not invert this — it breaks transparency and clipping.
 */

const FRAME_SRC = "/assets/mockup/mac marco.png";

// The PNG is 4500×3000 but the visible laptop only occupies a 2406×1607 bbox
// inside it (the rest is transparent padding). We size the mockup container
// to the tight laptop bbox so `maxHeight` is visually comparable to the
// iPhone mockup, then oversize the frame <img> and offset it so the laptop
// lands exactly inside the container.
const FRAME_W = 4500;
const FRAME_H = 3000;
const LAPTOP_X = 1041;
const LAPTOP_Y = 702;
const LAPTOP_W = 2406;
const LAPTOP_H = 1607;

const ASPECT = LAPTOP_W / LAPTOP_H; // ≈ 1.4971

// Logical viewport the embedded site renders at. Kept at the 1.5458 screen
// aspect but smaller than a full desktop width so the uniform scale-up
// magnifies UI elements and the embedded site reads as a Mac, not a
// cramped-desktop-in-a-phone. Still well above Clarity's desktop breakpoint.
const NATIVE_WIDTH  = 1280;
const NATIVE_HEIGHT = 828;

// Screen-area insets relative to the laptop bbox (NOT the full frame),
// derived by alpha-bbox sampling mac screen.png then shifted into bbox coords.
const SCREEN_LEFT   = 0.07606;
const SCREEN_TOP    = 0.01867;
const SCREEN_RIGHT  = 0.07523;
const SCREEN_BOTTOM = 0.15931;

// MacBook display corners are nearly square — keep radius minimal.
const SCREEN_RADIUS_RATIO = 0.006;

// Frame <img> size and offset expressed as fractions of the laptop bbox.
const FRAME_IMG_SCALE_X = FRAME_W / LAPTOP_W;
const FRAME_IMG_SCALE_Y = FRAME_H / LAPTOP_H;
const FRAME_IMG_OFFSET_X = -LAPTOP_X / LAPTOP_W;
const FRAME_IMG_OFFSET_Y = -LAPTOP_Y / LAPTOP_H;

export default function MacMockup({
  src,
  children,
  maxWidth,
  maxHeight,
  className = "",
}) {
  const resolvedMaxWidth = maxWidth ?? (maxHeight ? maxHeight * ASPECT : 720);
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
        maxWidth: resolvedMaxWidth,
        aspectRatio: `${LAPTOP_W} / ${LAPTOP_H}`,
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
        {src && !loaded && <IframeLoader />}
      </div>

      {/* Device frame sits on top of the screen content. Oversized and
          offset so the laptop bbox inside the PNG aligns with this container. */}
      <img
        src={FRAME_SRC}
        alt=""
        draggable={false}
        style={{
          position: "absolute",
          left: `${FRAME_IMG_OFFSET_X * 100}%`,
          top: `${FRAME_IMG_OFFSET_Y * 100}%`,
          width: `${FRAME_IMG_SCALE_X * 100}%`,
          height: `${FRAME_IMG_SCALE_Y * 100}%`,
          maxWidth: "none",
          pointerEvents: "none",
          userSelect: "none",
          zIndex: 1,
        }}
      />
    </div>
  );
}
