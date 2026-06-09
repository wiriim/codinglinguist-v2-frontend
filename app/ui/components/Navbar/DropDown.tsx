"use client";
import { useState } from "react";
import Image from "next/image";
import { navbarDatas } from "@/app/lib/navbar-data";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { Session } from "next-auth";

export default function DropDown({ session }: { session: Session | null }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <div className="absolute left-10">
      {open ? (
        <div className="hover:outline hover:outline-[#b3b3b3] rounded-[5px] p-2">
          <Image
            src={"/close.png"}
            width={30}
            height={30}
            alt="close nav button"
            className="object-contain"
            onClick={() => setOpen(false)}
          />
        </div>
      ) : (
        <div className="hover:outline hover:outline-[#b3b3b3] rounded-[5px]">
          <Image
            src={"/menu-bar.png"}
            width={45}
            height={45}
            alt="open nav button"
            className="object-contain"
            onClick={() => setOpen(true)}
          />
        </div>
      )}

      {open && (
        <div className="bg-[#ffffff] w-[110vw] h-105 absolute border -left-12 p-10 mt-5 flex flex-col gap-8">
          {session?.user ? (
            <Link
              className={clsx("p-2 hover:bg-[#e7e6e6] rounded-[10px]", {
                "bg-[#cacaca] rounded-[10px]": pathname.includes("/dashboard"),
              })}
              href={"/dashboard"}
            >
              CodingLinguist
            </Link>
          ) : (
            <Link
              className={clsx("p-2 hover:bg-[#e7e6e6] rounded-[10px]", {
                "bg-[#cacaca] rounded-[10px]": pathname.includes("/dashboard"),
              })}
              href={"/"}
            >
              CodingLinguist
            </Link>
          )}
          {navbarDatas.map((data, i) => (
            <Link
              className={clsx(
                "p-2 hover:bg-[#e7e6e6] rounded-[10px] max-w-[90%]",
                {
                  "bg-[#cacaca]": pathname.includes(data.route),
                }
              )}
              href={data.route}
              key={data.name}
            >
              {data.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
