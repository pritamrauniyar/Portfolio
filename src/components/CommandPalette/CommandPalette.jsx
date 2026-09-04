import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaSearch,
  FaHome,
  FaProjectDiagram,
  FaCertificate,
  FaBookOpen,
  FaUser,
  FaEnvelope,
  FaDownload,
  FaCopy,
  FaLinkedin,
  FaGithub,
  FaCheck,
  FaExternalLinkAlt,
  FaPalette,
  FaVolumeUp,
  FaChartLine,
  FaMicrochip,
} from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";
import sound from "../../utils/soundEngine";
import "./CommandPalette.css";

const BASE_COMMANDS = [
  // Navigation
  { id: "nav-home", title: "Home", section: "Navigation", icon: FaHome, action: "navigate", path: "/" },
  { id: "nav-projects", title: "Projects", section: "Navigation", icon: FaProjectDiagram, action: "navigate", path: "/project" },
  { id: "nav-certificates", title: "Certificates", section: "Navigation", icon: FaCertificate, action: "navigate", path: "/certificates" },
  { id: "nav-blogs", title: "Blogs", section: "Navigation", icon: FaBookOpen, action: "navigate", path: "/blogs" },
  { id: "nav-about", title: "About", section: "Navigation", icon: FaUser, action: "navigate", path: "/about" },
  { id: "nav-contact", title: "Contact", section: "Navigation", icon: FaEnvelope, action: "navigate", path: "/contact" },

  // Engineering Architecture Deep Dives
  { id: "arch-ai", title: "Architecture Blueprint: Real-Time AI Audio Pipeline", section: "Architecture", icon: FaMicrochip, action: "arch", target: "ai-transcription" },
  { id: "arch-net", title: "Architecture Blueprint: Network Diagnostic Engine (Zero-GC)", section: "Architecture", icon: FaMicrochip, action: "arch", target: "net-inspector" },

  // Engineering DevTools & Controls
  { id: "act-hud", title: "Toggle Engineering Telemetry HUD (Ctrl+I)", section: "DevTools", icon: FaChartLine, action: "hud" },
  { id: "act-sound", title: "Toggle Procedural Sound Engine (Web Audio)", section: "DevTools", icon: FaVolumeUp, action: "sound" },

  // Themes
  { id: "theme-obsidian", title: "Theme: Obsidian (Cosmic Violet & Cyan)", section: "Themes", icon: FaPalette, action: "theme", theme: "obsidian" },
  { id: "theme-cyberpunk", title: "Theme: Cyberpunk (Neon Yellow & Hot Pink)", section: "Themes", icon: FaPalette, action: "theme", theme: "cyberpunk" },
  { id: "theme-matrix", title: "Theme: Matrix (CRT Terminal Phosphor Green)", section: "Themes", icon: FaPalette, action: "theme", theme: "matrix" },
  { id: "theme-dracula", title: "Theme: Dracula (Curated Vampire Dark)", section: "Themes", icon: FaPalette, action: "theme", theme: "dracula" },

  // Quick Actions
  { id: "act-resume", title: "Download Resume (PDF)", section: "Quick Actions", icon: FaDownload, action: "resume" },
  { id: "act-copy-email", title: "Copy Email: pritamrauniyar2912@gmail.com", section: "Quick Actions", icon: FaCopy, action: "copy-email" },
  { id: "act-linkedin", title: "LinkedIn Profile", section: "Socials", icon: FaLinkedin, action: "link", url: "https://www.linkedin.com/in/pritam-rauniyar/" },
  { id: "act-github", title: "GitHub Profile", section: "Socials", icon: FaGithub, action: "link", url: "https://github.com/pritamrauniyar" },

  // Featured Projects
  { id: "proj-ai-transcription", title: "AI Transcription App (Live)", section: "Featured Projects", icon: FaExternalLinkAlt, action: "link", url: "https://ai-transcription.pritamrauniyar.com.np/" },
  { id: "proj-net-inspector", title: "Net Inspector Dashboard (Live)", section: "Featured Projects", icon: FaExternalLinkAlt, action: "link", url: "https://www.net-inspector.pritamrauniyar.com.np/" },
];

