import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  ReactIcon, AngularIcon, JavaScriptIcon, TypeScriptIcon,
  GoIcon, NodeIcon, FusionIcon, NextJSIcon, RxJSIcon,
  AzureIcon, AWSIcon, GitIcon, SQLIcon, DynamoDBIcon,
  CppIcon, JavaIcon, HTMLCSSIcon, CIcon, PostmanIcon,
  JiraIcon, DocstoreIcon, GrafanaIcon, StudioAPIIcon,
  PlaywrightIcon, CodexIcon, ClaudeIcon, CursorIcon, RESTIcon,
} from "../SvgIcons/TechIcons";
import sound from "../../utils/soundEngine";
import "./TechMarquee.css";

const TECH = [
  { name: "React", Icon: ReactIcon, color: "#61DAFB", category: "frontend",
    desc: "Hooks, Context, Performance optimization, Server components",
    tags: ["Redux", "React Query", "Testing Library"] },
  { name: "TypeScript", Icon: TypeScriptIcon, color: "#3178C6", category: "frontend",
    desc: "Type-safe applications at enterprise scale",
    tags: ["Generics", "Utility Types", "Declaration Files"] },
  { name: "JavaScript", Icon: JavaScriptIcon, color: "#F7DF1E", category: "frontend",
    desc: "ES2024+, async patterns, Web APIs",
    tags: ["Closures", "Promises", "Web Workers"] },
  { name: "Go", Icon: GoIcon, color: "#00ADD8", category: "backend",
    desc: "Goroutines, channels, high-throughput services",
    tags: ["gRPC", "Concurrency", "HTTP Services"] },
  { name: "Node.js", Icon: NodeIcon, color: "#339933", category: "backend",
    desc: "Express, Fastify, Streams, Worker threads",
    tags: ["REST APIs", "Middleware", "Microservices"] },
  { name: "Angular", Icon: AngularIcon, color: "#DD0031", category: "frontend",
    desc: "RxJS-driven SPAs, lazy loading, NgRx",
    tags: ["Directives", "Modules", "Change Detection"] },
  { name: "Next.js", Icon: NextJSIcon, color: "#AAAAAA", category: "frontend",
    desc: "SSR/SSG, API routes, Middleware, ISR",
    tags: ["App Router", "Image Opt", "Edge Runtime"] },
  { name: "Fusion.js", Icon: FusionIcon, color: "#7B5CFF", category: "frontend",
    desc: "Universal rendering, plugin architecture",
    tags: ["Code Splitting", "SSR", "Dependency Injection"] },
  { name: "RxJS", Icon: RxJSIcon, color: "#B7178C", category: "frontend",
    desc: "Observables, operators, reactive state",
    tags: ["Subjects", "Operators", "Event Streams"] },
  { name: "AWS", Icon: AWSIcon, color: "#FF9900", category: "cloud",
    desc: "Lambda, S3, DynamoDB, CloudFront, ECS",
    tags: ["Serverless", "CDN", "IAM"] },
  { name: "Azure", Icon: AzureIcon, color: "#0078D4", category: "cloud",
    desc: "App Service, Functions, DevOps pipelines",
    tags: ["Cosmos DB", "CI/CD", "Blob Storage"] },
  { name: "Git", Icon: GitIcon, color: "#F05032", category: "tools",
    desc: "Branching strategies, rebasing, CI/CD hooks",
    tags: ["Monorepo", "Git Flow", "Hooks"] },
  { name: "SQL", Icon: SQLIcon, color: "#4479A1", category: "database",
    desc: "Complex queries, optimization, indexing",
    tags: ["Joins", "Views", "Migrations"] },
  { name: "DynamoDB", Icon: DynamoDBIcon, color: "#4053D6", category: "database",
    desc: "Single-table design, GSI, Streams, TTL",
    tags: ["NoSQL", "Partitions", "DAX"] },
  { name: "C++", Icon: CppIcon, color: "#00599C", category: "systems",
    desc: "STL, memory management, competitive programming",
    tags: ["OOP", "Pointers", "Templates"] },
  { name: "Java", Icon: JavaIcon, color: "#ED8B00", category: "backend",
    desc: "Spring Boot, collections, multithreading",
    tags: ["JVM", "Streams API", "Concurrency"] },
  { name: "HTML/CSS", Icon: HTMLCSSIcon, color: "#E44D26", category: "frontend",
    desc: "Semantic markup, Flexbox, Grid, animations",
    tags: ["Responsive", "CSS Variables", "Animations"] },
  { name: "C", Icon: CIcon, color: "#A8B9CC", category: "systems",
    desc: "Systems programming, pointers, memory management",
    tags: ["Data Structures", "Algorithms", "Low-level"] },
  { name: "Postman", Icon: PostmanIcon, color: "#FF6C37", category: "tools",
    desc: "API testing, collections, automated workflows",
    tags: ["REST Testing", "Newman", "Mock Servers"] },
  { name: "Jira", Icon: JiraIcon, color: "#2684FF", category: "tools",
    desc: "Agile project management, sprint planning",
    tags: ["Scrum", "Kanban", "Epics"] },
  { name: "Docstore", Icon: DocstoreIcon, color: "#6C63FF", category: "database",
    desc: "Document database, schema-flexible storage",
    tags: ["NoSQL", "Key-Value", "JSON Docs"] },
  { name: "uGrafana", Icon: GrafanaIcon, color: "#F46800", category: "tools",
    desc: "Uber's internal Grafana for dashboards & metric monitoring",
    tags: ["Dashboards", "Metrics", "Alerting"] },
  { name: "Studio API", Icon: StudioAPIIcon, color: "#6236FF", category: "tools",
    desc: "API design, testing, and management platform",
    tags: ["API Design", "Testing", "Documentation"] },
  { name: "Playwright", Icon: PlaywrightIcon, color: "#45BA4B", category: "testing",
    desc: "End-to-end testing, cross-browser automation",
    tags: ["E2E Testing", "Browser Automation", "CI"] },
  { name: "Codex", Icon: CodexIcon, color: "#00D084", category: "ai",
    desc: "OpenAI Codex for AI-assisted code generation",
    tags: ["AI Coding", "Automation", "GenAI"] },
  { name: "Claude", Icon: ClaudeIcon, color: "#D97757", category: "ai",
    desc: "Anthropic Claude for reasoning, analysis, and code review",
    tags: ["LLM", "Code Review", "Analysis"] },
  { name: "Cursor", Icon: CursorIcon, color: "#7B5CFF", category: "ai",
    desc: "AI-powered IDE for rapid development workflows",
    tags: ["AI IDE", "Copilot", "Productivity"] },
  { name: "REST APIs", Icon: RESTIcon, color: "#49B882", category: "backend",
    desc: "RESTful design, versioning, authentication",
    tags: ["HTTP", "OAuth", "Swagger"] },
];

