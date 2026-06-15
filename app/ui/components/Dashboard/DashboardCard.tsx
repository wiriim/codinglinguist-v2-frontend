import { CourseData, Progress } from "@/app/lib/definitions";
import Image from "next/image";
import clsx from "clsx";
import Link from "next/link";

export default function DashboardCard({
  data,
  progress,
}: {
  data: CourseData;
  progress: Progress;
}) {
  const { name, levels, image } = data;
  
  return (
    <div
      className={clsx("p-8 rounded-[10px] w-[405px]", {
        "bg-[#7A3788]": name.includes("C"),
        "bg-[#E18553]": name.includes("Python"),
        "bg-[#8BC3C8]": name.includes("Java"),
      })}
    >
      <Image src={image} width={90} height={90} alt={name} />
      <Link
        href={`/course/${name}`}
        className="font-semibold text-white text-[24px] mt-5 w-fit cursor-pointer hover:underline"
      >
        {name} Course
      </Link>

      <p className="text-white mt-8">
        {levels} |{" "}
        {name.includes("C")
          ? (progress.cProgress.length * 100) / 20
          : name.includes("Java")
          ? (progress.javaProgress.length * 100) / 20
          : (progress.pythonProgress.length * 100) / 20}
        %
      </p>
      <div className="rounded-[10px] w-[200px] h-[21px] border border-[#DEDEDE] mt-2 flex">
        {name.includes("C")
          ? progress.cProgress.map((data, i) => (
              <div
                key={i}
                className={clsx("w-[20px] bg-white", {
                  "rounded-l-[10px]": i == 0,
                  "rounded-r-[10px]": i == 19,
                })}
              ></div>
            ))
          : name.includes("Java")
          ? progress.javaProgress.map((data, i) => (
              <div
                className={clsx("w-[20px] bg-white", {
                  "rounded-l-[10px]": i == 0,
                  "rounded-r-[10px]": i == 19,
                })}
                key={i}
              ></div>
            ))
          : progress.pythonProgress.map((data, i) => (
              <div
                className={clsx("w-[20px] bg-white", {
                  "rounded-l-[10px]": i == 0,
                  "rounded-r-[10px]": i == 19,
                })}
                key={i}
              ></div>
            ))}
      </div>
    </div>
  );
}
