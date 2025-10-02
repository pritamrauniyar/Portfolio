import "./Contact.css";
import { motion } from "framer-motion";
import { FaFacebook, FaLinkedin, FaInstagram, FaWhatsapp } from "react-icons/fa";

const socials = [
  {
    label: "Facebook",
    href: "https://facebook.com/pritamrauniyar.np/",
    icon: <FaFacebook size="1.2em" />,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/pritamrauniyar/",
    icon: <FaLinkedin size="1.2em" />,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/pritamrauniyar.np/",
    icon: <FaInstagram size="1.2em" />,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/916201413304",
    icon: <FaWhatsapp size="1.2em" />,
  },
];

const Contact = () => {
  return (
    <section className="contact section-wrapper">
      <motion.header
        className="contact-header"
        initial={{ y: 28, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        <span className="contact-eyebrow">Connect</span>
        <h1>Let&apos;s build the next thing together.</h1>
        <p>
          I love partnering with ambitious teams on thoughtful products. Drop a message
          and I&apos;ll reply within a day.
        </p>
      </motion.header>

      <div className="contact-grid">
        <motion.div
          className="contact-panel"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.55, ease: "easeOut" }}
        >
          <h2>Quick reach-outs</h2>
          <div className="contact-items">
            <div>
              <span className="contact-label">Email</span>
              <a href="mailto:pritamrauniyar.np@gmail.com">pritamrauniyar.np@gmail.com</a>
              <a href="mailto:contact@pritamrauniyar.com.np">contact@pritamrauniyar.com.np</a>
            </div>
            <div>
              <span className="contact-label">Phone</span>
              <a href="tel:+916201413304">+91-6201413304</a>
              <a href="tel:+9779800877665">+977-9800877665</a>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="contact-panel"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.55, ease: "easeOut" }}
        >
          <h2>Social channels</h2>
          <p className="contact-panel-copy">
            Always happy to connect, share ideas, or discuss collaborations.
          </p>
          <div className="contact-socials">
            {socials.map((social) => (
              <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer">
                <span className="icon-circle">{social.icon}</span>
                <span>{social.label}</span>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;

