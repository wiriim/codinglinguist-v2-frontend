"use client";
import type { Comment, Reply } from "@/app/lib/definitions";
import Image from "next/image";
import ReplyComponent from "./Reply";
import { useState } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import Link from "next/link";
import { Session } from "next-auth";
import RemoveComment from "./RemoveComment";

const backendServer = process.env.NEXT_PUBLIC_BACKEND_SERVER;

export default function Comment({
  session,
  data,
}: {
  session: Session | null;
  data: Comment;
}) {
  const router = useRouter();

  const { id, content, createdAt, _count, user, replies, likes } = data;
  const [showReplies, setShowReplies] = useState(false);
  const [reply, setReply] = useState(false);
  const [replyContent, setReplyContent] = useState(`@${user.username} `);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [liked, setLiked] = useState(likes && likes.length > 0);
  const [likesCount, setLikesCount] = useState(_count.likes);

  const [currentReplies, setCurrentReplies] = useState(replies);

  function updateCurrentReplies(reply: Reply) {
    setCurrentReplies((prev) => [...prev, reply]);
  }

  async function handleReply() {
    if (!session?.user) {
      router.push("/login");
    } else if (!replyContent) {
      setError("Reply is empty");
    } else {
      const response = await fetch(`${backendServer}/comments/${id}/replies`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: replyContent,
          userId: session!.user.id,
        }),
      });

      if (!response.ok) {
        setError(response.statusText);
        setSuccess("");
      } else {
        setSuccess("Reply created");
        setError("");
        setShowReplies(true);
        setReply(false);

        const reply = await response.json();

        updateCurrentReplies({
          content: replyContent,
          userId: parseInt(session!.user.id),
          createdAt: new Date().toLocaleDateString(),
          likes: [],
          commentId: id as number,
          _count: { likes: 0 },
          user,
          id: reply.id,
        });
      }
    }
  }

  async function handleLike() {
    if (!session?.user) {
      router.push("/login");
    } else {
      const response = liked
        ? await fetch(`${backendServer}/comments/${id}/dislike`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: session.user.id,
            }),
          })
        : await fetch(`${backendServer}/comments/${id}/like`, {
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
        setLikesCount(likesCount - 1);
      } else {
        setLiked(true);
        setLikesCount(likesCount + 1);
      }
    }
  }

  return (
    <div>
      <div className="flex gap-4 items-center mt-5">
        <div className="min-w-[40px] h-[40px] rounded-[100%] bg-[#E9E9E3] relative">
          {user.picture && (
            <Image
              src={user.picture}
              fill
              alt="profile picture"
              className="rounded-[100%] bg-[#E9E9E3] w-[40px] h-[40px] object-cover"
            />
          )}
        </div>
        <div className="flex gap-1 items-center w-[90%] text-[20px]">
          <Link
            href={`/profile/${user.username}`}
            className="cursor-pointer w-fit hover:underline"
          >
            {user.username}
          </Link>
          <div className="text-[16px] text-[#918D8D]">
            • {new Date(createdAt).toLocaleDateString("en-US")}
          </div>
        </div>
        {session?.user && session.user.username == user.username && (
          <RemoveComment comment={data} />
        )}
      </div>

      <div className="text-[20px] ms-14 mt-3">{content}</div>

      <div className="flex ms-14 mt-3 gap-5">
        <button
          onClick={(e) => {
            e.preventDefault();
            handleLike();
          }}
          className="group flex gap-2 items-center text-[20px] relative cursor-pointer hover:text-red-500"
        >
          {liked ? (
            <>
              <div className="group-hover:bg-red-50 w-[35px] h-[35px] rounded-[100%] absolute z-0 -left-2"></div>
              <Image
                src="/heart-fill.png"
                width={20}
                height={20}
                alt="like"
                className="z-1 object-contain"
              />
            </>
          ) : (
            <>
              <div className="group-hover:bg-red-50 w-[35px] h-[35px] rounded-[100%] absolute z-0 -left-2"></div>
              <Image
                src="/heart-empty.png"
                width={20}
                height={20}
                alt="like"
                className="group-hover:opacity-0"
              />
              <Image
                src="/heart-empty-red.png"
                width={20}
                height={20}
                alt="like"
                className="absolute opacity-0 group-hover:opacity-100"
              />
            </>
          )}

          <span className="z-1">{likesCount}</span>
        </button>
        <button
          onClick={() => {
            reply ? setReply(false) : setReply(true);
          }}
          className="flex gap-1 items-center text-[18px] cursor-pointer"
        >
          <span>
            <Image src="/comment.png" width={23} height={23} alt="like" />
          </span>
          Reply
        </button>
      </div>

      {error && <div className="text-red-500 mt-1 ms-14">{error}</div>}
      {success && <div className="text-green-500 mt-1 ms-14">{success}</div>}

      <div className="flex flex-col">
        {reply && (
          <>
            <input
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              className="ms-14 bg-[#F3F3F3] rounded-[10px] my-3 p-3 w-[95%]"
            ></input>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => {
                  setReply(false);
                  setError("");
                  setReplyContent(`@${user.username} `);
                }}
                className="text-[16px] w-fit mt-1 rounded-[10px] border border-red-500 text-red-500 px-4 py-2 hover:bg-red-500 hover:text-white flex justify-center items-center cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleReply}
                className="text-[16px] w-fit mt-1 rounded-[10px] border border-[#DEDEDE] px-4 py-2 hover:bg-black hover:text-white flex justify-center items-center cursor-pointer"
              >
                Reply
              </button>
            </div>
          </>
        )}
      </div>

      <div className="ms-14 mt-4">
        {currentReplies.length > 0 && (
          <button
            className="flex items-center mb-4 gap-2 cursor-pointer hover:bg-[#ebeaea] w-fit p-1 rounded-[10px]"
            onClick={() => {
              showReplies ? setShowReplies(false) : setShowReplies(true);
            }}
          >
            Replies ({replies.length})
            <Image
              src="/right-arrow.png"
              width={12}
              height={12}
              alt=""
              className={clsx("object-contain", {
                "rotate-90": !showReplies,
                "-rotate-90": showReplies,
              })}
            />
          </button>
        )}
        {showReplies &&
          currentReplies.map((data, i) => (
            <ReplyComponent
              session={session}
              key={data.id}
              data={data}
              commentId={id as number}
              updateCurrentReplies={updateCurrentReplies}
            />
          ))}
      </div>
    </div>
  );
}
