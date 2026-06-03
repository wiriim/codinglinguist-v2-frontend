import Link from "next/link";

export default function CTAOne() {
  return (
    <div className="flex flex-col items-center">
      <div className="text-[64px] lg:text-[96px] max-w-[844px] text-center mt-15">
        Start Your Coding Journey
      </div>
      <div className="text-[1.3rem] lg:text-[2rem] max-w-[650px] text-center mt-2">
        Learn how to code from the basic with our materials and quizzes
      </div>
      <div className="flex gap-12 lg:text-[20px] mt-10">
        <Link href={"/login"} className="rounded-[15px] bg-[#3E50DA] text-white w-[135px] lg:w-[165px] h-[50px] flex justify-center items-center cursor-pointer">
          Start Now
        </Link>
        <Link href={"/signup"} className="rounded-[15px] border border-[#DEDEDE] w-[135px] lg:w-[165px] h-[50px] flex justify-center items-center cursor-pointer">
          Sign Up
        </Link>
      </div>
    </div>
  );
}
