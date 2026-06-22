import ForumCreate from "../ui/components/Forums/ForumCreate";
import ForumSearch from "../ui/components/Forums/ForumSearch";
import ForumFilter from "../ui/components/Forums/ForumFilter";
import { SessionProvider } from "next-auth/react";
import ForumList from "../ui/components/Forums/ForumList";
import ForumCardSkeleton from "../ui/components/Forums/ForumCardSkeleton";
import { Suspense } from "react";

export default async function Forums(props: {
  searchParams?: Promise<{
    page?: string;
    sort?: string;
    lang?: string;
    type?: string;
    query?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams?.page) || 1;
  const sort = searchParams?.sort || "new";
  const lang = searchParams?.lang || "all";
  const type = searchParams?.type || "all";
  const query = searchParams?.query;

  const params = { currentPage, sort, lang, type, query };

  return (
    <div className="flex justify-center my-12">
      <div className="flex flex-col items-center gap-4 w-[80vw]">
        <ForumSearch />
        <div className="w-[80vw] lg:w-[60vw] mt-5">
          <SessionProvider>
            <ForumCreate />
            <ForumFilter />
            <Suspense key={JSON.stringify(params)} fallback={<ForumCardSkeleton />}>
              <ForumList params={params} />
            </Suspense>
          </SessionProvider>
        </div>
      </div>
    </div>
  );
}
