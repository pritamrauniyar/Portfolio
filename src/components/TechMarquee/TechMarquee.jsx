import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ReactIcon, AngularIcon, JavaScriptIcon, TypeScriptIcon,
  GoIcon, NodeIcon, FusionIcon, NextJSIcon, RxJSIcon,
  AzureIcon, AWSIcon, GitIcon, SQLIcon, DynamoDBIcon,
  CppIcon, JavaIcon, HTMLCSSIcon, CIcon, PostmanIcon,
  JiraIcon, DocstoreIcon, GrafanaIcon, StudioAPIIcon,
  PlaywrightIcon, CodexIcon, ClaudeIcon, CursorIcon, RESTIcon,
} from "../SvgIcons/TechIcons";
import "./TechMarquee.css";

const TECH = [
  { name: "React", Icon: ReactIcon, color: "#61DAFB",
    desc: "Hooks, Context, Performance optimization, Server components",
    tags: ["Redux", "React Query", "Testing Library"] },
  { name: "TypeScript", Icon: TypeScriptIcon, color: "#3178C6",
    desc: "Type-safe applications at enterprise scale",
    tags: ["Generics", "Utility Types", "Declaration Files"] },
  { name: "JavaScript", Icon: JavaScriptIcon, color: "#F7DF1E",
    desc: "ES2024+, async patterns, Web APIs",
    tags: ["Closures", "Promises", "Web Workers"] },
  { name: "Go", Icon: GoIcon, color: "#00ADD8",
    desc: "Goroutines, channels, high-throughput services",
    tags: ["gRPC", "Concurrency", "HTTP Services"] },
  { name: "Node.js", Icon: NodeIcon, color: "#339933",
    desc: "Express, Fastify, Streams, Worker threads",
    tags: ["REST APIs", "Middleware", "Microservices"] },
  { name: "Angular", Icon: AngularIcon, color: "#DD0031",
    desc: "RxJS-driven SPAs, lazy loading, NgRx",
    tags: ["Directives", "Modules", "Change Detection"] },
  { name: "Next.js", Icon: NextJSIcon, color: "#AAAAAA",
    desc: "SSR/SSG, API routes, Middleware, ISR",
    tags: ["App Router", "Image Opt", "Edge Runtime"] },
  { name: "Fusion.js", Icon: FusionIcon, color: "#7B5CFF",
    desc: "Universal rendering, plugin architecture",
    tags: ["Code Splitting", "SSR", "Dependency Injection"] },
  { name: "RxJS", Icon: RxJSIcon, color: "#B7178C",
    desc: "Observables, operators, reactive state",
    tags: ["Subjects", "Operators", "Event Streams"] },
  { name: "AWS", Icon: AWSIcon, color: "#FF9900",
    desc: "Lambda, S3, DynamoDB, CloudFront, ECS",
    tags: ["Serverless", "CDN", "IAM"] },
  { name: "Azure", Icon: AzureIcon, color: "#0078D4",
    desc: "App Service, Functions, DevOps pipelines",
    tags: ["Cosmos DB", "CI/CD", "Blob Storage"] },
  { name: "Git", Icon: GitIcon, color: "#F05032",
    desc: "Branching strategies, rebasing, CI/CD hooks",
    tags: ["Monorepo", "Git Flow", "Hooks"] },
  { name: "SQL", Icon: SQLIcon, color: "#4479A1",
    desc: "Complex queries, optimization, indexing",
    tags: ["Joins", "Views", "Migrations"] },
  { name: "DynamoDB", Icon: DynamoDBIcon, color: "#4053D6",
    desc: "Single-table design, GSI, Streams, TTL",
    tags: ["NoSQL", "Partitions", "DAX"] },
  { name: "C++", Icon: CppIcon, color: "#00599C",
    desc: "STL, memory management, competitive programming",
    tags: ["OOP", "Pointers", "Templates"] },
  { name: "Java", Icon: JavaIcon, color: "#ED8B00",
    desc: "Spring Boot, collections, multithreading",
    tags: ["JVM", "Streams API", "Concurrency"] },
  { name: "HTML/CSS", Icon: HTMLCSSIcon, color: "#E44D26",
    desc: "Semantic markup, Flexbox, Grid, animations",
    tags: ["Responsive", "CSS Variables", "Animations"] },
  { name: "C", Icon: CIcon, color: "#A8B9CC",
    desc: "Systems programming, pointers, memory management",
    tags: ["Data Structures", "Algorithms", "Low-level"] },
  { name: "Postman", Icon: PostmanIcon, color: "#FF6C37",
    desc: "API testing, collections, automated workflows",
    tags: ["REST Testing", "Newman", "Mock Servers"] },
  { name: "Jira", Icon: JiraIcon, color: "#2684FF",
    desc: "Agile project management, sprint planning",
    tags: ["Scrum", "Kanban", "Epics"] },
  { name: "Docstore", Icon: DocstoreIcon, color: "#6C63FF",
    desc: "Document database, schema-flexible storage",
    tags: ["NoSQL", "Key-Value", "JSON Docs"] },
  { name: "uGrafana", Icon: GrafanaIcon, color: "#F46800",
    desc: "Uber's internal Grafana for dashboards & metric monitoring",
    tags: ["Dashboards", "Metrics", "Alerting"] },
  { name: "Studio API", Icon: StudioAPIIcon, color: "#6236FF",
    desc: "API design, testing, and management platform",
    tags: ["API Design", "Testing", "Documentation"] },
  { name: "Playwright", Icon: PlaywrightIcon, color: "#45BA4B",
    desc: "End-to-end testing, cross-browser automation",
    tags: ["E2E Testing", "Browser Automation", "CI"] },
  { name: "Codex", Icon: CodexIcon, color: "#00D084",
    desc: "OpenAI Codex for AI-assisted code generation",
    tags: ["AI Coding", "Automation", "GenAI"] },
  { name: "Claude", Icon: ClaudeIcon, color: "#D97757",
    desc: "Anthropic Claude for reasoning, analysis, and code review",
    tags: ["LLM", "Code Review", "Analysis"] },
  { name: "Cursor", Icon: CursorIcon, color: "#7B5CFF",
    desc: "AI-powered IDE for rapid development workflows",
    tags: ["AI IDE", "Copilot", "Productivity"] },
  { name: "REST APIs", Icon: RESTIcon, color: "#49B882",
    desc: "RESTful design, versioning, authentication",
    tags: ["HTTP", "OAuth", "Swagger"] },
];

