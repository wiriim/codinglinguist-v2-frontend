export default function ProfileCardSkeleton() {
  return (
    <div className="rounded-[10px] border border-[#DEDEDE] min-h-[560px] w-[80vw] relative">
      <div className="shimmer shimmer-bg shimmer-speed-400 bg-gray-500 h-[220px] rounded-t-[10px] w-full relative"></div>
      <div className="-mt-20 flex items-center">
        <div className="bg-[#D9D9D9] h-[3px] flex-1 max-w-[100px]"></div>
        <div className="shimmer shimmer-bg shimmer-speed-400 rounded-[100%] bg-[#E9E9E3] min-w-[160px] h-[160px] relative"></div>
        <div className="bg-[#D9D9D9] h-[3px] flex-1"></div>
      </div>

      <h1 className="shimmer shimmer-bg shimmer-speed-400 rounded-[10px] bg-[#cacaca] mt-5 text-[36px] ml-15 lg:ml-25 max-w-[10ch] min-h-[2ch]"></h1>
      <h2 className="shimmer shimmer-bg shimmer-speed-400 rounded-[10px] bg-[#cacaca] mt-5 text-[36px] ml-15 lg:ml-25 max-w-[6ch] min-h-[1ch]"></h2>
    </div>
  );
}
