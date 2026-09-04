import { Link, useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import "./Navbar.css";

const links = [
  { label: "Home", to: "/" },
  { label: "Certificates", to: "/certificates" },
  { label: "Projects", to: "/project" },
  { label: "Blogs", to: "/blogs" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const activePath = useMemo(() => location.pathname, [location.pathname]);

  const { scrollY } = useScroll();
  const navBg = useTransform(
    scrollY,
    [0, 120],
    ["rgba(10, 10, 28, 0.55)", "rgba(10, 10, 28, 0.95)"]
  );
  const navBlur = useTransform(scrollY, [0, 120], [12, 24]);
  const navShadow = useTransform(
    scrollY,
    [0, 120],
    ["0 4px 20px rgba(7,5,23,0.15)", "0 16px 40px rgba(7,5,23,0.55)"]
  );

  useEffect(() => {
    setIsOpen(false);
  }, [activePath]);

  return (
    <motion.nav
      className="navbar"
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        background: navBg,
        backdropFilter: useTransform(navBlur, (v) => `blur(${v}px)`),
        WebkitBackdropFilter: useTransform(navBlur, (v) => `blur(${v}px)`),
        boxShadow: navShadow,
      }}
    >
      <div className="nav-content section-wrapper">
        <Link to="/" className="brand" aria-label="Back to home">
          <span className="brand-glow" aria-hidden="true" />
          <span className="brand-icon">
            <svg width="32" height="32" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 7L2 14L8 21" stroke="#c8bbff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M20 7L26 14L20 21" stroke="#00c4ff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              <text x="14" y="18.5" textAnchor="middle" fill="#f4f5ff" fontFamily="Space Grotesk, sans-serif" fontSize="12" fontWeight="700">P</text>
            </svg>
          </span>
          <span className="brand-name">Pritam</span>
          <span className="brand-dot" />
        </Link>

        <ul className="nav-links">
          {links.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className={activePath === link.to ? "active" : ""}
                data-cursor="link"
              >
                {link.label}
                {activePath === link.to && (
                  <motion.span
                    className="nav-active-pill"
                    layoutId="nav-active-indicator"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
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
