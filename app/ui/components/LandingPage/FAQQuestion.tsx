"use client";
import Image from "next/image";
import type { FAQData } from "@/app/lib/definitions";
import { useState } from "react";
import { motion, scale } from "motion/react";
import type { Variants } from "motion/react";

const questionVariants: Variants = {
  offscreen: {
    y: "100%",
    opacity: 0,
  },
  onscreen: {
    y: "0%",
    opacity: 1,
    transition: {
      duration: 1,
      ease: "easeOut",
    },
  },
};

const answerVariants: Variants = {
  open: {
    opacity: 1,
    y: "0%",
    display: "block",
    transition: {
      duration: .7,
      ease: "easeOut",
    },
  },
  close: {
    y: "-100%",
    opacity: 0,
    display: "none"
  },
};

export default function FAQQuestion({ data }: { data: FAQData }) {
  const { question, answer } = data;
  const [isOpen, setIsOpen] = useState(false);

  function toggleAnswer() {
    setIsOpen((prev) => !prev);
  }

  return (
    <div className="w-full" onClick={toggleAnswer}>
      <motion.div
        variants={questionVariants}
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true }}
        className="text-[2rem] flex justify-between cursor-pointer"
      >
        {question}
        <span className="w-5">
          <Image
            src="/right-arrow.png"
            width={15}
            height={50}
            alt="down-arrow"
            className={`inline ${isOpen ? "-rotate-90" : "rotate-90"}`}
          />
        </span>
      </motion.div>

      <motion.div
        variants={answerVariants}
        animate={isOpen ? "open" : "close"}
        className="mt-5 max-w-4/5 whitespace-pre-line"
      >
        {answer}
      </motion.div>

      <div className="my-10 w-full h-0.75 bg-[#D9D9D9]"></div>
    </div>
  );
}
