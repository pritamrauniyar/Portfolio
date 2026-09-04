import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import sound from "../../utils/soundEngine";
import "./ArchitectureModal.css";

const SYSTEMS = [
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
        detail: "Captures raw 48kHz audio input from browser media stream.",
      },
      {
        id: "worklet",
        title: "AudioWorklet Processor",
        sub: "Dedicated Audio Thread",
        type: "client",
        detail:
          "Runs off-main-thread on dedicated audio render thread. Downsamples 48kHz -> 16kHz mono PCM, preventing UI re-render dropouts.",
      },
      {
        id: "ring",
        title: "Client Ring Buffer",
        sub: "SharedArrayBuffer",
        type: "client",
        detail: "Zero-copy circular ring buffer with atomic head/tail pointers to chunk 250ms sliding audio frames.",
      },
      {
        id: "ws",
        title: "Binary WebSocket Uplink",
        sub: "ArrayBuffer Transport",
        type: "transport",
        detail: "High-throughput, low-overhead binary framing over multiplexed secure WebSocket connection.",
      },
      {
        id: "gateway",
        title: "Edge Gateway & Backpressure",
        sub: "Node.js Cluster / Go",
        type: "server",
        detail: "Manages TCP backpressure, rate-limiting, and distributed worker pool load balancing.",
      },
      {
        id: "whisper",
        title: "Whisper AI Inference",
        sub: "TensorRT / vLLM Stream",
        type: "server",
        detail: "Streaming beam-search token inference with sub-110ms partial transcript emissions.",
      },
      {
        id: "sse",
        title: "SSE / WS Token Stream",
        sub: "Delta Broadcast",
        type: "transport",
        detail: "Streams diffs and word confidence scores directly back to client session.",
      },
      {
        id: "ui",
        title: "Virtualized UI Renderer",
        sub: "React 19 + Canvas",
        type: "client",
        detail: "Virtual window list with micro-interpolation for smooth 60fps word-by-word transcription render.",
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
        detail: "Transparent instrumentation of window.fetch, XMLHttpRequest, and browser Resource Timing events.",
      },
      {
        id: "channel",
        title: "Transferable Channel",
        sub: "postMessage(ArrayBuffer)",
        type: "transport",
        detail: "Zero-copy memory transfer transferring ownership of binary packet descriptors to background thread.",
      },
      {
        id: "worker",
        title: "Offscreen Web Worker",
        sub: "Dedicated Web Worker",
        type: "client",
        detail: "Performs serialization, header sanitization, schema parsing, and metric aggregation off the main thread.",
      },
      {
        id: "circular",
        title: "Zero-GC Ring Buffer",
        sub: "TypedArray Fixed Memory",
        type: "client",
        detail: "8MB pre-allocated contiguous Float64Array buffer with sliding cursor. Zero garbage collection cycles.",
      },
      {
        id: "compress",
        title: "Differential Compression",
        sub: "Delta + Bitpack Engine",
        type: "client",
        detail: "Compresses repetitive URL paths and status codes using dictionary encoding and varint delta packing.",
      },
      {
        id: "storage",
        title: "IndexedDB Batched Sink",
        sub: "Transaction Batcher",
        type: "client",
        detail: "Flushes chunks in 500ms transactions using background idle periods (requestIdleCallback).",
      },
      {
        id: "viz",
        title: "60 FPS Canvas Timeline",
        sub: "OffscreenCanvas + WebGL",
        type: "client",
        detail: "Renders millions of timing bars, waterfall traces, and flamegraphs with GPU hardware acceleration.",
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

export default function ArchitectureModal({ isOpen, onClose, initialSystemId = "ai-transcription" }) {
  const [activeSystemId, setActiveSystemId] = useState(initialSystemId);
  const [selectedNode, setSelectedNode] = useState(null);

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

  const activeSystem = SYSTEMS.find((s) => s.id === activeSystemId) || SYSTEMS[0];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="arch-modal-overlay" onClick={onClose}>
        <motion.div
          className="arch-modal-container"
          onClick={(e) => e.stopPropagation()}
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
              <span>Interactive Data Flow Pipeline</span>
              <span className="arch-hint">(Click any node to inspect engineering contract)</span>
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
                    }}
                  >
                    <div className="arch-node-tag">{node.type.toUpperCase()}</div>
                    <h4 className="arch-node-title">{node.title}</h4>
                    <span className="arch-node-sub">{node.sub}</span>
                    <div className="arch-node-pulse" />
                  </motion.div>
                  {i < activeSystem.nodes.length - 1 && (
                    <div className="arch-pipe-arrow">
                      <div className="arch-pipe-line">
                        <span className="arch-pipe-pulse" />
                      </div>
                      <span className="arch-arrow-head">▶</span>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Selected Node Drawer */}
            {selectedNode && (
              <motion.div
                className="arch-node-inspector"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                <div className="arch-inspector-header">
                  <span className="arch-inspector-title">
                    Node Inspection: <strong>{selectedNode.title}</strong> [{selectedNode.sub}]
                  </span>
                  <button
                    className="arch-inspector-close"
                    onClick={() => setSelectedNode(null)}
                  >
                    ✕
                  </button>
                </div>
                <p className="arch-inspector-desc">{selectedNode.detail}</p>
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

