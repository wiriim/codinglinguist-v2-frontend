import Image from "next/image";
import type { CourseData } from "@/app/lib/definitions";
import Link from "next/link";

export default function Course({ data }: { data: CourseData }) {
  const { name, description, levels, difficulty, image } = data;
  return (
    <div className="flex justify-around border min-h-[345px] rounded-[20px] border-[#DEDEDE] p-8 gap-10 w-[60vw] shadow-md">
      <Image
          src={image}
          width={200}
          height={200}
          alt="C programming language logo"
          className="object-contain"
        />
      <div className="w-3/5 flex flex-col ">
        <h1 className="text-[36px] font-medium">{name} Course</h1>
        <div className="text-[#918D8D] text-[20px] font-[24px] mt-5">
          {description}
        </div>

        <div className="text-[#918D8D] text-[16px] font-[24px] mt-auto">
          {levels}
        </div>
        <div className="flex justify-between mt-1">
          <div className="rounded-[15px] bg-[#48D278] text-white font-semibold w-[150px] h-[50px] flex justify-center items-center">
            {difficulty}
          </div>
          <Link
            href={`/course/${name}`}
            className="rounded-[15px] relative border-[#5988FF] border text-[#5988FF] font-semibold w-[165px] h-[50px] flex justify-center items-center cursor-pointer hover:bg-[#5988FF] hover:text-white hover:justify-start hover:pl-5"
          >
            Start Course
            <span>
              <Image
                src={"/white-arrow.png"}
                width={20}
                height={20}
                alt=""
                className="rotate-[145deg] ml-1 absolute top-3.5"
              />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
