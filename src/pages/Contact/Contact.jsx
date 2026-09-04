import "./Contact.css";
import { motion } from "framer-motion";
import { FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";
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
  return (
    <section className="contact section-wrapper">
      <motion.header
        className="contact-header"
        initial={{ y: 28, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        <span className="contact-eyebrow">Connect</span>
        <TextReveal as="h1" mode="words" className="gradient-text">
          Let's build the next thing together.
        </TextReveal>
        <p>
          I love partnering with ambitious teams on thoughtful products. Drop a message
          and I&apos;ll reply within a day.
        </p>
      </motion.header>

      <div className="contact-grid">
        <motion.div
          className="contact-panel"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
        >
          <h2>Quick reach-outs</h2>
          <div className="contact-items">
            <div>
              <span className="contact-label">Email</span>
              <a href="mailto:pritamrauniyar.np@gmail.com">pritamrauniyar.np@gmail.com</a>
              <a href="mailto:contact@pritamrauniyar.com.np">contact@pritamrauniyar.com.np</a>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="contact-panel"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.18, duration: 0.6, ease: "easeOut" }}
        >
          <h2>Social channels</h2>
          <p className="contact-panel-copy">
            Always happy to connect, share ideas, or discuss collaborations.
          </p>
          <div className="contact-socials">
            {socials.map((social, i) => (
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
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
