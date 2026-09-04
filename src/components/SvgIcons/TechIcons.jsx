export const ReactIcon = ({ size = 40, className = "" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none">
    <circle cx="12" cy="12" r="2.2" fill="#61DAFB" />
    <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1" />
    <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1" transform="rotate(60 12 12)" />
    <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1" transform="rotate(120 12 12)" />
  </svg>
);

export const AngularIcon = ({ size = 40, className = "" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
    <path d="M12 2L3 6.5l1.4 11.4L12 22l7.6-4.1L21 6.5 12 2z" fill="#DD0031" />
    <path d="M12 2v20l7.6-4.1L21 6.5 12 2z" fill="#C3002F" />
    <path d="M12 5.5L7.5 16h1.8l.9-2.3h3.6l.9 2.3h1.8L12 5.5zm1.3 6.7h-2.6L12 8.7l1.3 3.5z" fill="#fff" />
  </svg>
);

export const JavaScriptIcon = ({ size = 40, className = "" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
    <rect x="2" y="2" width="20" height="20" rx="2" fill="#F7DF1E" />
    <text x="12" y="17.5" textAnchor="middle" fontFamily="Arial,sans-serif" fontWeight="bold" fontSize="10" fill="#323330">JS</text>
  </svg>
);

export const TypeScriptIcon = ({ size = 40, className = "" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
    <rect x="2" y="2" width="20" height="20" rx="2" fill="#3178C6" />
    <text x="12" y="17.5" textAnchor="middle" fontFamily="Arial,sans-serif" fontWeight="bold" fontSize="10" fill="#fff">TS</text>
  </svg>
);

export const GoIcon = ({ size = 40, className = "" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
    <rect x="2" y="2" width="20" height="20" rx="4" fill="#00ADD8" />
    <text x="12" y="16" textAnchor="middle" fontFamily="Arial,sans-serif" fontWeight="bold" fontSize="11" fill="#fff">Go</text>
  </svg>
);

export const NodeIcon = ({ size = 40, className = "" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
    <path d="M12 2.5c-.4 0-.8.1-1.1.3L4.3 6.6c-.7.4-1.1 1.1-1.1 1.9v7.9c0 .8.4 1.5 1.1 1.9l6.6 3.8c.3.2.7.3 1.1.3s.8-.1 1.1-.3l6.6-3.8c.7-.4 1.1-1.1 1.1-1.9V8.5c0-.8-.4-1.5-1.1-1.9L13.1 2.8c-.3-.2-.7-.3-1.1-.3z" fill="#339933" />
    <text x="12" y="15" textAnchor="middle" fontFamily="Arial,sans-serif" fontWeight="bold" fontSize="8" fill="#fff">N</text>
  </svg>
);

export const FusionIcon = ({ size = 40, className = "" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
    <rect x="2" y="2" width="20" height="20" rx="4" fill="#1B1B1B" />
    <text x="12" y="16" textAnchor="middle" fontFamily="Arial,sans-serif" fontWeight="bold" fontSize="9" fill="#00D4AA">Fj</text>
  </svg>
);

export const RxJSIcon = ({ size = 40, className = "" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
    <circle cx="12" cy="12" r="10" fill="#B7178C" />
    <text x="12" y="16" textAnchor="middle" fontFamily="Arial,sans-serif" fontWeight="bold" fontSize="8.5" fill="#fff">Rx</text>
  </svg>
);

export const AzureIcon = ({ size = 40, className = "" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
    <rect x="2" y="2" width="20" height="20" rx="4" fill="#0078D4" />
    <path d="M7 17l4-12h2l-3 8h5l-8 4z" fill="#fff" />
  </svg>
);

export const AWSIcon = ({ size = 40, className = "" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
    <rect x="2" y="2" width="20" height="20" rx="4" fill="#232F3E" />
    <text x="12" y="14" textAnchor="middle" fontFamily="Arial,sans-serif" fontWeight="bold" fontSize="7" fill="#FF9900">AWS</text>
    <path d="M6 16.5c2 1 4.2 1.5 6 1.5s4-.5 6-1.5" stroke="#FF9900" strokeWidth="1.2" strokeLinecap="round" fill="none" />
  </svg>
);

export const GitIcon = ({ size = 40, className = "" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
    <path d="M21.6 10.9L13.1 2.4c-.6-.6-1.5-.6-2.1 0L9.2 4.2l2.6 2.6c.6-.2 1.3-.1 1.8.4.5.5.6 1.1.4 1.7l2.5 2.5c.6-.2 1.2-.1 1.7.4.7.7.7 1.7 0 2.4-.7.7-1.7.7-2.4 0-.5-.5-.6-1.2-.4-1.8l-2.3-2.3v6.1c.2.1.3.2.5.4.7.7.7 1.7 0 2.4-.7.7-1.7.7-2.4 0-.7-.7-.7-1.7 0-2.4.2-.2.4-.3.6-.4V9.8c-.2-.1-.4-.3-.6-.5-.5-.5-.6-1.2-.4-1.8L8.7 5l-6.3 6.3c-.6.6-.6 1.5 0 2.1l8.5 8.5c.6.6 1.5.6 2.1 0l8.5-8.5c.6-.6.6-1.6 0-2.1z" fill="#F05032" />
  </svg>
);

export const SQLIcon = ({ size = 40, className = "" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
    <rect x="2" y="2" width="20" height="20" rx="4" fill="#00758F" />
    <ellipse cx="12" cy="7" rx="6" ry="2.5" fill="rgba(255,255,255,0.3)" stroke="#fff" strokeWidth="1" />
    <path d="M6 7v5c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5V7" fill="none" stroke="#fff" strokeWidth="1" />
    <path d="M6 12v5c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-5" fill="none" stroke="#fff" strokeWidth="1" />
  </svg>
);

export const DynamoDBIcon = ({ size = 40, className = "" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
    <rect x="2" y="2" width="20" height="20" rx="4" fill="#4053D6" />
    <path d="M8 7v10M12 5v14M16 7v10" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M6 9h12M6 15h12" stroke="#fff" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
  </svg>
);

export const PostmanIcon = ({ size = 40, className = "" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
    <circle cx="12" cy="12" r="10" fill="#FF6C37" />
    <path d="M10 7l7 5-7 5V7z" fill="#fff" />
  </svg>
);

export const JiraIcon = ({ size = 40, className = "" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
    <rect x="2" y="2" width="20" height="20" rx="4" fill="#0052CC" />
    <path d="M17 12l-5-5-5 5 5 5 5-5z" fill="#fff" />
    <path d="M12 7l-2.5 2.5L12 12l2.5-2.5L12 7z" fill="#2684FF" />
    <path d="M12 12l-2.5 2.5L12 17l2.5-2.5L12 12z" fill="#2684FF" />
  </svg>
);

export const NextJSIcon = ({ size = 40, className = "" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
    <circle cx="12" cy="12" r="10" fill="#000" />
    <path d="M10 8v8" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M10 8l7 10" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M17 8v5" stroke="url(#next-fade)" strokeWidth="1.5" strokeLinecap="round" />
    <defs>
      <linearGradient id="next-fade" x1="17" y1="8" x2="17" y2="13">
        <stop offset="0" stopColor="#fff" />
        <stop offset="1" stopColor="#fff" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);

export const CppIcon = ({ size = 40, className = "" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
    <circle cx="12" cy="12" r="10" fill="#00599C" />
    <text x="12" y="16.5" textAnchor="middle" fontFamily="Arial,sans-serif" fontWeight="bold" fontSize="10" fill="#fff">C+</text>
  </svg>
);

export const JavaIcon = ({ size = 40, className = "" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
    <rect x="2" y="2" width="20" height="20" rx="4" fill="#ED8B00" />
    <path d="M11 6c0 0 1.5 1.5-1 4-2 2-.5 3.2 0 4.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    <path d="M13 6c.5.5 2 2-.5 4" stroke="#fff" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.6" />
    <path d="M7.5 16.5c0 0 1 .8 3 .5 2-.3 3.5.2 4.5.5" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" fill="none" />
    <path d="M7 18.5c0 0 1.5.6 3.5.3 2-.3 3 .1 5 .5" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" fill="none" />
  </svg>
);

export const HTMLCSSIcon = ({ size = 40, className = "" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
    <path d="M3 2l1.6 18L12 22l7.4-2L21 2H3z" fill="#E44D26" />
    <path d="M12 4v16l5.5-1.5L19 4H12z" fill="#F16529" />
    <path d="M8 8l-1 2h3l-.3 4L12 15l2.3-.8.2-2.2H9.8l.2-2h5l.2-2H8z" fill="#fff" />
  </svg>
);

export const CIcon = ({ size = 40, className = "" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
    <circle cx="12" cy="12" r="10" fill="#A8B9CC" />
    <text x="12" y="17" textAnchor="middle" fontFamily="Arial,sans-serif" fontWeight="bold" fontSize="13" fill="#fff">C</text>
  </svg>
);

export const DocstoreIcon = ({ size = 40, className = "" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
    <rect x="4" y="2" width="16" height="20" rx="2" fill="#6C63FF" />
    <rect x="7" y="6" width="10" height="1.5" rx=".75" fill="#fff" opacity="0.85" />
    <rect x="7" y="10" width="7" height="1.5" rx=".75" fill="#fff" opacity="0.6" />
    <rect x="7" y="14" width="10" height="1.5" rx=".75" fill="#fff" opacity="0.85" />
    <rect x="7" y="18" width="5" height="1.5" rx=".75" fill="#fff" opacity="0.6" />
  </svg>
);

export const GrafanaIcon = ({ size = 40, className = "" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
    <circle cx="12" cy="12" r="10" fill="#F46800" />
    <circle cx="12" cy="12" r="5.5" fill="none" stroke="#fff" strokeWidth="1.3" />
    <circle cx="12" cy="12" r="2" fill="#fff" />
    <line x1="12" y1="3.5" x2="12" y2="5.5" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" />
    <line x1="12" y1="18.5" x2="12" y2="20.5" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" />
    <line x1="3.5" y1="12" x2="5.5" y2="12" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" />
    <line x1="18.5" y1="12" x2="20.5" y2="12" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

export const StudioAPIIcon = ({ size = 40, className = "" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
    <rect x="2" y="2" width="20" height="20" rx="4" fill="#6236FF" />
    <text x="12" y="15.5" textAnchor="middle" fontFamily="Arial,sans-serif" fontWeight="bold" fontSize="7.5" fill="#fff">API</text>
    <path d="M6 18h12" stroke="#fff" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
  </svg>
);

export const PlaywrightIcon = ({ size = 40, className = "" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
    <rect x="2" y="2" width="20" height="20" rx="4" fill="#2D4552" />
    <text x="12" y="15.5" textAnchor="middle" fontFamily="Arial,sans-serif" fontWeight="bold" fontSize="7" fill="#E2574C">PW</text>
    <circle cx="8" cy="8" r="1.5" fill="#E2574C" opacity="0.7" />
    <circle cx="16" cy="8" r="1.5" fill="#2EAD33" opacity="0.7" />
  </svg>
);

export const CodexIcon = ({ size = 40, className = "" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
    <rect x="2" y="2" width="20" height="20" rx="4" fill="#000" />
    <path d="M7 9l3 3-3 3" stroke="#00D084" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <line x1="13" y1="15" x2="18" y2="15" stroke="#00D084" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const ClaudeIcon = ({ size = 40, className = "" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
    <rect x="2" y="2" width="20" height="20" rx="4" fill="#D97757" />
    <path d="M9.5 16L12 7l2.5 9M10.5 13.5h3" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

export const CursorIcon = ({ size = 40, className = "" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
    <rect x="2" y="2" width="20" height="20" rx="4" fill="#1A1A2E" />
    <path d="M8 5l1.5 14 3-5 5-1.5L8 5z" fill="#fff" />
    <path d="M12.5 14l3 3" stroke="#7B5CFF" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const RESTIcon = ({ size = 40, className = "" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
    <rect x="2" y="2" width="20" height="20" rx="4" fill="#49B882" />
    <path d="M7 9h4M7 12h6M7 15h4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="16" cy="9" r="1.2" fill="#fff" />
    <circle cx="16" cy="15" r="1.2" fill="#fff" />
    <path d="M16 10.2v3.6" stroke="#fff" strokeWidth="1" />
  </svg>
);

export const LangGraphIcon = ({ size = 40, className = "" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
    <rect x="2" y="2" width="20" height="20" rx="4" fill="#1C3C3C" />
    <circle cx="7" cy="8" r="2.2" fill="#FF5722" />
    <circle cx="17" cy="8" r="2.2" fill="#00D084" />
    <circle cx="12" cy="16.5" r="2.2" fill="#61DAFB" />
    <path d="M9.2 8h5.6M15.5 9.8l-2.4 4.8M8.5 9.8l2.4 4.8" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" opacity="0.85" />
  </svg>
);

export const LangChainIcon = ({ size = 40, className = "" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
    <rect x="2" y="2" width="20" height="20" rx="4" fill="#0E2A1E" />
    <rect x="5.5" y="8.5" width="8" height="7" rx="3.5" fill="none" stroke="#22C55E" strokeWidth="1.6" />
    <rect x="10.5" y="8.5" width="8" height="7" rx="3.5" fill="none" stroke="#EAB308" strokeWidth="1.6" />
  </svg>
);

export const MCPIcon = ({ size = 40, className = "" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
    <rect x="2" y="2" width="20" height="20" rx="4" fill="#241B35" />
    <circle cx="12" cy="12" r="3" fill="#A855F7" />
    <circle cx="6" cy="7" r="1.8" fill="#C084FC" />
    <circle cx="18" cy="7" r="1.8" fill="#C084FC" />
    <circle cx="6" cy="17" r="1.8" fill="#C084FC" />
    <circle cx="18" cy="17" r="1.8" fill="#C084FC" />
    <path d="M7.4 8.2l3 2.5M16.6 8.2l-3 2.5M7.4 15.8l3-2.5M16.6 15.8l-3-2.5" stroke="#A855F7" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

export const KafkaIcon = ({ size = 40, className = "" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
    <rect x="2" y="2" width="20" height="20" rx="4" fill="#231F20" />
    <circle cx="15.5" cy="7.5" r="2.2" fill="#fff" />
    <circle cx="8" cy="12" r="2.2" fill="#fff" />
    <circle cx="15.5" cy="16.5" r="2.2" fill="#fff" />
    <path d="M10 11l3.5-2.2M10 13l3.5 2.2" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

export const GRPCIcon = ({ size = 40, className = "" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
    <rect x="2" y="2" width="20" height="20" rx="4" fill="#244C5A" />
    <text x="12" y="15.5" textAnchor="middle" fontFamily="Arial,sans-serif" fontWeight="bold" fontSize="7" fill="#00D4AA">gRPC</text>
  </svg>
);

export const MySQLIcon = ({ size = 40, className = "" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
    <rect x="2" y="2" width="20" height="20" rx="4" fill="#00618A" />
    <ellipse cx="12" cy="7" rx="6" ry="2.2" fill="none" stroke="#F29111" strokeWidth="1.3" />
    <path d="M6 7v4.5c0 1.2 2.7 2.2 6 2.2s6-1 6-2.2V7M6 11.5V16c0 1.2 2.7 2.2 6 2.2s6-1 6-2.2v-4.5" fill="none" stroke="#fff" strokeWidth="1.2" />
  </svg>
);

export const WhisperIcon = ({ size = 40, className = "" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
    <rect x="2" y="2" width="20" height="20" rx="4" fill="#10A37F" />
    <path d="M5 12h2M8 9v6M11 6v12M14 8v8M17 10v4M19 12h1" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export const CICDIcon = ({ size = 40, className = "" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
    <rect x="2" y="2" width="20" height="20" rx="4" fill="#1F2937" />
    <path d="M8 12a3 3 0 105.5 1.5" fill="none" stroke="#FC6D26" strokeWidth="1.4" />
    <path d="M16 12a3 3 0 10-5.5-1.5" fill="none" stroke="#3B82F6" strokeWidth="1.4" />
    <circle cx="8" cy="12" r="1" fill="#FC6D26" />
    <circle cx="16" cy="12" r="1" fill="#3B82F6" />
  </svg>
);

export const JitsiIcon = ({ size = 40, className = "" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
    <rect x="2" y="2" width="20" height="20" rx="4" fill="#17A0DB" />
    <path d="M6 8.5h7a1.5 1.5 0 011.5 1.5v4a1.5 1.5 0 01-1.5 1.5H6A1.5 1.5 0 014.5 14v-4A1.5 1.5 0 016 8.5z" fill="#fff" />
    <path d="M14.5 10.5l4-2.5v8l-4-2.5v-3z" fill="#fff" opacity="0.9" />
  </svg>
);

const iconMap = {
  React: ReactIcon,
  Angular: AngularIcon,
  JavaScript: JavaScriptIcon,
  TypeScript: TypeScriptIcon,
  "Go (Golang)": GoIcon,
  Go: GoIcon,
  "Node.js": NodeIcon,
  "Fusion.js": FusionIcon,
  "Next.js": NextJSIcon,
  RxJS: RxJSIcon,
  "Azure AD B2C": AzureIcon,
  Azure: AzureIcon,
  "Azure DevOps": AzureIcon,
  "AWS Cloud": AWSIcon,
  AWS: AWSIcon,
  "Git/GitLab": GitIcon,
  Git: GitIcon,
  SQL: SQLIcon,
  DynamoDB: DynamoDBIcon,
  Postman: PostmanIcon,
  Jira: JiraIcon,
  UMonitor: ReactIcon,
  "RESTful APIs": RESTIcon,
  "REST APIs": RESTIcon,
  "C++": CppIcon,
  Java: JavaIcon,
  "HTML/CSS": HTMLCSSIcon,
  C: CIcon,
  Docstore: DocstoreIcon,
  uGrafana: GrafanaIcon,
  Grafana: GrafanaIcon,
  "Studio API": StudioAPIIcon,
  Playwright: PlaywrightIcon,
  Codex: CodexIcon,
  Claude: ClaudeIcon,
  "Claude Code": ClaudeIcon,
  Cursor: CursorIcon,
  LangGraph: LangGraphIcon,
  LangChain: LangChainIcon,
  MCP: MCPIcon,
  Kafka: KafkaIcon,
  gRPC: GRPCIcon,
  MySQL: MySQLIcon,
  Whisper: WhisperIcon,
  "OpenAI Whisper": WhisperIcon,
  "CI/CD": CICDIcon,
  Jitsi: JitsiIcon,
  "Jitsi Web SDK": JitsiIcon,
};

export const getTechIcon = (name) => iconMap[name] || null;

export default iconMap;
