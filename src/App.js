import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import "./App.css";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Footer from "./components/Footer/Footer";
import Project from "./pages/Project/Project";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Certificates from "./pages/Certificates/Certificates";
import Blogs from "./pages/Blogs/Blogs";
import { MyContextProvider } from "./components/MyContext/MyContext";
import AnimatedBackground from "./components/AnimatedBackground/AnimatedBackground";
import PageTransition from "./components/PageTransition/PageTransition";
import SmoothScroll, { useLenis } from "./components/SmoothScroll/SmoothScroll";
import CustomCursor from "./components/CustomCursor/CustomCursor";
import ReactGA from "react-ga4";

ReactGA.initialize("G-1SJ51YJ4NT");

function App() {
  return (
    <MyContextProvider>
      <Router>
        <SmoothScroll>
          <div className="App">
            <div className="noise-overlay" aria-hidden="true" />
            <CustomCursor />
            <AnimatedBackground />
            <Navbar />
            <main>
              <AnimatedRoutes />
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