// Responsive slot constellations:
// Laptop & Desktop (wide spread across arena: x spans 6% to 94%, y spans 6% to 88%)
const DESKTOP_SLOTS = [
  { x: 6, y: 8 },   { x: 21, y: 6 },  { x: 36, y: 9 },  { x: 64, y: 6 },  { x: 79, y: 9 },  { x: 94, y: 7 },
  { x: 5, y: 24 },  { x: 18, y: 22 }, { x: 32, y: 26 }, { x: 68, y: 23 }, { x: 82, y: 25 }, { x: 95, y: 23 },
  { x: 5, y: 44 },  { x: 17, y: 43 }, { x: 29, y: 46 }, { x: 71, y: 44 }, { x: 83, y: 46 }, { x: 95, y: 43 },
  { x: 6, y: 64 },  { x: 19, y: 66 }, { x: 33, y: 63 }, { x: 67, y: 65 }, { x: 81, y: 63 }, { x: 94, y: 66 },
  { x: 11, y: 85 }, { x: 26, y: 88 }, { x: 42, y: 85 }, { x: 58, y: 87 }, { x: 74, y: 85 }, { x: 89, y: 88 },
];

// Tablet (balanced spread: x spans 8% to 92%, y spans 7% to 88%)
const TABLET_SLOTS = [
  { x: 9, y: 8 },   { x: 24, y: 7 },  { x: 40, y: 9 },  { x: 60, y: 7 },  { x: 76, y: 9 },  { x: 91, y: 8 },
  { x: 8, y: 24 },  { x: 22, y: 23 }, { x: 36, y: 26 }, { x: 64, y: 24 }, { x: 78, y: 23 }, { x: 92, y: 25 },
  { x: 8, y: 44 },  { x: 20, y: 43 }, { x: 33, y: 46 }, { x: 67, y: 44 }, { x: 80, y: 45 }, { x: 92, y: 43 },
  { x: 9, y: 64 },  { x: 22, y: 66 }, { x: 36, y: 63 }, { x: 64, y: 65 }, { x: 78, y: 64 }, { x: 91, y: 66 },
  { x: 13, y: 85 }, { x: 28, y: 88 }, { x: 44, y: 85 }, { x: 56, y: 87 }, { x: 72, y: 85 }, { x: 87, y: 87 },
];

