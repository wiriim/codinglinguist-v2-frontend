"use client";
import Link from "next/link";
import clsx from "clsx";
import { usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const allPages = generatePagination(currentPage, totalPages);

  return (
    <div className="flex gap-3">
      {currentPage <= 1 ? (
        <div className="cursor-pointer p-3 border border-[#DEDEDE] rounded-[10px] w-[40px] h-[40px] relative flex justify-center items-center hover:bg-[#ebeaea]">
          <Image
            src={"/right-arrow.png"}
            width={20}
            height={20}
            alt="previous page"
            className="object-contain rotate-180"
          />
        </div>
      ) : (
        <Link
          href={`/forums?page=${currentPage - 1}`}
          className="p-3 border border-[#DEDEDE] rounded-[10px] w-[40px] h-[40px] relative flex justify-center items-center hover:bg-[#ebeaea]"
        >
          <Image
            src={"/right-arrow.png"}
            width={20}
            height={20}
            alt="previous page"
            className="object-contain rotate-180"
          />
        </Link>
      )}

      {allPages.map((page, i) => {
        return currentPage == page || page == "..." ? (
          <div
            key={`${page}-${i}`}
            className={clsx(
              "cursor-pointer p-3 border border-[#DEDEDE] rounded-[10px] w-[40px] h-[40px] flex justify-center items-center hover:bg-[#ebeaea]",
              { "bg-[#ebeaea]": currentPage == page }
            )}
          >
            {page}
          </div>
        ) : (
          <Link
            href={`/forums?page=${page}`}
            key={`${page}-${i}`}
            className={clsx(
              "p-3 border border-[#DEDEDE] rounded-[10px] w-[40px] h-[40px] flex justify-center items-center hover:bg-[#ebeaea]",
              { "bg-[#ebeaea]": currentPage == page }
            )}
          >
            {page}
          </Link>
        );
      })}

      {currentPage >= totalPages ? (
        <div className="cursor-pointer p-3 border border-[#DEDEDE] rounded-[10px] w-[40px] h-[40px] relative flex justify-center items-center hover:bg-[#ebeaea]">
          <Image
            src={"/right-arrow.png"}
            width={20}
            height={20}
            alt="next page"
            className="object-contain"
          />
        </div>
      ) : (
        <Link
          href={`/forums?page=${currentPage + 1}`}
          className="p-3 border border-[#DEDEDE] rounded-[10px] w-[40px] h-[40px] relative flex justify-center items-center hover:bg-[#ebeaea]"
        >
          <Image
            src={"/right-arrow.png"}
            width={20}
            height={20}
            alt="next page"
            className="object-contain"
          />
        </Link>
      )}
    </div>
  );
}

const generatePagination = (currentPage: number, totalPages: number) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};
