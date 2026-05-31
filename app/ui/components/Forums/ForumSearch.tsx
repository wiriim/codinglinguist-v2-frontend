import Image from "next/image";

export default function ForumSearch() {
  return (
    <div className="relative w-1/3 border rounded-[10px]">
        <span><Image src="/search.png" width={20} height={20} alt="search" className="absolute top-4.5 left-4.5"/></span>
        <input className="w-full bg-[#F3F3F3] p-4 pl-14 rounded-[10px] text-[#877C7C] text-[16px]" placeholder="Search posts" />
    </div>
  );
}
