import { User } from "@/app/lib/definitions";
import Image from "next/image";
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
          className="cursor-pointer text-[36px]"
        >
          Posts
        </Link>
        <Link
          href={`/profile/${username}/progress`}
          className="cursor-pointer text-[36px] underline"
        >
          Progress
        </Link>
      </div>

      <div className="w-[80vw]">
        <div className="my-15 flex gap-30">
            <Image src={"/c.png"} width={120} height={120} alt="C Logo" />

            <div className="flex flex-col w-full">
              <div className="text-[#877C7C]">20 Levels | 20%</div>
              <div className="border border-[#877C7C] rounded-[10px] w-full h-full"></div>
            </div>
        </div>
        
        <div className="my-15 flex gap-30">
            <Image src={"/python.png"} width={125} height={125} alt="Python Logo" />
            <div className="flex flex-col w-full">
              <div className="text-[#877C7C]">20 Levels | 20%</div>
              <div className="border border-[#877C7C] rounded-[10px] w-full h-full"></div>
            </div>
        </div>
        
        <div className="my-15 flex gap-30">
            <Image src={"/java.png"} width={135} height={135} alt="Java Logo" />
            <div className="flex flex-col w-full">
              <div className="text-[#877C7C]">20 Levels | 20%</div>
              <div className="border border-[#877C7C] rounded-[10px] w-full h-full"></div>
            </div>
        </div>
      </div>
    </div>
  );
}
