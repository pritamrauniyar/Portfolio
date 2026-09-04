import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import TextReveal from "../TextReveal/TextReveal";
import sound from "../../utils/soundEngine";
import "./ImpactMetrics.css";

const PRODUCTION_METRICS = [
  {
    id: "revenue",
    value: 38,
    prefix: "$",
    suffix: "M+",
    isFloat: false,
    category: "BUSINESS SCALE",
    title: "Direct Revenue Impact",
    desc: "Engineered Uber Unified Offers & NTB driver acquisition pipelines, converting high-volume geospatial traffic into verified multi-million dollar annual run-rate.",
    color: "#ffd700",
    pill: "+18.4% Offer Conversion",
    stack: ["Uber Core", "Micro-Frontends", "Distributed Cache"],
    sparkType: "growth",
  },
  {
    id: "speed",
    value: 5,
    prefix: "",
    suffix: "x",
    isFloat: false,
    category: "PERFORMANCE",
    title: "Sub-Second Latency Acceleration",
    desc: "Shaved 80% off API response & live streaming latency via edge CloudFront CDN caching, AudioWorklet 16kHz PCM downsampling, and zero-allocation buffer pipelines.",
    color: "#00c4ff",
    pill: "Sub-200ms Audio & TTFB",
    stack: ["AudioWorklet", "Redis Edge", "Web Workers", "WebSockets"],
    sparkType: "wave",
  },
  {
    id: "uptime",
    value: 99.98,
    prefix: "",
    suffix: "%",
    isFloat: true,
    category: "RELIABILITY",
    title: "Production High-Availability SLA",
    desc: "Maintained fault-tolerant real-time state synchronization across live fleet telemetry streams, geospatial dispatch grids, and distributed expense ledger nodes.",
    color: "#22c55e",
    pill: "Zero-Downtime Deployments",
    stack: ["Socket.IO", "Health Watchdogs", "Fallback Reconnect"],
    sparkType: "pulse",
  },
  {
    id: "scale",
    value: 500,
    prefix: "",
    suffix: "+",
    isFloat: false,
    category: "DEVX MULTIPLIER",
    title: "Global Engineers Empowered",
    desc: "Authored Claude Code agentic stacked-PR review skills, core frontend UI architecture libraries, and automated CI/CD test gates used daily across engineering teams.",
    color: "#a855f7",
    pill: "4x Accelerated PR Velocity",
    stack: ["Claude Code Skills", "CI/CD Gates", "Internal DevX"],
    sparkType: "mesh",
  },
];

// Telemetry Waveform Visualizer
const TelemetryWaveform = ({ type, color }) => {
  if (type === "growth") {
    return (
      <svg className="im-sparkline" viewBox="0 0 240 50" fill="none">
        <defs>
          <linearGradient id="growth-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.28" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M 0 45 Q 50 42, 90 35 T 160 22 T 215 8 L 240 6 L 240 50 L 0 50 Z"
          fill="url(#growth-grad)"
        />
        <motion.path
          d="M 0 45 Q 50 42, 90 35 T 160 22 T 215 8 L 240 6"
          stroke={color}
          strokeWidth="2.4"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        />
        <circle cx="238" cy="6" r="4" fill={color} />
        <motion.circle
          cx="238"
          cy="6"
          r="8"
          stroke={color}
          strokeWidth="1.5"
          initial={{ scale: 0.8, opacity: 0.9 }}
          animate={{ scale: 1.8, opacity: 0 }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
        />
      </svg>
    );
  }

  if (type === "wave") {
    return (
      <svg className="im-sparkline" viewBox="0 0 240 50" fill="none">
        <motion.path
          d="M 0 25 Q 25 5, 50 25 T 100 25 T 140 12 T 165 38 T 190 8 T 210 42 T 225 15 T 240 25"
          stroke={color}
          strokeWidth="2.2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      </svg>
    );
  }

  if (type === "pulse") {
    return (
      <svg className="im-sparkline" viewBox="0 0 240 50" fill="none">
        <motion.path
          d="M 0 25 L 60 25 L 72 8 L 84 42 L 96 16 L 108 30 L 118 25 L 165 25 L 176 6 L 188 44 L 200 18 L 210 28 L 220 25 L 240 25"
          stroke={color}
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: "easeOut" }}
        />
      </svg>
    );
  }

  // Network Mesh
  return (
    <svg className="im-sparkline" viewBox="0 0 240 50" fill="none">
      <line x1="20" y1="35" x2="65" y2="15" stroke={color} strokeWidth="1.2" strokeOpacity="0.4" />
      <line x1="65" y1="15" x2="120" y2="35" stroke={color} strokeWidth="1.2" strokeOpacity="0.4" />
      <line x1="120" y1="35" x2="175" y2="15" stroke={color} strokeWidth="1.2" strokeOpacity="0.4" />
      <line x1="175" y1="15" x2="225" y2="32" stroke={color} strokeWidth="1.2" strokeOpacity="0.4" />
      <line x1="65" y1="15" x2="175" y2="15" stroke={color} strokeWidth="1.2" strokeOpacity="0.25" strokeDasharray="3 3" />
      {[{ x: 20, y: 35 }, { x: 65, y: 15 }, { x: 120, y: 35 }, { x: 175, y: 15 }, { x: 225, y: 32 }].map(
        (pt, idx) => (
          <g key={idx}>
            <circle cx={pt.x} cy={pt.y} r="3.5" fill={color} />
            <motion.circle
              cx={pt.x}
              cy={pt.y}
              r="7"
              stroke={color}
              strokeWidth="1.2"
              initial={{ scale: 0.8, opacity: 0.8 }}
              animate={{ scale: 1.7, opacity: 0 }}
              transition={{ duration: 2, delay: idx * 0.3, repeat: Infinity, ease: "easeOut" }}
            />
          </g>
        )
      )}
    </svg>
  );
};

