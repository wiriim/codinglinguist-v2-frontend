import Link from "next/link";
export default function LandingFooter() {
  return (
    <div className="w-full flex flex-wrap lg:text-[32px] justify-around mb-30">
      <Link href={"/courses"} className="cursor-pointer">Courses</Link>
      <Link href={"/forums"} className="cursor-pointer">Forums</Link>
      <Link href={"/aboutus"} className="cursor-pointer">About us</Link>
      <Link href={"/leaderboard"} className="cursor-pointer">Leaderboard</Link>
    </div>
  );
}
