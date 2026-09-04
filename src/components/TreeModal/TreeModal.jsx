import { MyContext } from "../MyContext/MyContext";
import "./TreeModal.css";
import { useContext, useMemo, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { getCompanyIcon } from "../SvgIcons/CompanyIcons";
import sound from "../../utils/soundEngine";

const EXECUTIVE_STATS = [
  { label: "Technical Ownership", value: "4+ Yrs", detail: "Enterprise & High-Growth" },
  { label: "Direct Revenue Impact", value: "$38M+", detail: "Uber NTB & Unified Offers" },
  { label: "Engineers Empowered", value: "500+", detail: "Daily Claude AI PR Skill" },
  { label: "Users Scaled", value: "1M+", detail: "Enterprise SSO & WebRTC" },
];

const FILTER_TABS = [
  { id: "all", label: "All Milestones" },
  { id: "experience", label: "Industry Leadership" },
  { id: "education", label: "Academic Foundations" },
];

const timelineVariants = {
  hidden: (custom) => ({
    opacity: 0,
    x: custom.direction === "left" ? -40 : 40,
    y: 20,
  }),
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const TreeModal = ({
  eyebrow = "Career & Engineering Track Record",
  title = "Architectural Milestones & Technical Leadership",
  caption = "A timeline of high-impact production systems, cross-functional ownership, and engineering deliverables across enterprise platforms.",
}) => {
  const jsonData = useContext(MyContext);
  const timelineItems = useMemo(() => jsonData ?? [], [jsonData]);
  const wrapperRef = useRef(null);

  const [activeFilter, setActiveFilter] = useState("all");
  const [expandedIds, setExpandedIds] = useState({ "01": true }); // Uber expanded by default

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start end", "end start"],
  });
  const lineScaleY = useTransform(scrollYProgress, [0, 0.85], [0, 1]);

  const filteredItems = useMemo(() => {
    if (activeFilter === "all") return timelineItems;
    return timelineItems.filter((item) => item.category === activeFilter);
  }, [timelineItems, activeFilter]);

  const handleFilterChange = useCallback((filterId) => {
    sound.playClick();
    setActiveFilter(filterId);
  }, []);

  const toggleExpand = useCallback((id) => {
    sound.playToggle();
    setExpandedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }, []);

  return (
    <section className="timeline">
      <motion.header
        className="timeline-header"
        initial={{ y: 24, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        <span className="timeline-eyebrow">{eyebrow}</span>
        <h3>{title}</h3>
        {caption && <p>{caption}</p>}
      </motion.header>

      {/* Senior Executive Stats Summary Bar */}
      <motion.div
        className="timeline-stats-bar"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {EXECUTIVE_STATS.map((stat, i) => (
          <div key={i} className="timeline-stat-cell">
            <span className="timeline-stat-value">{stat.value}</span>
            <span className="timeline-stat-label">{stat.label}</span>
            <span className="timeline-stat-detail">{stat.detail}</span>
          </div>
        ))}
      </motion.div>

      {/* Filter Navigation Tabs */}
      <div className="timeline-filters-wrap">
        <div className="timeline-filters">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.id}
              className={`timeline-filter-btn ${activeFilter === tab.id ? "active" : ""}`}
              onClick={() => handleFilterChange(tab.id)}
              data-cursor="link"
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="timeline-wrapper" ref={wrapperRef}>
        <motion.div
          className="timeline-line"
          aria-hidden="true"
          style={{ scaleY: lineScaleY, transformOrigin: "top" }}
        />
        {filteredItems.length === 0 && (
          <div className="timeline-empty">No milestones found for this category.</div>
        )}
        <AnimatePresence mode="popLayout">
          {filteredItems.map((data, index) => {
            const CompanyLogo = getCompanyIcon(data.title);
            const direction = index % 2 === 0 ? "left" : "right";
            const isExpanded = !!expandedIds[data.id];
            const hasHighlights = data.highlights && data.highlights.length > 0;
            const visibleHighlights = isExpanded
              ? data.highlights
              : data.highlights?.slice(0, 2) || [];

            return (
              <motion.article
                key={data.id || `${data.title}-${index}`}
                className={`timeline-item ${data.current ? "timeline-item--current" : ""}`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                variants={timelineVariants}
                custom={{ direction }}
                layout
              >
                <div className="timeline-marker">
                  {CompanyLogo ? (
                    <CompanyLogo size={22} />
                  ) : (
                    <span />
                  )}
                </div>

                <div className="timeline-card">
                  <header className="timeline-card-header">
                    <div className="timeline-card-title-group">
                      {CompanyLogo && (
                        <CompanyLogo size={36} className="timeline-card-logo" />
                      )}
                      <div>
                        <div className="timeline-card-meta-row">
                          <h4 className="timeline-company-name">{data.title}</h4>
                          {data.current && (
                            <span className="timeline-badge-current">
                              <span className="badge-pulse" />
                              Active Role
                            </span>
                          )}
                        </div>
                        <span className="timeline-role-title">
                          {data.role || data.type}
                        </span>
                      </div>
                    </div>

                    <div className="timeline-dates-wrap">
                      <span className="timeline-dates" aria-label="Duration">
                        {data.startDate} — {data.endDate}
                      </span>
                      <span className="timeline-location-badge">
                        📍 {data.location ?? "Globally distributed"}
                      </span>
                    </div>
                  </header>

                  <p className="timeline-card-summary">{data.desc}</p>

                  {/* Impact Metric Strip */}
                  {data.metrics && data.metrics.length > 0 && (
                    <div className="timeline-metrics-strip">
                      {data.metrics.map((m, mIdx) => (
                        <span key={mIdx} className="timeline-metric-chip">
                          <span className="metric-spark">✦</span> {m}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Structured Architectural Deliverables */}
                  {hasHighlights && (
                    <div className="timeline-highlights-section">
                      <div className="timeline-highlights-heading">
                        Key Architectural Deliverables & Impact
                      </div>
                      <ul className="timeline-highlights-list">
                        {visibleHighlights.map((h, hIdx) => (
                          <li key={hIdx} className="timeline-highlight-row">
                            <span className="highlight-bullet">▹</span>
                            <div className="highlight-content">
                              <strong className="highlight-title">{h.title}: </strong>
                              <span className="highlight-detail">{h.detail}</span>
                            </div>
                          </li>
                        ))}
                      </ul>

                      {data.highlights.length > 2 && (
                        <button
                          type="button"
                          className="timeline-expand-btn"
                          onClick={() => toggleExpand(data.id)}
                          data-cursor="link"
                        >
                          {isExpanded ? (
                            <>
                              <span>Show summary view</span>
                              <span className="expand-arrow">▲</span>
                            </>
                          ) : (
                            <>
                              <span>
                                Deep dive into all deliverables ({data.highlights.length})
                              </span>
                              <span className="expand-arrow">▼</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  )}

                  {/* Tech Stack Chips */}
                  {data.skills && data.skills.length > 0 && (
                    <div className="timeline-skills-strip">
                      <span className="timeline-skills-label">Core Technologies:</span>
                      <div className="timeline-skills-tags">
                        {data.skills.map((skill) => (
                          <span key={skill} className="timeline-skill-pill">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default TreeModal;
