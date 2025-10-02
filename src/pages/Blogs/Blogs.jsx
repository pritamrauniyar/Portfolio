import "./Blogs.css";
import { motion } from "framer-motion";

const Blogs = () => {
  return (
    <section className="blogs section-wrapper">
      <motion.header
        className="blogs-header"
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        <span className="blogs-eyebrow">Blogs</span>
        <h1>Insights, deep dives, and engineering stories.</h1>
        <p>
          I am lining up articles on architecture lessons, frontend craft, and product delivery.
          Check back soon—fresh perspectives are on the way.
        </p>
      </motion.header>

      <motion.div
        className="blogs-coming-soon"
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.55, ease: "easeOut" }}
      >
        <span className="blogs-badge">Coming Soon</span>
        <h2>The blog engine is under construction.</h2>
        <p>
          I am building the publishing workflow and backend to share detailed write-ups. Follow me on LinkedIn for updates in the meantime.
        </p>
      </motion.div>
    </section>
  );
};

export default Blogs;
