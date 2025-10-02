import "./Footer.css";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-gradient" aria-hidden="true" />
      <div className="footer-content section-wrapper">
        <div className="footer-brand">
          <span className="footer-marker" />
          <div>
            <p className="footer-eyebrow">Portfolio of</p>
            <h3>Pritam Rauniyar</h3>
          </div>
        </div>

        <nav className="footer-links" aria-label="Secondary navigation">
          <Link to="/">Home</Link>
          <Link to="/project">Projects</Link>
          <Link to="/blogs">Blogs</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        <div className="footer-socials">
          <a
            href="https://github.com/pritamrauniyar"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub aria-hidden="true" />
            <span>GitHub</span>
          </a>
          <a
            href="https://www.linkedin.com/in/pritamrauniyar/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin aria-hidden="true" />
            <span>LinkedIn</span>
          </a>
          <a href="mailto:pritamrauniyar.np@gmail.com">
            <FaEnvelope aria-hidden="true" />
            <span>Email</span>
          </a>
        </div>
      </div>
      <div className="footer-meta">
        <div className="section-wrapper footer-meta-inner">
          <span>© {new Date().getFullYear()} pritamrauniyar.com.np</span>
          <span>Crafted with curiosity and care.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

