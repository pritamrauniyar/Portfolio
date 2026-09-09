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
import analytics from "./utils/analytics";

// Route code-splitting for optimal bundle performance
const Home = lazy(() => import("./pages/Home/Home"));
const About = lazy(() => import("./pages/About/About"));
const Project = lazy(() => import("./pages/Project/Project"));
const Contact = lazy(() => import("./pages/Contact/Contact"));
const Certificates = lazy(() => import("./pages/Certificates/Certificates"));
const Blogs = lazy(() => import("./pages/Blogs/Blogs"));

function App() {
  const [isCmdOpen, setIsCmdOpen] = useState(false);
  const [isHudOpen, setIsHudOpen] = useState(false);
  const [archModal, setArchModal] = useState({ isOpen: false, systemId: "splithive" });

  // Initialize Analytics Engine & Global Error Observers
  useEffect(() => {
    analytics.init();

    const handleError = (event) => {
      analytics.trackError(event.error || event.message, "window.onerror");
    };
    const handleRejection = (event) => {
      analytics.trackError(event.reason, "unhandled_promise_rejection");
    };

    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handleRejection);

    return () => {
      window.removeEventListener("error", handleError);
      window.removeEventListener("unhandledrejection", handleRejection);
    };
  }, []);

  // Global Keyboard Shortcuts (Cmd+K for Command Palette, Cmd+I for HUD)
  useEffect(() => {
    const handleKeyDown = (e) => {
      const isMeta = e.metaKey || e.ctrlKey;
      if (isMeta && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsCmdOpen((prev) => {
          const next = !prev;
          analytics.trackAction(next ? "open_command_palette" : "close_command_palette", "Navigation", "Shortcut: Cmd+K");
          return next;
        });
      } else if (isMeta && e.key.toLowerCase() === "i") {
        e.preventDefault();
        setIsHudOpen((prev) => {
          const next = !prev;
          analytics.trackAction(next ? "open_hud" : "close_hud", "DevTools", "Shortcut: Cmd+I");
          return next;
        });
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Global event listener for opening architecture deep-dive
  useEffect(() => {
    const handleOpenArch = (e) => {
      const systemId = e.detail || "splithive";
      analytics.trackAction("open_architecture_modal", "Architecture", systemId);
      setArchModal({
        isOpen: true,
        systemId,
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
    analytics.trackPageView(location.pathname);
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
