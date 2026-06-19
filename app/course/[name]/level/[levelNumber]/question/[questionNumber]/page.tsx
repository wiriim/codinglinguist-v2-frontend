"use client";
import type { Level, Question } from "@/app/lib/definitions";
import Link from "next/link";
import clsx from "clsx";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";

const backendServer = process.env.NEXT_PUBLIC_BACKEND_SERVER;

export default function Question() {
  const { data: session } = useSession();
  const params = useParams();
  const courseName = params.name;
  const { levelNumber, questionNumber } = params;

  const [level, setLevel] = useState<null | Level>(null);
  const [question, setQuestion] = useState<null | Question>(null);
  const [answer, setAnswer] = useState<null | string>(null);
  const [finished, setFinished] = useState<boolean | null>(null);
  const [incorrect, setIncorrect] = useState<boolean>(false);

  useEffect(() => {
    async function fetchQuestion() {
      if (session?.user && question) {
        const questionData: Question = await (
          await fetch(
            `${backendServer}/users/${session.user.id}/questions/${
              question!.id
            }`
          )
        ).json();
        console.log(questionData);
        if (questionData) {
          setAnswer(questionData.answer);
          setFinished(true);
        } else {
          setFinished(false);
        }
      } else {
        const levelData: Level = await (
          await fetch(
            `${backendServer}/courses/${courseName}/levels/${levelNumber}`
          )
        ).json();
        setLevel(levelData);

        const questionData = await (
          await fetch(
            `${backendServer}/courses/${courseName}/levels/${levelNumber}/questions/${questionNumber}`
          )
        ).json();
        setQuestion(questionData);
      }
    }
    fetchQuestion();
  }, [session, question]);

  useEffect(() => {
    const input: null | HTMLInputElement =
      document.querySelector(".question-input");
    if (input) {
      input.focus();
    }
    if (input && answer) {
      input.value = answer;
    }
  }, [finished, answer, incorrect]);

  function handleContainerClick(e: React.MouseEvent) {
    const target = e.target as HTMLElement;
    if (target.matches(".question-choice") && !finished) {
      setAnswer(target.textContent);
      target.style.border = "1px solid #505050";
    }
  }

  function handleContainerChange(e: React.InputEvent) {
    const target = e.target as HTMLInputElement;
    if (target.matches(".question-input") && !finished) {
      setAnswer(target.value);
    }
  }

  async function handleSubmit(e: React.MouseEvent) {
    if (answer && !finished) {
      const result: boolean = await (
        await fetch(`${backendServer}/questions/${question?.id}/submit`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            answer: answer,
            userId: session?.user?.id,
            levelId: level?.id,
          }),
        })
      ).json();
      result ? setFinished(true) : setIncorrect(true);
    }
  }

  let dynamicHtml = question ? question.content : "";

  if (answer) {
    const choices = document.querySelectorAll(".question-choice");
    if (choices.length > 0) {
      dynamicHtml = dynamicHtml
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">");

      const borderColor = finished ? "#00e622" : "#505050";

      const activeStyle = `class="question-choice" style="border: 1px solid ${borderColor};"`;

      dynamicHtml = dynamicHtml.replace(
        `class="question-choice">${answer}`,
        `${activeStyle}>${answer}`
      );
    }

    const input: null | HTMLInputElement =
      document.querySelector(".question-input");

    if (input && finished && dynamicHtml) {
      dynamicHtml = dynamicHtml.replace(
        `class="question-input"`,
        `class="question-input" value="${answer}" readonly`
      );
    }
  }

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
        {question ? (
          <div
            onClick={handleContainerClick}
            onInput={handleContainerChange}
            dangerouslySetInnerHTML={{ __html: dynamicHtml }}
          ></div>
        ) : (
          <>
            <div
              className={`shimmer shimmer-bg shimmer-speed-400 mt-[1.5rem] bg-muted relative overflow-hidden rounded-xl bg-gray-100 w-[90%] mx-auto min-h-[80px] p-2 shadow-sm`}
            ></div>
            <div
              className={`shimmer shimmer-bg shimmer-speed-400 mt-[1.5rem] bg-muted relative overflow-hidden rounded-xl bg-gray-100 min-h-[400px] p-2 shadow-sm`}
            ></div>
          </>
        )}

        {incorrect && !finished && (
          <div className="text-red-500">Incorrect</div>
        )}

        {finished == null ? (
          <button className="shimmer shimmer-bg shimmer-speed-400 border rounded-[10px] text-white min-w-[150px] min-h-[45px] mt-8 block ml-auto text-center"></button>
        ) : finished == true ? (
          <Link
            href={
              question!.number != "4"
                ? `/course/${courseName}/level/${levelNumber}/question/${
                    question!.number + 1
                  }`
                : `/course/${courseName}`
            }
            className="border border-[#00e622] rounded-[10px] text-[#00e622] px-8 py-2 mt-8 cursor-pointer block max-w-[140px] ml-auto hover:bg-[#00e622] hover:text-white"
          >
            Continue
          </Link>
        ) : (
          question && (
            <button
              onClick={handleSubmit}
              className="border border-[#3E50DA] rounded-[10px] text-[#3E50DA] px-8 py-2 mt-8 cursor-pointer block ml-auto text-center hover:bg-[#3E50DA] hover:text-white"
            >
              Submit
            </button>
          )
        )}
      </div>

      <div className="flex justify-end w-[90vw] lg:w-[80vw] mt-5">
        <div className="flex flex-wrap items-center gap-10 justify-center rounded-[10px] bg-[#F3F3F3] px-8 py-2 font-semibold">
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
