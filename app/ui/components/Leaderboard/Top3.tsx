import { User } from "@/app/lib/definitions";
import clsx from "clsx";
import Link from "next/link";

export default function Top3({ users }: { users: User[] }) {
  return (
    <div className="flex flex-wrap gap-3 justify-around items-center w-[80vw] min-h-[400px] mt-8 relative">
      {users.map((user, i) => (
        <div
          key={user.id}
          className="flex flex-col w-[456px] h-[361px] rounded-[10px] border border-[#DEDEDE]"
        >
          <div
            className={clsx(
              "w-full h-2/5 rounded-t-[10px] font-bold relative z-0",
              {
                "bg-linear-to-r from-[#A9FFC7] to-[#FFFF8B]": i == 0,
                "bg-linear-to-r from-[#FF98A7] to-[#EDEDED]": i == 1,
                "bg-linear-to-r from-[#FFA9FB] to-[#71DCFF]": i == 2,
              }
            )}
          >
            {i == 0 ? (
              <>
                <h1 className="text-[96px] italic absolute right-20 -top-5">1</h1>
                <h1 className="text-[36px] absolute right-8">st</h1>
              </>
            ) : i == 1 ? (
                <>
                <h1 className="text-[96px] italic absolute right-20 -top-5">2</h1>
                <h1 className="text-[36px] absolute right-4">nd</h1>
              </>
            ) : (
                <>
                <h1 className="text-[96px] italic absolute right-20 -top-5">3</h1>
                <h1 className="text-[36px] absolute right-8">rd</h1>
              </>
            )}
          </div>
          <div className="bg-[#E9E9E3] -mt-15 ml-10 rounded-[100%] w-[130px] h-[130px] z-1"></div>
          <Link href={`/profile/${user.username}`} className="text-[24px] ml-15 mt-3 hover:underline w-fit">{user.username}</Link>
          <div className="text-[24px] ml-15 mt-3">{user.point} Points</div>
        </div>
      ))}
    </div>
  );
}
