"use client";
import { motion } from "motion/react";
import type { Variants } from "motion/react";
import SubHeroCard from "./SubHeroCard";
import SubHeroTitle from "./SubHeroTitle";
import { cardDatas } from "@/app/lib/subHeroCard-data";

const containerVariants: Variants = {
  offscreen: {
    y: 300,
  },
  onscreen: {
    y: -150,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 2,
    },
  },
};

export default function SubHeroSection() {
  return (
    <div className="w-full">
      <motion.div
        variants={containerVariants}
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true }}
        className="flex flex-col bg-white items-center rounded-[45px] w-full"
      >
        <div className="overflow-hidden">
          <SubHeroTitle />
        </div>

        <div className="flex flex-wrap justify-center gap-10">
          {cardDatas.map((data, i) => (
            <SubHeroCard key={i} data={data} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
