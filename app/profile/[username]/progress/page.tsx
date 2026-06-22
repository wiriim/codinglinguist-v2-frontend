
import ProgressSkeleton from "@/app/ui/components/Profile/ProgressSkeleton";
import UserProgress from "@/app/ui/components/Profile/UserProgress";
import { Suspense } from "react";

export default async function Profile() {
  return (
    <div className="w-[80vw]">
      <Suspense fallback={<ProgressSkeleton />}>
        <UserProgress />
      </Suspense>
    </div>
  );
}
