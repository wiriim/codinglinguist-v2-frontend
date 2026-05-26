import { CourseData } from "@/app/lib/definitions";
import Image from "next/image";
import clsx from "clsx";
import Link from "next/link";

export default function DashboardCard({ data }: { data: CourseData }) {
  const { name, levels, image } = data; 
  return (
    <div className={clsx("p-8 rounded-[10px] w-[405px]", {
        "bg-[#7A3788]" : name.includes("C"),
        "bg-[#E18553]" : name.includes("Python"),
        "bg-[#8BC3C8]" : name.includes("Java"),
    })}>
      <Image src={image} width={90} height={90} alt={name} />
      <Link href={`/course/${name}`} className="font-semibold text-white text-[24px] mt-5 w-fit cursor-pointer hover:underline">{name} Course</Link>

      <p className="text-white mt-8">{levels} | 20%</p>
      <div className="rounded-[10px] w-[200px] h-[21px] border border-[#DEDEDE] mt-2"></div>
    </div>
  );
}
