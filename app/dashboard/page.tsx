import { courseDatas } from "../lib/courses-data";
import DashboardCard from "../ui/components/Dashboard/DashboardCard";

export default async function Dashboard() {
  return (
    <div className="flex flex-col w-full items-center mt-8">
      <h1 className="text-[36px]">Hello, William</h1>
      <p className="text-[#877C7C] text-[24px] my-4">Ready to learn?</p>
      <div className="bg-[#E9E9E3] rounded-[100%] w-[190px] h-[190px]"></div>

      <div className="flex flex-wrap justify-center gap-12 mt-20">
        {courseDatas.map((data, i) => <DashboardCard key={i} data={data}/>)}
      </div>
    </div>
  );
}
