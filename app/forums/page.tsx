import ForumCreate from "../ui/components/Forums/ForumCreate";
import ForumCard from "../ui/components/Forums/ForumCard";
import ForumSearch from "../ui/components/Forums/ForumSearch";
import ForumFilter from "../ui/components/Forums/ForumFilter";
import type { ForumResp } from "../lib/definitions";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import Pagination from "../ui/components/Forums/Pagination";

const backendServer = process.env.BACKEND_SERVER;

export default async function Forums(props: {
  searchParams?: Promise<{
    page?: string;
    sort?: string;
    lang?: string;
    type?: string;
  }>;
}) {
  const session = await auth();

  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams?.page) || 1;
  const sort = searchParams?.sort || "new";
  const lang = searchParams?.lang || "all";
  const type = searchParams?.type || "all";

  const forumsResp: ForumResp = await (
    await fetch(
      `${backendServer}/forums?page=${currentPage}&sort=${sort}&lang=${lang}&type=${type}`,
      {
        headers: session?.user?.id
          ? {
              "x-user-id": session.user.id,
            }
          : {},
      }
    )
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
            {forumsResp.forums.map((data, i) => (
              <ForumCard key={data.id} data={data} />
            ))}
          </SessionProvider>

          <Pagination totalPages={forumsResp.totalPages} />
        </div>
      </div>
    </div>
  );
}
