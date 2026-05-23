import Image from "next/image";

export default function ForumCreate() {
  return (
    <div className="flex flex-col border border-[#DEDEDE] rounded-[15px] h-[225px] p-8">
      <div className="flex gap-5">
        <div className="w-[80px] h-[80px] rounded-[100%] bg-[#E9E9E3]"></div>
        <input
          className="w-[90%] h-[80px] rounded-[10px] bg-[#F3F3F3] text-[24px] p-5"
          placeholder="What's Up ?"
        />
      </div>
      <div className="flex justify-between mt-auto">
        <div className="flex gap-2 items-center text-[24px] ms-12 cursor-pointer">
          <span>
            <Image src="/image-icon.png" width={25} height={25} alt="" />
          </span>
          Image
        </div>
        <div className="text-[24px] rounded-[15px] border border-[#DEDEDE] w-[150px] h-[50px] flex justify-center items-center cursor-pointer">
          Publish
        </div>
      </div>
    </div>
  );
}
