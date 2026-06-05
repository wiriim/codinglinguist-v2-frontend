"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const backendServer = process.env.NEXT_PUBLIC_BACKEND_SERVER;

export default function CommentCreate({ forumId }: { forumId: string }) {
  const { data: session } = useSession();
  const router = useRouter();

  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleComment() {
    if (!session?.user) {
      router.push("/login");
    } else if (!content) {
      setError("Content is empty");
    } else {
      const response = await fetch(
        `${backendServer}/forums/${forumId}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content,
            userId: session!.user.id,
          }),
        }
      );

      if (!response.ok) {
        setError(response.statusText);
        setSuccess("");
      } else {
        setSuccess("Comment created");
        setError("");
        router.refresh();
      }
    }
  }

  return (
    <div>
      <input
        className="w-full h-[60px] text-[24px] p-5 outline-0 rounded-[10px] bg-[#F3F3F3] mt-8"
        name="title"
        placeholder="Join the conversation"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        onClick={handleComment}
        className="text-[20px] w-fit mt-2 ms-auto rounded-[10px] border border-[#DEDEDE] px-4 py-2 hover:bg-black hover:text-white flex justify-center items-center cursor-pointer"
      >
        Comment
      </button>
      {error && <div className="text-red-500 mt-1">{error}</div>}
      {success && <div className="text-green-500 mt-1">{success}</div>}
    </div>
  );
}
