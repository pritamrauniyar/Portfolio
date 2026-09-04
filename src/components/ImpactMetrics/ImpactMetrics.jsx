import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import TextReveal from "../TextReveal/TextReveal";
import "./ImpactMetrics.css";

const metrics = [
  {
    value: 4,
    prefix: "",
    suffix: "+",
    label: "Years building production systems across enterprise & consumer products",
    color: "#7b5cff",
    barWidth: 90,
  },
  {
    value: 100,
    prefix: "",
    suffix: "+",
    label: "Products, applications, and features shipped end-to-end",
    color: "#00c4ff",
    barWidth: 95,
  },
  {
    value: 5,
    prefix: "",
    suffix: "x",
    label: "Speed improvement achieved via API optimization & CDN delivery",
    color: "#22c55e",
    barWidth: 85,
  },
  {
    value: 7,
    prefix: "",
    suffix: "",
    label: "Professional certifications across cloud platforms & frontend frameworks",
    color: "#ff55c7",
    barWidth: 70,
  },
];

const AnimatedMetric = ({ metric, delay }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => `${metric.prefix}${Math.round(v)}${metric.suffix}`);
  const ref = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animate(count, metric.value, {
            duration: 2,
            delay,
            ease: [0.25, 0.46, 0.45, 0.94],
          });
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [count, metric.value, delay, hasAnimated]);

  return (
    <motion.div
      ref={ref}
      className="impact-metric"
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, delay }}
    >
      <div className="impact-metric-head">
        <motion.span className="impact-value" style={{ color: metric.color }}>
          {rounded}
        </motion.span>
        <span className="impact-label">{metric.label}</span>
      </div>
      <div className="impact-bar-track">
        <motion.div
          className="impact-bar-fill"
          style={{ background: metric.color }}
          initial={{ width: 0 }}
          whileInView={{ width: `${metric.barWidth}%` }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.2, delay: delay + 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </div>
    </motion.div>
  );
};

const ImpactMetrics = () => (
  <section className="impact-section section-wrapper">
    <motion.div
      className="impact-header"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6 }}
    >
      <span className="impact-eyebrow">Impact</span>
      <TextReveal as="h2" mode="words" className="impact-title">
        Engineering impact at scale
      </TextReveal>
      <p className="impact-subtitle">
        Highlights from building and owning production systems across enterprise and consumer products.
      </p>
    </motion.div>

    <div className="impact-grid">
      {metrics.map((metric, i) => (
        <AnimatedMetric key={metric.label} metric={metric} delay={i * 0.12} />
      ))}
    </div>
  </section>
);

export default ImpactMetrics;
