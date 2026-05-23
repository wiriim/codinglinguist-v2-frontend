"use client";
import Image from "next/image";
import { motion } from "motion/react";
import type { Variants } from "motion/react";

const imageVariants: Variants = {
  offscreen: {
    scale: 0.75,
  },
  onscreen: {
    scale: 1,
    transition: {
      ease: "easeOut",
      duration: 1,
    },
  },
};

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

export default function CTATwo() {
  return (
    <motion.div
      variants={imageVariants}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true }}
      className="w-full flex flex-col bg-white items-center text-white py-60"
    >
      <div className="h-[1000px] w-[80vw] flex flex-col items-center relative">
        <Image
          src="/abstract-image-2-us.jpg"
          fill
          alt="call to action bg"
          className="object-cover rounded-[45px]"
        />

        <motion.div
          variants={textVariants}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{once: true}}
          className="absolute text-[80px] font-semibold top-80 max-w-[800px] text-center"
        >
          Ready To Take Your First Step?
        </motion.div>
        <div className="absolute top-150 rounded-[15px] border border-[#DEDEDE] w-[165px] h-[50px] flex justify-center items-center cursor-pointer hover:bg-[#DEDEDE] hover:text-black">
          Sign Up
        </div>
      </div>
    </motion.div>
  );
}
