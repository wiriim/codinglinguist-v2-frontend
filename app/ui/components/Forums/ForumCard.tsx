import Image from "next/image";
import type { Forum } from "@/app/lib/definitions";

export default function ForumCard({ data }: { data: Forum }) {
  const { id, user, createdAt, category, categoryType, title, _count } = data;
  return (
    <div
      key={id}
      className="flex flex-col border border-[#DEDEDE] rounded-[30px] p-8 my-8 shadow cursor-pointer hover:scale-101 hover:shadow-lg transition delay-1"
    >
      <div className="flex gap-5">
        <div className="w-[80px] h-[80px] rounded-[100%] bg-[#E9E9E3]"></div>
        <div className="flex flex-col justify-center w-[90%] h-[80px] text-[24px]">
          <div className="cursor-pointer w-fit hover:underline">{user.username}</div>
          <div className="text-[16px] text-[#918D8D]">
            {new Date(createdAt).toLocaleDateString("en-US")}
          </div>
        </div>
      </div>
      <div className="flex gap-4 mt-5">
        <div className="rounded-[10px] bg-[#7B95FD] text-white font-semibold px-4 py-2">
          {category.name}
        </div>
        <div className="rounded-[10px] bg-[#5DDF58] text-white font-semibold px-4 py-2">
          {categoryType.name}
        </div>
      </div>
      <div className="text-[32px] font-semibold mt-5">{title}</div>
      <div className="flex mt-5 gap-5">
        <div className="flex gap-2 items-center text-[22px] cursor-pointer">
          <span>
            <Image src="/heart-empty.png" width={25} height={25} alt="like" />
          </span>
          {_count.likes}
        </div>
        <div className="flex gap-1 items-center text-[22px] cursor-pointer">
          <span>
            <Image src="/comment.png" width={31} height={31} alt="like" />
          </span>
          {_count.comments}
        </div>
      </div>
    </div>
  );
}
