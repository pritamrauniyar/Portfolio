import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState, Suspense, lazy } from "react";
import { AnimatePresence } from "framer-motion";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import { MyContextProvider } from "./components/MyContext/MyContext";
import { ThemeProvider } from "./context/ThemeContext";
import AnimatedBackground from "./components/AnimatedBackground/AnimatedBackground";
import PageTransition from "./components/PageTransition/PageTransition";
import SmoothScroll, { useLenis } from "./components/SmoothScroll/SmoothScroll";
import CustomCursor from "./components/CustomCursor/CustomCursor";
import CommandPalette from "./components/CommandPalette/CommandPalette";
import ArchitectureModal from "./components/ArchitectureModal/ArchitectureModal";
import DevToolsHUD from "./components/DevToolsHUD/DevToolsHUD";
import RouteLoader from "./components/RouteLoader/RouteLoader";
import ReactGA from "react-ga4";

// Route code-splitting for optimal bundle performance
const Home = lazy(() => import("./pages/Home/Home"));
const About = lazy(() => import("./pages/About/About"));
const Project = lazy(() => import("./pages/Project/Project"));
const Contact = lazy(() => import("./pages/Contact/Contact"));
const Certificates = lazy(() => import("./pages/Certificates/Certificates"));
const Blogs = lazy(() => import("./pages/Blogs/Blogs"));

ReactGA.initialize("G-1SJ51YJ4NT");

function App() {
  const [isCmdOpen, setIsCmdOpen] = useState(false);
  const [isHudOpen, setIsHudOpen] = useState(false);
  const [archModal, setArchModal] = useState({ isOpen: false, systemId: "splithive" });

  // Global Keyboard Shortcuts (Cmd+K for Command Palette, Cmd+I for HUD)
  useEffect(() => {
    const handleKeyDown = (e) => {
      const isMeta = e.metaKey || e.ctrlKey;
      if (isMeta && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsCmdOpen((prev) => !prev);
      } else if (isMeta && e.key.toLowerCase() === "i") {
        e.preventDefault();
        setIsHudOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Global event listener for opening architecture deep-dive
  useEffect(() => {
    const handleOpenArch = (e) => {
      setArchModal({
        isOpen: true,
        systemId: e.detail || "splithive",
      });
    };
    window.addEventListener("open-arch-modal", handleOpenArch);
    return () => window.removeEventListener("open-arch-modal", handleOpenArch);
  }, []);

  return (
    <ThemeProvider>
      <MyContextProvider>
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <SmoothScroll>
            <div className="App">
              <div className="noise-overlay" aria-hidden="true" />
              <CustomCursor />
              <AnimatedBackground />
              <Navbar
                onOpenCmd={() => setIsCmdOpen(true)}
                onOpenHud={() => setIsHudOpen((prev) => !prev)}
              />
              <CommandPalette
                isOpen={isCmdOpen}
                onClose={() => setIsCmdOpen(false)}
                onOpenHud={() => setIsHudOpen(true)}
              />
              <ArchitectureModal
                isOpen={archModal.isOpen}
                initialSystemId={archModal.systemId}
                onClose={() => setArchModal((prev) => ({ ...prev, isOpen: false }))}
              />
              <DevToolsHUD
                isOpen={isHudOpen}
                onClose={() => setIsHudOpen(false)}
              />
              <main>
                <Suspense fallback={<RouteLoader />}>
                  <AnimatedRoutes />
                </Suspense>
              </main>
              <Footer />
            </div>
          </SmoothScroll>
        </Router>
      </MyContextProvider>
    </ThemeProvider>
  );
}

export default App;

function AnimatedRoutes() {
  const location = useLocation();
  const lenisRef = useLenis();

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: location.pathname });
    if (lenisRef?.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location, lenisRef]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/project" element={<PageTransition><Project /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        <Route path="/certificates" element={<PageTransition><Certificates /></PageTransition>} />
        <Route path="/blogs" element={<PageTransition><Blogs /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}
