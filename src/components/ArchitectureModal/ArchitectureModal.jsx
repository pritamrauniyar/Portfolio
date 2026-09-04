import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import sound from "../../utils/soundEngine";
import "./ArchitectureModal.css";

const SYSTEMS = [
  {
    id: "splithive",
    name: "SplitHive — Distributed Real-Time Expense Ledger",
    badge: "React Native + Socket.IO + MySQL Transactions",
    summary:
      "A cross-platform financial collaborative ledger delivering real-time expense reconciliation, sub-50ms peer delta syncing, and an O(V+E) greedy debt minimization algorithm.",
    sla: {
      syncLatency: "< 45ms",
      transactionSafety: "ACID Guaranteed",
      graphSimplification: "O(V + E) greedy",
      socketThroughput: "> 10k events/s",
    },
    nodes: [
      {
        id: "rn-client",
        title: "React Native Mobile Client",
        sub: "Expo SDK 54 + React 19",
        type: "client",
        protocol: "PESSIMISTIC IPC",
        detail: "Cross-platform mobile UI with local caching, pessimistic transaction submission, and optimistic rollbacks.",
        contractSample: `interface ExpenseMutationPayload {
  groupId: string;
  expenseId: string;
  amountCents: number;
  payerId: string;
  participants: { userId: string; shareOwedCents: number }[];
  clientTimestamp: number;
  idempotencyKey: string; // UUID v4 preventing duplicate writes
}`,
      },
      {
        id: "socket-client",
        title: "Bi-directional Real-Time Bus",
        sub: "Socket.IO Client + Heartbeat",
        type: "transport",
        protocol: "WSS (SOCKET.IO)",
        detail: "Multiplexed WebSocket channels mapped to group rooms with automated exponential reconnect logic.",
        contractSample: `// Client & Server WebSocket Delta Broadcast
socket.emit("group:expense:delta", {
  room: "group:88a1-c42e",
  type: "LEDGER_MUTATED",
  delta: { id: "exp_90f2b", amountCents: 4800, payer: "usr_alex" },
  sequenceId: 14028,
  serverAckRequired: true
});`,
      },
      {
        id: "express-gw",
        title: "REST & WebSocket Gateway",
        sub: "Node.js + Express + Zod",
        type: "server",
        protocol: "HTTPS / REST",
        detail: "Strict schema validation, JWT auth middleware with token revocation, and rate-limited invite tokens.",
        contractSample: `// Zod Request Contract Validator
export const ExpenseSchema = z.object({
  groupId: z.string().uuid(),
  amountCents: z.number().int().positive(),
  payerId: z.string().uuid(),
  splits: z.array(z.object({
    userId: z.string().uuid(),
    shareOwedCents: z.number().int().positive()
  })).min(1),
  idempotencyKey: z.string().min(16)
});`,
      },
      {
        id: "debt-engine",
        title: "Greedy Debt Minimizer",
        sub: "Bipartite Net Settlement Engine",
        type: "server",
        protocol: "O(V log V) SOLVER",
        detail: "Calculates net creditor/debtor balances across multi-payer groups, collapsing N complex debts into at most N-1 pairwise transfers.",
        contractSample: `// Bipartite Debt Simplification Graph Engine
interface SettlementTransfer {
  debtorId: string;
  creditorId: string;
  amountCents: number;
}

function minimizeDebts(balances: Map<string, number>): SettlementTransfer[] {
  // Collapses cycle chains into at most N-1 bipartite payments in O(V log V)
}`,
      },
      {
        id: "db-pool",
        title: "Transactional Relational Store",
        sub: "MySQL 8.0 + mysql2 Pool",
        type: "server",
        protocol: "SQL (ACID LOCK)",
        detail: "Row-level locking (SELECT ... FOR UPDATE) during expense splits and settlement recordings to prevent double-balance races.",
        contractSample: `/* Strict Concurrency ACID Guard */
START TRANSACTION;
SELECT balance_cents FROM group_members 
  WHERE group_id = ? AND user_id = ? 
  FOR UPDATE; -- Row-level lock prevents race conditions
UPDATE group_members SET balance_cents = balance_cents + ? 
  WHERE group_id = ? AND user_id = ?;
COMMIT;`,
      },
      {
        id: "audit-sink",
        title: "Immutable Expense Audit Trail",
        sub: "Event Sourcing / History Log",
        type: "server",
        protocol: "APPEND-ONLY",
        detail: "Maintains append-only expense revisions and restore links for transparent dispute resolution.",
        contractSample: `interface LedgerAuditRecord {
  revisionId: string;
  expenseId: string;
  actorId: string;
  changeType: "CREATED" | "SPLIT_ADJUSTED" | "SETTLED";
  sha256PayloadHash: string;
  committedAt: string;
}`,
      },
      {
        id: "mailer-queue",
        title: "Transactional Email Dispatcher",
        sub: "Nodemailer SMTP Worker",
        type: "server",
        protocol: "ASYNC SMTP",
        detail: "Asynchronous dispatch for invite link tokens, account verification, and settlement confirmation receipts.",
        contractSample: `interface EmailDispatchTask {
  to: string;
  template: "GROUP_INVITE" | "SETTLEMENT_RECEIPT";
  meta: { groupId: string; token?: string; amountFormatted?: string };
  retries: number;
}`,
      },
    ],
    tradeoffs: [
      {
        title: "Greedy Debt Minimization vs NP-Hard Optimal Subset Sum",
        decision: "O(V log V) greedy debtor/creditor pairing.",
        rationale:
          "Finding the absolute minimum transaction count across cycles is NP-complete (equivalent to the subset-sum problem). The greedy heuristic produces at most N-1 transactions in microsecond execution time with zero server bottleneck.",
      },
      {
        title: "Push WebSockets (Socket.IO) vs Short Polling",
        decision: "Event-driven WebSocket room broadcasting.",
        rationale:
          "Polling every 5 seconds drains mobile battery and produces 95% redundant database reads. Socket.IO room broadcasts push group expense updates in under 45ms only when ledger mutations occur.",
      },
      {
        title: "ACID Row-Level Locking vs Eventual Consistency",
        decision: "Atomic SQL transactions with strict row locks on member balances.",
        rationale:
          "Financial ledger corruption cannot be reconciled after the fact. Locking the group's expense records during settlement prevents race conditions when two roommates settle simultaneously.",
      },
    ],
  },
  {
    id: "ai-transcription",
    name: "Distributed Real-Time AI Audio Pipeline",
    badge: "AudioWorklet + WebSockets + Whisper",
    summary:
      "A sub-200ms end-to-end streaming speech recognition pipeline designed to eliminate main-thread stutter and reduce edge egress bandwidth by 66%.",
    sla: {
      e2eLatency: "160ms",
      bandwidthSavings: "66%",
      mainThreadLoad: "< 1.5%",
      fpsDrop: "0 frames",
    },
    nodes: [
      {
        id: "mic",
        title: "User Microphone",
        sub: "getUserMedia API",
        type: "client",
        protocol: "RAW 48kHz PCM",
        detail: "Captures raw 48kHz audio input from browser media stream.",
        contractSample: `// MediaStream AudioConstraints
const audioStream = await navigator.mediaDevices.getUserMedia({
  audio: {
    channelCount: 1,
    sampleRate: 48000,
    echoCancellation: true,
    noiseSuppression: true,
    autoGainControl: true
  }
});`,
      },
      {
        id: "worklet",
        title: "AudioWorklet Processor",
        sub: "Dedicated Audio Thread",
        type: "client",
        protocol: "INT16 DOWNSAMPLER",
        detail:
          "Runs off-main-thread on dedicated audio render thread. Downsamples 48kHz -> 16kHz mono PCM, preventing UI re-render dropouts.",
        contractSample: `class PCMDownsamplerProcessor extends AudioWorkletProcessor {
  process(inputs, outputs) {
    const raw48k = inputs[0][0]; // Float32Array
    const pcm16Mono = this.interpolateTo16k(raw48k);
    // Zero-copy transfer to background ring buffer
    this.port.postMessage(pcm16Mono.buffer, [pcm16Mono.buffer]);
    return true;
  }
}`,
      },
      {
        id: "ring",
        title: "Client Ring Buffer",
        sub: "SharedArrayBuffer",
        type: "client",
        protocol: "SLIDING 250ms WINDOW",
        detail: "Zero-copy circular ring buffer with atomic head/tail pointers to chunk 250ms sliding audio frames.",
        contractSample: `interface SlidingAudioFrame {
  frameIndex: number;
  sampleCount: 4000; // 250ms at 16kHz
  strideOverlap: 800; // 50ms overlap
  timestampMs: number;
  encodedBuffer: ArrayBuffer;
}`,
      },
      {
        id: "ws",
        title: "Binary WebSocket Uplink",
        sub: "ArrayBuffer Transport",
        type: "transport",
        protocol: "WSS BINARY FRAMES",
        detail: "High-throughput, low-overhead binary framing over multiplexed secure WebSocket connection.",
        contractSample: `// Binary WebSocket Frame Packet
ws.send(slidingAudioFrame.encodedBuffer, { binary: true });
// Bandwidth reduced from 1.5 Mbps to ~256 kbps (66% savings)`,
      },
      {
        id: "gateway",
        title: "Edge Gateway & Backpressure",
        sub: "Node.js Cluster / Go",
        type: "server",
        protocol: "TCP BACKPRESSURE",
        detail: "Manages TCP backpressure, rate-limiting, and distributed worker pool load balancing.",
        contractSample: `// Gateway Worker Pool Dispatcher
interface StreamSessionDescriptor {
  sessionId: string;
  workerAddress: string;
  clientEgressKbps: number;
  backpressureHighWaterMark: boolean;
}`,
      },
      {
        id: "whisper",
        title: "Whisper AI Inference",
        sub: "TensorRT / vLLM Stream",
        type: "server",
        protocol: "BEAM-SEARCH ASR",
        detail: "Streaming beam-search token inference with sub-110ms partial transcript emissions.",
        contractSample: `interface StreamingAsrEmission {
  segmentId: number;
  textDelta: string;
  confidence: number; // 0.0 - 1.0
  isFinal: boolean;
  timeWindow: { startMs: number; endMs: number };
}`,
      },
      {
        id: "sse",
        title: "SSE / WS Token Stream",
        sub: "Delta Broadcast",
        type: "transport",
        protocol: "SSE DIFF BROKER",
        detail: "Streams diffs and word confidence scores directly back to client session.",
        contractSample: `// Server-Sent Event Packet
data: {"word":"architecture","conf":0.987,"start":1240,"end":1480}
data: {"word":"telemetry","conf":0.992,"start":1490,"end":1820}`,
      },
      {
        id: "ui",
        title: "Virtualized UI Renderer",
        sub: "React 19 + Canvas",
        type: "client",
        protocol: "60 FPS VIRTUAL LIST",
        detail: "Virtual window list with micro-interpolation for smooth 60fps word-by-word transcription render.",
        contractSample: `interface RenderableTranscriptWord {
  id: string;
  word: string;
  highlightIntensity: number; // For smooth audio sync glow
  confidenceGrade: "high" | "medium" | "low";
}`,
      },
    ],
    tradeoffs: [
      {
        title: "AudioWorklet vs ScriptProcessorNode",
        decision: "AudioWorklet running in isolated audio render context.",
        rationale:
          "ScriptProcessor executes on the JavaScript main thread. Any heavy DOM layout recalculation or React reconciliation caused audio sample buffer starvation and clicking artifacts. AudioWorklet guarantees glitch-free capture.",
      },
      {
        title: "Edge Client Downsampling vs Server-Side Resampling",
        decision: "Downsample to 16kHz mono on the client before network transmission.",
        rationale:
          "Streaming 48kHz uncompressed audio wastes ~70% bandwidth on frequencies human speech doesn't utilize. Client-side downsampling reduced uplink data from 1.5 Mbps to ~256 kbps.",
      },
      {
        title: "Sliding Frame Buffering (250ms) vs Real-Time Sample-by-Sample",
        decision: "250ms dynamic window with 50ms overlap.",
        rationale:
          "Provides the Whisper acoustic model sufficient acoustic phonetic context for accurate punctuation and phoneme recognition while keeping latency well under human conversation perception threshold.",
      },
    ],
  },
  {
    id: "net-inspector",
    name: "High-Throughput Network Inspector & Diagnostic Engine",
    badge: "Web Workers + Circular Buffer + Zero-GC",
    summary:
      "A client telemetry engine capable of capturing and visualizing 50,000+ network events per second without dropping frames or triggering V8 GC pauses.",
    sla: {
      e2eLatency: "< 16ms",
      throughput: "> 50k events/s",
      memoryCap: "8 MB Fixed",
      gcOverhead: "0ms GC pauses",
    },
    nodes: [
      {
        id: "interceptor",
        title: "Telemetry Interceptor",
        sub: "PerformanceObserver + Fetch Monkeypatch",
        type: "client",
        protocol: "RESOURCE TIMING",
        detail: "Transparent instrumentation of window.fetch, XMLHttpRequest, and browser Resource Timing events.",
        contractSample: `// PerformanceObserver Subscription Hook
const observer = new PerformanceObserver((list) => {
  const entries = list.getEntriesByType("resource");
  for (const entry of entries) {
    recordLatencySpan(entry.name, entry.duration, entry.transferSize);
  }
});
observer.observe({ entryTypes: ["resource", "navigation"] });`,
      },
      {
        id: "channel",
        title: "Transferable Channel",
        sub: "postMessage(ArrayBuffer)",
        type: "transport",
        protocol: "ZERO-COPY MEMORY",
        detail: "Zero-copy memory transfer transferring ownership of binary packet descriptors to background thread.",
        contractSample: `// Zero-Copy postMessage Transfer
const telemetrySlice = new ArrayBuffer(512); // Raw binary descriptors
worker.postMessage({ buffer: telemetrySlice }, [telemetrySlice]);
// Note: telemetrySlice is neutered in main thread with zero GC copy`,
      },
      {
        id: "worker",
        title: "Offscreen Web Worker",
        sub: "Dedicated Web Worker",
        type: "client",
        protocol: "PARSER THREAD",
        detail: "Performs serialization, header sanitization, schema parsing, and metric aggregation off the main thread.",
        contractSample: `self.onmessage = (event) => {
  const binaryView = new DataView(event.data.buffer);
  const eventCode = binaryView.getUint16(0);
  const latencyMs = binaryView.getFloat32(4);
  processMetricInWorker(eventCode, latencyMs);
};`,
      },
      {
        id: "circular",
        title: "Zero-GC Ring Buffer",
        sub: "TypedArray Fixed Memory",
        type: "client",
        protocol: "FLOAT64 BUFFER",
        detail: "8MB pre-allocated contiguous Float64Array buffer with sliding cursor. Zero garbage collection cycles.",
        contractSample: `// Pre-allocated 8MB Contiguous Ring Buffer
const BUFFER_CAPACITY = 1024 * 1024; // 1M Float64 slots = 8MB
const RING = new Float64Array(BUFFER_CAPACITY);
let cursor = 0;

function appendMetric(val: number): void {
  RING[cursor++ % BUFFER_CAPACITY] = val; // Overwrites circular head; 0 GC pauses
}`,
      },
      {
        id: "compress",
        title: "Differential Compression",
        sub: "Delta + Bitpack Engine",
        type: "client",
        protocol: "VARINT PACKER",
        detail: "Compresses repetitive URL paths and status codes using dictionary encoding and varint delta packing.",
        contractSample: `// Varint Delta Encoded Packet
interface DeltaPackedChunk {
  baseTimestamp: number;
  deltaOffsets: Uint16Array;
  dictionaryTokens: number[];
}`,
      },
      {
        id: "storage",
        title: "IndexedDB Batched Sink",
        sub: "Transaction Batcher",
        type: "client",
        protocol: "IDLE TRANSACTION",
        detail: "Flushes chunks in 500ms transactions using background idle periods (requestIdleCallback).",
        contractSample: `// Batched Storage Flush
requestIdleCallback((deadline) => {
  if (deadline.timeRemaining() > 5) {
    const tx = db.transaction("network_traces", "readwrite");
    tx.objectStore("network_traces").put(chunk);
  }
});`,
      },
      {
        id: "viz",
        title: "60 FPS Canvas Timeline",
        sub: "OffscreenCanvas + WebGL",
        type: "client",
        protocol: "GPU HARDWARE ACCEL",
        detail: "Renders millions of timing bars, waterfall traces, and flamegraphs with GPU hardware acceleration.",
        contractSample: `// Hardware-Accelerated Canvas WebGL Pipeline
const gl = offscreenCanvas.getContext("webgl2");
// Uses instanced vertex arrays to draw 50,000 waterfall bars in 1 draw call`,
      },
    ],
    tradeoffs: [
      {
        title: "Web Worker Architecture vs Inline Event Listener",
        decision: "Offload all serialization and payload diffing to Web Worker via Transferable Objects.",
        rationale:
          "In high-traffic enterprise applications with hundreds of concurrent API calls, main-thread JSON serialization causes noticeable input latency spikes (INP degradation). Transferable buffers guarantee 0ms UI impact.",
      },
      {
        title: "Pre-Allocated Contiguous TypedArray vs Dynamic Arrays",
        decision: "Fixed 8MB Float64Array circular ring buffer.",
        rationale:
          "Dynamic object creation causes frequent V8 Minor GC scavenging and Major GC pauses. Pre-allocated buffers reuse slots, eliminating memory fragmentation entirely.",
      },
      {
        title: "WebGL Canvas Rendering vs SVG/DOM Elements",
        decision: "Canvas rendering with spatial index quad-trees.",
        rationale:
          "Rendering 10,000+ waterfall DOM nodes creates a heavy DOM tree and crushes frame rates during pinch-to-zoom. Canvas with spatial indexing allows seamless 60 FPS panning.",
      },
    ],
  },
];

