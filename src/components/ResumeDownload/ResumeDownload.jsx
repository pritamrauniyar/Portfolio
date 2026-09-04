import { useState, useCallback, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import sound from "../../utils/soundEngine";
import "./ResumeDownload.css";

const STATUS = {
  IDLE: "idle",
  PACKAGING: "packaging",
  SUCCESS: "success",
};

const ResumeDownload = ({ resumeUrl = "/PritamRauniyarResume.pdf" }) => {
  const [status, setStatus] = useState(STATUS.IDLE);
  const [particles, setParticles] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const toastTimeoutRef = useRef(null);
  const resetTimeoutRef = useRef(null);

  // Trigger real file download
  const triggerNativeDownload = useCallback(() => {
    const a = document.createElement("a");
    a.href = resumeUrl;
    a.download = "Pritam_Rauniyar_Resume.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }, [resumeUrl]);

  // Generate particle burst on click
  const spawnParticles = (e) => {
    let cx = 80;
    let cy = 22;
    if (e && e.currentTarget && typeof e.currentTarget.getBoundingClientRect === "function") {
      const rect = e.currentTarget.getBoundingClientRect();
      cx = (e.clientX != null && e.clientX !== 0) ? e.clientX - rect.left : rect.width / 2;
      cy = (e.clientY != null && e.clientY !== 0) ? e.clientY - rect.top : rect.height / 2;
    }

    const colors = ["#00c4ff", "#7b5cff", "#22c55e", "#ffd700", "#ff007a"];
    const newParticles = Array.from({ length: 16 }).map((_, i) => {
      const angle = (i / 16) * 2 * Math.PI + (Math.random() - 0.5) * 0.4;
      const distance = 40 + Math.random() * 65;
      return {
        id: Date.now() + i,
        x: cx,
        y: cy,
        targetX: cx + Math.cos(angle) * distance,
        targetY: cy + Math.sin(angle) * distance,
        color: colors[i % colors.length],
        size: 3.5 + Math.random() * 4.5,
      };
    });
    setParticles(newParticles);
    setTimeout(() => setParticles([]), 750);
  };

  const handleDownloadClick = (e, isRetry = false) => {
    if (status !== STATUS.IDLE && !isRetry) return;

    sound.playSuccess();
    if (e && e.currentTarget) spawnParticles(e);
    setStatus(STATUS.PACKAGING);

    // Packaging animation (500ms)
    setTimeout(() => {
      triggerNativeDownload();
      setStatus(STATUS.SUCCESS);
      setShowToast(true);

      // Auto-hide toast after 5.5s
      clearTimeout(toastTimeoutRef.current);
      toastTimeoutRef.current = setTimeout(() => {
        setShowToast(false);
      }, 5500);

      // Auto-reset button state after 3s
      clearTimeout(resetTimeoutRef.current);
      resetTimeoutRef.current = setTimeout(() => {
        setStatus(STATUS.IDLE);
      }, 3000);
    }, 500);
  };

  useEffect(() => {
    return () => {
      clearTimeout(toastTimeoutRef.current);
      clearTimeout(resetTimeoutRef.current);
    };
  }, []);

  const toastContent = (
    <AnimatePresence>
      {showToast && (
        <motion.div
          className="rd-hud-toast"
          initial={{ opacity: 0, y: 35, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 25, scale: 0.94 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          role="status"
          aria-live="polite"
        >
          <div className="rd-toast-header">
            <div className="rd-toast-status">
              <span className="rd-toast-dot" />
              <span className="rd-toast-tag">RESUME ACQUIRED • 200 OK</span>
            </div>
            <button
              className="rd-toast-close"
              onClick={() => setShowToast(false)}
              aria-label="Dismiss toast"
              type="button"
            >
              &times;
            </button>
          </div>

          <div className="rd-toast-body">
            <div className="rd-toast-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00c4ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            </div>
            <div className="rd-toast-meta">
              <span className="rd-toast-filename">PritamRauniyarResume.pdf</span>
              <span className="rd-toast-sub">Senior Software Engineer II • 49 KB</span>
            </div>
          </div>

          <div className="rd-toast-actions">
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rd-toast-btn primary"
              onClick={() => sound.playClick()}
            >
              <span>Preview in Browser</span>
              <span className="rd-toast-arrow">↗</span>
            </a>
            <button
              type="button"
              className="rd-toast-btn secondary"
              onClick={(e) => {
                sound.playClick();
                handleDownloadClick(e, true);
              }}
            >
              <span>Download Again</span>
              <span className="rd-toast-arrow">⤓</span>
            </button>
          </div>

          {/* Auto dismiss countdown bar */}
          <motion.div
            className="rd-toast-progress"
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            transition={{ duration: 5.5, ease: "linear" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <button
        type="button"
        className={`hero-primary resume-btn ${status}`}
        onClick={handleDownloadClick}
        onMouseEnter={() => sound.playHover()}
        data-cursor="link"
        aria-label="Download Pritam Rauniyar Resume PDF"
      >
        {/* Click particle burst */}
        {particles.map((p) => (
          <motion.span
            key={p.id}
            className="rd-click-particle"
            initial={{ x: p.x, y: p.y, scale: 1, opacity: 1 }}
            animate={{ x: p.targetX, y: p.targetY, scale: 0, opacity: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            style={{
              backgroundColor: p.color,
              width: p.size,
              height: p.size,
            }}
          />
        ))}

        {/* Dynamic State Icon */}
        <span className="btn-icon">
          <AnimatePresence mode="wait">
            {status === STATUS.IDLE && (
              <motion.svg
                key="idle"
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.2 }}
                aria-hidden="true"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </motion.svg>
            )}

            {status === STATUS.PACKAGING && (
              <motion.svg
                key="packaging"
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="rd-spin"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1, rotate: 360 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{
                  rotate: { duration: 0.8, repeat: Infinity, ease: "linear" },
                  opacity: { duration: 0.2 },
                }}
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="9" strokeOpacity="0.25" />
                <path d="M12 3a9 9 0 0 1 9 9" />
              </motion.svg>
            )}

            {status === STATUS.SUCCESS && (
              <motion.svg
                key="success"
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#22c55e"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.25, ease: "backOut" }}
                aria-hidden="true"
              >
                <polyline points="20 6 9 17 4 12" />
              </motion.svg>
            )}
          </AnimatePresence>
        </span>

        {/* Dynamic State Label */}
        <span className="btn-label">
          <AnimatePresence mode="wait">
            {status === STATUS.IDLE && (
              <motion.span
                key="idle-txt"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.18 }}
              >
                Download Resume
              </motion.span>
            )}

            {status === STATUS.PACKAGING && (
              <motion.span
                key="pack-txt"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.18 }}
              >
                Packaging PDF...
              </motion.span>
            )}

            {status === STATUS.SUCCESS && (
              <motion.span
                key="success-txt"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.18 }}
                style={{ color: "#22c55e" }}
              >
                Downloaded!
              </motion.span>
            )}
          </AnimatePresence>
        </span>

        {/* Dynamic Badge */}
        <span className={`btn-badge ${status}`}>
          {status === STATUS.IDLE && "PDF"}
          {status === STATUS.PACKAGING && "49KB"}
          {status === STATUS.SUCCESS && "✓"}
        </span>

        {/* Laser Progress Bar during packaging */}
        {status === STATUS.PACKAGING && (
          <motion.div
            className="rd-laser-progress"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.55, ease: "easeInOut" }}
          />
        )}
      </button>

      {/* Floating HUD Toast Notification portal */}
      {typeof document !== "undefined" && createPortal(toastContent, document.body)}
    </>
  );
};

export default ResumeDownload;
