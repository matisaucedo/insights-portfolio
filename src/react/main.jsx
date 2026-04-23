import React, { useEffect, useLayoutEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import Lenis from "lenis";
import "./index.css";
import { Nav, HomeScreen, ProyectosScreen, NosotrosScreen, screenVariants } from "./HomePage.jsx";
import ProjectPage from "./pages/ProjectPage.jsx";
import ContactoPage from "./pages/ContactoPage.jsx";
import GraciasPage from "./pages/GraciasPage.jsx";
import GrainOverlay from "./components/ui/GrainOverlay.jsx";

function App() {
  const location = useLocation();
  // Snapshot of location used for rendering — only updates after exit animation completes.
  // This prevents AnimatePresence from showing the new route inside the old (exiting) motion.div,
  // which was the root cause of the black-screen bug on project-page navigation.
  const [displayLocation, setDisplayLocation] = useState(location);

  // Lenis — created once for the App lifetime. No destroy/recreate on navigation.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      lerp: 0.1,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.5,
    });
    window.lenis = lenis;
    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      document.documentElement.classList.remove("lenis", "lenis-smooth", "lenis-stopped", "lenis-scrolling");
      window.lenis = null;
    };
  }, []); // no dependency → single instance

  // Reset scroll to 0 synchronously on EVERY navigation, before the browser paints.
  // useLayoutEffect fires after DOM mutations but before paint — this is the earliest
  // safe moment to reset scroll when location.pathname changes (immediate navigation).
  // This prevents the new page from being painted at the old scroll position (which
  // shows a black area when the old Y is beyond the new page's content height).
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    if (window.lenis) window.lenis.scrollTo(0, { immediate: true });
  }, [location.pathname]);

  return (
    <MotionConfig reducedMotion="user">
    <div style={{ background: "#000", minHeight: "100vh", fontFamily: "Inter, system-ui, sans-serif" }}>
      <GrainOverlay />
      <Nav />
      <AnimatePresence mode="wait" onExitComplete={() => {
          // Reset scroll synchronously BEFORE React mounts the new route,
          // preventing the 1-frame flash of the destination page at wrong scroll position.
          window.scrollTo(0, 0);
          if (window.lenis) window.lenis.scrollTo(0, { immediate: true });
          setDisplayLocation(location);
        }}>
        <motion.div
          key={location.key}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } }}
          exit={{ opacity: 0, y: -12, transition: { duration: 0.22, ease: "easeIn" } }}
          style={{ minHeight: "100vh" }}
        >
          <Routes location={displayLocation}>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/proyectos" element={<ProyectosScreen />} />
            <Route path="/proyectos/:id" element={<ProjectPage />} />
            <Route path="/nosotros" element={<NosotrosScreen />} />
            <Route path="/contacto/:projectId?" element={<ContactoPage />} />
            <Route path="/gracias" element={<GraciasPage />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </div>
    </MotionConfig>
  );
}

if (typeof window !== "undefined") {
  window.history.scrollRestoration = "manual";
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
