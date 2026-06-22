import Level from "./Level";
import { Suspense } from "react";
import LevelSkeleton from "./LevelSkeleton";

export default async function Functions({
  functions,
  courseName,
}: {
    functions: number[];
  courseName: string;
}) {
  return (
    <>
      <div className="flex flex-wrap gap-8 justify-around my-25">
        {functions.map(async (number, i) => (
          <Suspense fallback={<LevelSkeleton />}>
            <Level number={number} courseName={courseName} />
          </Suspense>
        ))}
      </div>
    </>
  );
}