// Mobile (compact, strictly bounded x: 14% to 86% to eliminate right-edge cut)
const MOBILE_SLOTS = [
  { x: 15, y: 7 },  { x: 32, y: 6 },  { x: 50, y: 8 },  { x: 68, y: 6 },  { x: 85, y: 7 },
  { x: 14, y: 22 }, { x: 29, y: 20 }, { x: 44, y: 24 }, { x: 58, y: 20 }, { x: 72, y: 24 }, { x: 86, y: 22 },
  { x: 14, y: 38 }, { x: 26, y: 42 }, { x: 74, y: 42 }, { x: 86, y: 38 },
  { x: 15, y: 53 }, { x: 85, y: 53 },
  { x: 14, y: 67 }, { x: 29, y: 65 }, { x: 44, y: 68 }, { x: 58, y: 65 }, { x: 72, y: 68 }, { x: 86, y: 67 },
  { x: 16, y: 84 }, { x: 32, y: 87 }, { x: 50, y: 85 }, { x: 68, y: 87 }, { x: 84, y: 84 },
  { x: 26, y: 77 }, { x: 74, y: 77 },
];

const CENTER = { x: 50, y: 45 };
const AUTO_INTERVAL_MS = 1800; // 1.8s per technology showcase
const INACTIVITY_TIMEOUT_MS = 10000; // 10s inactivity resume

const fisherYates = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const Ball = ({ tech, pos, isFocused, isRelated, isMobile, onClick }) => (
  <motion.button
    className={`tb-ball${isFocused ? " tb-ball--pop" : ""}${isRelated ? " tb-ball--related" : ""}`}
    style={{
      "--bc": tech.color,
    }}
    animate={{
      left: `${pos.x}%`,
      top: `${pos.y}%`,
      x: "-50%",
      y: "-50%",
      scale: isFocused ? (isMobile ? 1.35 : 1.5) : isRelated ? 1.08 : 1,
      zIndex: isFocused ? 30 : isRelated ? 5 : 1,
    }}
    transition={{
      type: "spring",
      stiffness: 130,
      damping: 17,
      mass: 0.85,
    }}
    onClick={onClick}
    whileHover={isFocused ? {} : { scale: 1.15 }}
    whileTap={{ scale: 0.92 }}
    data-cursor="link"
    aria-label={`${tech.name} technology card`}
  >
    {/* Concentric expanding ripple ring on active ball */}
    {isFocused && (
      <motion.span
        className="tb-ball-ripple"
        initial={{ scale: 0.9, opacity: 0.85 }}
        animate={{ scale: 2.1, opacity: 0 }}
        transition={{ duration: 1.3, repeat: Infinity, ease: "easeOut" }}
      />
    )}

    <span className="tb-ball-shine" />
    <span className="tb-ball-seam" />
    <span className="tb-ball-icon">
      <tech.Icon size={isFocused ? (isMobile ? 28 : 32) : (isMobile ? 18 : 22)} />
    </span>
    <span className="tb-ball-name">{tech.name}</span>
  </motion.button>
);

const DetailPanel = ({ tech, onTagClick }) => (
  <motion.div
    className="tb-detail"
    style={{ "--bc": tech.color }}
    initial={{ opacity: 0, y: 18, scale: 0.98 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: -12, scale: 0.98 }}
    transition={{ duration: 0.3, ease: "easeOut" }}
  >
    <div className="tb-detail-head">
      <span className="tb-detail-ball-mini">
        <tech.Icon size={28} />
      </span>
      <div className="tb-detail-text">
        <div className="tb-detail-title-row">
          <h3>{tech.name}</h3>
          {tech.category && (
            <span className="tb-category-pill">{tech.category.toUpperCase()}</span>
          )}
        </div>
        <p>{tech.desc}</p>
      </div>
    </div>
    <div className="tb-detail-tags">
      {tech.tags.map((t) => (
        <span
          key={t}
          className="tb-dtag"
          onClick={() => onTagClick?.(t)}
        >
          {t}
        </span>
      ))}
    </div>
  </motion.div>
);

