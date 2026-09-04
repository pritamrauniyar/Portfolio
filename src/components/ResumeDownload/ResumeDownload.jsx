import { useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./ResumeDownload.css";

const BUBBLE_TEXT = {
  greet: "Hey there! Nice to meet you! \uD83D\uDC4B",
  collect: "Hold on, let me gather Pritam's info\u2026",
  type: "Info collected! Preparing the resume\u2026",
  download: "All done! Here comes the file!",
};

const PHASES = {
  IDLE: "idle",
  GREET: "greet",
  COLLECT: "collect",
  TYPE: "type",
  DOWNLOAD: "download",
  DONE: "done",
};

const SpeechBubble = ({ text }) => (
  <motion.div
    className="rd-bubble"
    initial={{ opacity: 0, scale: 0.6, y: 10 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.6, y: 10 }}
    transition={{ duration: 0.35, ease: "backOut" }}
  >
    <span className="rd-bubble-text">{text}</span>
    <span className="rd-bubble-tail" />
  </motion.div>
);

const LaptopScreen = () => (
  <motion.div
    className="rd-laptop"
    initial={{ opacity: 0, y: 30, scale: 0.8 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.5, ease: "backOut" }}
  >
    <div className="rd-laptop-bar">
      <span className="rd-dot rd-dot-r" />
      <span className="rd-dot rd-dot-y" />
      <span className="rd-dot rd-dot-g" />
    </div>
    <div className="rd-laptop-body">
      <motion.div className="rd-code-line rd-cl1"
        initial={{ width: 0 }} animate={{ width: "75%" }}
        transition={{ delay: 0.4, duration: 0.8 }} />
      <motion.div className="rd-code-line rd-cl2"
        initial={{ width: 0 }} animate={{ width: "55%" }}
        transition={{ delay: 0.8, duration: 0.7 }} />
      <motion.div className="rd-code-line rd-cl3"
        initial={{ width: 0 }} animate={{ width: "85%" }}
        transition={{ delay: 1.2, duration: 0.8 }} />
      <motion.div className="rd-code-line rd-cl4"
        initial={{ width: 0 }} animate={{ width: "45%" }}
        transition={{ delay: 1.6, duration: 0.6 }} />
    </div>
  </motion.div>
);

const FlyingFile = () => (
  <motion.div
    className="rd-file"
    initial={{ opacity: 0, x: 0, y: 0, scale: 0.5, rotate: 0 }}
    animate={{
      opacity: [0, 1, 1, 1, 0],
      x: [0, 20, 60, 120, 180],
      y: [0, -30, -80, -130, -170],
      scale: [0.5, 1, 1.1, 1, 0.8],
      rotate: [0, -3, -8, -12, -18],
    }}
    transition={{ duration: 1.8, times: [0, 0.15, 0.4, 0.7, 1], ease: "easeOut" }}
  >
    <svg width="40" height="48" viewBox="0 0 40 48">
      <rect x="2" y="2" width="36" height="44" rx="4" fill="rgba(232,115,74,0.2)" stroke="#E8734A" strokeWidth="2" />
      <path d="M24 2 L38 16 L24 16 Z" fill="rgba(232,115,74,0.35)" stroke="#E8734A" strokeWidth="1.5" />
      <line x1="8" y1="24" x2="32" y2="24" stroke="#E8734A" strokeWidth="1.5" opacity="0.6" />
      <line x1="8" y1="30" x2="24" y2="30" stroke="#E8734A" strokeWidth="1.5" opacity="0.4" />
      <line x1="8" y1="36" x2="28" y2="36" stroke="#E8734A" strokeWidth="1.5" opacity="0.3" />
    </svg>
  </motion.div>
);

const SuccessView = () => (
  <motion.div
    className="rd-success"
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, ease: "backOut" }}
  >
    <svg width="90" height="90" viewBox="0 0 90 90">
      <circle cx="45" cy="45" r="42" fill="rgba(34,197,94,0.12)" stroke="#22c55e" strokeWidth="3" />
      <motion.path
        d="M26 45 L38 57 L64 31"
        fill="none" stroke="#22c55e" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      />
    </svg>
    <motion.p
      className="rd-success-text"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.4 }}
    >
      Resume downloaded! Enjoy reading.
    </motion.p>
  </motion.div>
);

