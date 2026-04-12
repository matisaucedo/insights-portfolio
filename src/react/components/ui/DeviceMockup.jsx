import { useRef, useState, useEffect } from "react";

const FRAME_SRC = "/assets/mockup/marcos.png";
const MASK_SRC = "/assets/mockup/placehold.png";
const ASPECT = 1288 / 2614; // width / height — matches frame image

// iPhone 16 logical viewport — the app is built for this device
const NATIVE_WIDTH = 390;
const NATIVE_HEIGHT = 844;

// Screen area within the mask image, derived from pixel analysis of placehold.png (1288×2614).
// These are the bezels — the opaque (visible) area starts at these offsets.
const SCREEN_LEFT   = 0.0559;
const SCREEN_TOP    = 0.0298;
const SCREEN_RIGHT  = 0.0668;


export default function DeviceMockup({
  src,
  children,
  maxHeight = 680,
  className = "",
}) {
  const wrapperRef = useRef(null);
  const [loaded, setLoaded] = useState(true);
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

  // Screen pixel dimensions at current render size
  const containerHeight = containerWidth > 0 ? containerWidth / ASPECT : 0;
  const screenLeft   = containerWidth * SCREEN_LEFT;
  const screenTop    = containerHeight * SCREEN_TOP;
  const screenWidth  = containerWidth * (1 - SCREEN_LEFT - SCREEN_RIGHT);
  // Scale the 390px app to fit exactly within the visible screen area
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
      {/* Mask layer — clips content to phone screen shape */}
      <div
        data-lenis-prevent
        style={{
          position: "absolute",
          inset: 0,
          maskImage: `url(${MASK_SRC})`,
          WebkitMaskImage: `url(${MASK_SRC})`,
          maskSize: "100% 100%",
          WebkitMaskSize: "100% 100%",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          zIndex: 1,
          overscrollBehavior: "contain",
        }}
      >
        {src ? (
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: loaded ? 1 : 0,
              transition: "opacity 0.4s ease",
            }}
          >
            {/* Render at iPhone 16 native size (390×844), then translate+scale to sit
                exactly inside the mask's visible screen area. */}
            <div
              style={{
                width: NATIVE_WIDTH,
                height: NATIVE_HEIGHT,
                transform: `translate(${screenLeft}px, ${screenTop}px) scale(${scale})`,
                transformOrigin: "0 0",
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
                onLoad={() => setLoaded(true)}
              />
            </div>
          </div>
        ) : (
          children
        )}
      </div>

      {/* Device frame sits on top of the content */}
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
          zIndex: 2,
        }}
      />
    </div>
  );
}
