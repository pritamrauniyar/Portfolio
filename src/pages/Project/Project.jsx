import "./Project.css";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TextReveal from "../../components/TextReveal/TextReveal";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaSearch,
  FaMicrochip,
  FaCheckCircle,
  FaBolt,
  FaTools,
  FaLayerGroup,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import sound from "../../utils/soundEngine";

const CATEGORIES = [
  "All",
  "Mobile & Full-Stack",
  "AI & Machine Learning",
  "Cloud & Diagnostics",
  "Productivity & Tools",
  "Web Applications",
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 25, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: "easeOut" } },
  exit: { opacity: 0, scale: 0.96, transition: { duration: 0.2 } },
};

/* --- Flagship Project Card with Deep Architecture Inspection --- */
const FlagshipCard = ({ data, index }) => {
  const cardRef = useRef(null);
  const imgRef = useRef(null);
  const [showSpec, setShowSpec] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const archTarget = useMemo(() => {
    if (data.archSystemId) return data.archSystemId;
    const title = (data.title || "").toLowerCase();
    if (title.includes("splithive") || title.includes("split")) return "splithive";
    if (title.includes("transcription")) return "ai-transcription";
    if (title.includes("inspector") || title.includes("net")) return "net-inspector";
    return null;
  }, [data.archSystemId, data.title]);

  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty("--spotlight-x", `${x.toFixed(1)}%`);
    e.currentTarget.style.setProperty("--spotlight-y", `${y.toFixed(1)}%`);

    if (imgRef.current) {
      const ix = (e.clientX - rect.left) / rect.width - 0.5;
      const iy = (e.clientY - rect.top) / rect.height - 0.5;
      imgRef.current.style.transform = `translate3d(${-ix * 8}px, ${-iy * 8}px, 0) scale(1.04)`;
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (imgRef.current) {
      imgRef.current.style.transform = "translate3d(0, 0, 0) scale(1)";
    }
  }, []);

  const handleOpenArch = useCallback(() => {
    sound.playSuccess();
    if (archTarget) {
      window.dispatchEvent(
        new CustomEvent("open-arch-modal", { detail: archTarget })
      );
    }
  }, [archTarget]);

  return (
    <motion.article
      layout
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="project-flagship-card-wrap"
    >
      <div
        ref={cardRef}
        className="project-flagship-card"
        data-cursor="project"
        data-cursor-text="Inspect"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="project-spotlight" aria-hidden="true" />

        {/* Top Header: Badge & Caliber indicator */}
        <div className="flagship-topbar">
          <div className="flagship-badge-group">
            <span className="flagship-badge">
              <FaBolt className="flagship-bolt-icon" aria-hidden="true" />
              PRODUCTION FLAGSHIP
            </span>
            <span className="flagship-category">{data.category}</span>
          </div>
          <span className="flagship-serial">ARCH-0{index + 1}</span>
        </div>

        <div className="flagship-main-grid">
          {/* Visual Showcase */}
          <div className="flagship-visual">
            {!imgLoaded && !imgError && (
              <div className="visual-shimmer" aria-hidden="true" />
            )}
            {imgError ? (
              <div className="visual-fallback" aria-hidden="true">
                <FaMicrochip size="3rem" />
                <span>{data.title} System Blueprint</span>
              </div>
            ) : (
              <img
                ref={imgRef}
                src={data.image}
                alt={`${data.title} production system preview`}
                loading="lazy"
                onLoad={() => setImgLoaded(true)}
                onError={() => setImgError(true)}
              />
            )}
            <div className="flagship-visual-overlay" aria-hidden="true" />

            {/* Quick Architecture Trigger Floating Pill */}
            {archTarget && (
              <button
                type="button"
                className="flagship-quick-arch-pill"
                onClick={handleOpenArch}
                data-cursor="link"
                title="Open interactive system blueprint modal"
                aria-label={`Inspect ${data.title} Architecture Blueprint`}
              >
                <FaMicrochip aria-hidden="true" />
                <span>Inspect Architecture Blueprint ↗</span>
              </button>
            )}
          </div>

          {/* Core Technical Content */}
          <div className="flagship-content">
            <div className="flagship-headline-row">
              <h2 className="flagship-title">{data.title}</h2>
              {data.headline && (
                <p className="flagship-headline">{data.headline}</p>
              )}
            </div>

            <p className="flagship-desc">{data.description}</p>

            {/* Architectural Highlights Pills */}
            {data.highlights && (
              <div className="flagship-highlights">
                {data.highlights.map((item, idx) => (
                  <div key={idx} className="flagship-highlight-chip">
                    <FaCheckCircle className="highlight-icon" aria-hidden="true" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Problem / Architecture / Impact Collapsible Spec */}
            {(data.problem || data.architecture || data.impact) && (
              <div className="flagship-spec-toggle-wrap">
                <button
                  type="button"
                  className={`flagship-spec-toggle ${showSpec ? "active" : ""}`}
                  onClick={() => {
                    sound.playToggle();
                    setShowSpec((prev) => !prev);
                  }}
                  aria-expanded={showSpec}
                  aria-controls={`spec-drawer-${data.id}`}
                >
                  <span>
                    <strong>Engineering Rationale</strong> (Problem &rarr; Architecture &rarr; Impact)
                  </span>
                  {showSpec ? <FaChevronUp aria-hidden="true" /> : <FaChevronDown aria-hidden="true" />}
                </button>

                <AnimatePresence>
                  {showSpec && (
                    <motion.div
                      id={`spec-drawer-${data.id}`}
                      className="flagship-spec-drawer"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.28, ease: "easeInOut" }}
                    >
                      {data.problem && (
                        <div className="spec-entry">
                          <span className="spec-label problem">PROBLEM:</span>
                          <p>{data.problem}</p>
                        </div>
                      )}
                      {data.architecture && (
                        <div className="spec-entry">
                          <span className="spec-label architecture">ARCHITECTURE:</span>
                          <p>{data.architecture}</p>
                        </div>
                      )}
                      {data.impact && (
                        <div className="spec-entry">
                          <span className="spec-label impact">IMPACT:</span>
                          <p>{data.impact}</p>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Tags */}
            {data.tags && (
              <div className="project-tags flagship-tags" aria-label="Tech Stack">
                {data.tags.map((tag) => (
                  <span key={tag} className="project-tag">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Action Bar */}
            <div className="flagship-actions">
              {archTarget && (
                <button
                  type="button"
                  className="project-btn arch-btn flagship-cta"
                  onClick={handleOpenArch}
                  data-cursor="link"
                  onMouseEnter={() => sound.playHover()}
                >
                  <FaMicrochip aria-hidden="true" /> Architecture Blueprint ↗
                </button>
              )}
              <a
                href={data.link}
                target="_blank"
                rel="noopener noreferrer"
                className="project-btn primary"
                data-cursor="link"
                onClick={() => sound.playClick()}
                onMouseEnter={() => sound.playHover()}
              >
                <FaExternalLinkAlt aria-hidden="true" />
                {data.link && data.link.includes("github.com") ? "View Repository" : "Live Demo"}
              </a>
              {data.github && (
                <a
                  href={data.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-btn secondary"
                  data-cursor="link"
                  onClick={() => sound.playClick()}
                  onMouseEnter={() => sound.playHover()}
                >
                  <FaGithub aria-hidden="true" /> Source
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

/* --- Modular Utility / Open-Source Tool Card --- */
const UtilityCard = ({ data, index }) => {
  const cardRef = useRef(null);
  const imgRef = useRef(null);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty("--spotlight-x", `${x.toFixed(1)}%`);
    e.currentTarget.style.setProperty("--spotlight-y", `${y.toFixed(1)}%`);

    if (imgRef.current) {
      const ix = (e.clientX - rect.left) / rect.width - 0.5;
      const iy = (e.clientY - rect.top) / rect.height - 0.5;
      imgRef.current.style.transform = `translate3d(${-ix * 6}px, ${-iy * 6}px, 0) scale(1.04)`;
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (imgRef.current) {
      imgRef.current.style.transform = "translate3d(0, 0, 0) scale(1)";
    }
  }, []);

  return (
    <motion.article
      layout
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="project-card-wrapper"
    >
      <div
        ref={cardRef}
        className="project-card utility-card"
        data-cursor="project"
        data-cursor-text="View"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="project-spotlight" aria-hidden="true" />

        <div className="project-visual">
          {!imgLoaded && !imgError && (
            <div className="visual-shimmer" aria-hidden="true" />
          )}
          {imgError ? (
            <div className="visual-fallback" aria-hidden="true">
              <FaTools size="2rem" />
              <span>{data.title}</span>
            </div>
          ) : (
            <img
              ref={imgRef}
              src={data.image}
              alt={`${data.title} application screenshot`}
              loading="lazy"
              onLoad={() => setImgLoaded(true)}
              onError={() => setImgError(true)}
            />
          )}
          <div className="project-overlay" aria-hidden="true" />
          {data.category && (
            <span className="project-badge">{data.category}</span>
          )}
        </div>

        <div className="project-copy">
          <div className="project-title-row">
            <span className="project-index">0{index + 1}</span>
            <h3>{data.title}</h3>
          </div>
          <p title={data.description}>{data.description}</p>

          {data.tags && (
            <div className="project-tags">
              {data.tags.map((tag) => (
                <span key={tag} className="project-tag">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="project-actions">
            <a
              href={data.link}
              target="_blank"
              rel="noopener noreferrer"
              className="project-btn primary"
              data-cursor="link"
              onClick={() => sound.playClick()}
              onMouseEnter={() => sound.playHover()}
            >
              <FaExternalLinkAlt aria-hidden="true" />
              {data.link && data.link.includes("github.com") ? "View Tool" : "Live Demo"}
            </a>
            {data.github && (
              <a
                href={data.github}
                target="_blank"
                rel="noopener noreferrer"
                className="project-btn secondary"
                data-cursor="link"
                onClick={() => sound.playClick()}
                onMouseEnter={() => sound.playHover()}
              >
                <FaGithub aria-hidden="true" /> Source
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
};

/* --- Main Project Page Component --- */
const Project = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const response = await fetch("/data/projectsData.json");
        const responseData = await response.json();
        if (isMounted) setProjects(responseData);
      } catch (error) {
        console.error("Unable to fetch projects", error);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    fetchData();
    return () => {
      isMounted = false;
    };
  }, []);

  // Filtered lists
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesCategory =
        selectedCategory === "All" || p.category === selectedCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.headline && p.headline.toLowerCase().includes(q)) ||
        p.tags?.some((t) => t.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [projects, selectedCategory, searchQuery]);

  const flagships = useMemo(
    () => filteredProjects.filter((p) => p.tier === "flagship"),
    [filteredProjects]
  );

  const utilities = useMemo(
    () => filteredProjects.filter((p) => p.tier !== "flagship"),
    [filteredProjects]
  );

  const isDefaultView = selectedCategory === "All" && !searchQuery.trim();

  return (
    <section className="projects section-wrapper">
      <motion.header
        className="projects-header"
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        <span className="projects-eyebrow">Production Architectures & Tooling</span>
        <TextReveal as="h1" mode="words" className="gradient-text">
          Enterprise systems, real-time engines, and tools I have built.
        </TextReveal>
        <p>
          Engineered for high concurrency, low latency, and distributed fault tolerance.
          Explore end-to-end production systems with live interactive blueprints, or explore modular developer utilities.
        </p>
      </motion.header>

      {/* Filter and Search Controls */}
      <div className="projects-controls">
        <div className="projects-tabs" role="tablist" aria-label="Project categories">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              className={`projects-tab ${selectedCategory === category ? "active" : ""}`}
              onClick={() => {
                sound.playTab();
                setSelectedCategory(category);
              }}
              role="tab"
              aria-selected={selectedCategory === category}
              type="button"
            >
              {category}
              {selectedCategory === category && (
                <motion.div
                  className="tab-active-pill"
                  layoutId="project-tab-indicator"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        <div className="projects-search-wrap">
          <FaSearch className="projects-search-icon" aria-hidden="true" />
          <input
            type="text"
            className="projects-search-input"
            placeholder="Search by architecture, protocol, tag, or name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search projects by architecture, protocol, tag, or name"
          />
          {searchQuery && (
            <button
              className="projects-search-clear"
              onClick={() => {
                sound.playClick();
                setSearchQuery("");
              }}
              type="button"
              aria-label="Clear search query"
            >
              &times;
            </button>
          )}
        </div>
      </div>

      <div className="projects-count-indicator">
        Showing <strong>{filteredProjects.length}</strong> {filteredProjects.length === 1 ? "project" : "projects"}
        {selectedCategory !== "All" && ` in ${selectedCategory}`}
        {searchQuery && ` matching "${searchQuery}"`}
      </div>

      {isLoading ? (
        <div className="project-grid">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={`skeleton-${index}`} className="project-card-wrapper">
              <div className="project-card skeleton">
                <div className="project-visual"><span /></div>
                <div className="project-copy">
                  <div className="project-title-row">
                    <span className="project-index">0{index + 1}</span>
                    <h3>Loading system architecture</h3>
                  </div>
                  <p>Curating real-time telemetry...</p>
                  <div className="project-tags">
                    <span className="project-tag" style={{ width: "64px", height: "24px" }} />
                    <span className="project-tag" style={{ width: "84px", height: "24px" }} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="projects-empty">
          <p>No projects found matching your criteria.</p>
          <button
            className="projects-reset-btn"
            onClick={() => {
              sound.playClick();
              setSelectedCategory("All");
              setSearchQuery("");
            }}
            type="button"
          >
            Reset Filters
          </button>
        </div>
      ) : isDefaultView ? (
        /* --- Tiered View: Featured Flagships followed by Utilities --- */
        <div className="projects-tiered-layout">
          {/* Section 1: Flagship Systems */}
          <div className="projects-section-group">
            <div className="section-group-header">
              <div className="section-group-badge">
                <FaBolt aria-hidden="true" />
                <span>TIER 1 ARCHITECTURES</span>
              </div>
              <h2>Featured Production Systems</h2>
              <p>
                Core distributed systems designed with transactional safety, WebSocket multiplexing, and zero-GC memory allocation.
              </p>
            </div>

            <motion.div
              className="flagship-stack"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <AnimatePresence mode="popLayout">
                {flagships.map((project, idx) => (
                  <FlagshipCard key={project.id} data={project} index={idx} />
                ))}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Section Divider */}
          <div className="projects-tier-divider" aria-hidden="true">
            <div className="tier-divider-line" />
            <div className="tier-divider-chip">
              <FaLayerGroup />
              <span>MODULAR UTILITIES</span>
            </div>
            <div className="tier-divider-line" />
          </div>

          {/* Section 2: Open Source Utilities */}
          <div className="projects-section-group">
            <div className="section-group-header">
              <div className="section-group-badge utility-badge">
                <FaTools aria-hidden="true" />
                <span>TIER 2 OPEN SOURCE</span>
              </div>
              <h2>Open Source Utilities & Tools</h2>
              <p>
                Focused micro-applications, algorithmic parsers, and developer tools built with high-entropy security and tactile interfaces.
              </p>
            </div>

            <motion.div
              className="project-grid"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <AnimatePresence mode="popLayout">
                {utilities.map((project, idx) => (
                  <UtilityCard key={project.id} data={project} index={flagships.length + idx} />
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      ) : (
        /* --- Filtered / Search Unified Grid --- */
        <motion.div
          className="project-unified-stack"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence mode="popLayout">
            {flagships.length > 0 && (
              <div className="filtered-group">
                <h3 className="filtered-group-title">Flagship Architectures ({flagships.length})</h3>
                <div className="flagship-stack">
                  {flagships.map((project, idx) => (
                    <FlagshipCard key={project.id} data={project} index={idx} />
                  ))}
                </div>
              </div>
            )}

            {utilities.length > 0 && (
              <div className="filtered-group">
                <h3 className="filtered-group-title">Modular Utilities & Tools ({utilities.length})</h3>
                <div className="project-grid">
                  {utilities.map((project, idx) => (
                    <UtilityCard key={project.id} data={project} index={flagships.length + idx} />
                  ))}
                </div>
              </div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </section>
  );
};

export default Project;

