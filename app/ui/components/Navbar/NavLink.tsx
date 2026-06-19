"use client";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import type { NavLink } from "@/app/lib/definitions";
import Link from "next/link";

export default function NavLink({ data }: { data: NavLink }) {
  const pathname = usePathname();
  const { name, route } = data;
  return (
    <Link
      href={route}
      className={clsx(
        "cursor-pointer px-2 py-1 hover:bg-[#cacaca] rounded-[10px]",
        {
          "bg-white shadow-md rounded-[10px]  ": pathname.includes(route),
        }
      )}
    >
      {name}
    </Link>
  );
}
