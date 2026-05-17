import Image from "next/image";

export default function ForumSearch() {
  return (
    <div className="border border-[#DEDEDE] rounded-[30px] p-7 relative">
        <span><Image src="/search.png" width={20} height={20} alt="search" className="absolute top-11.5 left-12"/></span>
      <input className="w-full bg-[#F3F3F3] p-4 pl-14 rounded-[10px] text-[#877C7C] text-[16px]" placeholder="Search posts" />
    </div>
  );
}
