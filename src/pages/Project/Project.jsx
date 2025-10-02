import "./Project.css";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Project = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const response = await fetch("/data/projectsData.json");
        const responseData = await response.json();
        if (isMounted) {
          setProjects(responseData);
        }
      } catch (error) {
        console.error("Unable to fetch projects", error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="projects section-wrapper">
      <motion.header
        className="projects-header"
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        <span className="projects-eyebrow">Selected Work</span>
        <h1>Interfaces, systems, and stories I have built.</h1>
        <p>
          Each project blends interaction design with technical depth — from data-heavy
          dashboards to playful micro-tools that refine everyday workflows.
        </p>
      </motion.header>

      <div className="project-grid">
        {(isLoading ? Array.from({ length: 6 }) : projects).map((data, index) => (
          <motion.a
            key={data ? data.title : `placeholder-${index}`}
            href={data ? data.link : undefined}
            target={data ? "_blank" : undefined}
            rel={data ? "noopener noreferrer" : undefined}
            className={data ? "project-card" : "project-card skeleton"}
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 * (index % 6), duration: 0.55, ease: "easeOut" }}
          >
            <div className="project-visual">
              {data ? (
                <img src={data.image} alt={data.title} loading="lazy" />
              ) : (
                <span />
              )}
              <div className="project-overlay" aria-hidden="true" />
            </div>
            <div className="project-copy">
              <span className="project-index">0{index + 1}</span>
              <h3>{data ? data.title : "Loading project"}</h3>
              <p>{data ? data.description : "Curating something special..."}</p>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
};

export default Project;

