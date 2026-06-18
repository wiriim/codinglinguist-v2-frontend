import Image from "next/image";
import type { Forum } from "@/app/lib/definitions";
import { auth } from "@/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

const backendServer = process.env.BACKEND_SERVER;

export default async function EditForum(props: {
  params: Promise<{ forumId: string }>;
  searchParams?: Promise<{
    sort?: string;
  }>;
}) {
  const session = await auth();
  const params = await props.params;
  const forumId = params.forumId;

  const forum: Forum = await (
    await fetch(`${backendServer}/forums/${forumId}`, {
      headers: session?.user?.id
        ? {
            "x-user-id": session.user.id,
          }
        : {},
    })
  ).json();

  if (!session?.user || parseInt(session.user.id) != forum.user.id) {
    redirect("/forums");
  }

  const trailingSpace = forum.image && forum.image.slice(-3) == "%20";
  if (trailingSpace) {
    forum.image = forum.image.slice(0, -3);
  }

  async function handleUpdate(formData: FormData) {
    "use server";
    const response = await fetch(`${backendServer}/forums/${forumId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: forumId,
        title: formData.get("title"),
        content: formData.get("content"),
      }),
    });

    if (!response.ok) {
      throw new Error(`Status ${response.status}: ${response.statusText}`);
    }

    redirect(`/forums/${forumId}`);
  }

  return (
    <div className="my-8 flex justify-center w-full">
      <div className="w-2/3">
        <Link
          href={`/forums/${forumId}`}
          className="flex gap-3 cursor-pointer w-fit rounded-[10px] p-1 px-2 hover:bg-[#ebeaea] my-7"
        >
          <Image
            src="/right-arrow.png"
            width={12}
            height={12}
            alt=""
            className="object-contain rotate-180"
          />
          Back
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
        </div>

        <div className="flex gap-4 mt-7">
          <div className="rounded-[10px] bg-[#BECBFF] border border-[#5364A9] text-[#5364A9] font-semibold px-4 py-2">
            {forum.category.name}
          </div>
          <div className="rounded-[10px] bg-[#A0F599] border border-[#1F631A] text-[#1F631A] font-semibold px-4 py-2">
            {forum.categoryType.name}
          </div>
        </div>

        <form action={handleUpdate}>
          <input
            className="mt-7 text-[32px] font-semibold ps-2 w-full"
            defaultValue={forum.title}
            name="title"
          />
          {forum.image && (
            <div className="w-[300px] h-[300px] relative mx-auto mt-10">
              <Image
                src={forum.image}
                fill
                alt="post image"
                className="object-contain"
              />
            </div>
          )}
          <textarea
            className="mt-10 text-[24px] w-full field-sizing-content p-2"
            defaultValue={forum.content}
            name="content"
          ></textarea>
          <button className="text-[20px] w-fit my-5 ms-auto rounded-[10px] border border-[#DEDEDE] px-4 py-2 hover:bg-black hover:text-white flex justify-center items-center cursor-pointer">
            Edit
          </button>
        </form>
      </div>
    </div>
  );
}
