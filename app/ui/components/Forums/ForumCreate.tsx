"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const backendServer = process.env.NEXT_PUBLIC_BACKEND_SERVER;

export default function ForumCreate() {
  const { data: session } = useSession();
  const router = useRouter();

  const [posting, setPosting] = useState(false);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("1");
  const [type, setType] = useState("1");

  function handlePosting(e: React.FocusEvent) {
    setPosting(true);
  }
  function handleCancelPosting(e: React.MouseEvent) {
    setTitle("");
    setContent("");
    setPosting(false);
  }

  async function handlePublish(e: React.MouseEvent) {
    if (!session?.user) {
      router.push("/login");
    } else if (!title) {
      setError("Title is empty");
    } else if (!content) {
      setError("Content is empty");
    } else {
      const response = await fetch(`${backendServer}/forums`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          userId: session.user.id,
          categoryId: category,
          categoryTypeId: type,
        }),
      });

      if (!response.ok) {
        setError(response.statusText);
      }
    }
  }

  return (
    <div className="flex flex-col border border-[#DEDEDE] rounded-[10px] min-h-[200px] p-8">
      <div className="flex gap-5">
        <div className="w-[60px] h-[60px] rounded-[100%] bg-[#E9E9E3]"></div>
        <div
          className="w-[90%] min-h-[60px] rounded-[10px] bg-[#F3F3F3]"
          onFocus={handlePosting}
        >
          <input
            className="w-full h-[60px] text-[24px] p-5 outline-0"
            name="title"
            placeholder="What's Up ?"
            required
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          {posting && (
            <>
              <div className="h-[1px] w-full bg-[#d1cece] rounded-[10px]"></div>
              <textarea
                name="content"
                id="content"
                className="w-full min-h-[80px] text-[18px] p-5 outline-0"
                placeholder="Your thoughts..."
                onChange={(e) => setContent(e.target.value)}
                value={content}
              ></textarea>
            </>
          )}
        </div>
      </div>
      {error && <div className="text-red-500 mt-1 ms-20">{error}</div>}
      <div className="flex justify-between mt-7">
        <div className="flex gap-2 items-center text-[20px] ms-5 hover:bg-[#f3f3f3] p-2 rounded-[10px] cursor-pointer">
          <span>
            <Image src="/image-icon.png" width={20} height={20} alt="" />
          </span>
          Image
        </div>

        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <label htmlFor="language">Language :</label>
            <select
              name="language"
              id="language"
              defaultValue={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="1">C</option>
              <option value="2">Python</option>
              <option value="3">Java</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="type">Type :</label>
            <select
              name="language"
              id="language"
              defaultValue={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="1">Error</option>
              <option value="2">Question</option>
              <option value="3">Discussion</option>
              <option value="4">Guide</option>
              <option value="5">Other</option>
            </select>
          </div>
        </div>
        <div className="flex gap-4">
          {posting && (
            <div
              onClick={handleCancelPosting}
              className="text-[20px] rounded-[10px] border border-red-500 text-red-500 px-4 py-2 hover:bg-red-500 hover:text-white flex justify-center items-center cursor-pointer"
            >
              Cancel
            </div>
          )}
          <div
            onClick={handlePublish}
            className="text-[20px] rounded-[10px] border border-[#DEDEDE] px-4 py-2 hover:bg-black hover:text-white flex justify-center items-center cursor-pointer"
          >
            Publish
          </div>
        </div>
      </div>
    </div>
  );
}
