import ForumCreate from "../ui/components/Forums/ForumCreate";
import ForumCard from "../ui/components/Forums/ForumCard";
import ForumSearch from "../ui/components/Forums/ForumSearch";
import ForumFilter from "../ui/components/Forums/ForumFilter";
import type { Forum } from "../lib/definitions";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

const backendServer = process.env.BACKEND_SERVER;

export default async function Forums() {
  const session = await auth();

  const forums: Forum[] = await (
    await fetch(`${backendServer}/forums`, {
      headers: session?.user?.id
        ? {
            "x-user-id": session.user.id,
          }
        : {},
    })
  ).json();

  return (
    <div className="flex justify-center my-12">
      <div className="flex flex-col items-center gap-4 w-[80vw]">
        <ForumSearch />
        <div className="w-[80vw] lg:w-[60vw] mt-5">
          <SessionProvider>
            <ForumCreate />
          </SessionProvider>

          <ForumFilter />

          <SessionProvider>
            {forums.map((data, i) => (
              <ForumCard key={data.id} data={data} />
            ))}
          </SessionProvider>
        </div>
      </div>
    </div>
  );
}
