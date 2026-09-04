import { Link, useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { FaSearch } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";
import sound from "../../utils/soundEngine";
import "./Navbar.css";

const links = [
  { label: "Home", to: "/" },
  { label: "Certificates", to: "/certificates" },
  { label: "Projects", to: "/project" },
  { label: "Blogs", to: "/blogs" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const Navbar = ({ onOpenCmd, onOpenHud }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const activePath = useMemo(() => location.pathname, [location.pathname]);
  const { theme, cycleTheme, availableThemes } = useTheme();
  const [isSoundMuted, setIsSoundMuted] = useState(() => sound.isMuted());

  useEffect(() => {
    const unsub = sound.subscribe((muted) => setIsSoundMuted(muted));
    return unsub;
  }, []);

  const activeThemeObj = availableThemes.find((t) => t.id === theme) || availableThemes[0];

  const { scrollY } = useScroll();
  const navBg = useTransform(
    scrollY,
    [0, 120],
    ["rgba(10, 10, 28, 0.55)", "rgba(10, 10, 28, 0.95)"]
  );
  const navBlur = useTransform(scrollY, [0, 120], [12, 24]);
  const navShadow = useTransform(
    scrollY,
    [0, 120],
    ["0 4px 20px rgba(7,5,23,0.15)", "0 16px 40px rgba(7,5,23,0.55)"]
  );

  useEffect(() => {
    setIsOpen(false);
  }, [activePath]);

  return (
    <motion.nav
      className="navbar"
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        background: navBg,
        backdropFilter: useTransform(navBlur, (v) => `blur(${v}px)`),
        WebkitBackdropFilter: useTransform(navBlur, (v) => `blur(${v}px)`),
        boxShadow: navShadow,
      }}
    >
      <div className="nav-content section-wrapper">
        <Link
          to="/"
          className="brand"
          aria-label="Back to home"
          onClick={() => sound.playClick()}
        >
          <span className="brand-glow" aria-hidden="true" />
          <span className="brand-icon">
            <svg width="32" height="32" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 7L2 14L8 21" stroke="#c8bbff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M20 7L26 14L20 21" stroke="#00c4ff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              <text x="14" y="18.5" textAnchor="middle" fill="#f4f5ff" fontFamily="Space Grotesk, sans-serif" fontSize="12" fontWeight="700">P</text>
            </svg>
          </span>
          <span className="brand-name">Pritam</span>
          <span className="brand-dot" />
        </Link>

        <ul className="nav-links">
          {links.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className={activePath === link.to ? "active" : ""}
                data-cursor="link"
                onClick={() => sound.playClick()}
                onMouseEnter={() => sound.playHover()}
              >
                {link.label}
                {activePath === link.to && (
                  <motion.span
                    className="nav-active-pill"
                    layoutId="nav-active-indicator"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          {/* Sound FX Toggle */}
          <button
            className={`nav-action-btn sound-btn ${!isSoundMuted ? "sound-active" : ""}`}
            onClick={() => sound.toggleMute()}
            onMouseEnter={() => sound.playHover()}
            type="button"
            aria-label="Toggle procedural sound effects"
            title={isSoundMuted ? "Sound: Muted (Click to Enable Audio Haptics)" : "Sound: Active (0 kB Web Audio)"}
          >
            {isSoundMuted ? (
              <span className="sound-muted-icon">🔇</span>
            ) : (
              <span className="nav-equalizer">
                <span className="eq-bar bar-1" />
                <span className="eq-bar bar-2" />
                <span className="eq-bar bar-3" />
              </span>
            )}
          </button>

          {/* Theme Switcher */}
          <button
            className="nav-action-btn theme-btn"
            onClick={cycleTheme}
            onMouseEnter={() => sound.playHover()}
            type="button"
            aria-label={`Current Theme: ${activeThemeObj.label}. Click to cycle theme`}
            title={`Theme: ${activeThemeObj.label} (${activeThemeObj.description})`}
          >
            <span className="theme-icon">{activeThemeObj.icon}</span>
            <span className="theme-label">{activeThemeObj.label}</span>
          </button>

          {/* Engineering HUD Launcher */}
          {onOpenHud && (
            <button
              className="nav-action-btn hud-launcher-btn"
              onClick={() => {
                sound.playClick();
                onOpenHud();
              }}
              onMouseEnter={() => sound.playHover()}
              type="button"
              aria-label="Open Engineering Telemetry HUD"
              title="Open Real-Time Engineering HUD (Ctrl+I)"
            >
              <span className="hud-badge-dot" />
              <span className="hud-launcher-text">HUD</span>
            </button>
          )}

          {/* Command Palette Launcher */}
          <button
            className="nav-cmd-btn"
            onClick={() => {
              sound.playClick();
              onOpenCmd?.();
            }}
            onMouseEnter={() => sound.playHover()}
            type="button"
            aria-label="Open Command Palette"
            title="Search or jump to page (Cmd+K or Ctrl+K)"
            data-cursor="link"
          >
            <FaSearch className="nav-cmd-icon" aria-hidden="true" />
            <span className="nav-cmd-label">Search</span>
            <kbd className="nav-cmd-kbd">⌘K</kbd>
          </button>

          <button
            className={isOpen ? "nav-toggle is-open" : "nav-toggle"}
            onClick={() => {
              sound.playClick();
              setIsOpen((open) => !open);
            }}
            aria-label="Toggle navigation"
            aria-expanded={isOpen}
            type="button"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            className="nav-mobile"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <li className="nav-mobile-cmd">
              <button
                className="nav-mobile-cmd-btn"
                onClick={() => {
                  sound.playClick();
                  setIsOpen(false);
                  onOpenCmd?.();
                }}
                type="button"
              >
                <FaSearch /> Search / Commands (⌘K)
              </button>
            </li>
            <li className="nav-mobile-tools">
              <button
                className="nav-mobile-tool-btn"
                onClick={() => {
                  sound.toggleMute();
                }}
                type="button"
              >
                {isSoundMuted ? "🔇 Audio Haptics: Off" : "🔊 Audio Haptics: On"}
              </button>
              <button
                className="nav-mobile-tool-btn"
                onClick={() => {
                  cycleTheme();
                }}
                type="button"
              >
                {activeThemeObj.icon} Theme: {activeThemeObj.label}
              </button>
              {onOpenHud && (
                <button
                  className="nav-mobile-tool-btn"
                  onClick={() => {
                    setIsOpen(false);
                    onOpenHud();
                  }}
                  type="button"
                >
                  📊 Open Engineering HUD
                </button>
              )}
            </li>
            {links.map((link) => (
              <li key={`${link.to}-mobile`}>
                <Link
                  to={link.to}
                  className={activePath === link.to ? "active" : ""}
                  onClick={() => sound.playClick()}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
