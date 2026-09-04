import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useTransform, motion, animate } from "framer-motion";

const AnimatedCounter = ({ target, suffix = "", duration = 1.8 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(count, target, {
      duration,
      ease: "easeOut",
    });
    return controls.stop;
  }, [isInView, target, count, duration]);

  return (
    <span ref={ref} style={{ display: "inline-flex" }}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
};

export default AnimatedCounter;
