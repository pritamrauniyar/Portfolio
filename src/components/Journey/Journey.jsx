import "./Journey.css";
import { useContext, useMemo } from "react";
import { motion } from "framer-motion";
import { MyContext } from "../MyContext/MyContext";
import TreeModal from "../TreeModal/TreeModal";

const Journey = () => {
  const jsonData = useContext(MyContext);
  const spotlight = useMemo(() => (jsonData ? jsonData.slice(0, 3) : []), [jsonData]);

  return (
    <section className="journey section-wrapper" id="journey">
      <motion.header
        className="journey-header"
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        <span className="journey-eyebrow">Journey so far</span>
        <h2>From curiosity to craft.</h2>
        <p>
          A timeline of moments that shaped my engineering perspective - blending
          rigorous foundations, cross-functional collaboration, and user-first delivery.
        </p>
      </motion.header>

      <div className="journey-highlight-grid">
        {(spotlight.length ? spotlight : Array.from({ length: 3 })).map((item, index) => (
          <motion.article
            key={item ? item.title : `placeholder-${index}`}
            className="journey-highlight-card"
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.08 * index, duration: 0.6, ease: "easeOut" }}
          >
            <div className="journey-highlight-index">0{index + 1}</div>
            <h3>{item ? item.title : "Loading experience"}</h3>
            <p>{item ? item.desc : "Fetching milestone details..."}</p>
            {item && (
              <footer>
                <span>{item.type}</span>
                <span>
                  {item.startDate} - {item.endDate}
                </span>
              </footer>
            )}
          </motion.article>
        ))}
      </div>

      <TreeModal
        eyebrow="Milestones & momentum"
        title="Each chapter builds the next"
        caption="Explore the trajectory across education, leadership, and hands-on delivery."
      />
    </section>
  );
};
export default Journey;

