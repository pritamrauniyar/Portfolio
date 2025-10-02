import { MyContext } from "../MyContext/MyContext";
import "./TreeModal.css";
import { useContext, useMemo } from "react";
import { motion } from "framer-motion";

const timelineVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: ({ index }) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.05 * index,
      duration: 0.55,
      ease: "easeOut",
    },
  }),
};

const TreeModal = ({
  eyebrow = "Detailed timeline",
  title = "Every milestone, mapped",
  caption = "A closer look at the experiences, teams, and technologies that shaped my approach.",
}) => {
  const jsonData = useContext(MyContext);
  const timelineItems = useMemo(() => jsonData ?? [], [jsonData]);

  return (
    <section className="timeline">
      <header className="timeline-header">
        <span className="timeline-eyebrow">{eyebrow}</span>
        <h3>{title}</h3>
        {caption && <p>{caption}</p>}
      </header>

      <div className="timeline-wrapper">
        <div className="timeline-line" aria-hidden="true" />
        {timelineItems.length === 0 && (
          <div className="timeline-empty">Loading memorable stops...</div>
        )}
        {timelineItems.map((data, index) => (
          <motion.article
            key={`${data.title}-${index}`}
            className="timeline-item"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={timelineVariants}
            custom={{ index }}
          >
            <div className="timeline-marker">
              <span />
            </div>
            <div className="timeline-card">
              <header>
                <div>
                  <span className="timeline-type">{data.type}</span>
                  <h4>{data.title}</h4>
                </div>
                <span className="timeline-dates" aria-label="Duration">
                  {data.startDate} — {data.endDate}
                </span>
              </header>

              <p>{data.desc}</p>

              <footer>
                <span>{data.location ?? "Globally distributed"}</span>
              </footer>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default TreeModal;

