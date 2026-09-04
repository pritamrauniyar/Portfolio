import { useState, useCallback, useEffect, useRef } from "react";
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

// Clean 29-slot non-overlapping constellation layout with safe horizontal bounds (12% - 84%)
const SLOTS = [
  { x: 14, y: 8 },  { x: 32, y: 6 },  { x: 50, y: 8 },  { x: 68, y: 6 },  { x: 84, y: 8 },
  { x: 12, y: 22 }, { x: 26, y: 19 }, { x: 40, y: 23 }, { x: 58, y: 19 }, { x: 72, y: 23 }, { x: 84, y: 20 },
  { x: 12, y: 38 }, { x: 26, y: 36 }, { x: 72, y: 36 }, { x: 84, y: 38 },
  { x: 12, y: 54 }, { x: 26, y: 52 }, { x: 40, y: 56 }, { x: 58, y: 52 }, { x: 72, y: 56 }, { x: 84, y: 54 },
  { x: 14, y: 70 }, { x: 31, y: 68 }, { x: 48, y: 72 }, { x: 66, y: 68 }, { x: 82, y: 71 },
  { x: 24, y: 86 }, { x: 48, y: 88 }, { x: 72, y: 86 },
];

const CENTER = { x: 50, y: 44 };
const AUTO_INTERVAL_MS = 1600; // 1.6s per technology showcase
const INACTIVITY_TIMEOUT_MS = 10000; // 10s inactivity resume

const Ball = ({ tech, pos, isFocused, isRelated, onClick }) => (
  <motion.button
    className={`tb-ball${isFocused ? " tb-ball--pop" : ""}${isRelated ? " tb-ball--related" : ""}`}
    style={{
      "--bc": tech.color,
      left: `clamp(30px, ${pos.x}%, calc(100% - 30px))`,
      top: `clamp(30px, ${pos.y}%, calc(100% - 30px))`,
    }}
    animate={{
      scale: isFocused ? 1.5 : isRelated ? 1.08 : 1,
      zIndex: isFocused ? 20 : isRelated ? 5 : 1,
    }}
    transition={{ type: "spring", stiffness: 180, damping: 18, mass: 0.85 }}
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
      <tech.Icon size={isFocused ? 32 : 22} />
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
  const [focusedIdx, setFocusedIdx] = useState(0); // Start highlighting immediately
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [slotMap] = useState(() => TECH.map((_, i) => i));

  const sectionRef = useRef(null);
  const inactivityTimerRef = useRef(null);
  const isInView = useInView(sectionRef, { amount: 0.25 });

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

  // Auto-tour animation loop: cycles tech stack every 1.6s
  useEffect(() => {
    if (!isAutoPlaying || !isInView) return;

    const interval = setInterval(() => {
      setFocusedIdx((prev) => (prev === null ? 0 : (prev + 1) % TECH.length));
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
    },
    [handleUserActivity]
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
            {isAutoPlaying ? "Auto Tour Active (Cycling 1.6s)" : "Manual Mode (Auto-resumes in 10s)"}
          </span>
          <span className="tb-mode-btn">
            {isAutoPlaying ? "⏸ Pause" : "▶ Resume"}
          </span>
        </div>
      </motion.div>

      <div
        className="tb-arena section-wrapper"
        onMouseEnter={handleUserActivity}
        onTouchStart={handleUserActivity}
      >
        {TECH.map((tech, i) => {
          const isFocused = focusedIdx === i;
          const isRelated = !isFocused && activeCategory && tech.category === activeCategory;
          const slot = isFocused ? CENTER : SLOTS[slotMap[i] % SLOTS.length];
          return (
            <Ball
              key={tech.name}
              tech={tech}
              pos={slot}
              isFocused={isFocused}
              isRelated={isRelated}
              onClick={() => handleClick(i)}
            />
          );
        })}
      </div>

      <div
        className="tb-detail-zone section-wrapper"
        onMouseEnter={handleUserActivity}
        onTouchStart={handleUserActivity}
      >
        <AnimatePresence mode="wait">
          {activeTech && (
            <DetailPanel
              key={activeTech.name}
              tech={activeTech}
              onTagClick={handleUserActivity}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default TechMarquee;

