import type { Level } from "@/app/lib/definitions";
import { auth } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

const backendServer = process.env.BACKEND_SERVER;

export default async function Level({
  data,
  course,
  id,
}: {
  data: Level;
  course: string;
  id: number;
}) {
  const session = await auth();

  const { number } = data;
  const bossLevels = [10, 15, 20];

  const userLevel = await (
    await fetch(`${backendServer}/users/${session?.user.id}/levels/${id}`)
  ).json();

  const isLocked = number > 1 && !userLevel;
  const isBoss = bossLevels.includes(number);

  return isBoss && isLocked ? (
    <div className="relative rounded-[100%] w-[100px] h-[100px] border border-[#DEDEDE] flex justify-center items-center cursor-pointer hover:border-red-500 hover:scale-105 transition duration-200">
      <Image
        src="/boss.png"
        width={100}
        height={100}
        alt={number.toString()}
        className="opacity-40 absolute"
      />
      <Image
        src="/lock.png"
        width={50}
        height={50}
        alt={number.toString()}
        className="absolute inset-0 m-auto"
      />
    </div>
  ) : isBoss ? (
    <Link
      href={`/course/${course}/level/${number}`}
      className="rounded-[100%] w-[100px] h-[100px] border border-[#DEDEDE] flex justify-center items-center cursor-pointer hover:border-green-500 hover:scale-105 transition duration-200"
    >
      <Image src="/boss.png" width={100} height={100} alt={number.toString()} />
    </Link>
  ) : isLocked ? (
    <div className="rounded-[100%] w-[100px] h-[100px] bg-[#DCDCDC] border border-[#DEDEDE] flex justify-center items-center cursor-pointer font-semibold text-[36px] hover:border-red-500 hover:scale-105 transition duration-200">
      <Image src="/lock.png" width={50} height={50} alt={number.toString()} />
    </div>
  ) : (
    <Link
      href={`/course/${course}/level/${number}`}
      className="rounded-[100%] w-[100px] h-[100px] border border-[#DEDEDE] flex justify-center items-center cursor-pointer font-semibold text-[36px] hover:border-green-500 hover:scale-105 transition duration-200"
    >
      {number}
    </Link>
  );
}
