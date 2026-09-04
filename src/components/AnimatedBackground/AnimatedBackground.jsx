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

  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 800], [1, 0]);

  const initDots = useCallback(() => {
    dotsRef.current = Array.from({ length: DOT_COUNT }, () => ({
      x: Math.random(),
      y: Math.random(),
      baseX: Math.random(),
      baseY: Math.random(),
      radius: randomBetween(1.5, 4),
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      speedX: randomBetween(-0.0003, 0.0003),
      speedY: randomBetween(-0.0003, 0.0003),
      parallaxFactor: randomBetween(0.01, 0.04),
    }));
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const { width, height } = canvas;
    ctx.clearRect(0, 0, width, height);

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
      ctx.arc(dot.x * width, dot.y * height, dot.radius, 0, Math.PI * 2);
      ctx.fillStyle = dot.color;
      ctx.fill();
    });

    const connectionDistance = 120;
    for (let i = 0; i < dotsRef.current.length; i++) {
      for (let j = i + 1; j < dotsRef.current.length; j++) {
        const a = dotsRef.current[i];
        const b = dotsRef.current[j];
        const dx = (a.x - b.x) * width;
        const dy = (a.y - b.y) * height;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < connectionDistance) {
          ctx.beginPath();
          ctx.moveTo(a.x * width, a.y * height);
          ctx.lineTo(b.x * width, b.y * height);
          ctx.strokeStyle = `rgba(123, 92, 255, ${0.12 * (1 - dist / connectionDistance)})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }

    rafRef.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    initDots();
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [initDots, draw]);

  const handleMouseMove = useCallback((e) => {
    mouseRef.current = {
      x: e.clientX / window.innerWidth,
      y: e.clientY / window.innerHeight,
    };
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return (
    <motion.div className="animated-bg" style={{ opacity }}>
      <canvas ref={canvasRef} className="animated-bg-canvas" />
    </motion.div>
  );
};

export default AnimatedBackground;
