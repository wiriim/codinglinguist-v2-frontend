"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function ProfileLinks({ username }: { username: string }) {
  const pathname = usePathname();
  return (
    <div className="flex gap-8 mt-8 w-[80vw]">
      <Link
        href={`/profile/${username}`}
        className={clsx("cursor-pointer text-[36px] hover:bg-[#cacaca] rounded-[10px] p-2", {
          "bg-[#cacaca] border": !pathname.includes("progress"),
        })}
      >
        Posts
      </Link>
      <Link
        href={`/profile/${username}/progress`}
        className={clsx("cursor-pointer text-[36px] hover:bg-[#cacaca] rounded-[10px] p-2", {
          "bg-[#cacaca] border": pathname.includes("progress"),
        })}
      >
        Progress
      </Link>
    </div>
  );
}
