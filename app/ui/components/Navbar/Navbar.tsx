import { navbarDatas } from "@/app/lib/navbar-data";
import NavLink from "./NavLink";
import Link from "next/link";
import { auth, signOut } from "@/auth";
import Image from "next/image";

export default async function Navbar() {
  const session = await auth();
  return (
    <div className="flex py-5 px-12 justify-center w-full items-center sticky top-0 bg-white z-50 relative">
      <Link
        href={"/"}
        className="font-bold text-[32px] cursor-pointer absolute left-10"
      >
        CodingLinguist
      </Link>
      <div className="flex rounded-[15px] justify-evenly items-center text-[16px] bg-[#F1F1F1] w-2/5 h-[50px]">
        {navbarDatas.map((data, i) => (
          <NavLink data={data} key={data.name} />
        ))}
      </div>
      <div className="flex gap-12 text-[16px] absolute right-10">
        {!session?.user ? (
          <>
            <Link
              href={"/login"}
              className="flex justify-center items-center cursor-pointer"
            >
              Login
            </Link>
            <Link
              href={"/signup"}
              className="rounded-[15px] bg-black text-white px-5 py-2 flex justify-center items-center cursor-pointer"
            >
              Start Now
            </Link>
          </>
        ) : (
          <div className="flex items-center gap-5">
            <Link href={`/profile/${session.user.username}`} className="w-[60px] h-[60px] rounded-[100%] bg-[#e9e9e3]"></Link>
            <form
              action={async () => {
                "use server";
                await signOut({redirectTo: "/"});
              }}
              className="flex items-center"
            >
              <button type="submit">
                <Image
                  src="/logout.png"
                  width={35}
                  height={35}
                  alt="logout"
                  className="object-contain cursor-pointer"
                />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
