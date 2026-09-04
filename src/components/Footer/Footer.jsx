import "./Footer.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import MagneticButton from "../MagneticButton/MagneticButton";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-wave" aria-hidden="true">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none">
          <path
            d="M0,30 C240,55 480,5 720,30 C960,55 1200,5 1440,30 L1440,0 L0,0 Z"
            fill="rgba(123, 92, 255, 0.08)"
          />
          <path
            d="M0,40 C360,60 720,10 1080,40 C1260,55 1380,25 1440,35 L1440,0 L0,0 Z"
            fill="rgba(0, 196, 255, 0.04)"
          />
        </svg>
      </div>
      <div className="footer-gradient" aria-hidden="true" />
      <div className="footer-content section-wrapper">
        <div className="footer-brand">
          <span className="footer-marker">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 7L2 14L8 21" stroke="#c8bbff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M20 7L26 14L20 21" stroke="#00c4ff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              <text x="14" y="18.5" textAnchor="middle" fill="#f4f5ff" fontFamily="Space Grotesk, sans-serif" fontSize="12" fontWeight="700">P</text>
            </svg>
          </span>
          <div>
            <p className="footer-eyebrow">Portfolio of</p>
            <h3>Pritam Rauniyar</h3>
          </div>
        </div>

        <nav className="footer-links" aria-label="Secondary navigation">
          <Link to="/">Home</Link>
          <Link to="/certificates">Certificates</Link>
          <Link to="/project">Projects</Link>
          <Link to="/blogs">Blogs</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        <div className="footer-socials">
          {[
            { href: "https://github.com/pritamrauniyar", icon: <FaGithub aria-hidden="true" />, label: "GitHub" },
            { href: "https://www.linkedin.com/in/pritamrauniyar/", icon: <FaLinkedin aria-hidden="true" />, label: "LinkedIn" },
            { href: "mailto:pritamrauniyar.np@gmail.com", icon: <FaEnvelope aria-hidden="true" />, label: "Email" },
          ].map((item) => (
            <MagneticButton key={item.label} strength={0.2}>
              <motion.a
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                whileHover={{ y: -3, scale: 1.06 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                data-cursor="link"
              >
                {item.icon}
                <span>{item.label}</span>
              </motion.a>
            </MagneticButton>
          ))}
        </div>
      </div>
      <div className="footer-meta">
        <div className="section-wrapper footer-meta-inner">
          <span>&copy; {new Date().getFullYear()} pritamrauniyar.com.np</span>
          <span>Crafted with curiosity and care.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
