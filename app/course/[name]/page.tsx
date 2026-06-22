import type { Course } from "@/app/lib/definitions";
import BasicSyntax from "@/app/ui/components/Course/BasicSyntax";
import DoubleSkeleton from "@/app/ui/components/Course/LevelSkeleton";
import Level from "@/app/ui/components/Course/Level";
import { auth } from "@/auth";
import Link from "next/link";
import { Suspense } from "react";
import Conditionals from "@/app/ui/components/Course/Conditionals";
import Functions from "@/app/ui/components/Course/Functions";

const backendServer = process.env.BACKEND_SERVER;

export default async function Course(props: {
  params: Promise<{ name: string }>;
}) {
  const session = await auth();
  const params = await props.params;
  let courseName = params.name;

  const basicSyntax1 = [1, 2, 3, 4, 5];
  const basicSyntax2 = [6, 7, 8, 9, 10];
  const conditionals = [11, 12, 13, 14, 15];
  const functions = [16, 17, 18, 19, 20];

  return (
    <div className="mt-8 flex flex-col items-center">
      {!session?.user && (
        <div className="p-3 border border-[#DEDEDE] rounded-[10px]">
          Sign In Required For Level 2+
        </div>
      )}
      <div className="w-[80vw]">
        <div className="flex items-center gap-8">
          <h1 className="text-[36px] min-w-fit">Basic Syntax</h1>
          <div className="bg-[#D9D9D9] w-full h-[3px] rounded-2xl"></div>
        </div>

        <BasicSyntax
          basicSyntax1={basicSyntax1}
          basicSyntax2={basicSyntax2}
          courseName={courseName}
        />

        <div className="flex items-center gap-8">
          <h1 className="text-[36px] min-w-fit">Conditionals & Loops</h1>
          <div className="bg-[#D9D9D9] w-full h-[3px] rounded-2xl"></div>
        </div>

        <Conditionals conditionals={conditionals} courseName={courseName} />

        <div className="flex items-center gap-8">
          <h1 className="text-[36px] min-w-fit">{courseName} Functions</h1>
          <div className="bg-[#D9D9D9] w-full h-[3px] rounded-2xl"></div>
        </div>

        <Functions functions={functions} courseName={courseName} />
      </div>
    </div>
  );
}
