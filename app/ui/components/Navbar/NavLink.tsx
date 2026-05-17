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
      className={clsx("cursor-pointer", {
        "bg-white shadow-md rounded-[10px] px-3 py-1": pathname.includes(route),
      })}
    >
      {name}
    </Link>
  );
}
