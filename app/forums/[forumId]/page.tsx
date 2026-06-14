import Image from "next/image";
import Comment from "@/app/ui/components/Forum/Comment";
import type { Forum } from "@/app/lib/definitions";
import CommentCreate from "@/app/ui/components/Forum/CommentCreate";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import Link from "next/link";
import ForumLike from "@/app/ui/components/Forum/ForumLike";
import RemovePost from "@/app/ui/components/Forum/RemovePost";
import ForumCommentFilter from "@/app/ui/components/Forum/ForumCommentFilter";
import { mergeSortComment } from "@/app/lib/utils";

const backendServer = process.env.BACKEND_SERVER;

export default async function Forum(props: {
  params: Promise<{ forumId: string }>;
  searchParams?: Promise<{
    sort?: string;
  }>;
}) {
  const session = await auth();
  const params = await props.params;
  const forumId = params.forumId;

  const searchParams = await props.searchParams;
  const sort = searchParams?.sort || "new";

  const forum: Forum = await (
    await fetch(`${backendServer}/forums/${forumId}`, {
      headers: session?.user?.id
        ? {
            "x-user-id": session.user.id,
          }
        : {},
    })
  ).json();

  const trailingSpace = forum.image && forum.image.slice(-3) == "%20";
  if (trailingSpace) {
    forum.image = forum.image.slice(0, -3);
  }

  const liked = forum.likes && forum.likes.length > 0;
  let comments = forum.comments;

  if (sort == "popular") {
    comments = mergeSortComment(comments);
  }

  return (
    <div className="my-8 flex justify-center w-full">
      <div className="w-2/3">
        <Link
          href={"/forums"}
          className="flex gap-3 cursor-pointer w-fit rounded-[10px] p-1 px-2 hover:bg-[#ebeaea] my-7"
        >
          <Image
            src="/right-arrow.png"
            width={12}
            height={12}
            alt=""
            className="object-contain rotate-180"
          />
          Back to forums
        </Link>

        <div className="flex gap-4 items-center">
          <div className="min-w-[70px] h-[70px] rounded-[100%] bg-[#E9E9E3] relative">
            {forum.user.picture && (
              <Image
                src={forum.user.picture}
                fill
                alt="profile picture"
                className="rounded-[100%] bg-[#E9E9E3] w-[70px] h-[70px] object-cover"
              />
            )}
          </div>
          <div className="flex flex-col justify-center w-[90%] h-[80px] text-[24px]">
            <Link
              href={`/profile/${forum.user.username}`}
              className="cursor-pointer w-fit hover:underline max-w-[13ch] text-ellipsis overflow-hidden"
            >
              {forum.user.username}
            </Link>
            <div className="text-[16px] text-[#918D8D]">
              {new Date(forum.createdAt).toLocaleDateString("en-US")}
            </div>
          </div>
          {session?.user && session.user.username == forum.user.username && (
            <RemovePost forum={forum} />
          )}
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
        {forum.image && (
          <div className="w-[300px] h-[300px] relative mx-auto">
            <Image
              src={forum.image}
              fill
              alt="post image"
              className="object-contain"
            />
          </div>
        )}

        <div className="flex mt-7 gap-5">
          <SessionProvider>
            <ForumLike id={forumId} likes={forum._count.likes} liked={liked} />
          </SessionProvider>
          <div className="flex gap-1 items-center text-[22px] cursor-pointer">
            <span>
              <Image src="/comment.png" width={31} height={31} alt="like" />
            </span>
            {forum._count.comments}
          </div>
        </div>

        <SessionProvider>
          <CommentCreate forumId={forumId} />
        </SessionProvider>

        <ForumCommentFilter forumId={forumId} />

        <div className="mt-5">
          <SessionProvider>
            {comments.map((data, i) => (
              <Comment session={session} key={data.id} data={data} />
            ))}
          </SessionProvider>
        </div>
      </div>
    </div>
  );
}