const CommandPalette = ({ isOpen, onClose, onOpenHud }) => {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const navigate = useNavigate();
  const { setTheme } = useTheme();

  const filteredCommands = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return BASE_COMMANDS;
    return BASE_COMMANDS.filter((cmd) => {
      const matchTitle = cmd.title.toLowerCase().includes(q);
      const matchSection = cmd.section.toLowerCase().includes(q);
      return matchTitle || matchSection;
    });
  }, [query]);

  // Reset selectedIndex when filtered results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredCommands]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const executeCommand = useCallback(
    (cmd) => {
      if (!cmd) return;
      sound.playClick();

      if (cmd.action === "navigate") {
        navigate(cmd.path);
        onClose();
      } else if (cmd.action === "link") {
        window.open(cmd.url, "_blank", "noopener,noreferrer");
        onClose();
      } else if (cmd.action === "copy-email") {
        sound.playSuccess();
        navigator.clipboard.writeText("pritamrauniyar2912@gmail.com");
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
          onClose();
        }, 1200);
      } else if (cmd.action === "resume") {
        sound.playSuccess();
        const link = document.createElement("a");
        link.href = "/PritamRauniyarResume.pdf";
        link.download = "PritamRauniyarResume.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        onClose();
      } else if (cmd.action === "theme") {
        setTheme(cmd.theme);
        onClose();
      } else if (cmd.action === "sound") {
        sound.toggleMute();
        onClose();
      } else if (cmd.action === "hud") {
        onClose();
        onOpenHud?.();
      } else if (cmd.action === "arch") {
        onClose();
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("open-arch-modal", { detail: cmd.target }));
        }
      }
    },
    [navigate, onClose, onOpenHud, setTheme]
  );

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      sound.playHover();
      setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      sound.playHover();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        executeCommand(filteredCommands[selectedIndex]);
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    }
  };

  // Scroll active item into view
  useEffect(() => {
    if (!listRef.current) return;
    const activeEl = listRef.current.querySelector(`[data-index="${selectedIndex}"]`);
    if (activeEl) {
      activeEl.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="cmd-backdrop" onClick={onClose} role="presentation">
          <motion.div
            className="cmd-dialog"
            role="dialog"
            aria-modal="true"
            aria-label="Command Palette"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div className="cmd-header">
              <FaSearch className="cmd-search-icon" aria-hidden="true" />
              <input
                ref={inputRef}
                type="text"
                className="cmd-input"
                placeholder="Type a command (e.g. 'arch', 'theme', 'skills', 'hud')..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                aria-autocomplete="list"
              />
              <kbd className="cmd-esc-badge" onClick={onClose}>
                ESC
              </kbd>
            </div>

            {copied && (
              <div className="cmd-copy-alert">
                <FaCheck /> Email copied: pritamrauniyar2912@gmail.com
              </div>
            )}

            <div className="cmd-list" ref={listRef} role="listbox">
              {filteredCommands.length === 0 ? (
                <div className="cmd-empty">No results found for &ldquo;{query}&rdquo;</div>
              ) : (
                filteredCommands.map((cmd, idx) => {
                  const Icon = cmd.icon;
                  const isSelected = idx === selectedIndex;
                  return (
                    <div
                      key={cmd.id}
                      data-index={idx}
                      className={`cmd-item ${isSelected ? "selected" : ""}`}
                      onClick={() => executeCommand(cmd)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      role="option"
                      aria-selected={isSelected}
                    >
                      <div className="cmd-item-left">
                        <span className="cmd-icon-wrap">
                          <Icon />
                        </span>
                        <span className="cmd-item-title">{cmd.title}</span>
                      </div>
                      <span className="cmd-item-section">{cmd.section}</span>
                    </div>
                  );
                })
              )}
            </div>

            <div className="cmd-footer">
              <div className="cmd-hint">
                <kbd>↑</kbd> <kbd>↓</kbd> Navigate
              </div>
              <div className="cmd-hint">
                <kbd>↵</kbd> Select
              </div>
              <div className="cmd-hint">
                <kbd>esc</kbd> Dismiss
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
