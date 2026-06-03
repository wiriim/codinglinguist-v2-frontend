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
  const { title, number, subtitle, image } = data;

  return (
    <motion.div
      variants={cardVariants}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true }}
      className={clsx(
        "w-[321px] h-[395px] lg:w-[521px] lg:h-[595px] bg-[#F1F1F1] rounded-[30px] p-8 flex flex-col justify-between",
        {
          "lg:mt-40": number == "01" || number == "03",
        }
      )}
    >
      <div className="text-[22px] lg:text-[32px] max-w-[300px]">{title}</div>
      <div className="relative w-full h-[268px] flex flex-col justify-end">
        <Image
          src={image}
          width={500}
          height={268}
          alt="point"
          className="rounded-[30px] absolute"
        />
        <span
          className={clsx("absolute text-white text-[24px] lg:text-[96px]", {
            "bottom-25 lg:top-0 left-5": number == "01",
            "bottom-2 lg:bottom-0 left-5": number == "02",
            "bottom-16 lg:top-5 left-5": number == "03",
          })}
        >
          {number}
        </span>
        <span
          className={clsx("absolute text-white leading-7 text-[16px] lg:text-[24px] ", {
            "bottom-1 right-5": number == "01",
            "bottom-25 lg:-top-4 left-5 lg:max-w-[160px]": number == "02",
            "top-35 left-5 max-w-[207px]": number == "03",
          })}
        >
          {subtitle}
        </span>
      </div>
    </motion.div>
  );
}
