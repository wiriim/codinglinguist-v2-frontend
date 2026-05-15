import { motion } from "motion/react";
import type { Variants } from "motion/react";

const textVariants: Variants = {
  offscreen: {
    y: "100%",
    opacity: 0,
  },
  onscreen: {
    y: "0%",
    opacity: 1,
    transition: {
      duration: 1,
      ease: [.23,.35,.79,.99],
    },
  },
};

export default function SubHeroTitle() {
  return (
    <motion.div
      variants={textVariants}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{once: true}}
      className="text-[80px] max-w-[844px] text-center mt-15 mb-20"
    >
      <span>Improve While Having Fun</span>
    </motion.div>
  );
}
