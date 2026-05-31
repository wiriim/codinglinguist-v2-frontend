"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import type { Reply } from "@/app/lib/definitions";
import Image from "next/image";
import { useState } from "react";

const backendServer = process.env.NEXT_PUBLIC_BACKEND_SERVER;

export default function Reply({ data, commentId }: { data: Reply, commentId: number }) {
  const { data: session } = useSession();
  const router = useRouter();

  const { id, content, createdAt, _count, user } = data;

  const [reply, setReply] = useState(false);
  const [replyContent, setReplyContent] = useState(`@${user.username} `);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  async function handleReply() {
    if (!session?.user) {
      router.push("/login");
    } else if (!replyContent) {
      setError("Reply is empty");
    } else {
      const response = await fetch(`${backendServer}/comments/${commentId}/replies`, {
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
        setReply(false);
        router.refresh();
      }
    }
  }

  return (
    <div className="my-3">
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
    </div>
  );
}
