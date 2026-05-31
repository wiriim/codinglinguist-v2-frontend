import ForumCreate from "../ui/components/Forums/ForumCreate";
import ForumCard from "../ui/components/Forums/ForumCard";
import ForumSearch from "../ui/components/Forums/ForumSearch";
import ForumFilter from "../ui/components/Forums/ForumFilter";
import type { Forum } from "../lib/definitions";
import { SessionProvider } from "next-auth/react";

const backendServer = process.env.BACKEND_SERVER;

export default async function Forums() {
  const forums: Forum[] = await (await fetch(`${backendServer}/forums`)).json();

  return (
    <div className="flex justify-center my-12">
      <div className="flex flex-col items-center gap-4 w-[80vw]">
        <ForumSearch />
        <div className="w-2/3 mt-5">
          <SessionProvider>
            <ForumCreate />
          </SessionProvider>
          <ForumFilter />
          {forums.map((data, i) => (
            <ForumCard key={data.id} data={data} />
          ))}
        </div>
      </div>
    </div>
  );
}
