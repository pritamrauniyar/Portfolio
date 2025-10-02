import TreeModal from "../../components/TreeModal/TreeModal";
import "./About.css";
import { motion } from "framer-motion";

const skillColumns = [
  {
    heading: "Languages",
    items: ["TypeScript", "JavaScript", "C++", "Java"],
  },
  {
    heading: "Frameworks",
    items: ["React", "Next.js", "Angular", "Node.js"],
  },
  {
    heading: "Platforms",
    items: ["Azure", "Vercel", "Firebase", "GitHub Actions"],
  },
  {
    heading: "Tooling",
    items: ["Jira", "Storybook", "Postman", "Redux Toolkit"],
  },
];

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
        <h1>Engineer, collaborator, perpetual learner.</h1>
        <p>
          I turn ambitious concepts into delightful, performant interfaces. My experience
          spans fast-paced product teams and large-scale engineering organisations, where I
          translate insight into inclusive, scalable user experiences.
        </p>
      </motion.header>

      <div className="about-grid">
        <motion.article
          className="about-card"
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
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
      >
        <h2>Capabilities</h2>
        <div className="stack-grid">
          {skillColumns.map((column) => (
            <div key={column.heading} className="stack-column">
              <span>{column.heading}</span>
              <ul>
                {column.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
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

