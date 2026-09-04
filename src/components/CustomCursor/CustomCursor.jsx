import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useSpring } from "framer-motion";
import "./CustomCursor.css";

const CustomCursor = () => {
  const [cursorVariant, setCursorVariant] = useState("default");
  const [cursorText, setCursorText] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const dotRef = useRef({ x: 0, y: 0 });

  const springConfig = { damping: 28, stiffness: 300, mass: 0.5 };
  const ringX = useSpring(0, springConfig);
  const ringY = useSpring(0, springConfig);

  const handleMouseMove = useCallback((e) => {
    dotRef.current = { x: e.clientX, y: e.clientY };
    ringX.set(e.clientX);
    ringY.set(e.clientY);
    if (!isVisible) setIsVisible(true);
  }, [ringX, ringY, isVisible]);

  const handleMouseLeave = useCallback(() => setIsVisible(false), []);
  const handleMouseEnter = useCallback(() => setIsVisible(true), []);

  useEffect(() => {
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    const handleOver = (e) => {
      const explicit = e.target.closest("[data-cursor]");
      if (explicit) {
        setCursorVariant(explicit.dataset.cursor);
        setCursorText(explicit.dataset.cursorText || "");
        return;
      }
      const interactive = e.target.closest("button, a, input, [role='button'], .arch-node-card, .traffic-light");
      if (interactive) {
        setCursorVariant("link");
        setCursorText("");
      }
    };
    const handleOut = (e) => {
      const target = e.target.closest("[data-cursor], button, a, input, [role='button'], .arch-node-card, .traffic-light");
      if (target) {
        setCursorVariant("default");
        setCursorText("");
      }
    };

    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
    };
  }, [handleMouseMove, handleMouseLeave, handleMouseEnter]);

  const isTouchDevice = typeof window !== "undefined" &&
    ("ontouchstart" in window || navigator.maxTouchPoints > 0);
  if (isTouchDevice) return null;

  const ringSize = cursorVariant === "project" ? 80 : cursorVariant === "link" ? 48 : 36;

  return (
    <>
      <div
        className={`cursor-dot ${isVisible ? "visible" : ""}`}
        style={{
          transform: `translate(${dotRef.current.x - 4}px, ${dotRef.current.y - 4}px)`,
        }}
      />
      <motion.div
        className={`cursor-ring ${cursorVariant} ${isVisible ? "visible" : ""}`}
        style={{
          x: ringX,
          y: ringY,
          width: ringSize,
          height: ringSize,
          marginLeft: -ringSize / 2,
          marginTop: -ringSize / 2,
        }}
      >
        {cursorText && <span className="cursor-text">{cursorText}</span>}
      </motion.div>
    </>
  );
};

export default CustomCursor;
