import Image from "next/image";
import type { User } from "../lib/definitions";
import Top3 from "../ui/components/Leaderboard/Top3";

import clsx from "clsx";
import Link from "next/link";

const backendServer = process.env.BACKEND_SERVER;

export default async function Leaderboard() {
  const users: User[] = await (await fetch(`${backendServer}/users`)).json();

  const top3Users =
    users.length > 3 ? users.slice(0, 3) : users.slice(0, users.length);

  return (
    <div className="flex flex-col items-center">
      <Top3 users={top3Users} />

      <div className="flex flex-col gap-3 w-[80vw] min-h-[400px] my-8 relative">
        <div className="flex justify-between w-full items-start text-[32px]">
          <h1>Rank</h1>
          <h1>Name</h1>
          <h1>Points</h1>
        </div>
        {users.map((user, i) => (
          <div
            key={user.id}
            className={clsx(
              "border border-2 w-full h-[108px] rounded-[10px] flex justify-between items-center p-3 md:p-8 text-[24px] lg:text-[36px]",
              {
                "border-[#C8B912] border-3": i == 0,
                "border-[#717171] border-3": i == 1,
                "border-[#451C1C] border-3": i == 2,
                "border-[#AAAAAA]": i > 2,
              }
            )}
          >
            <h2
              className={clsx("font-bold text-[#AAAAAA]", {
                "text-[#C8B912]": i == 0,
                "text-[#717171]": i == 1,
                "text-[#451C1C]": i == 2,
              })}
            >
              {i + 1}
            </h2>
            <Link
              href={`/profile/${user.username}`}
              className="flex gap-2 items-center cursor-pointer hover:underline"
            >
              <div className="rounded-[100%] bg-[#E9E9E3] w-[45px] h-[45px] lg:w-[65px] lg:h-[65px]"></div>{" "}
              <span className="max-w-[10ch] text-ellipsis overflow-hidden">{user.username}</span>
            </Link>
            <h2>{user.point}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
