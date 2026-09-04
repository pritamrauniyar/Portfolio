import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Certificates.css";
import TiltCard from "../../components/TiltCard/TiltCard";
import TextReveal from "../../components/TextReveal/TextReveal";
import { FaExternalLinkAlt, FaTimes, FaAward, FaSearch } from "react-icons/fa";

const CERT_CATEGORIES = [
  "All",
  "Cloud & DevOps",
  "AI & Intelligence",
  "Web & Frontend",
  "Core Engineering",
];

const certifications = [
  {
    name: "Prepare for the Azure Fundamentals (AZ-900) Certification by Microsoft Press",
    category: "Cloud & DevOps",
    image: "/azure.png",
    issuingOrganization: "Microsoft Press / LinkedIn",
    issuedDate: "Nov 2024",
    credentialUrl:
      "https://www.linkedin.com/learning/certificates/9a96656bee730387992c0c93e6654d1129bb23dbd4e65b6f00eeab6b0037898d",
    skills: ["Cloud Administration", "Microsoft Azure", "Cloud Architecture"],
  },
  {
    name: "Career Essentials in GitHub Professional Certificate",
    category: "Cloud & DevOps",
    image: "/github.png",
    issuingOrganization: "GitHub",
    issuedDate: "Nov 2024",
    credentialUrl:
      "https://www.linkedin.com/learning/certificates/3fa071f42fe632240eedb045b25ffc6876da9ec311ba0e195c521726799cd7ff",
    skills: ["GitHub Actions", "CI/CD", "Version Control"],
  },
  {
    name: "Career Essentials in Generative AI by Microsoft and LinkedIn",
    category: "AI & Intelligence",
    image: "/career-essentials-in-generative-ai.jpg",
    issuingOrganization: "Microsoft & LinkedIn",
    issuedDate: "Nov 2024",
    credentialUrl:
      "https://www.linkedin.com/learning/certificates/cd38c2cc806a3db6e76dd0a9e5396bf54d8a5f36142a64d4f4ddae65c8f87029",
    skills: ["Artificial Intelligence", "Generative AI", "LLMs"],
  },
  {
    name: "React: Design Patterns",
    category: "Web & Frontend",
    image: "/react-design-patterns.png",
    issuingOrganization: "LinkedIn",
    issuedDate: "Nov 2024",
    credentialUrl:
      "https://www.linkedin.com/learning/certificates/5e8721e7a18a3005975615f54f8486921bf55d0b39624ada5aba9eb13f9fe656",
    skills: ["React", "Custom Hooks", "Compound Components", "Render Props"],
  },
  {
    name: "Building Modern UIs with React Router v6",
    category: "Web & Frontend",
    image: "/modern-ui-react.png",
    issuingOrganization: "LinkedIn",
    issuedDate: "Nov 2024",
    credentialUrl:
      "https://www.linkedin.com/learning/certificates/c13741da1239f06bc694cd2ba5c697e14ff293d8cdee2494ec7afd488d454622",
    skills: ["React", "React Router v6", "Data Loaders", "SPAs"],
  },
  {
    name: "JavaScript Foundations Professional Certificate by Mozilla",
    category: "Web & Frontend",
    image: "/javascript.png",
    issuingOrganization: "Mozilla",
    issuedDate: "Nov 2024",
    credentialUrl:
      "https://www.linkedin.com/learning/certificates/43c7b2551a3774e3ade6661ff9ad55da115ef0f203159f9cb45d527adbaed68f",
    skills: ["JavaScript (ES6+)", "Asynchronous JS", "Event Loop", "DOM"],
  },
  {
    name: "Angular Essential Training",
    category: "Web & Frontend",
    image: "/angular.png",
    issuingOrganization: "LinkedIn",
    issuedDate: "Nov 2024",
    credentialUrl:
      "https://www.linkedin.com/learning/certificates/e1d7a1db91e5cace8204f3e32d4d4a0d8eeb5c3c3c9ad335005141f5337ba54b",
    skills: ["Angular", "RxJS", "TypeScript", "Dependency Injection"],
  },
  {
    name: "C++ Programming Professional Certificate by OpenEDG C++ Institute",
    category: "Core Engineering",
    image: "/c++_certificate.png",
    issuingOrganization: "OpenEDG C++ Institute",
    issuedDate: "Nov 2024",
    credentialUrl:
      "https://www.linkedin.com/learning/certificates/2a607fed7defc88c02d86b911ca135198ad1c5f6f50b78ac6cb47dacc843f49b",
    skills: ["C++", "Data Structures", "Pointers & Memory", "Algorithms"],
  },
  {
    name: "Designing RESTful APIs",
    category: "Core Engineering",
    image: "/restful-apis.png",
    issuingOrganization: "LinkedIn",
    issuedDate: "Nov 2024",
    credentialUrl:
      "https://www.linkedin.com/learning/certificates/68b46e59a549856fa5041ce6dca2b6f04a359426b899bb3ce69c7bd7d076e5f3",
    skills: ["REST APIs", "API Architecture", "HTTP Specifications"],
  },
  {
    name: "Career Essentials in Software Development by Microsoft and LinkedIn",
    category: "Core Engineering",
    image: "/software-development.png",
    issuingOrganization: "Microsoft & LinkedIn",
    issuedDate: "Nov 2024",
    credentialUrl:
      "https://www.linkedin.com/learning/certificates/e4344bcca44d131b38c3f078f10c64788e64debe5bd831ca7ce4a6eb2cac0a55",
    skills: ["Software Engineering", "SDLC", "Object-Oriented Design"],
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: "easeOut" } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
};

