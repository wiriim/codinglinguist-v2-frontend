"use client";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";

export default function LandingImage() {
  const { scrollYProgress } = useScroll();
  const rotate = useTransform(scrollYProgress, [0, 0.2], ["-8.84deg", "0deg"]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 1.4]);
  return (
    <motion.div style={{ rotate, scale }} className="w-[80vw] absolute h-[600px] lg:h-[1146px]">
      <Image src="/abstract-image-1.jpg" fill alt="" className="rounded-[45px] object-cover"/>
    </motion.div>
  );
}
