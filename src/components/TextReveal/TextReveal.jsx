import { motion } from "framer-motion";
import { useMemo } from "react";

const wordVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.04, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const charVariants = {
  hidden: { opacity: 0, y: 30, rotateX: -40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { delay: i * 0.025, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const TextReveal = ({
  children,
  as: Tag = "h1",
  mode = "words",
  className = "",
  once = true,
  amount = 0.3,
}) => {
  const text = typeof children === "string" ? children : "";

  const words = useMemo(() => text.split(" "), [text]);

  const parts = useMemo(() => {
    if (mode === "chars") return text.split("");
    return words;
  }, [text, mode, words]);

  const variants = mode === "chars" ? charVariants : wordVariants;

  if (mode === "chars") {
    let charIndex = 0;
    return (
      <Tag className={className} style={{ perspective: 600 }}>
        {words.map((word, wi) => {
          const chars = word.split("");
          const startIndex = charIndex;
          charIndex += chars.length + 1;
          return (
            <span
              key={`word-${wi}`}
              style={{ display: "inline-block", whiteSpace: "nowrap" }}
            >
              {chars.map((char, ci) => (
                <motion.span
                  key={`${char}-${startIndex + ci}`}
                  custom={startIndex + ci}
                  variants={variants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once, amount }}
                  style={{ display: "inline-block", transformOrigin: "bottom" }}
                >
                  {char}
                </motion.span>
              ))}
              {wi < words.length - 1 && "\u00A0"}
            </span>
          );
        })}
      </Tag>
    );
  }

  return (
    <Tag className={className}>
      {parts.map((part, i) => (
        <motion.span
          key={`${part}-${i}`}
          custom={i}
          variants={variants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once, amount }}
          style={{
            display: "inline-block",
            marginRight: "0.3em",
            transformOrigin: "bottom",
          }}
        >
          {part}
        </motion.span>
      ))}
    </Tag>
  );
};

export default TextReveal;
