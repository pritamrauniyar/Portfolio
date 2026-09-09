import { createContext, useContext, useEffect, useRef } from "react";
import Lenis from "lenis";

const LenisContext = createContext(null);

export const useLenis = () => useContext(LenisContext);

const SmoothScroll = ({ children }) => {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.85,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.0,
      prevent: (node) => {
        const target = node?.closest?.("[data-lenis-prevent]");
        if (!target) return false;
        // Always prevent for modals/overlays
        if (typeof window !== "undefined") {
          try {
            const pos = window.getComputedStyle(target).position;
            if (pos === "fixed" || pos === "sticky") return true;
          } catch (e) {}
        }
        // Only prevent in-flow elements if there is genuine scrollable overflow
        return target.scrollHeight > target.clientHeight;
      },
    });
    lenisRef.current = lenis;
    if (typeof window !== "undefined") {
      window.__lenis = lenis;
    }

    let rafId = null;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
      if (typeof window !== "undefined") {
        window.__lenis = null;
      }
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisRef}>
      {children}
    </LenisContext.Provider>
  );
};

export default SmoothScroll;
