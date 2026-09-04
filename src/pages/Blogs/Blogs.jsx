import "./Blogs.css";
import { motion } from "framer-motion";
import TextReveal from "../../components/TextReveal/TextReveal";
import { FaClock, FaLinkedin, FaBookOpen } from "react-icons/fa";

const upcomingArticles = [
  {
    id: "article-1",
    title: "Architecting High-Throughput Frontend State with Redux & RxJS",
    category: "Frontend Architecture",
    readTime: "8 min read",
    summary:
      "Lessons from orchestrating concurrent real-time data streams, WebSockets, and state stores across distributed enterprise modules without cascading re-renders.",
    tags: ["React 18", "RxJS", "Redux", "Concurrency", "Performance"],
    status: "Draft in Progress",
  },
  {
    id: "article-2",
    title: "Real-Time Speech-to-Text Pipelines in Modern Web Applications",
    category: "AI & Web Engineering",
    readTime: "6 min read",
    summary:
      "A deep dive into integrating client-side Web Audio capture, chunked streaming protocols, and low-latency Whisper models into responsive user interfaces.",
    tags: ["ASR / Whisper", "Web Audio API", "WebSockets", "FastAPI"],
    status: "Draft in Progress",
  },
  {
    id: "article-3",
    title: "Mastering Layout Shifts & Frame Budgets in Motion-Heavy SPAs",
    category: "Web Performance",
    readTime: "10 min read",
    summary:
      "Practical profiling strategies for maintaining sub-16ms frame times using Framer Motion hardware acceleration, compositor layers, and Lenis inertia scrolling.",
    tags: ["Core Web Vitals", "Framer Motion", "Lenis", "Profiling", "INP"],
    status: "Draft in Progress",
  },
  {
    id: "article-4",
    title: "Designing Resilient Microfrontends at Scale",
    category: "System Design",
    readTime: "7 min read",
    summary:
      "Balancing team autonomy, isolated dependency trees, and universal server-side rendering without shipping bloated JavaScript bundles to end users.",
    tags: ["Microfrontends", "SSR", "Fusion.js", "Module Federation"],
    status: "Draft in Progress",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const Blogs = () => {
  return (
    <section className="blogs section-wrapper">
      <motion.header
        className="blogs-header"
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        <span className="blogs-eyebrow">Engineering Journal</span>
        <TextReveal as="h1" mode="words" className="gradient-text">
          Insights, deep dives, and architectural notes.
        </TextReveal>
        <p>
          Technical explorations on frontend craft, real-time AI interfaces, and lessons learned from
          operating at enterprise scale.
        </p>
      </motion.header>

      {/* Featured Writing Roadmap */}
      <motion.div
        className="blogs-grid"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {upcomingArticles.map((article) => (
          <motion.article
            key={article.id}
            className="blog-card"
            variants={cardVariants}
          >
            <div className="blog-card-meta">
              <span className="blog-category">{article.category}</span>
              <span className="blog-read-time">
                <FaClock aria-hidden="true" /> {article.readTime}
              </span>
            </div>

            <h2 className="blog-title">{article.title}</h2>
            <p className="blog-summary">{article.summary}</p>

            <div className="blog-tags">
              {article.tags.map((tag) => (
                <span key={tag} className="blog-tag">
                  {tag}
                </span>
              ))}
            </div>

            <div className="blog-footer">
              <span className="blog-status-badge">
                <span className="blog-status-dot" /> {article.status}
              </span>
              <a
                href="https://www.linkedin.com/in/pritamrauniyar/"
                target="_blank"
                rel="noopener noreferrer"
                className="blog-notify-link"
                data-cursor="link"
              >
                <FaLinkedin /> Follow on LinkedIn
              </a>
            </div>
          </motion.article>
        ))}
      </motion.div>

      {/* Under Construction Banner */}
      <motion.div
        className="blogs-coming-soon"
        initial={{ scale: 0.98, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.35, duration: 0.5, ease: "easeOut" }}
      >
        <div className="blogs-notice-icon">
          <FaBookOpen />
        </div>
        <div>
          <span className="blogs-badge">Blog Platform</span>
          <h2>The complete publishing engine is coming soon.</h2>
          <p>
            Full-text interactive articles, code sandboxes, and benchmark reproductions will launch right here.
            Follow me on LinkedIn to get notified when new essays drop.
          </p>
        </div>
        <div className="blogs-shimmer" aria-hidden="true" />
      </motion.div>
    </section>
  );
};

export default Blogs;
