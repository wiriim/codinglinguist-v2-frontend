import { auth } from "@/auth";
import { courseDatas } from "../lib/courses-data";
import DashboardCard from "../ui/components/Dashboard/DashboardCard";
import Image from "next/image";
import { Progress } from "../lib/definitions";

const backendServer = process.env.BACKEND_SERVER;

export default async function Dashboard() {
  const session = await auth();
  
  const progress: Progress = await (
    await fetch(`${backendServer}/users/${session?.user.id}/progress`)
  ).json();

  return (
    <div className="flex flex-col w-full items-center mt-8">
      <h1 className="text-[36px]">Hello, {session?.user?.username}</h1>
      <p className="text-[#877C7C] text-[24px] my-4">Ready to learn?</p>

      <div className="bg-[#E9E9E3] rounded-[100%] w-[190px] h-[190px] relative">
        {session?.user.picture && (
          <Image
            src={session.user.picture}
            fill
            alt="profile picture"
            className="rounded-[100%] bg-[#E9E9E3] w-[190px] h-[190px] object-cover"
          />
        )}
      </div>

      <div className="flex flex-wrap justify-center gap-12 mt-20">
        {courseDatas.map((data, i) => (
          <DashboardCard key={i} data={data} progress={progress} />
        ))}
      </div>
    </div>
  );
}
