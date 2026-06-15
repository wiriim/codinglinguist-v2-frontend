"use client";
import Image from "next/image";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function ForumSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleSearch = useDebouncedCallback((e: React.ChangeEvent) => {
    const term = (e.target as HTMLInputElement).value;
    console.log(term);
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    router.replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="relative w-[70vw] lg:w-[40vw] border rounded-[10px]">
      <span>
        <Image
          src="/search.png"
          width={20}
          height={20}
          alt="search"
          className="absolute top-4.5 left-4.5"
        />
      </span>
      <input
        className="w-full bg-[#F3F3F3] p-4 pl-14 rounded-[10px] text-[#877C7C] text-[16px]"
        placeholder="Search posts"
        onChange={handleSearch}
      />
    </div>
  );
}
