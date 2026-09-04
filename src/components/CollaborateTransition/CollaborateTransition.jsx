import { useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import sound from "../../utils/soundEngine";
import "./CollaborateTransition.css";

const PHASES = {
  IDLE: "idle",
  ENTER: "enter",
  TRAIN: "train",
  BOARD: "board",
  DEPART: "depart",
};

const BUBBLE = {
  enter: "Ready to collaborate? Let\u2019s go! \uD83D\uDE80",
  train: "Oh, here comes our ride! \uD83D\uDE82",
  board: "All aboard! Next stop: Contact! \uD83C\uDF1F",
};

const SpeechBubble = ({ text }) => (
  <motion.div
    className="ct-bubble"
    initial={{ opacity: 0, scale: 0.5, y: 8 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.5, y: 8 }}
    transition={{ duration: 0.35, ease: "backOut" }}
  >
    <span className="ct-bubble-text">{text}</span>
    <span className="ct-bubble-tail" />
  </motion.div>
);

const TrainSVG = () => (
  <svg viewBox="0 0 420 160" className="ct-train-svg" fill="none">
    {/* Track */}
    <rect x="0" y="148" width="420" height="4" rx="2" fill="#5C4A3A" />
    <g>
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360, 390].map((x) => (
        <rect key={x} x={x + 5} y="152" width="16" height="3" rx="1" fill="#4A3728" opacity="0.6" />
      ))}
    </g>

    {/* ── Passenger car (back) ── */}
    <g>
      <rect x="210" y="58" width="190" height="88" rx="12" fill="#4A90D9" stroke="#2B6CB0" strokeWidth="2.5" />
      <rect x="210" y="58" width="190" height="22" rx="12" fill="#3B7DD8" stroke="#2B6CB0" strokeWidth="2" />
      <rect x="210" y="74" width="190" height="6" fill="#3B7DD8" />
      {/* Roof accent */}
      <rect x="225" y="53" width="160" height="8" rx="4" fill="#5BA3E6" opacity="0.5" />
      {/* Windows */}
      {[232, 272, 312, 352].map((wx) => (
        <g key={wx}>
          <rect x={wx} y="86" width="28" height="28" rx="6" fill="#E8F4FD" stroke="#2B6CB0" strokeWidth="2" />
          <rect x={wx + 3} y="89" width="22" height="10" rx="3" fill="#B8DFFB" opacity="0.6" />
        </g>
      ))}
      {/* Door */}
      <rect x="298" y="82" width="24" height="48" rx="4" fill="#2B6CB0" stroke="#1A4A7A" strokeWidth="2" />
      <circle cx="318" cy="106" r="2.5" fill="#FFD700" />
      {/* Connector */}
      <rect x="200" y="90" width="14" height="20" rx="3" fill="#8E8E93" stroke="#6E6E73" strokeWidth="1.5" />
      {/* Wheels */}
      <circle cx="240" cy="148" r="12" fill="#3A3A3A" stroke="#1A1A1A" strokeWidth="2.5" />
      <circle cx="240" cy="148" r="5" fill="#6E6E73" />
      <circle cx="370" cy="148" r="12" fill="#3A3A3A" stroke="#1A1A1A" strokeWidth="2.5" />
      <circle cx="370" cy="148" r="5" fill="#6E6E73" />
    </g>

    {/* ── Locomotive (front) ── */}
    <g>
      <rect x="20" y="50" width="185" height="96" rx="14" fill="#E85D3A" stroke="#C44A2A" strokeWidth="2.5" />
      <rect x="20" y="50" width="185" height="26" rx="14" fill="#F06B48" stroke="#C44A2A" strokeWidth="2" />
      <rect x="20" y="70" width="185" height="6" fill="#F06B48" />
      {/* Roof */}
      <rect x="40" y="42" width="150" height="12" rx="6" fill="#F28060" opacity="0.5" />
      {/* Cab window */}
      <rect x="38" y="82" width="60" height="36" rx="8" fill="#FFF5E0" stroke="#C44A2A" strokeWidth="2.5" />
      <rect x="42" y="86" width="52" height="14" rx="4" fill="#FFEABC" opacity="0.6" />
      {/* Side panels */}
      <rect x="115" y="82" width="36" height="36" rx="6" fill="#C44A2A" opacity="0.4" />
      <rect x="160" y="82" width="36" height="36" rx="6" fill="#C44A2A" opacity="0.4" />
      {/* Headlight */}
      <circle cx="30" cy="100" r="8" fill="#FFD700" stroke="#DAA520" strokeWidth="2" />
      <circle cx="30" cy="100" r="4" fill="#FFF5CC" />
      {/* Smokestack */}
      <rect x="155" y="26" width="20" height="26" rx="4" fill="#3A3A3A" stroke="#1A1A1A" strokeWidth="2" />
      <ellipse cx="165" cy="26" rx="14" ry="5" fill="#4A4A4A" stroke="#1A1A1A" strokeWidth="1.5" />
      {/* Animated smoke puffs */}
      <motion.circle cx="165" cy="18" r="6" fill="#D4D4D4" opacity="0.6"
        animate={{ cy: [18, -5, -30], r: [6, 10, 14], opacity: [0.6, 0.4, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }} />
      <motion.circle cx="158" cy="14" r="5" fill="#D4D4D4" opacity="0.5"
        animate={{ cy: [14, -8, -35], cx: [158, 152, 148], r: [5, 8, 12], opacity: [0.5, 0.3, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut", delay: 0.6 }} />
      <motion.circle cx="172" cy="16" r="4" fill="#D4D4D4" opacity="0.4"
        animate={{ cy: [16, -2, -28], cx: [172, 178, 182], r: [4, 7, 11], opacity: [0.4, 0.25, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut", delay: 1.1 }} />
      {/* Cowcatcher */}
      <path d="M10 146 L22 130 L22 146 Z" fill="#8E8E93" stroke="#6E6E73" strokeWidth="2" />
      {/* Wheels */}
      <circle cx="60" cy="148" r="14" fill="#3A3A3A" stroke="#1A1A1A" strokeWidth="2.5" />
      <circle cx="60" cy="148" r="6" fill="#6E6E73" />
      <circle cx="120" cy="148" r="14" fill="#3A3A3A" stroke="#1A1A1A" strokeWidth="2.5" />
      <circle cx="120" cy="148" r="6" fill="#6E6E73" />
      <circle cx="175" cy="148" r="12" fill="#3A3A3A" stroke="#1A1A1A" strokeWidth="2.5" />
      <circle cx="175" cy="148" r="5" fill="#6E6E73" />
    </g>

    {/* ── "COLLAB EXPRESS" text on locomotive ── */}
    <text x="112" y="134" textAnchor="middle" fill="#FFF5E0" fontSize="10"
      fontFamily="Space Grotesk, sans-serif" fontWeight="700" letterSpacing="0.08em">
      COLLAB EXPRESS
    </text>
  </svg>
);

const GroundLine = () => (
  <div className="ct-ground">
    <div className="ct-ground-line" />
    {[...Array(24)].map((_, i) => (
      <span key={i} className="ct-ground-tie" style={{ left: `${i * 4.2}%` }} />
    ))}
  </div>
);

const CollaborateTransition = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState(PHASES.IDLE);
  const [showOverlay, setShowOverlay] = useState(false);

  const startAnimation = useCallback(() => {
    setShowOverlay(true);
    setPhase(PHASES.ENTER);

    setTimeout(() => setPhase(PHASES.TRAIN), 2000);
    setTimeout(() => setPhase(PHASES.BOARD), 4200);
    setTimeout(() => setPhase(PHASES.DEPART), 5800);
    setTimeout(() => {
      setShowOverlay(false);
      setPhase(PHASES.IDLE);
      navigate("/contact");
    }, 7500);
  }, [navigate]);

  const bubbleText = BUBBLE[phase];
  const showGirl = phase === PHASES.ENTER || phase === PHASES.TRAIN || phase === PHASES.BOARD;
  const showTrain = phase === PHASES.TRAIN || phase === PHASES.BOARD || phase === PHASES.DEPART;

  const girlX = (() => {
    if (phase === PHASES.ENTER) return 0;
    if (phase === PHASES.TRAIN) return 0;
    if (phase === PHASES.BOARD) return 160;
    return 0;
  })();

  const trainX = (() => {
    if (phase === PHASES.TRAIN) return 0;
    if (phase === PHASES.BOARD) return 0;
    if (phase === PHASES.DEPART) return 800;
    return 600;
  })();

  const overlayContent = (
    <AnimatePresence>
      {showOverlay && (
        <motion.div
          className="ct-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          onClick={() => { setShowOverlay(false); setPhase(PHASES.IDLE); }}
        >
          <motion.div
            className="ct-stage"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="ct-scene">
              {/* Bubble zone */}
              <div className="ct-bubble-zone">
                <AnimatePresence mode="wait">
                  {bubbleText && <SpeechBubble key={phase} text={bubbleText} />}
                </AnimatePresence>
              </div>

              {/* Animation area */}
              <div className="ct-animation-area">
                {/* Girl */}
                <AnimatePresence>
                  {showGirl && (
                    <motion.div
                      className="ct-girl-wrap"
                      initial={{ x: -200, opacity: 0 }}
                      animate={{ x: girlX, opacity: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                      <motion.img
                        src="/images/cartoon-girl.png"
                        alt="Cute assistant"
                        className="ct-girl-img"
                        draggable={false}
                        animate={phase === PHASES.ENTER ? {
                          rotate: [0, -2, 2, -1, 1, 0],
                        } : {}}
                        transition={{ duration: 1.2, ease: "easeInOut", delay: 0.5 }}
                      />
                      {phase === PHASES.ENTER && (
                        <motion.span
                          className="ct-wave-emoji"
                          animate={{
                            rotate: [0, 20, -15, 20, -10, 0],
                            scale: [1, 1.2, 1, 1.2, 1, 1],
                          }}
                          transition={{ duration: 1.2, ease: "easeInOut", delay: 0.6 }}
                        >
                          {"\uD83D\uDC4B"}
                        </motion.span>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Train */}
                <AnimatePresence>
                  {showTrain && (
                    <motion.div
                      className="ct-train-wrap"
                      initial={{ x: 600 }}
                      animate={{ x: trainX }}
                      exit={{ x: 1200 }}
                      transition={{
                        duration: phase === PHASES.DEPART ? 1.5 : 1.2,
                        ease: phase === PHASES.DEPART
                          ? [0.4, 0, 1, 1]
                          : [0.25, 0.46, 0.45, 0.94],
                      }}
                    >
                      <TrainSVG />
                    </motion.div>
                  )}
                </AnimatePresence>

                <GroundLine />
              </div>
            </div>

            {/* Progress bar */}
            <div className="ct-progress-track">
              <motion.div
                className="ct-progress-fill"
                animate={{
                  width: phase === PHASES.ENTER ? "15%" :
                         phase === PHASES.TRAIN ? "40%" :
                         phase === PHASES.BOARD ? "70%" :
                         phase === PHASES.DEPART ? "100%" : "0%"
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
        className="hero-secondary ct-btn"
        onClick={() => {
          sound.playSuccess();
          startAnimation();
        }}
        onMouseEnter={() => sound.playHover()}
        data-cursor="link"
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
        <span className="btn-arrow" aria-hidden="true">→</span>
      </button>
      {createPortal(overlayContent, document.body)}
    </>
  );
};

export default CollaborateTransition;
