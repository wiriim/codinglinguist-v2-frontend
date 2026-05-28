"use client";
import type { Level, Question } from "@/app/lib/definitions";
import Link from "next/link";
import clsx from "clsx";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

const backendServer = process.env.NEXT_PUBLIC_BACKEND_SERVER;

export default function Question() {
  const params = useParams();
  const courseName = params.name;
  const { levelNumber, questionNumber } = params;

  const [level, setLevel] = useState<null | Level>(null);
  const [question, setQuestion] = useState<null | Question>(null);
  const [answer, setAnswer] = useState<null | string>(null);

  useEffect(() => {
    console.log(`${backendServer}/courses/${courseName}/levels/${levelNumber}`);
    async function fetchQuestion() {
      const levelData: Level = await (
        await fetch(
          `${backendServer}/courses/${courseName}/levels/${levelNumber}`
        )
      ).json();
      setLevel(levelData);

      const questionData: Question = await (
        await fetch(
          `${backendServer}/courses/${courseName}/levels/${levelNumber}/questions/${questionNumber}`
        )
      ).json();
      setQuestion(questionData);
    }
    fetchQuestion();
  }, []);

  useEffect(() => {
    const choice = document.querySelectorAll(".question-choice");
    for (const c of choice) {
      if (c.textContent == answer)
        (c as HTMLElement).style.border = "1px solid #00c753";
    }

    const input: null | HTMLInputElement =
      document.querySelector(".question-input");
    if (input && answer) {
      input.value = answer;
      input.focus();
    }
  }, [answer]);

  function handleContainerClick(e: React.MouseEvent) {
    const target = e.target as HTMLElement;
    if (target.matches(".question-choice")) {
      setAnswer(target.textContent);
    }
  }

  function handleContainerChange(e: React.InputEvent) {
    const target = e.target as HTMLInputElement;
    if (target.matches(".question-input")) {
      setAnswer(target.value);
    }
  }

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
        {question && (
          <div
            onClick={handleContainerClick}
            onInput={handleContainerChange}
            dangerouslySetInnerHTML={{ __html: question.content }}
          ></div>
        )}
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
          {level &&
            level.questions.map((data, i) => (
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