const SLOTS = [
  { x: 10, y: 6 },  { x: 28, y: 4 },  { x: 46, y: 7 },  { x: 64, y: 4 },  { x: 82, y: 6 },
  { x: 8,  y: 20 }, { x: 22, y: 18 }, { x: 36, y: 22 }, { x: 50, y: 18 }, { x: 64, y: 22 }, { x: 78, y: 18 }, { x: 88, y: 21 },
  { x: 10, y: 38 }, { x: 26, y: 36 }, { x: 42, y: 40 }, { x: 58, y: 36 }, { x: 74, y: 40 }, { x: 88, y: 37 },
  { x: 8,  y: 56 }, { x: 24, y: 54 }, { x: 40, y: 58 }, { x: 56, y: 54 }, { x: 72, y: 58 }, { x: 86, y: 55 },
  { x: 12, y: 74 }, { x: 30, y: 72 }, { x: 48, y: 76 }, { x: 66, y: 72 }, { x: 84, y: 75 },
  { x: 20, y: 88 }, { x: 42, y: 90 }, { x: 64, y: 88 },
];

const CENTER = { x: 46, y: 44 };

const fisherYates = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const Ball = ({ tech, pos, isFocused, onClick }) => (
  <motion.button
    className={`tb-ball${isFocused ? " tb-ball--pop" : ""}`}
    style={{ "--bc": tech.color }}
    animate={{
      left: `${pos.x}%`,
      top: `${pos.y}%`,
      scale: isFocused ? 1.55 : 1,
      zIndex: isFocused ? 10 : 1,
    }}
    transition={{ type: "spring", stiffness: 170, damping: 16, mass: 0.9 }}
    onClick={onClick}
    whileHover={isFocused ? {} : { scale: 1.15 }}
    whileTap={{ scale: 0.92 }}
    data-cursor="link"
  >
    <span className="tb-ball-shine" />
    <span className="tb-ball-seam" />
    <span className="tb-ball-icon">
      <tech.Icon size={isFocused ? 30 : 22} />
    </span>
    <span className="tb-ball-name">{tech.name}</span>
  </motion.button>
);

const DetailPanel = ({ tech }) => (
  <motion.div
    className="tb-detail"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20 }}
    transition={{ duration: 0.35, ease: "backOut" }}
  >
    <div className="tb-detail-head" style={{ "--bc": tech.color }}>
      <span className="tb-detail-ball-mini">
        <tech.Icon size={28} />
      </span>
      <div>
        <h3>{tech.name}</h3>
        <p>{tech.desc}</p>
      </div>
    </div>
    <div className="tb-detail-tags">
      {tech.tags.map((t) => (
        <span key={t} className="tb-dtag" style={{ "--bc": tech.color }}>{t}</span>
      ))}
    </div>
  </motion.div>
);

const TechMarquee = () => {
  const [focusedIdx, setFocusedIdx] = useState(null);
  const [slotMap, setSlotMap] = useState(() => TECH.map((_, i) => i));

  const handleClick = useCallback((idx) => {
    if (focusedIdx === idx) {
      setFocusedIdx(null);
      setSlotMap(fisherYates(TECH.map((_, i) => i)));
    } else {
      setFocusedIdx(idx);
      setSlotMap(fisherYates(TECH.map((_, i) => i)));
    }
  }, [focusedIdx]);

  return (
    <section className="tb-section">
      <motion.div
        className="tb-header section-wrapper"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
      >
        <span className="tb-eyebrow">Tech Stack</span>
        <h2>Technologies I work with</h2>
        <p className="tb-sub">Tap a ball to explore &middot; tap again to shuffle</p>
      </motion.div>

      <div className="tb-arena section-wrapper">
        {TECH.map((tech, i) => {
          const isFocused = focusedIdx === i;
          const slot = isFocused ? CENTER : SLOTS[slotMap[i] % SLOTS.length];
          return (
            <Ball
              key={tech.name}
              tech={tech}
              pos={slot}
              isFocused={isFocused}
              onClick={() => handleClick(i)}
            />
          );
        })}
      </div>

      <div className="tb-detail-zone section-wrapper">
        <AnimatePresence mode="wait">
          {focusedIdx !== null && (
            <DetailPanel key={TECH[focusedIdx].name} tech={TECH[focusedIdx]} />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default TechMarquee;
