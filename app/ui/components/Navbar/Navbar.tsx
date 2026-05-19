import { navbarDatas } from "@/app/lib/navbar-data";
import NavLink from "./NavLink";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="flex p-8 justify-between sticky top-0 bg-white z-50">
      <Link href={"/"} className="font-bold text-[32px] cursor-pointer">CodingLinguist</Link>
      <div className="flex rounded-[15px] justify-around items-center text-[20px] bg-[#F1F1F1] w-2/5 h-[50px]">
        {navbarDatas.map((data, i) => (
          <NavLink data={data} key={data.name}/>
        ))}
      </div>
      <div className="flex gap-12 text-[20px]">
        <div className="h-[50px] flex justify-center items-center cursor-pointer">
          Login
        </div>
        <div className="rounded-[15px] bg-black text-white w-[165px] h-[50px] flex justify-center items-center cursor-pointer">
          Start Now
        </div>
      </div>
    </div>
  );
}
