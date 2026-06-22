import type { Level, UserLevel } from "@/app/lib/definitions";
import { auth } from "@/auth";
import Image from "next/image";
import Link from "next/link";

const backendServer = process.env.BACKEND_SERVER;

export default async function Level({
  number,
  courseName,
}: {
  number: number;
  courseName: string;
}) {
  const session = await auth();
  let userLevel: null | UserLevel = null;
  const isLocked = async (number: number) => {
    if (session?.user && number > 1) {
      userLevel = await (
        await fetch(
          `${backendServer}/users/${session?.user.id}/courses/${courseName}/levels/${number}`
        )
      ).json();
      
      if (userLevel) {
        userLevel = null;
        return false;
      }
    }
    return number > 1 && !userLevel;
  };
  const bossLevels = [10, 15, 20];
  const isBoss = (number: number) => {
    return bossLevels.includes(number);
  };

  return (
    <>
      {(await isLocked(number)) && isBoss(number) ? (
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
      ) : isBoss(number) ? (
        <Link
          href={`/course/${courseName}/level/${number}`}
          className="rounded-[100%] w-[100px] h-[100px] border border-[#DEDEDE] flex justify-center items-center cursor-pointer hover:border-green-500 hover:scale-105 transition duration-200"
        >
          <Image
            src="/boss.png"
            width={100}
            height={100}
            alt={number.toString()}
          />
        </Link>
      ) : (await isLocked(number)) ? (
        <div className="rounded-[100%] w-[100px] h-[100px] bg-[#DCDCDC] border border-[#DEDEDE] flex justify-center items-center cursor-pointer font-semibold text-[36px] hover:border-red-500 hover:scale-105 transition duration-200">
          <Image
            src="/lock.png"
            width={50}
            height={50}
            alt={number.toString()}
          />
        </div>
      ) : (
        <Link
          href={`/course/${courseName}/level/${number}`}
          className="rounded-[100%] w-[100px] h-[100px] border border-[#DEDEDE] flex justify-center items-center cursor-pointer font-semibold text-[36px] hover:border-green-500 hover:scale-105 transition duration-200"
        >
          {number}
        </Link>
      )}
    </>
  );
}
