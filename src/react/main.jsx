import React, { useEffect } from "react";
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
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const id = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
      window.lenis = null;
    };
  }, [location.pathname]);

  useEffect(() => {
    if (window.lenis) window.lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
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

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
