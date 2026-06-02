"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const backendServer = process.env.NEXT_PUBLIC_BACKEND_SERVER;

export default function ForumLike({id, likes, liked}: {id: string, likes: number, liked: boolean}) {
  const { data: session } = useSession();
  const router = useRouter();


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

      router.refresh();
    }
  }
  return (
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
            className="z-1 object-contain"
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

      <span className="z-1">{likes}</span>
    </button>
  );
}
