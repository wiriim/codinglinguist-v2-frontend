import type { Level } from "@/app/lib/definitions";
import Image from "next/image";

export default function Level({ data }: { data: Level }) {
  const { number } = data;
  const bossLevels = [10, 15, 20];
  return bossLevels.includes(number) ? (
    <Image
      src="/devil.png"
      width={100}
      height={100}
      alt={number.toString()}
      className="rounded-[100%] w-[100px] h-[100px] border border-[#DEDEDE] flex justify-center items-center cursor-pointer"
    />
  ) : (
    <div className="rounded-[100%] w-[100px] h-[100px] border border-[#DEDEDE] flex justify-center items-center cursor-pointer font-semibold text-[36px]">
      {number}
    </div>
  );
}
