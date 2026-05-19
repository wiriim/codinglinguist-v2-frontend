import Image from "next/image";
import type { CourseData } from "@/app/lib/definitions";
import Link from "next/link";

export default function Course({ data }: { data: CourseData }) {
  const { name, description, levels, difficulty, image } = data;
  return (
    <div className="flex border min-h-[345px] rounded-[20px] border-[#DEDEDE] p-8 gap-10 w-[80vw] shadow-md">
      <div className="w-2/5 relative min-h-[345px]">
        <Image
          src={image}
          fill
          alt="C programming language logo"
          className="object-contain"
        />
      </div>
      <div className="w-3/5 flex flex-col ">
        <h1 className="text-[40px] font-medium">{name}</h1>
        <div className="text-[#918D8D] text-[24px] font-[24px] mt-5">
          {description}
        </div>

        <div className="text-[#918D8D] text-[20px] font-[24px] mt-auto">
          {levels}
        </div>
        <div className="flex justify-between mt-1">
          <div className="rounded-[15px] bg-[#48D278] text-white font-semibold w-[150px] h-[50px] flex justify-center items-center">
            {difficulty}
          </div>
          <Link href={`/course/${name.charAt(0).toLowerCase()}`} className="rounded-[15px] bg-[#5988FF] text-white font-semibold w-[165px] h-[50px] flex justify-center items-center cursor-pointer">
            Start Course
            <span>
              <Image
                src={"/white-arrow.png"}
                width={20}
                height={20}
                alt=""
                className="rotate-[145deg] ml-1"
              />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
