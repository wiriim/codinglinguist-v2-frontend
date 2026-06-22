import { auth } from "@/auth";
import ForumCard from "./ForumCard";
import Pagination from "./Pagination";
import { ForumResp } from "@/app/lib/definitions";

const backendServer = process.env.BACKEND_SERVER;

export default async function ForumList({
  params,
}: {
  params: {
    currentPage: number;
    sort: string;
    lang: string;
    type: string;
    query: string | undefined;
  };
}) {
  const session = await auth();
  const { currentPage, sort, lang, type, query } = params;

  const newParams = new URLSearchParams();

  newParams.set("page", String(currentPage));
  newParams.set("sort", sort);
  newParams.set("lang", lang);
  newParams.set("type", type);

  if (query) {
    newParams.set("query", query);
  }

  const forumsResp: ForumResp = await (
    await fetch(`${backendServer}/forums?${newParams}`, {
      headers: session?.user?.id
        ? {
            "x-user-id": session.user.id,
          }
        : {},
    }, )
  ).json();

  return (
    <>
      {forumsResp.forums.map((data, i) => (
        <ForumCard key={data.id} data={data} />
      ))}
      <Pagination totalPages={forumsResp.totalPages} />
    </>
  );
}
