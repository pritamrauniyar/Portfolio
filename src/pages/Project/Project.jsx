import "./Project.css";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TextReveal from "../../components/TextReveal/TextReveal";
import { FaGithub, FaExternalLinkAlt, FaSearch, FaMicrochip } from "react-icons/fa";
import sound from "../../utils/soundEngine";

const CATEGORIES = [
  "All",
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
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.25 } },
};

const ProjectCard = ({ data, index }) => {
  const cardRef = useRef(null);
  const imgRef = useRef(null);

  const archTarget = useMemo(() => {
    const title = (data.title || "").toLowerCase();
    if (title.includes("transcription")) return "ai-transcription";
    if (title.includes("inspector") || title.includes("net")) return "net-inspector";
    return null;
  }, [data.title]);

  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty("--spotlight-x", `${x.toFixed(1)}%`);
    e.currentTarget.style.setProperty("--spotlight-y", `${y.toFixed(1)}%`);

    if (imgRef.current) {
      const ix = (e.clientX - rect.left) / rect.width - 0.5;
      const iy = (e.clientY - rect.top) / rect.height - 0.5;
      imgRef.current.style.transform = `translate3d(${-ix * 10}px, ${-iy * 10}px, 0) scale(1.05)`;
    }
  }, []);

  const handleMouseLeave = useCallback((e) => {
    if (imgRef.current) {
      imgRef.current.style.transform = "translate3d(0, 0, 0) scale(1)";
    }
  }, []);

  return (
    <motion.div
      layout
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="project-card-wrapper"
    >
      <div
        ref={cardRef}
        className="project-card"
        data-cursor="project"
        data-cursor-text="View"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="project-spotlight" aria-hidden="true" />
        
        <div className="project-visual">
          <img ref={imgRef} src={data.image} alt={data.title} loading="lazy" />
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
          <p>{data.description}</p>

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
              <FaExternalLinkAlt aria-hidden="true" /> Live Demo
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
            {archTarget && (
              <button
                type="button"
                className="project-btn arch-btn"
                onClick={() => {
                  sound.playSuccess();
                  window.dispatchEvent(
                    new CustomEvent("open-arch-modal", { detail: archTarget })
                  );
                }}
                data-cursor="link"
                onMouseEnter={() => sound.playHover()}
                title="Inspect System Architecture Blueprint"
              >
                <FaMicrochip aria-hidden="true" /> Architecture
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

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
    return () => { isMounted = false; };
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesCategory =
        selectedCategory === "All" || p.category === selectedCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags?.some((t) => t.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [projects, selectedCategory, searchQuery]);

  return (
    <section className="projects section-wrapper">
      <motion.header
        className="projects-header"
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        <span className="projects-eyebrow">Selected Work</span>
        <TextReveal as="h1" mode="words" className="gradient-text">
          Interfaces, systems, and stories I have built.
        </TextReveal>
        <p>
          Each project blends interaction design with technical depth — from AI-driven speech
          processing and diagnostic network telemetry to high-performance micro-utilities.
        </p>
      </motion.header>

      {/* Filter and Search Controls */}
      <div className="projects-controls">
        <div className="projects-tabs" role="tablist">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              className={`projects-tab ${selectedCategory === category ? "active" : ""}`}
              onClick={() => setSelectedCategory(category)}
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
            placeholder="Search by name, tag, or stack..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search projects"
          />
          {searchQuery && (
            <button
              className="projects-search-clear"
              onClick={() => setSearchQuery("")}
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
      </div>

      <motion.div
        className="project-grid"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence mode="popLayout">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <div key={`skeleton-${index}`} className="project-card skeleton">
                <div className="project-visual"><span /></div>
                <div className="project-copy">
                  <h3>Loading project</h3>
                  <p>Curating something special...</p>
                </div>
              </div>
            ))
          ) : filteredProjects.length === 0 ? (
            <div className="projects-empty">
              <p>No projects found matching your criteria.</p>
              <button
                className="projects-reset-btn"
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                type="button"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            filteredProjects.map((data, index) => (
              <ProjectCard key={data.id || data.title} data={data} index={index} />
            ))
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default Project;