const ImpactCard = ({ metric, delay }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) =>
    metric.isFloat
      ? `${metric.prefix}${v.toFixed(2)}${metric.suffix}`
      : `${metric.prefix}${Math.round(v)}${metric.suffix}`
  );

  const cardRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!cardRef.current) return;
    if (typeof IntersectionObserver === "undefined") {
      setHasAnimated(true);
      animate(count, metric.value, {
        duration: 1.5,
        delay: delay + 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      });
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animate(count, metric.value, {
            duration: 2,
            delay: delay + 0.1,
            ease: [0.25, 0.46, 0.45, 0.94],
          });
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [count, metric.value, metric.isFloat, delay, hasAnimated]);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty("--card-x", `${x}px`);
    cardRef.current.style.setProperty("--card-y", `${y}px`);
  }, []);

  return (
    <motion.div
      ref={cardRef}
      className="im-card"
      style={{ "--card-accent": metric.color }}
      initial={{ opacity: 0, y: 28, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, scale: 1.015 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => sound.playHover()}
      onClick={() => sound.playClick()}
      data-cursor="link"
    >
      {/* Dynamic Cursor Spotlight */}
      <div className="im-card-spotlight" aria-hidden="true" />

      {/* Card Header */}
      <div className="im-card-head">
        <div className="im-category-pill">
          <span className="im-category-dot" />
          <span className="im-category-text">{metric.category}</span>
        </div>
        <div className="im-telemetry-badge">
          <span className="im-telemetry-pill">{metric.pill}</span>
        </div>
      </div>

      {/* Main Metric Value & Title */}
      <div className="im-metric-body">
        <div className="im-value-row">
          <motion.span className="im-value">{rounded}</motion.span>
        </div>
        <h3 className="im-title">{metric.title}</h3>
        <p className="im-desc">{metric.desc}</p>
      </div>

      {/* Waveform Telemetry Graphic */}
      <div className="im-sparkline-wrap" aria-hidden="true">
        <TelemetryWaveform type={metric.sparkType} color={metric.color} />
      </div>

      {/* Tech Stack Footer Tags */}
      <div className="im-card-footer">
        {metric.stack.map((item) => (
          <span key={item} className="im-stack-tag">
            {item}
          </span>
        ))}
      </div>

      {/* Subtle Bottom Glow Accent */}
      <div className="im-card-glow-line" />
    </motion.div>
  );
};

const ImpactMetrics = () => (
  <section className="impact-section section-wrapper" id="impact">
    <motion.div
      className="impact-header"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6 }}
    >
      <div className="impact-header-top">
        <span className="impact-eyebrow">PRODUCTION TELEMETRY // AT SCALE</span>
        <div className="impact-live-indicator">
          <span className="impact-beacon-dot" />
          <span className="impact-beacon-text">LIVE STATUS: 4/4 PRODUCTION BENCHMARKS</span>
        </div>
      </div>

      <TextReveal as="h2" mode="words" className="impact-title">
        Engineering Impact at Scale
      </TextReveal>

      <p className="impact-subtitle">
        Quantifiable production deliverables from architecting, optimizing, and operating high-throughput
        distributed platforms at Uber and enterprise scale.
      </p>
    </motion.div>

    <div className="impact-grid">
      {PRODUCTION_METRICS.map((metric, i) => (
        <ImpactCard key={metric.id} metric={metric} delay={i * 0.1} />
      ))}
    </div>
  </section>
);

export default ImpactMetrics;

