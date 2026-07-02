import type { Level, Progress } from "@/app/lib/definitions";
import CodeInput from "@/app/ui/components/Level/CodeInput";
import Link from "next/link";
import Image from "next/image";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const backendServer = process.env.BACKEND_SERVER;

export default async function Level(props: {
  params: Promise<{ name: string; levelNumber: number }>;
}) {
  const session = await auth();
  const params = await props.params;
  const courseName = params.name;
  const levelNumber = params.levelNumber;

  if (!session && levelNumber > 1) {
    redirect("/login");
  }

  const level: Level = await (
    await fetch(`${backendServer}/courses/${courseName}/levels/${levelNumber}`)
  ).json();
  const progress: Progress = await (
    await fetch(`${backendServer}/users/${session?.user.username}/progress`)
  ).json();

  console.log(progress)

  if (courseName.includes("C") && levelNumber > progress.cProgress.length + 1) {
    redirect("/course/C");
  } else if (
    courseName.includes("Java") &&
    levelNumber > progress.javaProgress.length + 1
  ) {
    redirect("/course/Java");
  } else if (
    courseName.includes("Python") &&
    levelNumber > progress.pythonProgress.length + 1
  ) {
    redirect("/course/Python");
  }

  const bossLevels = [10, 15, 20];

  return (
    <div className="flex flex-col items-center w-full my-12">
      <div className="border border-[#DEDEDE] rounded-[10px] p-8 px-4 lg:px-12 w-[90vw] lg:w-[80vw]">
        <Link
          href={`/course/${courseName}`}
          className="flex gap-2 cursor-pointer w-fit rounded-[10px] p-1 px-2 hover:bg-[#ebeaea]"
        >
          <Image
            src="/right-arrow.png"
            width={12}
            height={12}
            alt=""
            className="object-contain rotate-180"
          />
          Back
        </Link>
        <div dangerouslySetInnerHTML={{ __html: level.content }}></div>

        {bossLevels.includes(level.number) ? (
          <>
            <CodeInput
              userId={session?.user.id!}
              courseName={courseName}
              levelId={level.id}
            />
          </>
        ) : (
          <Link
            href={`/course/${courseName}/level/${levelNumber}/question/1`}
            className="border border-[#00e622] rounded-[10px] text-[#00e622] px-8 py-2 mt-8 cursor-pointer block max-w-[120px] text-center ml-auto hover:bg-[#00e622] hover:text-white"
          >
            Begin
          </Link>
        )}
      </div>

      <div className="flex justify-end w-[90vw] lg:w-[80vw] mt-5">
        <div className="flex flex-wrap items-center justify-center gap-10 rounded-[10px] bg-[#F3F3F3] px-8 py-2 font-semibold">
          <div className="rounded-[10px] text-center bg-white px-5 py-2 cursor-pointer shadow-md">
            i
          </div>
          {level.questions.map((data, i) => (
            <Link
              href={`/course/${courseName}/level/${levelNumber}/question/${data.number}`}
              key={data.number}
              className="text-center px-5 py-2 hover:bg-[#cacaca] rounded-[10px]"
            >
              {data.number}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
