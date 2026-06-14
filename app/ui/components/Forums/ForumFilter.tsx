"use client";
import { useSearchParams } from "next/navigation";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ForumFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sort = searchParams.get("sort") || "new";
  let lang = searchParams.get("lang") || "all";
  let type = searchParams.get("type") || "all";

  function handleLanguage(e: React.ChangeEvent) {
    lang = (e.target as HTMLSelectElement).value;
    router.replace(`/forums?sort=${sort}&lang=${lang}&type=${type}`);
  }
  function handleType(e: React.ChangeEvent) {
    type = (e.target as HTMLSelectElement).value;
    router.replace(`/forums?sort=${sort}&lang=${lang}&type=${type}`);
  }

  return (
    <div className="flex flex-wrap gap-5 w-full justify-between mt-4">
      <div className="flex flex-wrap gap-4">
        <button
          onClick={() =>
            router.replace(`/forums?sort=new&lang=${lang}&type=${type}`)
          }
          className={clsx("rounded-[10px] p-2 cursor-pointer hover:bg-[#eeeded]", {
            "bg-[#E2E2E2]": sort == "new",
          })}
        >
          New
        </button>
        <button
          onClick={() =>
            router.replace(`/forums?sort=popular&lang=${lang}&type=${type}`)
          }
          className={clsx("rounded-[10px] p-2 cursor-pointer hover:bg-[#eeeded]", {
            "bg-[#E2E2E2]": sort == "popular",
          })}
        >
          Popular
        </button>
      </div>

      <div className="flex flex-wrap gap-5">
        <div className="flex items-center gap-2">
          <label htmlFor="language">Language :</label>
          <select
            name="language"
            id="language"
            defaultValue={lang}
            onChange={handleLanguage}
          >
            <option value="all">All</option>
            <option value="c">C</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="type">Type :</label>
          <select
            name="type"
            id="type"
            defaultValue={type}
            onChange={handleType}
          >
            <option value="all">All</option>
            <option value="error">Error</option>
            <option value="question">Question</option>
            <option value="discussion">Discussion</option>
            <option value="guide">Guide</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
    </div>
  );
}
