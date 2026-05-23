import { CourseData } from "@/app/lib/definitions";
import Image from "next/image";
import clsx from "clsx";

export default function DashboardCard({ data }: { data: CourseData }) {
  const { name, levels, image } = data; 
  return (
    <div className={clsx("p-8 rounded-[10px] w-[405px]", {
        "bg-[#7A3788]" : name.includes("C"),
        "bg-[#E18553]" : name.includes("Python"),
        "bg-[#8BC3C8]" : name.includes("Java"),
    })}>
      <Image src={image} width={90} height={90} alt={name} />
      <p className="font-semibold text-white text-[24px] mt-5 w-fit cursor-pointer">{name} Course</p>

      <p className="text-white mt-8">{levels} | 20%</p>
      <div className="rounded-[10px] w-[200px] h-[21px] border border-[#DEDEDE] mt-2"></div>
    </div>
  );
}
