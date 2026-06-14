"use client";
import { useSearchParams } from "next/navigation";
import clsx from "clsx";
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
          className={clsx(
            "rounded-[10px] p-2 cursor-pointer hover:bg-[#eeeded]",
            {
              "bg-[#E2E2E2]": sort == "new",
            }
          )}
        >
          New
        </button>
        <button
          onClick={() =>
            router.replace(`/forums?sort=popular&lang=${lang}&type=${type}`)
          }
          className={clsx(
            "rounded-[10px] p-2 cursor-pointer hover:bg-[#eeeded]",
            {
              "bg-[#E2E2E2]": sort == "popular",
            }
          )}
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
            className="cursor-pointer"
          >
            <option value="all" className="cursor-pointer">
              All
            </option>
            <option value="c" className="cursor-pointer">
              C
            </option>
            <option value="python" className="cursor-pointer">
              Python
            </option>
            <option value="java" className="cursor-pointer">
              Java
            </option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="type">Type :</label>
          <select
            name="type"
            id="type"
            defaultValue={type}
            onChange={handleType}
            className="cursor-pointer"
          >
            <option value="all" className="cursor-pointer">
              All
            </option>
            <option value="error" className="cursor-pointer">
              Error
            </option>
            <option value="question" className="cursor-pointer">
              Question
            </option>
            <option value="discussion" className="cursor-pointer">
              Discussion
            </option>
            <option value="guide" className="cursor-pointer">
              Guide
            </option>
            <option value="other" className="cursor-pointer">
              Other
            </option>
          </select>
        </div>
      </div>
    </div>
  );
}
