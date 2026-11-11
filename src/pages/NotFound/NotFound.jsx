import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHome, FaProjectDiagram } from "react-icons/fa";
import "./NotFound.css";

const NotFound = () => {
  return (
    <section className="not-found section-wrapper">
      <motion.div
        className="not-found-card glass-panel"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <span className="not-found-eyebrow">HTTP 404 // ROUTE NOT FOUND</span>
        <h1 className="not-found-code gradient-text">404</h1>
        <h2 className="not-found-title">This route does not exist in the system.</h2>
        <p className="not-found-copy">
          The page you requested may have moved or the URL was mistyped. Jump back to the
          home overview or explore production projects.
        </p>

        <div className="not-found-actions">
          <Link to="/" className="not-found-btn primary" data-cursor="link">
            <FaHome aria-hidden="true" />
            <span>Back to Home</span>
          </Link>
          <Link to="/project" className="not-found-btn secondary" data-cursor="link">
            <FaProjectDiagram aria-hidden="true" />
            <span>Explore Projects</span>
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default NotFound;
