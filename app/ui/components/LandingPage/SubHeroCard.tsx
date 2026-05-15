import clsx from "clsx";
import { motion } from "motion/react";
import type { Variants } from "motion/react";
import type { CardData } from "@/app/lib/definitions";
import Image from "next/image";

const cardVariants: Variants = {
  offscreen: {
    scale: 0,
  },
  onscreen: {
    scale: 1,
    transition: {
      ease: "easeOut",
      duration: 1,
    },
  },
};

export default function SubHeroCard({ data }: { data: CardData }) {
  const { title, number, subtitle } = data;
  const src =
    number == "01"
      ? "/abstract-level.jpg"
      : number == "02"
      ? "/abstract-coin.jpg"
      : "/abstract-leaderb.jpg";
  return (
    <motion.div
      variants={cardVariants}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true }}
      className={clsx(
        "w-[521px] h-[595px] bg-[#F1F1F1] rounded-[30px] p-8 flex flex-col justify-between",
        {
          "mt-40": number == "01" || number == "03",
        }
      )}
    >
      <div className="text-[32px] max-w-[300px]">{title}</div>
      <div className="relative w-full h-[268px] flex flex-col justify-end">
        <Image
          src={src}
          width={500}
          height={268}
          alt="point"
          className="rounded-[30px] absolute"
        />
        <span
          className={clsx("absolute text-white text-[96px]", {
            "top-0 left-5": number == "01",
            "bottom-0 left-5": number == "02",
            "top-5 left-5": number == "03",
          })}
        >
          {number}
        </span>
        <span
          className={clsx("absolute text-white leading-7 text-[24px] ", {
            "bottom-1 right-5": number == "01",
            "-top-4 left-5 max-w-[160px]": number == "02",
            "top-35 left-5 max-w-[207px]": number == "03",
          })}
        >
          {subtitle}
        </span>
      </div>
    </motion.div>
  );
}
