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
  const isInitializedRef = useRef(false);

  // Keep body class in sync with visibility so native cursor is never lost
  useEffect(() => {
    if (isTouchOnly()) return;

    if (isVisible) {
      document.body.classList.add("has-custom-cursor");
    } else {
      document.body.classList.remove("has-custom-cursor");
    }

    return () => {
      document.body.classList.remove("has-custom-cursor");
    };
  }, [isVisible]);

  // RAF loop for smooth 60/120fps ring interpolation (zero Framer Motion overhead)
  useEffect(() => {
    if (isTouchOnly()) return;

    const lerp = 0.22; // Snappy, responsive following factor

    const updateLoop = () => {
      if (dotRef.current && ringRef.current) {
        // Center dot is placed directly at target coordinates (0ms latency)
        dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`;

        // Ring follows with smooth lerp
        const dx = mousePos.current.x - ringPos.current.x;
        const dy = mousePos.current.y - ringPos.current.y;

        if (Math.abs(dx) > 0.04 || Math.abs(dy) > 0.04) {
          ringPos.current.x += dx * lerp;
          ringPos.current.y += dy * lerp;
          ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
        }
      }

      rafId.current = requestAnimationFrame(updateLoop);
    };

    rafId.current = requestAnimationFrame(updateLoop);

    const handleVisibility = () => {
      if (document.hidden) {
        if (rafId.current) cancelAnimationFrame(rafId.current);
      } else {
        rafId.current = requestAnimationFrame(updateLoop);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  const handleMouseMove = useCallback((e) => {
    mousePos.current.x = e.clientX;
    mousePos.current.y = e.clientY;

    if (!isInitializedRef.current) {
      isInitializedRef.current = true;
      ringPos.current.x = e.clientX;
      ringPos.current.y = e.clientY;
    }

    setIsVisible((prev) => (prev ? prev : true));
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
    isInitializedRef.current = false;
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (isTouchOnly()) return;

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("blur", handleMouseLeave);
    window.addEventListener("focus", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    const handleOver = (e) => {
      const explicit = e.target.closest("[data-cursor]");
      if (explicit) {
        const nextVariant = explicit.dataset.cursor || "default";
        const nextText = explicit.dataset.cursorText || "";
        setCursorVariant((prev) => (prev !== nextVariant ? nextVariant : prev));
        setCursorText((prev) => (prev !== nextText ? nextText : prev));
        return;
      }
      const interactive = e.target.closest(
        "button, a, input, textarea, select, [role='button'], .arch-node-card, .traffic-light, .command-item"
      );
      if (interactive) {
        setCursorVariant((prev) => (prev !== "link" ? "link" : prev));
        setCursorText((prev) => (prev !== "" ? "" : prev));
      }
    };

    const handleOut = (e) => {
      const target = e.target.closest(
        "[data-cursor], button, a, input, textarea, select, [role='button'], .arch-node-card, .traffic-light, .command-item"
      );
      if (target) {
        setCursorVariant((prev) => (prev !== "default" ? "default" : prev));
        setCursorText((prev) => (prev !== "" ? "" : prev));
      }
    };

    document.addEventListener("mouseover", handleOver, { passive: true });
    document.addEventListener("mouseout", handleOut, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("blur", handleMouseLeave);
      window.removeEventListener("focus", handleMouseEnter);
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

