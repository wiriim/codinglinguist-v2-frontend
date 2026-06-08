"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import type { Forum } from "@/app/lib/definitions";

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
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  function handlePosting(e: React.FocusEvent) {
    setPosting(true);
  }
  function handleCancelPosting(e: React.MouseEvent) {
    setTitle("");
    setContent("");
    setImage("");
    setPosting(false);
  }

  async function handleImageInput(e: React.ChangeEvent) {
    setPosting(true);
    const files = (e.target as HTMLInputElement).files;
    if (files && files[0]) {
      setImage(URL.createObjectURL(files[0]));
      setImageFile(files[0]);
    }
  }

  async function handlePublish(e: React.MouseEvent) {
    if (!session?.user) {
      router.push("/login");
    } else if (!title) {
      setError("Title is empty");
    } else if (!content) {
      setError("Content is empty");
    } else {
      const button = e.target as HTMLButtonElement;
      button.disabled = true;
      const response = await fetch(`${backendServer}/forums`, {
        method: "POST",
        body: (() => {
          const data = new FormData();
          data.append("title", title);
          data.append("content", content);
          data.append("userId", session.user.id);
          data.append("email", session.user.email as string);
          data.append("categoryId", category);
          data.append("categoryTypeId", type);
          data.append("image", imageFile as File);
          return data;
        })(),
      });

      if (!response.ok) {
        setError(response.statusText);
      }
      const forum: Forum = await response.json();
      router.push(`/forums/${forum.id}`);
    }
  }

  return (
    <div className="flex flex-col border border-[#DEDEDE] rounded-[10px] min-h-[200px] p-8">
      <div className="flex flex-wrap justify-center gap-5">
        <div className="min-w-[60px] h-[60px] rounded-[100%] bg-[#E9E9E3] relative">
          {session?.user.picture && (
            <Image
              src={session.user.picture}
              fill
              alt="profile picture"
              className="rounded-[100%] bg-[#E9E9E3] w-[60px] h-[60px] object-cover"
            />
          )}
        </div>
        <div
          className="w-[90%] min-h-[60px] rounded-[10px] bg-[#F3F3F3]"
          onFocus={handlePosting}
        >
          <input
            className="w-full h-[60px] lg:text-[24px] p-5 outline-0"
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

              {image && (
                <div className="w-full min-h-[120px] text-[18px] p-5 flex justify-center">
                  <img
                    src={image}
                    alt="post image"
                    className="max-h-[200px] object-contain"
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
      {error && <div className="text-red-500 mt-1 ms-20">{error}</div>}
      <div className="flex flex-wrap gap-5 justify-between mt-7">
        <div className="flex gap-2 items-center text-[20px] ms-5 hover:bg-[#f3f3f3] px-2 ps-4 py-2 rounded-[10px] cursor-pointer">
          <span>
            <Image src="/image-icon.png" width={20} height={20} alt="" />
          </span>

          <label htmlFor="image" className="cursor-pointer">
            Image
          </label>
          <input
            type="file"
            name="image"
            id="image"
            accept=".png, .jpg"
            className="w-0 opacity-0"
            onChange={handleImageInput}
          ></input>
        </div>

        <div className="flex flex-wrap gap-4">
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
            <button
              onClick={handleCancelPosting}
              className="text-[20px] rounded-[10px] border border-red-500 text-red-500 px-4 py-2 hover:bg-red-500 hover:text-white flex justify-center items-center cursor-pointer"
            >
              Cancel
            </button>
          )}
          <button
            onClick={handlePublish}
            className="text-[20px] rounded-[10px] border border-[#DEDEDE] px-4 py-2 hover:bg-black hover:text-white flex justify-center items-center cursor-pointer"
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
}
