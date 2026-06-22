import { Badge, User } from "@/app/lib/definitions";
import { auth } from "@/auth";
import Image from "next/image";
import EditProfile from "./EditProfile";

const backendServer = process.env.BACKEND_SERVER;

export default async function ProfileCard({ username }: { username: string }) {
  const session = await auth();
  const user: User = await (
    await fetch(`${backendServer}/users/${username}`)
  ).json();

  if (!user) {
    return (
      <div className="my-8 flex flex-col items-center">
        <h1>Can't seem to find anyone with that username</h1>
      </div>
    );
  }

  const badges: Badge[] = await (
    await fetch(`${backendServer}/users/${user.id}/badges`)
  ).json();
  return (
    <div className="rounded-[10px] border border-[#DEDEDE] min-h-[560px] w-[80vw] relative">
      <div className="bg-gray-500 h-[220px] rounded-t-[10px] w-full relative">
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
        <div className="bg-[#D9D9D9] h-[3px] flex-1"></div>
      </div>

      {session?.user && session?.user.email == user.email && (
        <EditProfile user={user} />
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
  );
}