const ResumeDownload = ({ resumeUrl = "/PritamRauniyarResume.pdf" }) => {
  const [phase, setPhase] = useState(PHASES.IDLE);
  const [showOverlay, setShowOverlay] = useState(false);

  const triggerDownload = useCallback(() => {
    const a = document.createElement("a");
    a.href = resumeUrl;
    a.download = "";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }, [resumeUrl]);

  const startAnimation = useCallback(() => {
    setShowOverlay(true);
    setPhase(PHASES.GREET);

    setTimeout(() => setPhase(PHASES.COLLECT), 2400);
    setTimeout(() => setPhase(PHASES.TYPE), 5000);
    setTimeout(() => setPhase(PHASES.DOWNLOAD), 7500);
    setTimeout(() => {
      triggerDownload();
      setPhase(PHASES.DONE);
    }, 9000);
    setTimeout(() => {
      setShowOverlay(false);
      setPhase(PHASES.IDLE);
    }, 11500);
  }, [triggerDownload]);

  const bubbleText = BUBBLE_TEXT[phase];
  const showCharacter = phase !== PHASES.DONE && phase !== PHASES.IDLE;
  const showLaptop = phase === PHASES.TYPE || phase === PHASES.DOWNLOAD;

  const overlayContent = (
    <AnimatePresence>
      {showOverlay && (
        <motion.div
          className="resume-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          onClick={() => { setShowOverlay(false); setPhase(PHASES.IDLE); }}
        >
          <motion.div
            className="rd-stage"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {phase !== PHASES.DONE ? (
              <div className="rd-scene">
                {/* Speech bubble */}
                <div className="rd-bubble-zone">
                  <AnimatePresence mode="wait">
                    {bubbleText && <SpeechBubble key={phase} text={bubbleText} />}
                  </AnimatePresence>
                </div>

                {/* Main scene area */}
                <div className="rd-scene-content">
                  {/* Character image */}
                  {showCharacter && (
                    <motion.div
                      className="rd-character-wrap"
                      initial={{ x: -120, opacity: 0 }}
                      animate={{
                        x: 0,
                        opacity: 1,
                        rotate: phase === PHASES.GREET ? [0, -3, 3, -2, 2, 0] : 0,
                      }}
                      transition={{
                        x: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
                        opacity: { duration: 0.6 },
                        rotate: { duration: 1.4, ease: "easeInOut", delay: 0.8 },
                      }}
                    >
                      <img
                        src="/images/cartoon-girl.png"
                        alt="Cute assistant"
                        className="rd-character-img"
                        draggable={false}
                      />
                      {phase === PHASES.GREET && (
                        <motion.span
                          className="rd-wave-emoji"
                          animate={{
                            rotate: [0, 20, -15, 20, -10, 0],
                            scale: [1, 1.2, 1, 1.2, 1, 1],
                          }}
                          transition={{ duration: 1.2, ease: "easeInOut", delay: 1.0 }}
                        >
                          {"\uD83D\uDC4B"}
                        </motion.span>
                      )}
                    </motion.div>
                  )}

                  {/* Side panel for laptop / animations */}
                  <div className="rd-side-panel">
                    <AnimatePresence>
                      {showLaptop && <LaptopScreen key="laptop" />}
                    </AnimatePresence>

                    <AnimatePresence>
                      {phase === PHASES.DOWNLOAD && <FlyingFile key="file" />}
                    </AnimatePresence>

                    {phase === PHASES.COLLECT && (
                      <motion.div
                        className="rd-loading-dots"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <motion.span animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1.2, repeat: Infinity, delay: 0 }}>.</motion.span>
                        <motion.span animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }}>.</motion.span>
                        <motion.span animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }}>.</motion.span>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <SuccessView />
            )}

            {/* Progress bar */}
            <div className="rd-progress-track">
              <motion.div
                className="rd-progress-fill"
                animate={{
                  width: phase === PHASES.GREET ? "12%" :
                         phase === PHASES.COLLECT ? "35%" :
                         phase === PHASES.TYPE ? "60%" :
                         phase === PHASES.DOWNLOAD ? "88%" :
                         phase === PHASES.DONE ? "100%" : "0%"
                }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <button
        type="button"
        className="hero-primary resume-btn"
        onClick={startAnimation}
        data-cursor="link"
      >
        Download Resume
      </button>
      {createPortal(overlayContent, document.body)}
    </>
  );
};

export default ResumeDownload;
