import React, { useEffect, useLayoutEffect } from "react";
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

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (location.pathname.startsWith("/contacto")) return;
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
      window.lenis = null;
    };
  }, [location.pathname]);

  // Sync (before paint) — fixes whileInView firing at wrong scroll position
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Async — syncs Lenis internal state after it's created
  useEffect(() => {
    if (window.lenis) window.lenis.scrollTo(0, { immediate: true });
  }, [location.pathname]);

  return (
    <MotionConfig reducedMotion="user">
    <div style={{ background: "#000", minHeight: "100vh", fontFamily: "Inter, system-ui, sans-serif" }}>
      <GrainOverlay />
      <Nav />
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          variants={screenVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          style={{ minHeight: "100vh" }}
        >
          <Routes location={location}>
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
