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
  { value: "4+", label: "Years of engineering" },
  { value: "100+", label: "Products shipped" },
  { value: "7", label: "Cloud certifications" },
  { value: "3", label: "Companies & teams" },
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

const MetricCell = ({ metric }) => {
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
      onMouseEnter={() => sound.playHover()}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <motion.span className="bento-metric-value">{rounded}</motion.span>
      <span className="bento-metric-label">{metric.label}</span>
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

  const openArchitecture = (id = "ai-transcription") => {
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
