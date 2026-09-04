import { useRef, useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";

const MagneticButton = ({ children, className = "", strength = 0.3, as: Tag = "div", ...rest }) => {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const reset = useCallback(() => {
    setPos({ x: 0, y: 0 });
    setHovered(false);
  }, []);

  const handleEnter = () => setHovered(true);

  const handleMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setPos({
      x: (e.clientX - cx) * strength,
      y: (e.clientY - cy) * strength,
    });
  };

  useEffect(() => {
    if (!hovered) return;
    const checkBounds = (e) => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      if (e.clientX < r.left - 5 || e.clientX > r.right + 5 ||
          e.clientY < r.top - 5 || e.clientY > r.bottom + 5) {
        reset();
      }
    };
    window.addEventListener("pointermove", checkBounds, { passive: true });
    return () => window.removeEventListener("pointermove", checkBounds);
  }, [hovered, reset]);

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseEnter={handleEnter}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 200, damping: 15, mass: 0.2 }}
      style={{ display: "inline-block" }}
      data-cursor="link"
      {...rest}
    >
      {children}
    </motion.div>
  );
};

export default MagneticButton;
