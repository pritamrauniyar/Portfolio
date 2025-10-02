import { Link, useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./Navbar.css";

const links = [
  { label: "Home", to: "/" },
  { label: "Certificates", to: "/certificates" },
  { label: "Projects", to: "/project" },
  { label: "Blogs", to: "/blogs" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" }
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const activePath = useMemo(() => location.pathname, [location.pathname]);

  useEffect(() => {
    setIsOpen(false);
  }, [activePath]);

  return (
    <motion.nav
      className="navbar"
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="nav-content section-wrapper">
        <Link to="/" className="brand" aria-label="Back to home">
          <span className="brand-glow" aria-hidden="true" />
          <span className="brand-name">Pritam</span>
          <span className="brand-dot" />
        </Link>

        <ul className="nav-links">
          {links.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className={activePath === link.to ? "active" : ""}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          className={isOpen ? "nav-toggle is-open" : "nav-toggle"}
          onClick={() => setIsOpen((open) => !open)}
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
          type="button"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            className="nav-links-mobile section-wrapper"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {links.map((link) => (
              <li key={`${link.to}-mobile`}>
                <Link
                  to={link.to}
                  className={activePath === link.to ? "active" : ""}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;


