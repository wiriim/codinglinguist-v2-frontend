import { Progress, User } from "@/app/lib/definitions";
import Image from "next/image";
import Link from "next/link";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import EditProfile from "@/app/ui/components/Profile/EditProfile";
import clsx from "clsx";

const backendServer = process.env.BACKEND_SERVER;

export default async function Profile(props: {
  params: Promise<{ username: string }>;
}) {
  const session = await auth();
  const params = await props.params;
  let username = params.username;

  const user: User = await (
    await fetch(`${backendServer}/users/${username}`)
  ).json();
  const progress: Progress = await (
    await fetch(`${backendServer}/users/${session?.user.id}/progress`)
  ).json();

  const { badges } = user;

  return (
    <div className="my-8 flex flex-col items-center">
      <div className="rounded-[10px] border border-[#DEDEDE] min-h-[560px] w-[80vw] relative">
        <div className="bg-cyan-700 h-[220px] rounded-t-[10px] w-full relative">
          {user.background && (
            <Image
              src={user.background}
              fill
              alt="profile picture"
              className="rounded-t-[10px] bg-[#E9E9E3] h-[220px] object-cover"
            />
          )}
        </div>
        <div className="-mt-20 flex items-center">
          <div className="bg-[#D9D9D9] h-[3px] flex-1 max-w-[100px]"></div>
          <div className="rounded-[100%] bg-[#E9E9E3] min-w-[160px] h-[160px] relative">
            {user.picture && (
              <Image
                src={user.picture}
                fill
                alt="profile picture"
                className="rounded-[100%] bg-[#E9E9E3] min-w-[160px] h-[160px] object-cover"
              />
            )}
          </div>
          <div className="bg-[#D9D9D9] h-[3px]  flex-1"></div>
        </div>

        {session?.user && session?.user.email == user.email && (
          <SessionProvider>
            <EditProfile user={user} />
          </SessionProvider>
        )}

        <h1 className="text-[36px] ml-15 lg:ml-25">{username}</h1>
        <h2 className="text-[20px] ml-15 lg:ml-25 my-1 mb-5">
          {user.point} Points
        </h2>
        <h1 className="text-[24px] text-[#474747] ml-15 lg:ml-25 my-5">
          {user.bio}
        </h1>
        <div className="mx-15 lg:ml-25 mb-5 flex flex-wrap gap-4">
          {badges.map((badge, i) => (
            <Image
              key={badge.id}
              src={badge.image}
              width={40}
              height={40}
              alt={badge.name}
              className="object-contain"
            />
          ))}
        </div>
      </div>

      <div className="flex gap-8 mt-8 w-[80vw]">
        <Link
          href={`/profile/${username}`}
          className="cursor-pointer text-[36px]"
        >
          Posts
        </Link>
        <Link
          href={`/profile/${username}/progress`}
          className="cursor-pointer text-[36px] underline"
        >
          Progress
        </Link>
      </div>

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
                  className={clsx("w-[50px] bg-cyan-500", {
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
                  className={clsx("w-[50px] bg-yellow-500", {
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
                  className={clsx("w-[50px] bg-orange-500", {
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
