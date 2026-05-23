import type { Level } from "@/app/lib/definitions";

const backendServer = process.env.BACKEND_SERVER;

export default async function Level(props: {
  params: Promise<{ name: string; levelNumber: string }>;
}) {
  const params = await props.params;
  const courseName = params.name;
  const levelNumber = params.levelNumber;

  const level: Level = await (
    await fetch(`${backendServer}/courses/${courseName}/levels/${levelNumber}`)
  ).json();
  console.log(level);

  return (
    <div className="flex justify-center w-full my-12">
      <div
        dangerouslySetInnerHTML={{ __html: level.content }}
        className="border border-[#DEDEDE] rounded-[10px] p-8 px-12 w-[80vw]"
      ></div>
    </div>
  );
}
