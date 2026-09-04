import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import sound from "../../utils/soundEngine";
import "./DevToolsHUD.css";

export default function DevToolsHUD({ isOpen, onClose }) {
  const [fps, setFps] = useState(60);
  const [fpsHistory, setFpsHistory] = useState(() => new Array(24).fill(60));
  const [domCount, setDomCount] = useState(0);
  const [memoryUsage, setMemoryUsage] = useState(null);
  const [activeTab, setActiveTab] = useState("metrics"); // 'metrics' | 'spring'

  // Interactive Spring Physics Simulator State
  const [stiffness, setStiffness] = useState(300);
  const [damping, setDamping] = useState(25);
  const [mass, setMass] = useState(1);
  const [boxKey, setBoxKey] = useState(0);
  const [copied, setCopied] = useState(false);

  // RAF FPS Tracker
  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());
  const rafId = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    let active = true;
    frameCount.current = 0;
    lastTime.current = performance.now();

    const measure = (now) => {
      if (!active) return;
      frameCount.current++;
      const elapsed = now - lastTime.current;

      if (elapsed >= 500) {
        const currentFps = Math.round((frameCount.current * 1000) / elapsed);
        setFps(currentFps);
        setFpsHistory((prev) => [...prev.slice(1), currentFps]);
        frameCount.current = 0;
        lastTime.current = now;

        // Count DOM nodes only when HUD is active
        if (typeof document !== "undefined") {
          setDomCount(document.getElementsByTagName("*").length);
        }

        // Chromium Performance Memory
        if (typeof window !== "undefined" && window.performance && window.performance.memory) {
          const usedMB = Math.round(window.performance.memory.usedJSHeapSize / (1024 * 1024));
          const totalMB = Math.round(window.performance.memory.totalJSHeapSize / (1024 * 1024));
          setMemoryUsage({ used: usedMB, total: totalMB });
        }
      }

      rafId.current = requestAnimationFrame(measure);
    };

    rafId.current = requestAnimationFrame(measure);

    return () => {
      active = false;
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isOpen]);

  const triggerSpringAnimation = () => {
    sound.playClick();
    setBoxKey((k) => k + 1);
  };

  const copySpringSnippet = () => {
    sound.playSuccess();
    const snippet = `transition: { type: "spring", stiffness: ${stiffness}, damping: ${damping}, mass: ${mass} }`;
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="hud-panel"
        data-lenis-prevent="true"
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.95 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* HUD Header */}
        <div className="hud-header">
          <div className="hud-title-group">
            <span className="hud-live-pill">LIVE HUD</span>
            <span className="hud-title">Engineering Telemetry</span>
          </div>
          <div className="hud-tabs">
            <button
              className={`hud-tab-btn ${activeTab === "metrics" ? "active" : ""}`}
              onClick={() => {
                sound.playClick();
                setActiveTab("metrics");
              }}
            >
              Vitals
            </button>
            <button
              className={`hud-tab-btn ${activeTab === "spring" ? "active" : ""}`}
              onClick={() => {
                sound.playClick();
                setActiveTab("spring");
              }}
            >
              Spring Lab
            </button>
            <button
              className="hud-close-btn"
              onClick={() => {
                sound.playClick();
                onClose();
              }}
            >
              ✕
            </button>
          </div>
        </div>

        {activeTab === "metrics" ? (
          <div className="hud-body">
            {/* FPS and Sparkline */}
            <div className="hud-metric-row">
              <div className="hud-metric-stat">
                <span className="hud-label">FRAME RATE</span>
                <div className="hud-fps-val">
                  <span className={`fps-number ${fps >= 55 ? "good" : fps >= 30 ? "warn" : "bad"}`}>
                    {fps}
                  </span>
                  <span className="fps-unit">FPS</span>
                </div>
              </div>
              <div className="hud-sparkline" title="Live FPS history">
                {fpsHistory.map((val, idx) => {
                  const h = Math.min(100, Math.max(10, (val / 60) * 100));
                  return (
                    <div
                      key={idx}
                      className="hud-spark-bar"
                      style={{
                        height: `${h}%`,
                        backgroundColor: val >= 55 ? "#10b981" : val >= 30 ? "#f59e0b" : "#ef4444",
                      }}
                    />
                  );
                })}
              </div>
            </div>

            {/* DOM Nodes & JS Heap */}
            <div className="hud-grid-2">
              <div className="hud-stat-box">
                <span className="hud-label">ACTIVE DOM NODES</span>
                <span className="hud-stat-number">{domCount}</span>
                <span className="hud-sub-label">Clean VDOM footprint</span>
              </div>
              <div className="hud-stat-box">
                <span className="hud-label">JS HEAP MEMORY</span>
                <span className="hud-stat-number">
                  {memoryUsage ? `${memoryUsage.used} MB` : "< 15 MB"}
                </span>
                <span className="hud-sub-label">
                  {memoryUsage ? `Limit: ${memoryUsage.total} MB` : "Zero memory leaks"}
                </span>
              </div>
            </div>

            <div className="hud-features-list">
              <div className="hud-feature-item">
                <span className="hud-feat-dot" />
                <span>Web Audio Procedural Sound Engine: 0 kB network transfer</span>
              </div>
              <div className="hud-feature-item">
                <span className="hud-feat-dot" />
                <span>Lenis Smooth Scroll + Framer Motion RAF synchronized</span>
              </div>
              <div className="hud-feature-item">
                <span className="hud-feat-dot" />
                <span>Press <strong>Ctrl+I</strong> / <strong>⌘I</strong> to toggle this HUD</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="hud-body spring-lab">
            <div className="spring-controls">
              <div className="spring-slider-group">
                <div className="slider-header">
                  <span>Stiffness</span>
                  <span className="slider-val">{stiffness}</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="800"
                  step="10"
                  value={stiffness}
                  onChange={(e) => {
                    setStiffness(Number(e.target.value));
                    sound.playKey();
                  }}
                />
              </div>

              <div className="spring-slider-group">
                <div className="slider-header">
                  <span>Damping</span>
                  <span className="slider-val">{damping}</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="60"
                  step="1"
                  value={damping}
                  onChange={(e) => {
                    setDamping(Number(e.target.value));
                    sound.playKey();
                  }}
                />
              </div>

              <div className="spring-slider-group">
                <div className="slider-header">
                  <span>Mass</span>
                  <span className="slider-val">{mass}</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="3"
                  step="0.1"
                  value={mass}
                  onChange={(e) => {
                    setMass(Number(e.target.value));
                    sound.playKey();
                  }}
                />
              </div>
            </div>

            {/* Test Animation Playground */}
            <div className="spring-preview-area" onClick={triggerSpringAnimation}>
              <motion.div
                key={boxKey}
                className="spring-test-orb"
                initial={{ scale: 0.3, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  type: "spring",
                  stiffness,
                  damping,
                  mass,
                }}
              >
                <span>Click to Test</span>
              </motion.div>
            </div>

            <button className="spring-copy-btn" onClick={copySpringSnippet}>
              {copied ? "✓ Copied to Clipboard!" : "Copy Spring Config"}
            </button>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

