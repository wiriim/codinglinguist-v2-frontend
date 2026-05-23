import type { Level, Question } from "@/app/lib/definitions";
import Link from "next/link";
import clsx from "clsx";
import Image from "next/image";

const backendServer = process.env.BACKEND_SERVER;

export default async function Question(props: {
  params: Promise<{
    name: string;
    levelNumber: string;
    questionNumber: string;
  }>;
}) {
  const params = await props.params;
  const courseName = params.name;
  const levelNumber = params.levelNumber;
  const questionNumber = params.questionNumber;

  const level: Level = await (
    await fetch(`${backendServer}/courses/${courseName}/levels/${levelNumber}`)
  ).json();

  const question: Question = await (
    await fetch(
      `${backendServer}/courses/${courseName}/levels/${levelNumber}/questions/${questionNumber}`
    )
  ).json();

  return (
    <div className="flex flex-col items-center w-full my-12">
      <div className="border border-[#DEDEDE] rounded-[10px] p-8 px-12 w-[80vw]">
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
        <div dangerouslySetInnerHTML={{ __html: question.content }}></div>
        <button className="border border-[#3E50DA] rounded-[10px] text-[#3E50DA] px-8 py-2 mt-8 cursor-pointer block ml-auto text-center hover:bg-[#3E50DA] hover:text-white">
          Submit
        </button>
      </div>

      <div className="flex justify-end w-[80vw] mt-5">
        <div className="flex  items-center gap-15 rounded-[10px] bg-[#F3F3F3] px-8 py-2 font-semibold">
          <Link
            href={`/course/${courseName}/level/${levelNumber}`}
            className="rounded-[10px] text-centercursor-pointer hover:bg-[#cacaca] px-5 py-2"
          >
            i
          </Link>
          {level.questions.map((data, i) => (
            <Link
              href={`/course/${courseName}/level/${levelNumber}/question/${data.number}`}
              key={data.number}
              className={clsx("text-center rounded-[10px] px-5 py-2 ", {
                "bg-white shadow-md": data.number == questionNumber,
                "hover:bg-[#cacaca]": data.number != questionNumber,
              })}
            >
              {data.number}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
