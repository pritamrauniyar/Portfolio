import { useRef, useState } from "react";
import { motion } from "framer-motion";
import "./TiltCard.css";

const TiltCard = ({ children, className = "", tiltMax = 8, glare = true, scale = 1.02, ...rest }) => {
  const cardRef = useRef(null);
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });

  const handleMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTransform({
      rotateX: (0.5 - y) * tiltMax * 2,
      rotateY: (x - 0.5) * tiltMax * 2,
      glareX: x * 100,
      glareY: y * 100,
    });
  };

  const handleLeave = () => {
    setTransform({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });
  };

  return (
    <motion.div
      ref={cardRef}
      className={`tilt-card ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      animate={{
        rotateX: transform.rotateX,
        rotateY: transform.rotateY,
        scale: transform.rotateX !== 0 || transform.rotateY !== 0 ? scale : 1,
      }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      style={{ transformStyle: "preserve-3d", perspective: 1000 }}
      {...rest}
    >
      {children}
      {glare && (
        <div
          className="tilt-glare"
          style={{
            background: `radial-gradient(circle at ${transform.glareX}% ${transform.glareY}%, rgba(255,255,255,0.12) 0%, transparent 60%)`,
          }}
        />
      )}
    </motion.div>
  );
};

export default TiltCard;
