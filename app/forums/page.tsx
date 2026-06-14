import ForumCreate from "../ui/components/Forums/ForumCreate";
import ForumCard from "../ui/components/Forums/ForumCard";
import ForumSearch from "../ui/components/Forums/ForumSearch";
import ForumFilter from "../ui/components/Forums/ForumFilter";
import type { Forum } from "../lib/definitions";
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

  const forums: Forum[] = await (
    await fetch(`${backendServer}/forums`, {
      headers: session?.user?.id
        ? {
            "x-user-id": session.user.id,
          }
        : {},
    })
  ).json();

  let filteredForums: Forum[] = forums;

  filteredForums = filteredForums.filter(
    (forum) => lang == "all" || forum.category.name.toLocaleLowerCase() == lang
  );
  filteredForums = filteredForums.filter(
    (forum) =>
      type == "all" || forum.categoryType.name.toLocaleLowerCase() == type
  );

  if (sort == "popular") {
    filteredForums = mergeSort(filteredForums);
  }

  const take = 5;
  const totalPages = Math.ceil((filteredForums.length) / take);

  const start = currentPage == 1 ? 0 : (currentPage - 1) * take;
  const end = currentPage * take;
  filteredForums = filteredForums.slice(start, end);

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
            {filteredForums.map((data, i) => (
              <ForumCard key={data.id} data={data} />
            ))}
          </SessionProvider>

          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
}

function mergeSort(arr: Forum[]): Forum[] {
  if (arr.length <= 1) return arr;
  let mid = Math.floor(arr.length / 2);

  let left: Forum[] = mergeSort(arr.slice(0, mid));
  let right: Forum[] = mergeSort(arr.slice(mid));
  return merge(left, right);
}

function merge(left: Forum[], right: Forum[]): Forum[] {
  const result: Forum[] = [];
  let i = 0;
  let j = 0;

  while (i < left.length && j < right.length) {
    if (left[i]._count.likes >= right[j]._count.likes) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }

  return [
    ...result,
    ...left.slice(i),
    ...right.slice(j),
  ];
}
