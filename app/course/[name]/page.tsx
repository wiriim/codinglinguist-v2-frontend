import type { Course } from "@/app/lib/definitions";
import Level from "@/app/ui/components/Course/Level";
import { auth } from "@/auth";

const backendServer = process.env.BACKEND_SERVER;

export default async function Course(props: {
  params: Promise<{ name: string }>;
}) {
  const session = await auth();
  const params = await props.params;
  let courseName = params.name;
  // courseName = courseName.charAt(0).toUpperCase() + courseName.slice(1);

  const course: Course = await (
    await fetch(`${backendServer}/courses/${courseName}`)
  ).json();
  const levels = course.levels;

  const basicSyntax1 = levels.slice(0, 5);
  const basicSyntax2 = levels.slice(5, 10);
  const conditionals = levels.slice(10, 15);
  const functions = levels.slice(15, 20);

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

        <div className="flex flex-wrap justify-around my-25">
          {basicSyntax1.map((data, i) => (
            <Level key={data.id} data={data} course={courseName} />
          ))}
        </div>
        <div className="flex flex-wrap justify-around my-25">
          {basicSyntax2.map((data, i) => (
            <Level key={data.id} data={data} course={courseName} />
          ))}
        </div>

        <div className="flex items-center gap-8">
          <h1 className="text-[36px] min-w-fit">Conditionals & Loops</h1>
          <div className="bg-[#D9D9D9] w-full h-[3px] rounded-2xl"></div>
        </div>

        <div className="flex flex-wrap justify-around my-25">
          {conditionals.map((data, i) => (
            <Level key={data.id} data={data} course={courseName} />
          ))}
        </div>

        <div className="flex items-center gap-8">
          <h1 className="text-[36px] min-w-fit">{courseName} Functions</h1>
          <div className="bg-[#D9D9D9] w-full h-[3px] rounded-2xl"></div>
        </div>

        <div className="flex flex-wrap justify-around my-25">
          {functions.map((data, i) => (
            <Level key={data.id} data={data} course={courseName} />
          ))}
        </div>
      </div>
    </div>
  );
}
