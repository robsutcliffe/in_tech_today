import { motion } from "framer-motion";
export default function FadeIn({ children, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          type: "spring",
          mass: 0.5,
          stiffness: 50,
          duration: 0.15,
          delay,
          ease: "easeOut",
        },
      }}
      exit={{
        opacity: 0,
        transition: { duration: 0.05 },
      }}
    >
      {children}
    </motion.div>
  );
}
