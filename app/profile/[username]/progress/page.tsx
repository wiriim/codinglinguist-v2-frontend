import ProgressSkeleton from "@/app/ui/components/Profile/ProgressSkeleton";
import UserProgress from "@/app/ui/components/Profile/UserProgress";
import { Suspense } from "react";

export default async function Profile(props: {
  params: Promise<{ username: string }>;
}) {
  const params = await props.params;
  let username = params.username;

  return (
    <div className="w-[80vw]">
      <Suspense fallback={<ProgressSkeleton />}>
        <UserProgress username={username}/>
      </Suspense>
    </div>
  );
}
