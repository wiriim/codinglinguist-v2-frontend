import { User } from "@/app/lib/definitions";
import ForumCard from "@/app/ui/components/Forums/ForumCard";
import Link from "next/link";

const backendServer = process.env.BACKEND_SERVER;

export default async function Profile(props: {
  params: Promise<{ username: string }>;
}) {
  const params = await props.params;
  let username = params.username;

  const user: User = await (
    await fetch(`${backendServer}/users/${username}`)
  ).json();

  const { forums } = user;

  return (
    <div className="my-8 flex flex-col items-center">
      <div className="rounded-[10px] border border-[#DEDEDE] min-h-[560px] w-[80vw]">
        <div className="bg-cyan-700 h-[220px] rounded-t-[10px] w-full"></div>
        <div className="-mt-20 flex items-center">
          <div className="bg-[#D9D9D9] h-[3px] flex-1 max-w-[100px]"></div>
          <div className="rounded-[100%] bg-[#E9E9E3] min-w-[160px] h-[160px]"></div>
          <div className="bg-[#D9D9D9] h-[3px]  flex-1"></div>
        </div>
        <h1 className="text-[36px] ml-25 my-5">{username}</h1>
        <h1 className="text-[24px] text-[#474747] ml-25 my-5">
          Loving to learn stuff!
        </h1>
      </div>

      <div className="flex gap-8 mt-8 w-[80vw]">
        <Link
          href={`/profile/${username}`}
          className="cursor-pointer text-[36px] underline"
        >
          Posts
        </Link>
        <Link
          href={`/profile/${username}/progress`}
          className="cursor-pointer text-[36px]"
        >
          Progress
        </Link>
      </div>

      <div className="w-[80vw]">
        {forums.map((data, i) => (
          <ForumCard key={data.id} data={data} />
        ))}
      </div>
    </div>
  );
}
