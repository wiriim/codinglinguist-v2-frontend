import Image from "next/image";
import Comment from "@/app/ui/components/Forum/Comment";
import type { Forum } from "@/app/lib/definitions";
import CommentCreate from "@/app/ui/components/Forum/CommentCreate";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";

const backendServer = process.env.BACKEND_SERVER;

export default async function Forum(props: {
  params: Promise<{ forumId: string }>;
}) {
  const session = auth();
  const params = await props.params;
  const forumId = params.forumId;
  const forum: Forum = await (
    await fetch(`${backendServer}/forums/${forumId}`)
  ).json();
  const comments = forum.comments;

  return (
    <div className="my-8 flex justify-center w-full">
      <div className="w-2/3">
        <div className="flex gap-4 items-center">
          <div className="min-w-[75px] h-[75px] rounded-[100%] bg-[#E9E9E3]"></div>
          <div className="flex flex-col justify-center w-[90%] h-[80px] text-[24px]">
            <div className="cursor-pointer w-fit hover:underline">
              {forum.user.username}
            </div>
            <div className="text-[16px] text-[#918D8D]">
              {new Date(forum.createdAt).toLocaleDateString("en-US")}
            </div>
          </div>
        </div>

        <div className="flex gap-4 mt-7">
          <div className="rounded-[10px] bg-[#BECBFF] border border-[#5364A9] text-[#5364A9] font-semibold px-4 py-2">
            {forum.category.name}
          </div>
          <div className="rounded-[10px] bg-[#A0F599] border border-[#1F631A] text-[#1F631A] font-semibold px-4 py-2">
            {forum.categoryType.name}
          </div>
        </div>
        <div className="mt-7 text-[32px] font-semibold">{forum.title}</div>
        <div className="mt-5 text-[24px]">{forum.content}</div>

        <div className="flex mt-7 gap-5">
          <div className="flex gap-2 items-center text-[22px] cursor-pointer">
            <span>
              <Image src="/heart-empty.png" width={25} height={25} alt="like" />
            </span>
            {forum._count.likes}
          </div>
          <div className="flex gap-1 items-center text-[22px] cursor-pointer">
            <span>
              <Image src="/comment.png" width={31} height={31} alt="like" />
            </span>
            {forum._count.comments}
          </div>
        </div>

        <SessionProvider>
          <CommentCreate forumId={forumId}/>
        </SessionProvider>

        <div className="flex justify-between mt-5">
          <div className="flex items-center gap-2">
            <label htmlFor="language">Sort by :</label>
            <select name="language" id="language" defaultValue={"new"}>
              <option value="new">New</option>
              <option value="popular">Popular</option>
            </select>
          </div>
        </div>

        <div className="mt-5">
          {comments.map((data, i) => (
            <Comment key={data.id} data={data} />
          ))}
        </div>
      </div>
    </div>
  );
}