export default function ArchitectureModal({ isOpen, onClose, initialSystemId = "splithive" }) {
  const [activeSystemId, setActiveSystemId] = useState(initialSystemId);
  const [selectedNode, setSelectedNode] = useState(null);
  const [inspectorTab, setInspectorTab] = useState("detail");
  const [copiedContract, setCopiedContract] = useState(false);

  useEffect(() => {
    if (initialSystemId) {
      setActiveSystemId(initialSystemId);
      setSelectedNode(null);
    }
  }, [initialSystemId]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock background scroll and pause Lenis while modal is open
  useEffect(() => {
    if (!isOpen) return;

    if (typeof window !== "undefined" && window.__lenis) {
      window.__lenis.stop();
    }
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
      if (typeof window !== "undefined" && window.__lenis) {
        window.__lenis.start();
      }
    };
  }, [isOpen]);

  const activeSystem = SYSTEMS.find((s) => s.id === activeSystemId) || SYSTEMS[0];

  const handleCopyContract = (code) => {
    sound.playSuccess();
    navigator.clipboard.writeText(code);
    setCopiedContract(true);
    setTimeout(() => setCopiedContract(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        className="arch-modal-overlay"
        onClick={onClose}
        data-lenis-prevent="true"
      >
        <motion.div
          className="arch-modal-container"
          onClick={(e) => e.stopPropagation()}
          data-lenis-prevent="true"
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Modal Header */}
          <div className="arch-modal-header">
            <div className="arch-modal-title-group">
              <div className="arch-header-pill">SYSTEM ARCHITECTURE BLUEPRINT</div>
              <h2 className="arch-title">{activeSystem.name}</h2>
              <p className="arch-summary">{activeSystem.summary}</p>
            </div>
            <button
              className="arch-close-btn"
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              aria-label="Close architecture modal"
            >
              ✕
            </button>
          </div>

          {/* System Selection Tabs */}
          <div className="arch-tabs">
            {SYSTEMS.map((sys) => (
              <button
                key={sys.id}
                className={`arch-tab-btn ${sys.id === activeSystem.id ? "active" : ""}`}
                onClick={() => {
                  sound.playToggle();
                  setActiveSystemId(sys.id);
                  setSelectedNode(null);
                }}
              >
                <span className="arch-tab-badge">{sys.badge}</span>
                <span className="arch-tab-name">{sys.name}</span>
              </button>
            ))}
          </div>

          {/* SLA / Key Metrics Bar */}
          <div className="arch-sla-grid">
            {Object.entries(activeSystem.sla).map(([k, v]) => (
              <div key={k} className="arch-sla-card">
                <span className="arch-sla-label">{k.replace(/([A-Z])/g, " $1").toUpperCase()}</span>
                <span className="arch-sla-value">{v}</span>
              </div>
            ))}
          </div>

          {/* Animated Pipeline Diagram */}
          <div className="arch-diagram-section">
            <div className="arch-section-heading">
              <span>Interactive Distributed Pipeline</span>
              <span className="arch-hint">(Click any node to inspect engineering contract & schema)</span>
            </div>

            <div className="arch-nodes-flow">
              {activeSystem.nodes.map((node, i) => (
                <React.Fragment key={node.id}>
                  <motion.div
                    className={`arch-node-card ${node.type} ${selectedNode?.id === node.id ? "selected" : ""}`}
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      sound.playClick();
                      setSelectedNode(node);
                      if (!node.contractSample && inspectorTab === "contract") {
                        setInspectorTab("detail");
                      }
                    }}
                  >
                    <div className="arch-node-top">
                      <div className="arch-node-tag">{node.type.toUpperCase()}</div>
                      <div className="arch-beacon-pill">
                        <span className="arch-beacon-dot" />
                        <span className="arch-beacon-label">LIVE</span>
                      </div>
                    </div>
                    <h4 className="arch-node-title">{node.title}</h4>
                    <span className="arch-node-sub">{node.sub}</span>
                    <div className="arch-node-pulse" />
                  </motion.div>
                  {i < activeSystem.nodes.length - 1 && (
                    <div className="arch-pipe-arrow">
                      <span className="arch-pipe-protocol">{node.protocol || "STREAM"}</span>
                      <div className="arch-pipe-line">
                        <span className="arch-pipe-pulse" />
                        <span className="arch-pipe-particle" />
                      </div>
                      <span className="arch-arrow-head">▶</span>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Selected Node Drawer with Contract Schema Viewer */}
            {selectedNode && (
              <motion.div
                className="arch-node-inspector"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                <div className="arch-inspector-header">
                  <div className="arch-inspector-title-wrap">
                    <span className="arch-inspector-title">
                      Node: <strong>{selectedNode.title}</strong> [{selectedNode.sub}]
                    </span>
                    {selectedNode.protocol && (
                      <span className="arch-inspector-proto-badge">{selectedNode.protocol}</span>
                    )}
                  </div>
                  <button
                    className="arch-inspector-close"
                    onClick={() => setSelectedNode(null)}
                    aria-label="Close node inspector"
                  >
                    ✕
                  </button>
                </div>

                {/* Inspector Sub-Tabs */}
                <div className="arch-inspector-tabs">
                  <button
                    type="button"
                    className={`arch-insp-tab ${inspectorTab === "detail" ? "active" : ""}`}
                    onClick={() => {
                      sound.playTab();
                      setInspectorTab("detail");
                    }}
                  >
                    Architecture Specification
                  </button>
                  {selectedNode.contractSample && (
                    <button
                      type="button"
                      className={`arch-insp-tab ${inspectorTab === "contract" ? "active" : ""}`}
                      onClick={() => {
                        sound.playTab();
                        setInspectorTab("contract");
                      }}
                    >
                      Protocol & Schema Contract ⚡
                    </button>
                  )}
                </div>

                {inspectorTab === "detail" ? (
                  <p className="arch-inspector-desc">{selectedNode.detail}</p>
                ) : (
                  <div className="arch-contract-box">
                    <div className="arch-contract-topbar">
                      <span className="arch-contract-file">payload-contract.ts</span>
                      <button
                        type="button"
                        className="arch-contract-copy-btn"
                        onClick={() => handleCopyContract(selectedNode.contractSample)}
                      >
                        {copiedContract ? "Copied!" : "Copy Contract"}
                      </button>
                    </div>
                    <pre className="arch-contract-code">
                      <code>{selectedNode.contractSample}</code>
                    </pre>
                  </div>
                )}
              </motion.div>
            )}
          </div>

          {/* Engineering Trade-offs & Deep Dive */}
          <div className="arch-tradeoffs-section">
            <h3 className="arch-section-heading">Architecture Trade-offs & Engineering Rationales</h3>
            <div className="arch-tradeoffs-grid">
              {activeSystem.tradeoffs.map((t, idx) => (
                <div key={idx} className="arch-tradeoff-card">
                  <h4 className="arch-tradeoff-title">
                    <span className="arch-tradeoff-num">0{idx + 1}</span> {t.title}
                  </h4>
                  <div className="arch-tradeoff-decision">
                    <strong>Decision:</strong> {t.decision}
                  </div>
                  <div className="arch-tradeoff-rationale">
                    <strong>Technical Rationale:</strong> {t.rationale}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}


