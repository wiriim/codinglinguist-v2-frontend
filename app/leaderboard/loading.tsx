import clsx from "clsx";

export default function Loading() {
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-wrap gap-3 justify-around items-center w-[80vw] min-h-[400px] mt-8 relative">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="shimmer shimmer-bg shimmer-speed-400 flex flex-col w-[456px] h-[361px] rounded-[10px] border border-[#DEDEDE]"
          >
            <div
              className={clsx(
                "w-full h-2/5 rounded-t-[10px] font-bold relative z-0 ",
                {
                  "bg-linear-to-r from-[#A9FFC7] to-[#FFFF8B]": i == 0,
                  "bg-linear-to-r from-[#FF98A7] to-[#EDEDED]": i == 1,
                  "bg-linear-to-r from-[#FFA9FB] to-[#71DCFF]": i == 2,
                }
              )}
            ></div>
            <div className="shimmer shimmer-bg shimmer-speed-400 bg-[#E9E9E3] -mt-15 ml-10 rounded-[100%] w-[130px] h-[130px] z-1 relative"></div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3 w-[80vw] min-h-[400px] my-8 relative">
        <div className="flex justify-between w-full items-start text-[32px]">
          <h1>Rank</h1>
          <h1>Name</h1>
          <h1>Points</h1>
        </div>
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="shimmer shimmer-bg shimmer-speed-400 border border-2 w-full h-[108px] rounded-[10px] flex justify-between items-center p-3 md:p-8 text-[24px] lg:text-[36px]"
          ></div>
        ))}
      </div>
    </div>
  );
}
