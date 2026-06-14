"use client";
import { useRouter } from "next/navigation";

export default function ForumCommentFilter({ forumId }: { forumId: string }) {
  const router = useRouter();

  function handleChange(e: React.ChangeEvent) {
    const sort = (e.target as HTMLSelectElement).value;
    router.replace(`/forums/${forumId}?sort=${sort}`);
  }

  return (
    <div className="flex justify-between mt-5 ">
      <div className="flex items-center gap-2">
        <label htmlFor="language">Sort by :</label>
        <select
          name="sortBy"
          id="sortBy"
          defaultValue={"new"}
          onChange={handleChange}
        >
          <option value="new">New</option>
          <option value="popular">Popular</option>
        </select>
      </div>
    </div>
  );
}
