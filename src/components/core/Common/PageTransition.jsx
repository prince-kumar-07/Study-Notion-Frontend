import { motion } from "framer-motion";

const variants = {
  initial: {
    x: 80,
    opacity: 0,
    filter: "blur(8px)",
  },
  animate: {
    x: 0,
    opacity: 1,
    filter: "blur(0px)",
  },
  exit: {
    x: -80,
    opacity: 0,
    filter: "blur(8px)",
  },
};

const transition = {
  duration: 0.4,
  ease: [0.4, 0, 0.2, 1], // smoother cubic-bezier
};

const PageTransition = ({ children }) => {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={transition}
      style={{
        width: "100%",
        minHeight: "100%",
      }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
