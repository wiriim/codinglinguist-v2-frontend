"use client";
import Image from "next/image";
import type { Forum } from "@/app/lib/definitions";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const backendServer = process.env.NEXT_PUBLIC_BACKEND_SERVER;

export default function ForumCard({ data }: { data: Forum }) {
  const { data: session } = useSession();
  const router = useRouter();
  let { id, user, createdAt, category, categoryType, title, _count, likes } =
    data;

  const [liked, setLiked] = useState(likes && likes.length > 0);
  const [likesCount, setLikesCount] = useState(_count.likes);

  async function handleLike() {
    if (!session?.user) {
      router.push("/login");
    } else {
      const response = liked
        ? await fetch(`${backendServer}/forums/${id}/dislike`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: session.user.id,
            }),
          })
        : await fetch(`${backendServer}/forums/${id}/like`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: session.user.id,
            }),
          });

      if (liked) {
        setLiked(false);
        setLikesCount(prev => prev - 1);
      } else {
        setLiked(true);
        setLikesCount(prev => prev + 1);
      }
    }
  }

  return (
    <Link
      href={`/forums/${id}`}
      key={id}
      className="flex flex-col border border-[#DEDEDE] rounded-[10px] p-8 my-8 shadow cursor-pointer hover:scale-101 hover:shadow-lg transition delay-1"
    >
      <div className="sm:flex gap-5 justify-between items-center">
        <div className="w-[65px] min-w-[65px] h-[65px] rounded-[100%] bg-[#E9E9E3] relative">
          {user.picture && (
            <Image
              src={user.picture}
              fill
              alt="profile picture"
              className="rounded-[100%] bg-[#E9E9E3] w-[65px] h-[65px] object-cover"
            />
          )}
        </div>
        <div className="flex flex-col justify-center w-[90%] h-[80px] text-[24px]">
          <div className="cursor-pointer w-fit max-w-[10ch] text-ellipsis overflow-hidden">
            {user.username}
          </div>
          <div className="text-[16px] text-[#918D8D]">
            {new Date(createdAt).toLocaleDateString("en-US")}
          </div>
        </div>

        <div className="flex gap-4 mt-5">
          <div className="rounded-[10px] bg-[#BECBFF] border border-[#5364A9] text-[#5364A9] font-semibold px-4 py-2">
            {category.name}
          </div>
          <div className="rounded-[10px] bg-[#A0F599] border border-[#1F631A] text-[#1F631A] font-semibold px-4 py-2">
            {categoryType.name}
          </div>
        </div>
      </div>

      <div className="text-[28px] font-semibold mt-6">{title}</div>
      <div className="flex mt-5 gap-5">
        <button
          onClick={(e) => {
            e.preventDefault();
            handleLike();
          }}
          className="group flex gap-2 items-center text-[22px] relative cursor-pointer hover:text-red-500"
        >
          {liked ? (
            <>
              <div className="group-hover:bg-red-50 w-[45px] h-[45px] rounded-[100%] absolute z-0 -left-2.5"></div>
              <Image
                src="/heart-fill.png"
                width={25}
                height={25}
                alt="like"
                className="z-1"
              />
            </>
          ) : (
            <>
              <div className="group-hover:bg-red-50 w-[45px] h-[45px] rounded-[100%] absolute z-0 -left-2.5"></div>
              <Image
                src="/heart-empty.png"
                width={25}
                height={25}
                alt="like"
                className="group-hover:opacity-0"
              />
              <Image
                src="/heart-empty-red.png"
                width={25}
                height={25}
                alt="like"
                className="absolute opacity-0 group-hover:opacity-100"
              />
            </>
          )}

          <span className="z-1">{likesCount}</span>
        </button>
        <button className="flex gap-1 items-center text-[22px] cursor-pointer">
          <span>
            <Image src="/comment.png" width={31} height={31} alt="like" />
          </span>
          {_count.comments}
        </button>
      </div>
    </Link>
  );
}
