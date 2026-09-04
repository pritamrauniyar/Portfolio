import React, { useState, useRef, useEffect, useCallback } from "react";
import sound from "../../utils/soundEngine";
import { useTheme } from "../../context/ThemeContext";
import "./InteractiveTerminal.css";

const COMMAND_LIST = [
  "help",
  "bio",
  "skills",
  "projects",
  "arch",
  "contact",
  "curl /contact",
  "theme",
  "sound",
  "sudo hire",
  "clear",
];

const WELCOME_MESSAGE = [
  { type: "system", text: "⚡ PritamOS v2.4.0 (x86_64-sde2-uber) [Interactive REPL]" },
  { type: "muted", text: "Type 'help' or click any quick command chip below to explore." },
];

export default function InteractiveTerminal({ isEmbedded = false, onOpenArch, onClose }) {
  const { theme, setTheme, availableThemes } = useTheme();
  const [history, setHistory] = useState(WELCOME_MESSAGE);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isSoundMuted, setIsSoundMuted] = useState(() => sound.isMuted());
  const inputRef = useRef(null);
  const terminalBodyRef = useRef(null);

  useEffect(() => {
    const unsub = sound.subscribe((muted) => setIsSoundMuted(muted));
    return unsub;
  }, []);

  // Auto-scroll on new output
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history]);

  const executeCommand = useCallback(
    (cmdRaw) => {
      const trimmed = cmdRaw.trim();
      if (!trimmed) return;

      sound.playClick();
      setCmdHistory((prev) => [trimmed, ...prev]);
      setHistoryIndex(-1);

      const parts = trimmed.split(" ");
      const root = parts[0].toLowerCase();
      const arg = parts.slice(1).join(" ").toLowerCase();

      const newEntries = [{ type: "prompt", text: `$ ${trimmed}` }];

      switch (root) {
        case "help":
          newEntries.push(
            { type: "output", text: "Available System Commands:" },
            { type: "accent", text: "  bio             " }, { type: "muted", text: " - Engineering background & current focus" },
            { type: "accent", text: "  skills          " }, { type: "muted", text: " - Tech stack & architecture proficiencies" },
            { type: "accent", text: "  projects        " }, { type: "muted", text: " - High-impact production systems shipped" },
            { type: "accent", text: "  arch [id]       " }, { type: "muted", text: " - Launch interactive SVG architecture diagram (e.g. 'arch ai-transcription')" },
            { type: "accent", text: "  curl /contact   " }, { type: "muted", text: " - HTTP JSON endpoint for direct hiring/reachout" },
            { type: "accent", text: "  theme [name]    " }, { type: "muted", text: " - Switch theme: obsidian | cyberpunk | matrix | dracula" },
            { type: "accent", text: "  sound [on|off]  " }, { type: "muted", text: " - Procedural Web Audio tactile haptics" },
            { type: "accent", text: "  sudo hire       " }, { type: "muted", text: " - Initiate senior hiring pipeline" },
            { type: "accent", text: "  clear           " }, { type: "muted", text: " - Clear terminal screen" }
          );
          break;

        case "bio":
          newEntries.push(
            { type: "highlight", text: "Pritam Rauniyar — Software Engineer II @ Uber / AI Engineer" },
            { type: "output", text: "• Previously: Ola Mobility, Elevate K-12." },
            { type: "output", text: "• Alma Mater: Motilal Nehru National Institute of Technology (MNNIT Allahabad)." },
            { type: "output", text: "• Specialty: Distributed Frontend Architecture, Micro-frontends, Real-time WebSockets, WebAudio, High-throughput Telemetry, and GenAI UI Workflows." },
            { type: "muted", text: "• Passion: Shaving milliseconds off FID/INP, designing bulletproof state graphs, and crafting tactile micro-interactions." }
          );
          break;

        case "skills":
          newEntries.push(
            { type: "accent", text: "┌── Frontend Core & Systems" },
            { type: "output", text: "│   React 19, TypeScript, Next.js, WebSockets, AudioWorklet, Canvas API, Web Workers" },
            { type: "accent", text: "├── State & Data Ingestion" },
            { type: "output", text: "│   Redux Toolkit, Zustand, React Query, SSE (Server-Sent Events), GraphQL" },
            { type: "accent", text: "├── Backend & Cloud" },
            { type: "output", text: "│   Node.js, Express, Go, Python, AWS (S3, CloudFront, Lambda), Docker, Redis" },
            { type: "accent", text: "└── Performance & Tooling" },
            { type: "output", text: "    Webpack 5, Vite, Turbopack, Core Web Vitals (LCP/INP/CLS), Jest, Vitest, Cypress" }
          );
          break;

        case "projects":
          newEntries.push(
            { type: "highlight", text: "Featured Engineering Systems:" },
            { type: "accent", text: "1. SplitHive — Distributed Real-Time Expense Ledger" },
            { type: "output", text: "   React Native + Expo -> Bi-directional Socket.IO -> O(V+E) Greedy Settlement -> MySQL Transactions" },
            { type: "muted", text: "   Try: 'arch splithive' to inspect the ledger blueprint." },
            { type: "accent", text: "2. Distributed AI Real-Time Transcription Pipeline" },
            { type: "output", text: "   AudioWorklet 16kHz PCM downsampler -> WebSocket stream -> Whisper Inference -> SSE Virtualized UI" },
            { type: "muted", text: "   Try: 'arch ai-transcription' to inspect the live data pipeline." },
            { type: "accent", text: "3. High-Throughput Network Inspector & Diagnostic Engine" },
            { type: "output", text: "   PerformanceObserver -> Web Worker Aggregator -> Circular Buffer -> IndexedDB -> 60fps Telemetry" },
            { type: "muted", text: "   Try: 'arch net-inspector' to inspect the engine blueprint." },
            { type: "accent", text: "4. Uber High-Scale Dispatch & Fleet Telemetry" },
            { type: "output", text: "   Sub-second geospatial dispatch interfaces powering high-concurrency urban mobility workflows." }
          );
          break;

        case "arch": {
          const target = arg || "ai-transcription";
          newEntries.push(
            { type: "system", text: `Launching Architecture Blueprint for [${target}]...` }
          );
          if (typeof window !== "undefined") {
            window.dispatchEvent(new CustomEvent("open-arch-modal", { detail: target }));
          }
          if (onOpenArch) {
            onOpenArch(target);
          }
          sound.playSuccess();
          break;
        }

        case "contact":
        case "curl":
          if (root === "curl" && !trimmed.includes("/contact")) {
            newEntries.push({ type: "error", text: "Usage: curl /contact" });
          } else {
            newEntries.push(
              { type: "system", text: "HTTP/1.1 200 OK (Content-Type: application/json)" },
              {
                type: "code",
                text: JSON.stringify(
                  {
                    name: "Pritam Rauniyar",
                    role: "Software Engineer II @ Uber",
                    email: "pritamrauniyar2912@gmail.com",
                    github: "https://github.com/pritamrauniyar",
                    linkedin: "https://www.linkedin.com/in/pritam-rauniyar/",
                    location: "Bangalore, India",
                    status: "Open to Staff/Senior Engineering opportunities",
                  },
                  null,
                  2
                ),
              }
            );
          }
          break;

        case "theme": {
          if (!arg) {
            newEntries.push(
              { type: "output", text: `Current Theme: [${theme}]` },
              { type: "muted", text: `Available themes: ${availableThemes.map((t) => t.id).join(", ")}` },
              { type: "muted", text: "Usage: theme <name> (e.g. 'theme matrix')" }
            );
          } else if (availableThemes.some((t) => t.id === arg)) {
            setTheme(arg);
            newEntries.push({ type: "system", text: `Theme switched to [${arg}]. Dynamic stylesheet applied.` });
          } else {
            newEntries.push({
              type: "error",
              text: `Unknown theme '${arg}'. Valid: ${availableThemes.map((t) => t.id).join(", ")}`,
            });
          }
          break;
        }

        case "sound": {
          if (arg === "on" || arg === "enable") {
            if (isSoundMuted) sound.toggleMute();
            newEntries.push({ type: "system", text: "Procedural Web Audio haptics: ENABLED (0 kB assets)" });
          } else if (arg === "off" || arg === "disable") {
            if (!isSoundMuted) sound.toggleMute();
            newEntries.push({ type: "system", text: "Procedural Web Audio haptics: DISABLED (muted)" });
          } else {
            const status = isSoundMuted ? "DISABLED" : "ENABLED";
            newEntries.push({
              type: "output",
              text: `Sound is currently ${status}. Toggle with: 'sound on' or 'sound off'`,
            });
          }
          break;
        }

        case "sudo":
          if (arg.includes("hire")) {
            sound.playSuccess();
            newEntries.push(
              { type: "highlight", text: "🌟 [AUTHENTICATED: ROOT PRIVILEGES GRANTED]" },
              { type: "system", text: "Redirecting to high-priority candidate pipeline..." },
              { type: "accent", text: "Email: pritamrauniyar2912@gmail.com" },
              { type: "output", text: "Direct calendar/intro link: let's build groundbreaking products together." }
            );
            setTimeout(() => {
              window.location.href = "mailto:pritamrauniyar2912@gmail.com?subject=Senior%20Engineering%20Opportunity%20-%20Pritam%20Rauniyar";
            }, 1200);
          } else {
            newEntries.push({ type: "error", text: `User 'guest' is not in sudoers file. Incident reported. Try 'sudo hire'.` });
          }
          break;

        case "matrix":
          setTheme("matrix");
          newEntries.push(
            { type: "highlight", text: "Wake up, Neo... The Matrix has you." },
            { type: "system", text: "Matrix phosphor green theme activated." }
          );
          break;

        case "clear":
          setHistory([]);
          return;

        default:
          newEntries.push({
            type: "error",
            text: `command not found: ${trimmed}. Type 'help' to see valid commands.`,
          });
          break;
      }

      setHistory((prev) => [...prev, ...newEntries]);
    },
    [availableThemes, isSoundMuted, onOpenArch, setTheme, theme]
  );

  const handleKeyDown = (e) => {
    sound.playKey();

    if (e.key === "Enter") {
      e.preventDefault();
      executeCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length > 0) {
        const nextIdx = Math.min(historyIndex + 1, cmdHistory.length - 1);
        setHistoryIndex(nextIdx);
        setInput(cmdHistory[nextIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInput(cmdHistory[nextIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const current = input.toLowerCase();
      const match = COMMAND_LIST.find((c) => c.startsWith(current));
      if (match) {
        setInput(match);
      }
    }
  };

  const chips = ["help", "bio", "skills", "projects", "arch splithive", "arch ai-transcription", "sudo hire"];

  return (
    <div className={`terminal-container ${isEmbedded ? "embedded" : ""}`}>
      {/* Terminal Titlebar */}
      <div className="terminal-titlebar">
        <div className="terminal-traffic-lights">
          <span
            className="traffic-light close"
            title="Clear or Close"
            onClick={() => {
              sound.playClick();
              if (onClose) onClose();
              else setHistory([]);
            }}
          />
          <span
            className="traffic-light minimize"
            title="Clear output"
            onClick={() => {
              sound.playClick();
              setHistory(WELCOME_MESSAGE);
            }}
          />
          <span
            className="traffic-light maximize"
            title="Matrix Mode"
            onClick={() => {
              sound.playSuccess();
              setTheme(theme === "matrix" ? "obsidian" : "matrix");
            }}
          />
        </div>
        <div className="terminal-title">
          <span className="terminal-title-icon">⚡</span> pritam@uber-macbook-pro: ~ (zsh)
        </div>
        <div className="terminal-status-indicator">
          <span className="terminal-status-dot" />
          <span className="terminal-status-text">LIVE REPL</span>
        </div>
      </div>

      {/* Terminal Body */}
      <div
        className="terminal-body"
        ref={terminalBodyRef}
        onClick={() => inputRef.current?.focus()}
        data-lenis-prevent="true"
      >
        {history.map((item, idx) => {
          if (item.type === "prompt") {
            return (
              <div key={idx} className="terminal-line prompt-line">
                <span className="terminal-prompt-sym">➜</span>
                <span className="terminal-prompt-path">~</span>
                <span className="terminal-prompt-cmd">{item.text}</span>
              </div>
            );
          }
          if (item.type === "code") {
            return (
              <pre key={idx} className="terminal-code-block">
                {item.text}
              </pre>
            );
          }
          return (
            <div key={idx} className={`terminal-line line-${item.type || "output"}`}>
              {item.text}
            </div>
          );
        })}

        {/* Active Input Line */}
        <div className="terminal-line input-line">
          <span className="terminal-prompt-sym">➜</span>
          <span className="terminal-prompt-path">~</span>
          <input
            ref={inputRef}
            type="text"
            className="terminal-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type 'help'..."
            spellCheck="false"
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
          />
          <span className="terminal-cursor" aria-hidden="true" />
        </div>
      </div>

      {/* Quick Action Chips */}
      <div className="terminal-chips">
        <span className="chips-label">Quick run:</span>
        {chips.map((chip) => (
          <button
            key={chip}
            type="button"
            className="terminal-chip"
            onClick={() => executeCommand(chip)}
            onMouseEnter={() => sound.playHover()}
          >
            {chip}
          </button>
        ))}
      </div>
    </div>
  );
}