const TechMarquee = () => {
  const [focusedIdx, setFocusedIdx] = useState(0); // Start highlighting first tech immediately
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [slotMap, setSlotMap] = useState(() => fisherYates(TECH.map((_, i) => i)));
  const [windowWidth, setWindowWidth] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  const sectionRef = useRef(null);
  const inactivityTimerRef = useRef(null);
  const isInView = useInView(sectionRef, { amount: 0.25 });

  // Dynamically listen to viewport width to adapt slots
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 768;

  // Dynamically select slots for device width
  const currentSlots = useMemo(() => {
    if (windowWidth >= 1024) return DESKTOP_SLOTS;
    if (windowWidth >= 768) return TABLET_SLOTS;
    return MOBILE_SLOTS;
  }, [windowWidth]);

  // Handle user manual interaction: pause auto tour and schedule 10s resume
  const handleUserActivity = useCallback(() => {
    setIsAutoPlaying(false);
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }
    inactivityTimerRef.current = setTimeout(() => {
      setIsAutoPlaying(true);
    }, INACTIVITY_TIMEOUT_MS);
  }, []);

  // Auto-tour animation loop: advances tech stack and reshuffles peripheral slots every 1.8s
  useEffect(() => {
    if (!isAutoPlaying || !isInView) return;

    const interval = setInterval(() => {
      setFocusedIdx((prev) => (prev === null ? 0 : (prev + 1) % TECH.length));
      setSlotMap(fisherYates(TECH.map((_, i) => i)));
    }, AUTO_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [isAutoPlaying, isInView]);

  // Clean up inactivity timer on unmount
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
    };
  }, []);

  const handleClick = useCallback(
    (idx) => {
      sound.playClick();
      handleUserActivity();
      setFocusedIdx(idx);
      setSlotMap(fisherYates(TECH.map((_, i) => i)));
    },
    [handleUserActivity]
  );

  const handleTagClick = useCallback(
    (tag) => {
      handleUserActivity();
      const matchIdx = TECH.findIndex(
        (t, idx) => idx !== focusedIdx && t.tags.includes(tag)
      );
      if (matchIdx !== -1) {
        sound.playClick();
        setFocusedIdx(matchIdx);
        setSlotMap(fisherYates(TECH.map((_, i) => i)));
      }
    },
    [focusedIdx, handleUserActivity]
  );

  const toggleAutoPlay = useCallback(() => {
    sound.playToggle();
    if (isAutoPlaying) {
      handleUserActivity();
    } else {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
      setIsAutoPlaying(true);
    }
  }, [isAutoPlaying, handleUserActivity]);

  const activeTech = focusedIdx !== null ? TECH[focusedIdx] : null;
  const activeCategory = activeTech?.category || null;

  return (
    <section className="tb-section" ref={sectionRef}>
      <motion.div
        className="tb-header section-wrapper"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
      >
        <span className="tb-eyebrow">Tech Stack</span>
        <h2>Technologies I work with</h2>

        {/* Live Auto-Tour & Interaction Status Pill */}
        <div
          className={`tb-mode-badge ${isAutoPlaying ? "active" : "paused"}`}
          onClick={toggleAutoPlay}
          data-cursor="link"
          title="Click to toggle between Auto Tour and Manual Exploration"
        >
          <span className="tb-mode-dot" />
          <span className="tb-mode-label">
            {isAutoPlaying ? "Auto Tour Active (Cycling 1.8s)" : "Manual Mode (Auto-resumes in 10s)"}
          </span>
          <span className="tb-mode-btn">
            {isAutoPlaying ? "⏸ Pause" : "▶ Resume"}
          </span>
        </div>
      </motion.div>

      <div className="tb-arena section-wrapper">
        {TECH.map((tech, i) => {
          const isFocused = focusedIdx === i;
          const isRelated = !isFocused && activeCategory && tech.category === activeCategory;
          const slot = isFocused ? CENTER : currentSlots[slotMap[i] % currentSlots.length];
          return (
            <Ball
              key={tech.name}
              tech={tech}
              pos={slot}
              isFocused={isFocused}
              isRelated={isRelated}
              isMobile={isMobile}
              onClick={() => handleClick(i)}
            />
          );
        })}
      </div>

      <div className="tb-detail-zone section-wrapper">
        <AnimatePresence mode="wait">
          {activeTech && (
            <DetailPanel
              key={activeTech.name}
              tech={activeTech}
              onTagClick={handleTagClick}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default TechMarquee;

