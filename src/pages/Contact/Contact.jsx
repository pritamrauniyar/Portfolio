import "./Contact.css";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaFacebook,
  FaLinkedin,
  FaInstagram,
  FaCopy,
  FaCheck,
  FaPaperPlane,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import TextReveal from "../../components/TextReveal/TextReveal";
import MagneticButton from "../../components/MagneticButton/MagneticButton";

const socials = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/pritamrauniyar/",
    icon: <FaLinkedin size="1.2em" />,
  },
  {
    label: "Facebook",
    href: "https://facebook.com/pritamrauniyar.np/",
    icon: <FaFacebook size="1.2em" />,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/pritamrauniyar.np/",
    icon: <FaInstagram size="1.2em" />,
  },
];

const Contact = () => {
  const [copiedEmail, setCopiedEmail] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSent, setIsSent] = useState(false);

  const handleCopy = (email) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    // Create a mailto URL to launch default mail client with prefilled fields
    const mailtoUrl = `mailto:pritamrauniyar.np@gmail.com?subject=${encodeURIComponent(
      formData.subject || `Portfolio Inquiry from ${formData.name}`
    )}&body=${encodeURIComponent(
      `From: ${formData.name} (${formData.email})\n\nMessage:\n${formData.message}`
    )}`;

    window.location.href = mailtoUrl;
    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 4000);
  };

  return (
    <section className="contact section-wrapper">
      <motion.header
        className="contact-header"
        initial={{ y: 28, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        <div className="contact-status-pill">
          <span className="contact-status-dot" />
          <span>Available for Frontend & AI Eng Conversations</span>
        </div>
        <TextReveal as="h1" mode="words" className="gradient-text">
          Let&apos;s build the next thing together.
        </TextReveal>
        <p>
          Whether you have an ambitious product to ship, an architectural challenge to untangle,
          or just want to talk shop — my inbox is always open.
        </p>
      </motion.header>

      <div className="contact-grid">
        {/* Left Column: Direct Info & Socials */}
        <motion.div
          className="contact-panel"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.55, ease: "easeOut" }}
        >
          <h2>Direct Reach-outs</h2>
          <div className="contact-items">
            <div className="contact-item-group">
              <span className="contact-label">Primary Email</span>
              <div className="contact-email-row">
                <a href="mailto:pritamrauniyar.np@gmail.com">pritamrauniyar.np@gmail.com</a>
                <button
                  type="button"
                  className="contact-copy-btn"
                  onClick={() => handleCopy("pritamrauniyar.np@gmail.com")}
                  aria-label="Copy primary email"
                  title="Copy to clipboard"
                >
                  {copiedEmail === "pritamrauniyar.np@gmail.com" ? (
                    <span className="copied-tag"><FaCheck /> Copied</span>
                  ) : (
                    <FaCopy />
                  )}
                </button>
              </div>
            </div>

            <div className="contact-item-group">
              <span className="contact-label">Alternative Email</span>
              <div className="contact-email-row">
                <a href="mailto:contact@pritamrauniyar.com.np">contact@pritamrauniyar.com.np</a>
                <button
                  type="button"
                  className="contact-copy-btn"
                  onClick={() => handleCopy("contact@pritamrauniyar.com.np")}
                  aria-label="Copy secondary email"
                  title="Copy to clipboard"
                >
                  {copiedEmail === "contact@pritamrauniyar.com.np" ? (
                    <span className="copied-tag"><FaCheck /> Copied</span>
                  ) : (
                    <FaCopy />
                  )}
                </button>
              </div>
            </div>

            <div className="contact-item-group">
              <span className="contact-label">Location</span>
              <p className="contact-location"><FaMapMarkerAlt /> India / Nepal</p>
            </div>
          </div>

          <div className="contact-socials-section">
            <span className="contact-label">Social Channels</span>
            <div className="contact-socials">
              {socials.map((social) => (
                <MagneticButton key={social.label} strength={0.2}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="link"
                  >
                    <motion.span
                      className="icon-circle"
                      whileHover={{ scale: 1.15 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    >
                      {social.icon}
                    </motion.span>
                    <span>{social.label}</span>
                  </a>
                </MagneticButton>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Column: Interactive Quick Message Composer */}
        <motion.div
          className="contact-panel form-panel"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.18, duration: 0.55, ease: "easeOut" }}
        >
          <h2>Send a Quick Note</h2>
          <p className="contact-panel-copy">
            Prefill your note below to send a direct email with all context included.
          </p>

          {isSent ? (
            <div className="contact-success-state">
              <div className="success-icon-wrap"><FaEnvelope /></div>
              <h3>Opening Email Client...</h3>
              <p>Your draft has been composed! Looking forward to connecting.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="contact-name">Your Name</label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  placeholder="e.g. Alex Morgan"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-email">Your Email</label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  placeholder="e.g. alex@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-subject">Subject</label>
                <input
                  id="contact-subject"
                  type="text"
                  placeholder="e.g. Engineering collaboration / Role discussion"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  required
                  rows="4"
                  maxLength="500"
                  placeholder="Briefly describe what you would like to discuss..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
                <span className="char-count">{formData.message.length} / 500</span>
              </div>

              <button type="submit" className="contact-submit-btn" data-cursor="link">
                <FaPaperPlane /> Send Message
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
