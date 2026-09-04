import { useState, useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import sound from "../../utils/soundEngine";
import "./CollaborateTransition.css";

// Generate 24 radial warp rays
const WARP_RAYS = Array.from({ length: 24 }).map((_, i) => {
  const angle = (i / 24) * 360;
  const delay = (i % 6) * 0.03;
  const length = 120 + (i % 5) * 45;
  return { id: i, angle, delay, length };
});

const CollaborateTransition = () => {
  const navigate = useNavigate();
  const [isWarping, setIsWarping] = useState(false);
  const [telemetryText, setTelemetryText] = useState("INITIATING QUANTUM HANDSHAKE...");
  const timerRef = useRef([]);

  // Clear all pending transition timeouts
  const clearTimers = useCallback(() => {
    timerRef.current.forEach((id) => clearTimeout(id));
    timerRef.current = [];
  }, []);

  // Instant emergency skip or normal navigation
  const executeNavigation = useCallback(() => {
    clearTimers();
    setIsWarping(false);
    navigate("/contact");
  }, [clearTimers, navigate]);

  const startWarp = useCallback(() => {
    if (isWarping) return;

    // Accessibility check: skip transition if user prefers reduced motion
    if (
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      sound.playClick();
      navigate("/contact");
      return;
    }

    sound.playWarp();
    setIsWarping(true);
    setTelemetryText("INITIATING QUANTUM HANDSHAKE...");

    // Fast cinematic telemetry milestones
    const t1 = setTimeout(() => {
      setTelemetryText("WARP 99.4% • TUNNELING TO /CONTACT...");
    }, 240);

    const t2 = setTimeout(() => {
      setTelemetryText("QUANTUM CHANNEL LOCKED • ARRIVING...");
    }, 480);

    const t3 = setTimeout(() => {
      executeNavigation();
    }, 650);

    timerRef.current = [t1, t2, t3];
  }, [isWarping, executeNavigation, navigate]);

  // Global ESC key listener to skip warp
  useEffect(() => {
    if (!isWarping) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        executeNavigation();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isWarping, executeNavigation]);

  useEffect(() => {
    return () => clearTimers();
  }, [clearTimers]);

  const overlayContent = (
    <AnimatePresence>
      {isWarping && (
        <motion.div
          className="ct-warp-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          onClick={executeNavigation}
          role="dialog"
          aria-modal="true"
          aria-label="Quantum Hyperspace Transition"
        >
          {/* Top Telemetry HUD */}
          <div className="ct-hud-top" onClick={(e) => e.stopPropagation()}>
            <div className="ct-hud-badge">
              <span className="ct-hud-dot" />
              <span className="ct-hud-protocol">COMM_LINK // SECURE PROTOCOL v4.2</span>
            </div>
            <div className="ct-hud-node">NODE: BLR-HQ [IST] • E2EE</div>
            <button
              type="button"
              className="ct-hud-skip"
              onClick={executeNavigation}
              aria-label="Skip warp animation"
            >
              <span>ESC / SKIP</span>
              <span className="ct-skip-arrow">⏩</span>
            </button>
          </div>

          {/* Center Quantum Warp Stage */}
          <div className="ct-warp-stage" onClick={(e) => e.stopPropagation()}>
            {/* Radial Hyperspace Laser Streaks */}
            <div className="ct-warp-rays-container" aria-hidden="true">
              {WARP_RAYS.map((ray) => (
                <motion.div
                  key={ray.id}
                  className="ct-warp-ray"
                  style={{
                    transform: `rotate(${ray.angle}deg)`,
                  }}
                  initial={{ opacity: 0, scaleY: 0.2 }}
                  animate={{
                    opacity: [0, 0.9, 0],
                    scaleY: [0.2, 1.8, 3.2],
                    translateY: [0, -ray.length * 1.6],
                  }}
                  transition={{
                    duration: 0.58,
                    delay: ray.delay,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
              ))}
            </div>

            {/* Expanding Concentric Energy Rings */}
            <motion.div
              className="ct-energy-ring ring-outer"
              initial={{ scale: 0.3, opacity: 0.8 }}
              animate={{ scale: 2.8, opacity: 0 }}
              transition={{ duration: 0.65, ease: "easeOut" }}
              aria-hidden="true"
            />
            <motion.div
              className="ct-energy-ring ring-mid"
              initial={{ scale: 0.2, opacity: 0.9, rotate: 0 }}
              animate={{ scale: 2.1, opacity: 0, rotate: 180 }}
              transition={{ duration: 0.62, ease: "easeOut" }}
              aria-hidden="true"
            />
            <motion.div
              className="ct-energy-ring ring-inner"
              initial={{ scale: 0.1, opacity: 1, rotate: 0 }}
              animate={{ scale: 1.5, opacity: 0.2, rotate: -180 }}
              transition={{ duration: 0.58, ease: "easeOut" }}
              aria-hidden="true"
            />

            {/* Central Monogram Targeting Reticle */}
            <motion.div
              className="ct-center-reticle"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: [0.7, 1.08, 1], opacity: 1 }}
              transition={{ duration: 0.45, ease: "backOut" }}
            >
              <div className="ct-reticle-ring" />
              <div className="ct-reticle-core">
                <span className="ct-core-brand">PR</span>
                <span className="ct-core-sub">DIRECT</span>
              </div>
              <div className="ct-reticle-crosshair ch-top" />
              <div className="ct-reticle-crosshair ch-bottom" />
              <div className="ct-reticle-crosshair ch-left" />
              <div className="ct-reticle-crosshair ch-right" />
            </motion.div>

            {/* Live Ticker Telemetry */}
            <motion.div
              className="ct-warp-ticker"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <span className="ct-ticker-icon">⚡</span>
              <span className="ct-ticker-text">{telemetryText}</span>
            </motion.div>
          </div>

          {/* Bottom Warp Velocity Gauge */}
          <div className="ct-hud-bottom" onClick={(e) => e.stopPropagation()}>
            <div className="ct-gauge-info">
              <span className="ct-gauge-label">WARP ACCELERATION</span>
              <span className="ct-gauge-val">99.4% // 650MS LATENCY</span>
            </div>
            <div className="ct-gauge-track">
              <motion.div
                className="ct-gauge-fill"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.62, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <button
        type="button"
        className={`hero-secondary ct-btn ${isWarping ? "warping" : ""}`}
        onClick={startWarp}
        onMouseEnter={() => sound.playHover()}
        data-cursor="link"
        aria-label="Initiate direct collaboration contact channel"
      >
        <span className="btn-icon sparkle-icon">
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 2l2.4 7.2L21 12l-6.6 2.8L12 22l-2.4-7.2L3 12l6.6-2.8z" />
          </svg>
        </span>
        <span className="btn-label">Let&apos;s collaborate</span>
        <span className="btn-arrow" aria-hidden="true">
          →
        </span>
      </button>

      {/* Full-Screen Portal Overlay */}
      {typeof document !== "undefined" && createPortal(overlayContent, document.body)}
    </>
  );
};

export default CollaborateTransition;

