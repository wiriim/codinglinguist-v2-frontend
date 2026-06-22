export default function ForumCardSkeleton() {
  return (
    <div className="w-full">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="shimmer shimmer-bg shimmer-speed-400 bg-[#E9E9E3] flex flex-col border border-[#DEDEDE] rounded-[10px] p-8 my-8 shadow cursor-pointer hover:scale-101 hover:shadow-lg transition delay-1 min-h-[232px]"
        >
          <div className="sm:flex gap-5 justify-between items-center">
            <div className="shimmer shimmer-bg shimmer-speed-400 w-[65px] min-w-[65px] h-[65px] rounded-[100%] bg-[#E9E9E3] relative">
            </div>

            <div className="flex flex-col gap-2 justify-center w-[90%] h-[80px] text-[24px]">
              <div className="shimmer shimmer-bg shimmer-speed-400 w-fit min-w-[10ch] min-h-[1ch] rounded-[10px] text-ellipsis overflow-hidden text-nowrap">
              </div>
              <div className="shimmer shimmer-bg shimmer-speed-400 w-fit min-w-[6ch] min-h-[1ch] rounded-[10px] text-ellipsis overflow-hidden text-nowrap">
              </div>
            </div>

            <div className="flex gap-4 mt-5">
              <div className="shimmer shimmer-bg shimmer-speed-400 rounded-[10px] bg-[#BECBFF] border border-[#5364A9] text-[#5364A9] font-semibold px-4 py-2 min-w-[85px] min-h-[42px]">
              </div>
              <div className="shimmer shimmer-bg shimmer-speed-400 rounded-[10px] bg-[#A0F599] border border-[#1F631A] text-[#1F631A] font-semibold px-4 py-2 min-w-[80px] min-h-[42px]">
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
