import Level from "./Level";
import { Suspense } from "react";
import LevelSkeleton from "./LevelSkeleton";

export default async function BasicSyntax({
  basicSyntax1,
  basicSyntax2,
  courseName,
}: {
  basicSyntax1: number[];
  basicSyntax2: number[];
  courseName: string;
}) {
  return (
    <>
      <div className="flex flex-wrap gap-8 justify-around my-25">
        {basicSyntax1.map(async (number, i) => (
          <Suspense fallback={<LevelSkeleton />}>
            <Level number={number} courseName={courseName} />
          </Suspense>
        ))}
      </div>
      <div className="flex flex-wrap gap-8 justify-around my-25">
        {basicSyntax2.map(async (number, i) => (
          <Suspense fallback={<LevelSkeleton />}>
            <Level number={number} courseName={courseName} />
          </Suspense>
        ))}
      </div>
    </>
  );
}
