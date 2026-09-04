import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState, Suspense, lazy } from "react";
import { AnimatePresence } from "framer-motion";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import { MyContextProvider } from "./components/MyContext/MyContext";
import AnimatedBackground from "./components/AnimatedBackground/AnimatedBackground";
import PageTransition from "./components/PageTransition/PageTransition";
import SmoothScroll, { useLenis } from "./components/SmoothScroll/SmoothScroll";
import CustomCursor from "./components/CustomCursor/CustomCursor";
import CommandPalette from "./components/CommandPalette/CommandPalette";
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

  // Global Command Palette shortcut (Cmd+K or Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsCmdOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <MyContextProvider>
      <Router>
        <SmoothScroll>
          <div className="App">
            <div className="noise-overlay" aria-hidden="true" />
            <CustomCursor />
            <AnimatedBackground />
            <Navbar onOpenCmd={() => setIsCmdOpen(true)} />
            <CommandPalette isOpen={isCmdOpen} onClose={() => setIsCmdOpen(false)} />
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

