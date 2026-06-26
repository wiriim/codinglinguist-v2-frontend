"use client";

import { Level, Question } from "@/app/lib/definitions";
import { createContext } from "react";
import { useParams } from "next/navigation";

export const QuestionContext = createContext<{
  question: Question;
  level: Level;
} | null>(null);

export function QuestionProvider({
  questions,
  level,
  children,
}: Readonly<{
  questions: Question[];
  level: Level;
  children: React.ReactNode;
}>) {
  const params = useParams();
  const { questionNumber } = params;

  let question: Question = questions[parseInt(questionNumber! as string) - 1];
  return (
    <QuestionContext value={{ question, level }}>{children}</QuestionContext>
  );
}