const chipVariants = {
  hidden: { opacity: 0, y: 8, scale: 0.85 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: 0.04 * i, duration: 0.25, ease: "easeOut" },
  }),
};

const Certificates = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModalCert, setActiveModalCert] = useState(null);

  // Close modal on escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setActiveModalCert(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filteredCerts = useMemo(() => {
    return certifications.filter((cert) => {
      const matchesCategory =
        selectedCategory === "All" || cert.category === selectedCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        cert.name.toLowerCase().includes(q) ||
        cert.issuingOrganization.toLowerCase().includes(q) ||
        cert.skills.some((s) => s.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section className="certifications section-wrapper">
      <motion.header
        className="certifications-header"
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        <span className="certifications-eyebrow">Credentials</span>
        <TextReveal as="h1" mode="words" className="gradient-text">
          Constantly sharpening the craft.
        </TextReveal>
        <p>
          Certifications across cloud infrastructure, artificial intelligence, and frontend engineering
          demonstrating rigor and breadth across the technical spectrum.
        </p>
      </motion.header>

      {/* Categories & Search */}
      <div className="certs-controls">
        <div className="certs-tabs" role="tablist">
          {CERT_CATEGORIES.map((category) => (
            <button
              key={category}
              className={`certs-tab ${selectedCategory === category ? "active" : ""}`}
              onClick={() => setSelectedCategory(category)}
              role="tab"
              aria-selected={selectedCategory === category}
              type="button"
            >
              {category}
              {selectedCategory === category && (
                <motion.div
                  className="tab-active-pill"
                  layoutId="cert-tab-indicator"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        <div className="certs-search-wrap">
          <FaSearch className="certs-search-icon" aria-hidden="true" />
          <input
            type="text"
            className="certs-search-input"
            placeholder="Search credentials or skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search certifications"
          />
        </div>
      </div>

      <motion.div
        className="certifications-list"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence mode="popLayout">
          {filteredCerts.map((cert) => (
            <motion.div
              layout
              key={cert.name}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="cert-card-wrapper"
            >
              <TiltCard tiltMax={4} scale={1.02}>
                <article
                  className="cert-card"
                  onClick={() => setActiveModalCert(cert)}
                  data-cursor="project"
                  data-cursor-text="Preview"
                >
                  <div className="cert-visual">
                    <img src={cert.image} alt={cert.name} loading="lazy" />
                    <span className="cert-chip">{cert.issuedDate}</span>
                    <span className="cert-cat-chip">{cert.category}</span>
                  </div>
                  <div className="cert-details">
                    <h2 className="cert-name">{cert.name}</h2>
                    <p className="cert-org">Issued by {cert.issuingOrganization}</p>
                    
                    <div className="cert-card-bottom">
                      <button
                        type="button"
                        className="cert-preview-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveModalCert(cert);
                        }}
                      >
                        <FaAward /> Inspect Credential
                      </button>
                    </div>

                    <ul className="cert-skill-list">
                      {cert.skills.map((skill, i) => (
                        <motion.li
                          key={`${cert.name}-${skill}`}
                          variants={chipVariants}
                          custom={i}
                          initial="hidden"
                          animate="visible"
                        >
                          {skill}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </article>
              </TiltCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Interactive Credential Lightbox Modal */}
      <AnimatePresence>
        {activeModalCert && (
          <div
            className="cert-modal-backdrop"
            onClick={() => setActiveModalCert(null)}
            role="presentation"
          >
            <motion.div
              className="cert-modal-dialog"
              role="dialog"
              aria-modal="true"
              aria-label={activeModalCert.name}
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <button
                className="cert-modal-close"
                onClick={() => setActiveModalCert(null)}
                aria-label="Close certificate preview"
                type="button"
              >
                <FaTimes />
              </button>

              <div className="cert-modal-image-wrap">
                <img src={activeModalCert.image} alt={activeModalCert.name} />
              </div>

              <div className="cert-modal-info">
                <span className="cert-modal-category">{activeModalCert.category}</span>
                <h2>{activeModalCert.name}</h2>
                <p className="cert-modal-meta">
                  Issued by <strong>{activeModalCert.issuingOrganization}</strong> &middot; {activeModalCert.issuedDate}
                </p>

                <div className="cert-modal-skills">
                  <h4>Skills Verified</h4>
                  <div className="cert-modal-tags">
                    {activeModalCert.skills.map((s) => (
                      <span key={s} className="cert-modal-tag">{s}</span>
                    ))}
                  </div>
                </div>

                <div className="cert-modal-actions">
                  <a
                    href={activeModalCert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cert-modal-verify-btn"
                  >
                    <FaExternalLinkAlt /> Verify on Issuer Website
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Certificates;
