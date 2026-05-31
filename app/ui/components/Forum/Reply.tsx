import type { Reply } from "@/app/lib/definitions";
import Image from "next/image";

export default function Reply({ data }: { data: Reply }) {
  const { id, content, createdAt, _count, user } = data;

  return (
    <div>
      <div className="flex gap-4 items-center">
        <div className="min-w-[40px] h-[40px] rounded-[100%] bg-[#E9E9E3]"></div>
        <div className="flex gap-1 items-center w-[90%] text-[20px]">
          <div className="cursor-pointer w-fit hover:underline">
            {user.username}
          </div>
          <div className="text-[16px] text-[#918D8D]">
            • {new Date(createdAt).toLocaleDateString("en-US")}
          </div>
        </div>
      </div>

      <div className="text-[20px] ms-14 mt-3">{content}</div>

      <div className="flex ms-14 mt-3 gap-5">
        <div className="flex gap-2 items-center text-[20px] cursor-pointer">
          <span>
            <Image src="/heart-empty.png" width={20} height={20} alt="like" />
          </span>
          {_count.likes}
        </div>
        <div className="flex gap-1 items-center text-[20px] cursor-pointer">
          <span>
            <Image src="/comment.png" width={23} height={23} alt="like" />
          </span>
          Reply
        </div>
      </div>
    </div>
  );
}
