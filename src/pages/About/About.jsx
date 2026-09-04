import TreeModal from "../../components/TreeModal/TreeModal";
import "./About.css";
import { motion } from "framer-motion";
import { getTechIcon } from "../../components/SvgIcons/TechIcons";
import TextReveal from "../../components/TextReveal/TextReveal";

const skillColumns = [
  {
    heading: "Languages",
    items: ["TypeScript", "JavaScript", "Go (Golang)", "C++", "Java", "C", "SQL"],
  },
  {
    heading: "Frameworks",
    items: ["React", "Angular", "Node.js", "Fusion.js", "RxJS", "Next.js"],
  },
  {
    heading: "Generative AI",
    items: ["LangGraph", "LangChain", "MCP", "Claude Code", "OpenAI Whisper"],
  },
  {
    heading: "Cloud & Data",
    items: ["AWS Cloud", "Azure AD B2C", "Kafka", "gRPC", "MySQL", "DynamoDB"],
  },
  {
    heading: "Tooling & CI/CD",
    items: ["Git/GitLab", "CI/CD", "Postman", "Jira", "Playwright", "uGrafana"],
  },
];

const iconContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const iconItemVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 350, damping: 15 },
  },
};

const About = () => {
  return (
    <section className="about section-wrapper">
      <motion.header
        className="about-header"
        initial={{ y: 24, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <span className="about-eyebrow">About</span>
        <TextReveal as="h1" mode="chars" className="gradient-text">
          Engineer, collaborator, perpetual learner.
        </TextReveal>
        <p>
          I turn ambitious concepts into delightful, performant interfaces. My experience
          spans fast-paced product teams and large-scale engineering organisations, where I
          translate insight into inclusive, scalable user experiences.
        </p>
      </motion.header>

      <div className="about-grid">
        <motion.article
          className="about-card about-card-gradient-border"
          initial={{ y: 32, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2>How I work</h2>
          <p>
            I love partnering with designers, PMs, and backend teams to craft experiences
            that feel considered and intentional. From setting up component systems to
            hardening delivery pipelines, I thrive where strategy meets hands-on execution.
          </p>
          <ul>
            <li>Lead from discovery to delivery with a design systems mindset.</li>
            <li>Champion accessibility, motion, and performance with measurable targets.</li>
            <li>Mentor teams on modern frontend patterns and testing practices.</li>
          </ul>
        </motion.article>

        <motion.article
          className="about-card"
          initial={{ y: 48, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
        >
          <h2>Beyond the editor</h2>
          <p>
            When I am not shipping features, you will find me chasing high ranks in
            strategy games, exploring new cities, or capturing moments from the road.
            Travel keeps me curious and fuels the empathy I bring to every product I build.
          </p>
        </motion.article>
      </div>

      <motion.section
        className="about-stack"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
      >
        <h2>Capabilities</h2>
        <div className="stack-grid">
          {skillColumns.map((column) => (
            <div key={column.heading} className="stack-column">
              <span>{column.heading}</span>
              <motion.ul
                variants={iconContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                {column.items.map((item, idx) => {
                  const IconComponent = getTechIcon(item);
                  return (
                    <motion.li
                      key={item}
                      variants={iconItemVariants}
                      style={{ animationDelay: `${idx * 0.15}s` }}
                      className="stack-item-with-icon"
                    >
                      {IconComponent && (
                        <span className="stack-icon-wrapper">
                          <IconComponent size={24} />
                        </span>
                      )}
                      <span>{item}</span>
                      <span className="stack-tooltip">{item}</span>
                    </motion.li>
                  );
                })}
              </motion.ul>
            </div>
          ))}
        </div>
      </motion.section>

      <TreeModal
        eyebrow="Career timeline"
        title="Snapshots from the journey"
        caption="Education, teams, and milestones that continue to shape my engineering voice."
      />
    </section>
  );
};

export default About;
