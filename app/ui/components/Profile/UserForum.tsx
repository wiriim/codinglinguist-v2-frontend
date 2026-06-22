import type { Badge, Forum, User } from "@/app/lib/definitions";
import ForumCard from "@/app/ui/components/Forums/ForumCard";
import { SessionProvider } from "next-auth/react";

const backendServer = process.env.BACKEND_SERVER;

export default async function UserForum({ username }: { username: string }) {
  const user: User = await (
    await fetch(`${backendServer}/users/${username}`)
  ).json();

  if (!user) {
    return (
      <div className="my-8 flex flex-col items-center">
        <h1>Can't seem to find anyone with that username</h1>
      </div>
    );
  }

  const forums: Forum[] = await (
    await fetch(`${backendServer}/users/${user.id}/forums`)
  ).json();
  return (
    <SessionProvider>
      <div className="my-8 flex flex-col items-center">
        <div className="w-[80vw]">
          {forums.map((data, i) => (
            <ForumCard key={data.id} data={data} />
          ))}
        </div>
      </div>
    </SessionProvider>
  );
}
