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
  FaGoogle,
  FaCalendarAlt,
} from "react-icons/fa";
import TextReveal from "../../components/TextReveal/TextReveal";
import MagneticButton from "../../components/MagneticButton/MagneticButton";
import sound from "../../utils/soundEngine";

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

const TARGET_EMAIL = "pritamrauniyar.np@gmail.com";

const Contact = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSent, setIsSent] = useState(false);

  const handleCopyEmail = () => {
    sound.playSuccess();
    navigator.clipboard.writeText(TARGET_EMAIL);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const getComposedBody = () => {
    return `Hi Pritam,\n\nName: ${formData.name || "[Your Name]"}\nEmail: ${formData.email || "[Your Email]"}\n\nMessage:\n${formData.message || "[Message text]"}\n\nSent from portfolio contact form.`;
  };

  const getSubject = () => {
    return formData.subject || (formData.name ? `Senior Engineering Opportunity — from ${formData.name}` : "Engineering Opportunity — Pritam Rauniyar");
  };

  const handleCopyFormattedDraft = () => {
    sound.playSuccess();
    const fullDraft = `To: ${TARGET_EMAIL}\nSubject: ${getSubject()}\n\n${getComposedBody()}`;
    navigator.clipboard.writeText(fullDraft);
    setCopiedMessage(true);
    setTimeout(() => setCopiedMessage(false), 2500);
  };

  const handleOpenGmail = () => {
    sound.playClick();
    const url = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(TARGET_EMAIL)}&su=${encodeURIComponent(getSubject())}&body=${encodeURIComponent(getComposedBody())}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleOpenOutlook = () => {
    sound.playClick();
    const url = `https://outlook.live.com/mail/0/deeplink/compose?to=${encodeURIComponent(TARGET_EMAIL)}&subject=${encodeURIComponent(getSubject())}&body=${encodeURIComponent(getComposedBody())}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    sound.playSuccess();
    const mailtoUrl = `mailto:${TARGET_EMAIL}?subject=${encodeURIComponent(
      getSubject()
    )}&body=${encodeURIComponent(getComposedBody())}`;

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
          <span>Available for Senior / Staff Engineering Roles (Q1/Q2)</span>
        </div>
        <TextReveal as="h1" mode="words" className="gradient-text">
          Let&apos;s build the next thing together.
        </TextReveal>
        <p>
          Whether you are looking for high-scale distributed system ownership, AI pipeline architecture,
          or want to discuss an executive opportunity — let&apos;s connect directly.
        </p>
      </motion.header>

      <div className="contact-grid">
        {/* Left Column: Direct Info, Scheduling, Webmail Quick Launchers */}
        <motion.div
          className="contact-panel"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.55, ease: "easeOut" }}
        >
          <h2>Direct Reach-outs</h2>
          <div className="contact-items">
            <div className="contact-item-group">
              <span className="contact-label">Email Address</span>
              <div className="contact-email-row">
                <a href={`mailto:${TARGET_EMAIL}`}>{TARGET_EMAIL}</a>
                <button
                  type="button"
                  className="contact-copy-btn"
                  onClick={handleCopyEmail}
                  aria-label="Copy email address"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? (
                    <span className="copied-tag"><FaCheck aria-hidden="true" /> Copied!</span>
                  ) : (
                    <>
                      <FaCopy aria-hidden="true" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Instant Browser Webmail Launchers */}
            <div className="contact-item-group">
              <span className="contact-label">Open in Browser Webmail</span>
              <div className="webmail-buttons-row">
                <button
                  type="button"
                  className="webmail-btn gmail"
                  onClick={handleOpenGmail}
                  title="Launch Gmail Web Compose"
                  data-cursor="link"
                >
                  <FaGoogle aria-hidden="true" />
                  <span>Compose in Gmail ↗</span>
                </button>
                <button
                  type="button"
                  className="webmail-btn outlook"
                  onClick={handleOpenOutlook}
                  title="Launch Outlook Web Compose"
                  data-cursor="link"
                >
                  <FaEnvelope aria-hidden="true" />
                  <span>Compose in Outlook ↗</span>
                </button>
              </div>
            </div>

            {/* Quick 15-Min Intro Chat Callout */}
            <div className="contact-item-group scheduling-group">
              <span className="contact-label">Hiring or Consulting?</span>
              <div className="scheduling-card">
                <div className="scheduling-info">
                  <strong>Quick 15-Min Intro Chat</strong>
                  <p>Skip asynchronous email tag — connect directly on LinkedIn or request a calendar slot.</p>
                </div>
                <a
                  href="https://www.linkedin.com/in/pritamrauniyar/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="scheduling-btn"
                  data-cursor="link"
                  onClick={() => sound.playClick()}
                >
                  <FaCalendarAlt aria-hidden="true" />
                  <span>Book via LinkedIn ↗</span>
                </a>
              </div>
            </div>

            <div className="contact-item-group">
              <span className="contact-label">Timezone & Base</span>
              <p className="contact-location">
                <FaMapMarkerAlt aria-hidden="true" /> India / Nepal (IST · UTC +5:30)
              </p>
            </div>
          </div>

          <div className="contact-socials-section">
            <span className="contact-label">Verified Profiles</span>
            <div className="contact-socials">
              {socials.map((social) => (
                <MagneticButton key={social.label} strength={0.2}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="link"
                    onClick={() => sound.playClick()}
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
            Prefill your note below to compose an email with all your context structured.
          </p>

          {isSent ? (
            <div className="contact-success-state">
              <div className="success-icon-wrap"><FaEnvelope /></div>
              <h3>Opening Email Client...</h3>
              <p>Your draft has been composed with full context! Looking forward to connecting.</p>
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
                  placeholder="e.g. Senior Full-Stack / Staff Role Discussion"
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

              <div className="form-actions-stack">
                <button type="submit" className="contact-submit-btn" data-cursor="link">
                  <FaPaperPlane aria-hidden="true" />
                  <span>Send via Default Email App</span>
                </button>

                <div className="form-secondary-actions">
                  <button
                    type="button"
                    className="contact-alt-btn"
                    onClick={handleOpenGmail}
                    data-cursor="link"
                    title="Send using Gmail in browser"
                  >
                    <FaGoogle aria-hidden="true" />
                    <span>Open in Gmail</span>
                  </button>

                  <button
                    type="button"
                    className="contact-alt-btn"
                    onClick={handleCopyFormattedDraft}
                    data-cursor="link"
                    title="Copy this drafted message to clipboard"
                  >
                    {copiedMessage ? (
                      <>
                        <FaCheck className="copied-check" aria-hidden="true" />
                        <span>Draft Copied!</span>
                      </>
                    ) : (
                      <>
                        <FaCopy aria-hidden="true" />
                        <span>Copy Draft</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;

