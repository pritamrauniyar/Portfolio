import "./HeroSection.css";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import Typed from "typed.js";
import TextReveal from "../TextReveal/TextReveal";
import MagneticButton from "../MagneticButton/MagneticButton";
import ResumeDownload from "../ResumeDownload/ResumeDownload";
import CollaborateTransition from "../CollaborateTransition/CollaborateTransition";

const impactMetrics = [
  { value: "4+", label: "Years of engineering" },
  { value: "25+", label: "Products shipped" },
  { value: "7", label: "Cloud certifications" },
  { value: "3", label: "Companies & teams" },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const cellVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const StatusBadge = () => (
  <motion.div
    className="status-badge"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 0.8, duration: 0.5 }}
  >
    <span className="status-dot" />
    <span>Software Engineer II @ Uber/ AI Engineer</span>
  </motion.div>
);

const MetricCell = ({ metric, index }) => {
  const count = useMotionValue(0);
  const numericPart = parseFloat(metric.value.replace(/[^0-9.]/g, ""));
  const prefix = metric.value.startsWith("$") ? "$" : "";
  const suffix = metric.value.replace(/^[$]?[\d.]+/, "");
  const rounded = useTransform(count, (v) => `${prefix}${Math.round(v)}${suffix}`);
  const ref = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animate(count, numericPart, { duration: 1.8, ease: [0.25, 0.46, 0.45, 0.94] });
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [count, numericPart, hasAnimated]);

  return (
    <motion.div
      ref={ref}
      className="bento-metric"
      variants={cellVariants}
      whileHover={{ y: -4, borderColor: "rgba(123, 92, 255, 0.5)" }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <motion.span className="bento-metric-value">{rounded}</motion.span>
      <span className="bento-metric-label">{metric.label}</span>
    </motion.div>
  );
};

const subcopyStrings = [
  "I craft high-impact web platforms that power products at scale, blending obsessive frontend craft with full-stack product thinking.",
  "I build resilient systems that handle millions of users, turning complex requirements into clean, scalable architectures.",
  "I partner with cross-functional teams to ship experiences users love, combining design sensibility with engineering rigor.",
];

const HeroSection = () => {
  const heroAnimation = useRef(null);
  const subcopyAnimation = useRef(null);
  const heroRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  const typedOptions = useMemo(
    () => ({
      strings: [
        "Building Scalable Web Platforms",
        "Crafting Delightful User Experiences",
        "Full-Stack Product Engineering",
        "Frontend Architecture & Design Systems",
        "Performance Optimization at Scale",
      ],
      typeSpeed: 46,
      backSpeed: 32,
      loop: true,
      smartBackspace: true,
    }),
    []
  );

  const subcopyOptions = useMemo(
    () => ({
      strings: subcopyStrings,
      typeSpeed: 28,
      backSpeed: 16,
      backDelay: 3000,
      loop: true,
      smartBackspace: true,
    }),
    []
  );

  useEffect(() => {
    const typed = new Typed(heroAnimation.current, typedOptions);
    return () => typed.destroy();
  }, [typedOptions]);

  useEffect(() => {
    const typed = new Typed(subcopyAnimation.current, subcopyOptions);
    return () => typed.destroy();
  }, [subcopyOptions]);

  const handleMouseMove = useCallback((e) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  }, []);

  return (
    <section className="hero" ref={heroRef} onMouseMove={handleMouseMove}>
      <div
        className="hero-spotlight"
        aria-hidden="true"
        style={{
          background: `radial-gradient(800px circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(123,92,255,0.08), transparent 40%)`,
        }}
      />

      <motion.div
        className="bento-hero section-wrapper"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main headline cell */}
        <motion.div className="bento-cell bento-headline" variants={cellVariants}>
          <StatusBadge />
          <TextReveal
            as="h1"
            mode="chars"
            className="hero-title"
          >
            Building systems that move millions.
          </TextReveal>
          <motion.div
            className="hero-subcopy"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
          >
            <span ref={subcopyAnimation} />
          </motion.div>
        </motion.div>

        {/* Photo + typed cell */}
        <motion.div className="bento-cell bento-profile" variants={cellVariants}>
          <div className="bento-profile-img-wrap">
            <img src="/developerpic.png" alt="Pritam Rauniyar" />
            <div className="bento-profile-glow" aria-hidden="true" />
          </div>
          <div className="bento-typed">
            <span className="bento-typed-label">Exploring</span>
            <span className="bento-typed-text" ref={heroAnimation} />
          </div>
        </motion.div>

        {/* CTA cell */}
        <motion.div className="bento-cell bento-cta" variants={cellVariants}>
          <div className="bento-cta-actions">
            <MagneticButton strength={0.25}>
              <ResumeDownload resumeUrl="/PritamRauniyarResume.pdf" />
            </MagneticButton>
            <MagneticButton strength={0.25}>
              <CollaborateTransition />
            </MagneticButton>
          </div>
        </motion.div>

        {/* Impact metrics cells */}
        {impactMetrics.map((metric, index) => (
          <MetricCell key={metric.label} metric={metric} index={index} />
        ))}
      </motion.div>
    </section>
  );
};

export default HeroSection;
