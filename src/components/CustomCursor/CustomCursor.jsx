import { useEffect, useRef, useState, useCallback } from "react";
import "./CustomCursor.css";

const isTouchOnly = () => {
  if (typeof window === "undefined") return false;
  if (window.matchMedia) {
    return window.matchMedia("(hover: none) and (pointer: coarse)").matches;
  }
  return "ontouchstart" in window;
};

const CustomCursor = () => {
  const [cursorVariant, setCursorVariant] = useState("default");
  const [cursorText, setCursorText] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const dotRef = useRef(null);
  const ringRef = useRef(null);
  
  // Hardware mouse coordinates
  const mousePos = useRef({ x: -100, y: -100 });
  // Trailing ring coordinates
  const ringPos = useRef({ x: -100, y: -100 });
  const rafId = useRef(null);
  const isMovingRef = useRef(false);

  // RAF loop for smooth 60/120fps ring interpolation (zero Framer Motion overhead)
  useEffect(() => {
    if (isTouchOnly()) return;

    const lerp = 0.22; // Snappy, responsive following factor

    const updateLoop = () => {
      if (dotRef.current && ringRef.current) {
        // Center dot is placed directly at target coordinates (0ms latency)
        dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`;

        // Ring follows with smooth lerp
        ringPos.current.x += (mousePos.current.x - ringPos.current.x) * lerp;
        ringPos.current.y += (mousePos.current.y - ringPos.current.y) * lerp;
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      rafId.current = requestAnimationFrame(updateLoop);
    };

    rafId.current = requestAnimationFrame(updateLoop);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  const handleMouseMove = useCallback((e) => {
    mousePos.current.x = e.clientX;
    mousePos.current.y = e.clientY;

    if (!isMovingRef.current) {
      isMovingRef.current = true;
      // Initialize ring immediately on first movement
      ringPos.current.x = e.clientX;
      ringPos.current.y = e.clientY;
      setIsVisible(true);
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
    isMovingRef.current = false;
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (isTouchOnly()) return;

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    const handleOver = (e) => {
      const explicit = e.target.closest("[data-cursor]");
      if (explicit) {
        setCursorVariant(explicit.dataset.cursor || "default");
        setCursorText(explicit.dataset.cursorText || "");
        return;
      }
      const interactive = e.target.closest("button, a, input, textarea, select, [role='button'], .arch-node-card, .traffic-light, .command-item");
      if (interactive) {
        setCursorVariant("link");
        setCursorText("");
      }
    };

    const handleOut = (e) => {
      const target = e.target.closest("[data-cursor], button, a, input, textarea, select, [role='button'], .arch-node-card, .traffic-light, .command-item");
      if (target) {
        setCursorVariant("default");
        setCursorText("");
      }
    };

    document.addEventListener("mouseover", handleOver, { passive: true });
    document.addEventListener("mouseout", handleOut, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
    };
  }, [handleMouseMove, handleMouseLeave, handleMouseEnter]);

  if (isTouchOnly()) return null;

  return (
    <>
      {/* Precision Core Dot (0ms latency hardware tracking) */}
      <div
        ref={dotRef}
        className={`cursor-dot ${isVisible ? "visible" : ""}`}
        aria-hidden="true"
      />

      {/* Smooth Ambient Halo / Reticle */}
      <div
        ref={ringRef}
        className={`cursor-ring ${cursorVariant} ${isVisible ? "visible" : ""}`}
        aria-hidden="true"
      >
        {cursorText && <span className="cursor-text">{cursorText}</span>}
      </div>
    </>
  );
};

export default CustomCursor;

