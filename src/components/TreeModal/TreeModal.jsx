import { MyContext } from "../MyContext/MyContext";
import "./TreeModal.css";
import { useContext, useMemo, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { getCompanyIcon } from "../SvgIcons/CompanyIcons";

const timelineVariants = {
  hidden: (custom) => ({
    opacity: 0,
    x: custom.direction === "left" ? -60 : 60,
    rotateZ: custom.direction === "left" ? -2 : 2,
  }),
  visible: {
    opacity: 1,
    x: 0,
    rotateZ: 0,
    transition: {
      duration: 0.65,
      ease: "easeOut",
    },
  },
};

const TreeModal = ({
  eyebrow = "Detailed timeline",
  title = "Every milestone, mapped",
  caption = "A closer look at the experiences, teams, and technologies that shaped my approach.",
}) => {
  const jsonData = useContext(MyContext);
  const timelineItems = useMemo(() => jsonData ?? [], [jsonData]);
  const wrapperRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start end", "end start"],
  });
  const lineScaleY = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

  return (
    <section className="timeline">
      <motion.header
        className="timeline-header"
        initial={{ y: 24, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        <span className="timeline-eyebrow">{eyebrow}</span>
        <h3>{title}</h3>
        {caption && <p>{caption}</p>}
      </motion.header>

      <div className="timeline-wrapper" ref={wrapperRef}>
        <motion.div
          className="timeline-line"
          aria-hidden="true"
          style={{ scaleY: lineScaleY, transformOrigin: "top" }}
        />
        {timelineItems.length === 0 && (
          <div className="timeline-empty">Loading memorable stops...</div>
        )}
        {timelineItems.map((data, index) => {
          const CompanyLogo = getCompanyIcon(data.title);
          const direction = index % 2 === 0 ? "left" : "right";
          return (
            <motion.article
              key={`${data.title}-${index}`}
              className="timeline-item"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              variants={timelineVariants}
              custom={{ direction }}
            >
              <div className="timeline-marker">
                {CompanyLogo ? (
                  <CompanyLogo size={22} />
                ) : (
                  <span />
                )}
              </div>
              <div className="timeline-card">
                <header>
                  <div className="timeline-card-title">
                    {CompanyLogo && <CompanyLogo size={28} className="timeline-card-logo" />}
                    <div>
                      <span className="timeline-type">{data.type}</span>
                      <h4>{data.title}</h4>
                    </div>
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
          );
        })}
      </div>
    </section>
  );
};

export default TreeModal;
