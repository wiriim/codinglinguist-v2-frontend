"use client";
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
      ease: [0.23, 0.35, 0.79, 0.99],
    },
  },
};

export default function FAQTitle() {
  return (
    <motion.div
      variants={textVariants}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true }}
      className="text-[80px] max-w-[844px] text-center mt-30 mb-50"
    >
      <span>Frequently Asked Questions</span>
    </motion.div>
  );
}
