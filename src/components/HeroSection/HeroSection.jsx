import "./HeroSection.css";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import Typed from "typed.js";
import TextReveal from "../TextReveal/TextReveal";
import MagneticButton from "../MagneticButton/MagneticButton";
import ResumeDownload from "../ResumeDownload/ResumeDownload";
import CollaborateTransition from "../CollaborateTransition/CollaborateTransition";
import InteractiveTerminal from "../InteractiveTerminal/InteractiveTerminal";
import sound from "../../utils/soundEngine";

const impactMetrics = [
  {
    value: "4+",
    label: "Years of engineering",
    tag: "EXPERIENCE",
    detail: "Full-Stack & Systems",
    color: "#7b5cff",
  },
  {
    value: "100+",
    label: "Products shipped",
    tag: "DELIVERED",
    detail: "Web, Mobile & Services",
    color: "#00c4ff",
  },
  {
    value: "10",
    label: "Certifications earned",
    tag: "CREDENTIALS",
    detail: "Cloud, AI & Frontend",
    color: "#ff007a",
  },
  {
    value: "3",
    label: "Companies & teams",
    tag: "LEADERSHIP",
    detail: "Uber, Ola, Elevate K-12",
    color: "#22c55e",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const cellVariants = {
  hidden: { opacity: 0, y: 25, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

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
          animate(count, numericPart, {
            duration: 1.8,
            delay: index * 0.1,
            ease: [0.25, 0.46, 0.45, 0.94],
          });
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [count, numericPart, hasAnimated, index]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ref.current.style.setProperty("--cell-x", `${x}px`);
    ref.current.style.setProperty("--cell-y", `${y}px`);
  };

  return (
    <motion.div
      ref={ref}
      className="bento-metric"
      variants={cellVariants}
      whileHover={{ y: -5, scale: 1.02 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => sound.playHover()}
      transition={{ type: "spring", stiffness: 350, damping: 22 }}
      style={{ "--metric-accent": metric.color }}
    >
      <div className="bento-metric-spotlight" aria-hidden="true" />
      <div className="bento-metric-header">
        <span className="bento-metric-tag">
          <span className="bento-metric-dot" />
          {metric.tag}
        </span>
        <span className="bento-metric-detail">{metric.detail}</span>
      </div>
      <motion.span className="bento-metric-value">{rounded}</motion.span>
      <span className="bento-metric-label">{metric.label}</span>
      <div className="bento-metric-progress-line" />
    </motion.div>
  );
};

const subcopyStrings = [
  "Building distributed web systems that scale to millions of users, blending frontend craft with systems thinking.",
  "Architecting resilient real-time streaming pipelines with AudioWorklet, WebSockets, and Web Workers.",
  "Obsessed with shaving milliseconds off INP/LCP and building tactile, zero-stutter web experiences.",
];

const HeroSection = () => {
  const heroAnimation = useRef(null);
  const subcopyAnimation = useRef(null);
  const heroRef = useRef(null);
  const [istTime, setIstTime] = useState("");

  // Live Bangalore (IST) timezone presence clock
  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const istString = now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        });
        setIstTime(istString);
      } catch (e) {
        setIstTime(new Date().toLocaleTimeString());
      }
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const subcopyOptions = useMemo(
    () => ({
      strings: subcopyStrings,
      typeSpeed: 26,
      backSpeed: 14,
      backDelay: 3200,
      loop: true,
      smartBackspace: true,
    }),
    []
  );

  const typedOptions = useMemo(
    () => ({
      strings: [
        "Distributed Web Architecture",
        "Real-Time WebSocket Pipelines",
        "High-Throughput Telemetry",
        "Generative AI UI Workflows",
        "Micro-Frontends at Scale",
      ],
      typeSpeed: 44,
      backSpeed: 30,
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
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    heroRef.current.style.setProperty("--spotlight-x", `${x.toFixed(1)}%`);
    heroRef.current.style.setProperty("--spotlight-y", `${y.toFixed(1)}%`);
  }, []);

  const openArchitecture = (id = "splithive") => {
    sound.playSuccess();
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-arch-modal", { detail: id }));
    }
  };

  return (
    <section className="hero" ref={heroRef} onMouseMove={handleMouseMove}>
      <div className="hero-spotlight" aria-hidden="true" />

      <motion.div
        className="bento-hero section-wrapper"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main headline cell */}
        <motion.div className="bento-cell bento-headline" variants={cellVariants}>
          <div className="hero-top-meta">
            <div className="status-badge">
              <span className="status-dot" />
              <span>Software Engineer II @ Uber / AI Engineer</span>
            </div>

            {/* Live Timezone Widget */}
            <div className="timezone-badge" title="Live Bangalore local time">
              <span className="timezone-icon">📍</span>
              <span className="timezone-city">Bangalore, IN</span>
              <span className="timezone-sep">•</span>
              <span className="timezone-clock">{istTime || "IST (UTC+5:30)"}</span>
            </div>
          </div>

          <TextReveal as="h1" mode="chars" className="hero-title">
            Building systems that move millions.
          </TextReveal>

          <motion.div
            className="hero-subcopy"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <span ref={subcopyAnimation} />
          </motion.div>

          {/* Quick Architecture and Deep Dive triggers */}
          <div className="hero-arch-pills">
            <span className="arch-pills-label">Systems Architecture:</span>
            <button
              type="button"
              className="arch-pill-btn"
              onClick={() => openArchitecture("splithive")}
              onMouseEnter={() => sound.playHover()}
            >
              <span className="pill-dot" />
              <span>SplitHive Ledger (Real-Time)</span>
              <span className="pill-arrow">↗</span>
            </button>
            <button
              type="button"
              className="arch-pill-btn"
              onClick={() => openArchitecture("ai-transcription")}
              onMouseEnter={() => sound.playHover()}
            >
              <span className="pill-dot" />
              <span>AI Audio Pipeline (Sub-200ms)</span>
              <span className="pill-arrow">↗</span>
            </button>
            <button
              type="button"
              className="arch-pill-btn"
              onClick={() => openArchitecture("net-inspector")}
              onMouseEnter={() => sound.playHover()}
            >
              <span className="pill-dot" />
              <span>Network Diagnostic Engine (Zero-GC)</span>
              <span className="pill-arrow">↗</span>
            </button>
          </div>

          {/* CTA Actions */}
          <div className="bento-cta-actions">
            <MagneticButton strength={0.25}>
              <ResumeDownload resumeUrl="/PritamRauniyarResume.pdf" />
            </MagneticButton>
            <MagneticButton strength={0.25}>
              <CollaborateTransition />
            </MagneticButton>
          </div>
        </motion.div>

        {/* Profile + typed cell */}
        <motion.div className="bento-cell bento-profile" variants={cellVariants}>
          <div className="bento-profile-img-wrap">
            <img src="/developerpic.png" alt="Pritam Rauniyar" />
            <div className="bento-profile-glow" aria-hidden="true" />
          </div>
          <div className="bento-typed">
            <span className="bento-typed-label">Specializing in</span>
            <span className="bento-typed-text" ref={heroAnimation} />
          </div>
          <div className="bento-profile-stats">
            <span className="bento-mini-pill">Ex-Ola Mobility</span>
            <span className="bento-mini-pill">MNNIT Alum</span>
          </div>
        </motion.div>

        {/* Interactive Developer REPL Terminal Cell */}
        <motion.div className="bento-cell bento-terminal-cell" variants={cellVariants}>
          <InteractiveTerminal isEmbedded={true} />
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
