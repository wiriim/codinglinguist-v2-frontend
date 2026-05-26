import type { Level } from "@/app/lib/definitions";
import Image from "next/image";
import Link from "next/link";

export default function Level({
  data,
  course,
}: {
  data: Level;
  course: string;
}) {
  const { number } = data;
  const bossLevels = [10, 15, 20];
  return bossLevels.includes(number) ? (
    <Link href={`/course/${course}/level/${number}`}>
      <Image
        src="/devil.png"
        width={100}
        height={100}
        alt={number.toString()}
        className="rounded-[100%] w-[100px] h-[100px] border border-[#DEDEDE] flex justify-center items-center cursor-pointer hover:border-green-500 hover:scale-105 transition duration-200"
      />
    </Link>
  ) : (
    <Link
      href={`/course/${course}/level/${number}`}
      className="rounded-[100%] w-[100px] h-[100px] border border-[#DEDEDE] flex justify-center items-center cursor-pointer font-semibold text-[36px] hover:border-green-500 hover:scale-105 transition duration-200"
    >
      {number}
    </Link>
  );
}
