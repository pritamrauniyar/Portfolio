import "./HeroSection.css";
import React, { useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Typed from "typed.js";

const heroHighlights = [
  {
    title: "Product-ready engineering",
    copy: "Building resilient frontends that feel effortless and perform beautifully.",
  },
  {
    title: "Systems thinking",
    copy: "Turning complex requirements into clean architectures and reliable delivery pipelines.",
  },
  {
    title: "Collaborative leadership",
    copy: "Partnering with designers and product teams to ship experiences users love.",
  },
];

const heroStats = [
  { value: "4+", label: "Years crafting digital products" },
  { value: "25+", label: "Web apps & micro experiences launched" },
  { value: "7", label: "Certifications across cloud & frontend" },
];

const HeroSection = () => {
  const heroAnimation = useRef(null);
  const typedOptions = useMemo(
    () => ({
      strings: [
        "Software Development Engineer",
        "Experience-led Web Developer",
        "Frontend Design Enthusiast",
        "Backend Problem Solver",
        "React & Angular Specialist",
        "Tech Optimizer",
        "Team-first Builder",
      ],
      typeSpeed: 46,
      backSpeed: 32,
      loop: true,
      smartBackspace: true,
    }),
    []
  );

  useEffect(() => {
    const typed = new Typed(heroAnimation.current, typedOptions);
    return () => typed.destroy();
  }, [typedOptions]);

  return (
    <section className="hero">
      <div className="hero-gradient" aria-hidden="true" />
      <div className="hero-grid section-wrapper">
        <motion.div
          className="hero-eyebrow"
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.45, ease: "easeOut" }}
        >
          Product-minded engineer & lifelong learner
        </motion.div>

        <motion.h1
          initial={{ y: 32, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.6, ease: "easeOut" }}
        >
          Crafting immersive web experiences that feel as good as they look.
        </motion.h1>

        <motion.p
          className="hero-subcopy"
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.55, ease: "easeOut" }}
        >
          I specialise in translating ambitious ideas into scalable interfaces - blending
          animation, accessibility, and real-world product thinking across the stack.
        </motion.p>

        <motion.div
          className="hero-typed"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.55, ease: "easeOut" }}
        >
          <span className="hero-typed-label">Currently exploring</span>
          <span className="hero-typed-text" ref={heroAnimation} />
        </motion.div>

        <motion.div
          className="hero-actions"
          initial={{ y: 28, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.55, ease: "easeOut" }}
        >
          <a
            href="/PritamRauniyar_Resume.pdf"
            download
            className="hero-primary"
          >
            Download Resume
          </a>
          <Link to="/contact" className="hero-secondary">
            Let&apos;s collaborate
          </Link>
        </motion.div>

        <div className="hero-highlights">
          {heroHighlights.map((item, index) => (
            <motion.article
              key={item.title}
              className="hero-card"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.65 + index * 0.1, duration: 0.6, ease: "easeOut" }}
            >
              <div className="hero-card-badge">{index + 1}</div>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </motion.article>
          ))}
        </div>
      </div>

      <motion.div
        className="hero-visual section-wrapper"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.75, duration: 0.6, ease: "easeOut" }}
      >
        <div className="hero-visual-card">
          <img src="/developerpic.png" alt="Pritam Rauniyar" />
          <div className="hero-stat-grid">
            {heroStats.map((item) => (
              <motion.div
                key={item.label}
                className="hero-stat"
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 240, damping: 18 }}
              >
                <span className="hero-stat-value">{item.value}</span>
                <span className="hero-stat-label">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;

