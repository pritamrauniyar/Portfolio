import { useCallback, useEffect, useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import "./AnimatedBackground.css";

const DOT_COUNT = 60;
const COLORS = [
  "rgba(123, 92, 255, 0.5)",
  "rgba(0, 196, 255, 0.4)",
  "rgba(255, 85, 199, 0.35)",
  "rgba(159, 135, 255, 0.45)",
];

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

const AnimatedBackground = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const dotsRef = useRef([]);
  const rafRef = useRef(null);
  const isRunningRef = useRef(false);

  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 800], [1, 0]);

  const initDots = useCallback(() => {
    dotsRef.current = Array.from({ length: DOT_COUNT }, () => ({
      x: Math.random(),
      y: Math.random(),
      baseX: Math.random(),
      baseY: Math.random(),
      radius: randomBetween(1.5, 3.5),
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      speedX: randomBetween(-0.0003, 0.0003),
      speedY: randomBetween(-0.0003, 0.0003),
      parallaxFactor: randomBetween(0.01, 0.04),
    }));
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isRunningRef.current) return;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const cssWidth = canvas.clientWidth || window.innerWidth;
    const cssHeight = canvas.clientHeight || window.innerHeight;

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, cssWidth, cssHeight);

    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;

    dotsRef.current.forEach((dot) => {
      dot.baseX += dot.speedX;
      dot.baseY += dot.speedY;
      if (dot.baseX < 0 || dot.baseX > 1) dot.speedX *= -1;
      if (dot.baseY < 0 || dot.baseY > 1) dot.speedY *= -1;

      dot.x = dot.baseX + (mx - 0.5) * dot.parallaxFactor;
      dot.y = dot.baseY + (my - 0.5) * dot.parallaxFactor;

      ctx.beginPath();
      ctx.arc(dot.x * cssWidth, dot.y * cssHeight, dot.radius, 0, Math.PI * 2);
      ctx.fillStyle = dot.color;
      ctx.fill();
    });

    const connectionDistance = 110;
    for (let i = 0; i < dotsRef.current.length; i++) {
      for (let j = i + 1; j < dotsRef.current.length; j++) {
        const a = dotsRef.current[i];
        const b = dotsRef.current[j];
        const dx = (a.x - b.x) * cssWidth;
        const dy = (a.y - b.y) * cssHeight;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < connectionDistance) {
          ctx.beginPath();
          ctx.moveTo(a.x * cssWidth, a.y * cssHeight);
          ctx.lineTo(b.x * cssWidth, b.y * cssHeight);
          ctx.strokeStyle = `rgba(123, 92, 255, ${0.12 * (1 - dist / connectionDistance)})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }

    ctx.restore();

    if (isRunningRef.current) {
      rafRef.current = requestAnimationFrame(draw);
    }
  }, []);

  const startAnimation = useCallback(() => {
    if (!isRunningRef.current) {
      isRunningRef.current = true;
      rafRef.current = requestAnimationFrame(draw);
    }
  }, [draw]);

  const stopAnimation = useCallback(() => {
    isRunningRef.current = false;
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
    };

    resize();
    window.addEventListener("resize", resize);
    initDots();
    startAnimation();

    // Pause RAF when document is hidden or user scrolled deep down past opacity
    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopAnimation();
      } else if (window.scrollY < 900) {
        startAnimation();
      }
    };

    let scrollTimeout;
    const handleScrollOptimization = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (window.scrollY > 900 && isRunningRef.current) {
          stopAnimation();
        } else if (window.scrollY <= 900 && !isRunningRef.current && !document.hidden) {
          startAnimation();
        }
      }, 100);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("scroll", handleScrollOptimization, { passive: true });

    return () => {
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("scroll", handleScrollOptimization);
      stopAnimation();
    };
  }, [initDots, startAnimation, stopAnimation]);

  const handleMouseMove = useCallback((e) => {
    mouseRef.current = {
      x: e.clientX / window.innerWidth,
      y: e.clientY / window.innerHeight,
    };
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return (
    <motion.div className="animated-bg" style={{ opacity }}>
      <canvas ref={canvasRef} className="animated-bg-canvas" />
    </motion.div>
  );
};

export default AnimatedBackground;
