import Image from "next/image";
import Link from "next/link";

export default function Loading() {
  return (
    <div className="my-8 flex justify-center w-full">
      <div className="w-2/3">
        <Link
          href={"/forums"}
          className="flex gap-3 cursor-pointer w-fit rounded-[10px] p-1 px-2 hover:bg-[#ebeaea] my-7"
        >
          <Image
            src="/right-arrow.png"
            width={12}
            height={12}
            alt=""
            className="object-contain rotate-180"
          />
          Back to forums
        </Link>

        <div className="flex gap-4 items-center">
          <div className="min-w-[70px] h-[70px] rounded-[100%] bg-[#E9E9E3] relative"></div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col justify-center w-[90%] h-[80px] text-[24px] min-w-[10ch] max-h-[1.5ch] bg-gray-300 rounded-[10px]"></div>
            <div className="flex flex-col justify-center w-[90%] h-[80px] text-[24px] max-w-[7ch] max-h-[1ch] bg-gray-300 rounded-[10px]"></div>
          </div>
        </div>

        <div className="flex gap-4 mt-7">
          <div className="shimmer shimmer-bg shimmer-speed-400 rounded-[10px] bg-[#BECBFF] border border-[#5364A9] text-[#5364A9] font-semibold px-4 py-2 min-w-[85px] min-h-[42px]"></div>
          <div className="shimmer shimmer-bg shimmer-speed-400 rounded-[10px] bg-[#A0F599] border border-[#1F631A] text-[#1F631A] font-semibold px-4 py-2 min-w-[80px] min-h-[42px]"></div>
        </div>

        <div className="shimmer shimmer-bg shimmer-speed-400 mt-7 text-[32px] font-semibold ps-2 max-w-[15ch] min-h-[1.5ch] bg-gray-300 rounded-[10px]"></div>
        <div className="shimmer shimmer-bg shimmer-speed-400 mt-10 p-2 text-[24px] w-full field-sizing-content min-h-[500px] bg-gray-300 rounded-[10px]"></div>

        <div>
          <input className="w-full h-[60px] text-[24px] p-5 outline-0 rounded-[10px] bg-[#F3F3F3] mt-8" />
          <button className="shimmer shimmer-bg shimmer-speed-400 min-h-[1.5ch] text-[20px] h-[46px] w-[136px] block mt-2 ms-auto rounded-[10px] border border-[#DEDEDE] px-4 py-2"></button>
        </div>

        <div className="mt-5">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-[10px]">
              <div className="flex gap-4 items-center mt-5">
                <div className="shimmer shimmer-bg shimmer-speed-400 min-w-[40px] h-[40px] rounded-[100%] bg-[#E9E9E3] relative"></div>
                <div className="shimmer shimmer-bg shimmer-speed-400 flex gap-1 items-center w-[90%] text-[20px] max-w-[10ch] min-h-[1.5ch] bg-gray-300 rounded-[10px]"></div>
              </div>

              <div className="shimmer shimmer-bg shimmer-speed-400 text-[20px] ms-14 mt-3 min-h-[100px] bg-gray-300 rounded-[10px]"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
