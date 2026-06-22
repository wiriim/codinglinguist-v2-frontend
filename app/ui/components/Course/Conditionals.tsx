import Level from "./Level";
import { Suspense } from "react";
import LevelSkeleton from "./LevelSkeleton";

export default async function Conditionals({
  conditionals,
  courseName,
}: {
  conditionals: number[];
  courseName: string;
}) {
  return (
    <>
      <div className="flex flex-wrap gap-8 justify-around my-25">
        {conditionals.map(async (number, i) => (
          <Suspense fallback={<LevelSkeleton />}>
            <Level number={number} courseName={courseName} />
          </Suspense>
        ))}
      </div>
    </>
  );
}
