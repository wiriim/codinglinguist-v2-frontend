"use client";
import { useState } from "react";
import Image from "next/image";
import { navbarDatas } from "@/app/lib/navbar-data";
import Link from "next/link";

export default function DropDown() {
  const [open, setOpen] = useState(false);
  return (
    <div className="absolute left-10">
      {open ? (
        <Image
          src={"/close.png"}
          width={30}
          height={30}
          alt="close nav button"
          className="object-contain ms-1.5"
          onClick={() => setOpen(false)}
        />
      ) : (
        <Image
          src={"/menu-bar.png"}
          width={45}
          height={45}
          alt="open nav button"
          className="object-contain"
          onClick={() => setOpen(true)}
        />
      )}

      {open && (
        <div className="bg-[#ffffff] w-[110vw] h-100 absolute border -left-12 p-12 mt-5 flex flex-col gap-8">
          <Link className="hover:underline" href={"/"}>CodingLinguist</Link>
          {navbarDatas.map((data, i) => (
            <Link className="hover:underline" href={data.route} key={data.name}>
              {data.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
