export default async function Loading() {
  return (
    <div className="flex flex-col items-center w-full my-12">
      
      <div className="border border-[#DEDEDE] rounded-[10px] p-8 px-4 lg:px-12 w-[90vw] lg:w-[80vw]">
        <div className="min-h-[12px]"></div>
        <div
          className={`shimmer shimmer-bg shimmer-speed-400 mt-[1.5rem] bg-muted relative overflow-hidden rounded-xl bg-gray-100 w-[90%] mx-auto min-h-[80px] p-2 shadow-sm`}
        ></div>
        <div
          className={`shimmer shimmer-bg shimmer-speed-400 mt-[1.5rem] bg-muted relative overflow-hidden rounded-xl bg-gray-100 min-h-[400px] p-2 shadow-sm`}
        ></div>
      </div>
    </div>
  );
}
