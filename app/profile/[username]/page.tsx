import ForumCardSkeleton from "@/app/ui/components/Forums/ForumCardSkeleton";
import UserForum from "@/app/ui/components/Profile/UserForum";
import { Suspense } from "react";

export default async function Profile(props: {
  params: Promise<{ username: string }>;
}) {
  let { username } = await props.params;
  username = decodeURIComponent(username);

  return (
    <div className="w-[80vw]">
      <Suspense fallback={<ForumCardSkeleton />}>
        <UserForum username={username} />
      </Suspense>
    </div>
  );
}
