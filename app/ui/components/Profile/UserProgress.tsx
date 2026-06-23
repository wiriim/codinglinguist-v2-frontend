import { Progress, User } from "@/app/lib/definitions";
import Image from "next/image";
import { auth } from "@/auth";
import clsx from "clsx";

const backendServer = process.env.BACKEND_SERVER;

export default async function UserProgress({ username }: { username: string }) {
  const session = await auth();

  const progress: Progress = await (
    await fetch(`${backendServer}/users/${username}/progress`)
  ).json();

  return (
    <div className="my-8 flex flex-col items-center">
      <div className="w-[80vw]">
        <div className="my-15 lg:flex gap-30">
          <Image src={"/c.png"} width={120} height={120} alt="C Logo" />

          <div className="flex flex-col w-full">
            <div className="text-[#877C7C]">
              20 Levels | {(progress.cProgress.length * 100) / 20}%
            </div>
            <div className="border border-[#877C7C] rounded-[10px] w-full h-[99px] flex">
              {progress.cProgress.map((data, i) => (
                <div
                  key={i}
                  className={clsx("w-[5%] bg-cyan-500", {
                    "rounded-l-[10px]": i == 0,
                    "rounded-r-[10px]": i == 19,
                  })}
                ></div>
              ))}
            </div>
          </div>
        </div>

        <div className="my-15 lg:flex gap-30">
          <Image
            src={"/python.png"}
            width={125}
            height={125}
            alt="Python Logo"
          />
          <div className="flex flex-col w-full">
            <div className="text-[#877C7C]">
              20 Levels | {(progress.pythonProgress.length * 100) / 20}%
            </div>
            <div className="border border-[#877C7C] rounded-[10px] w-full h-[99px] flex">
              {progress.pythonProgress.map((data, i) => (
                <div
                  key={i}
                  className={clsx("w-[5%] bg-yellow-500", {
                    "rounded-l-[10px]": i == 0,
                    "rounded-r-[10px]": i == 19,
                  })}
                ></div>
              ))}
            </div>
          </div>
        </div>

        <div className="my-15 lg:flex gap-30">
          <Image src={"/java.png"} width={135} height={135} alt="Java Logo" />
          <div className="flex flex-col w-full">
            <div className="text-[#877C7C]">
              20 Levels | {(progress.javaProgress.length * 100) / 20}%
            </div>
            <div className="border border-[#877C7C] rounded-[10px] w-full h-[99px] flex">
              {progress.javaProgress.map((data, i) => (
                <div
                  key={i}
                  className={clsx("w-[5%] bg-orange-500", {
                    "rounded-l-[10px]": i == 0,
                    "rounded-r-[10px]": i == 19,
                  })}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
