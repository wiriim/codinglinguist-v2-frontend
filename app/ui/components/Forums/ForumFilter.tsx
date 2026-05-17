export default function ForumFilter() {
  return (
    <div className="border border-[#DEDEDE] rounded-[30px] p-8 my-8">
      <div>
        <div className="text-[24px]">Programming Languages</div>
        <div className="flex flex-wrap gap-5 justify-around items-center p-3 bg-[#F3F3F3] rounded-[10px] my-3 text-[20px]">
          <div className="cursor-pointer bg-white shadow-md rounded-[10px] px-5 py-1">
            All
          </div>
          <div className="cursor-pointer">C</div>
          <div className="cursor-pointer">Java</div>
          <div className="cursor-pointer">Python</div>
        </div>
      </div>
      <div>
        <div className="text-[24px]">Post Type</div>
        <div className="flex flex-wrap gap-5 justify-around items-center p-3 bg-[#F3F3F3] rounded-[10px] my-3 text-[20px]">
          <div className="cursor-pointer bg-white shadow-md rounded-[10px] px-5 py-1">
            All
          </div>
          <div className="cursor-pointer">Error</div>
          <div className="cursor-pointer">Question</div>
          <div className="cursor-pointer">Other</div>
          <div className="cursor-pointer">Guide</div>
          <div className="cursor-pointer">Discussion</div>
        </div>
      </div>
      <div>
        <div className="text-[24px]">Sort By</div>
        <div className="flex flex-wrap gap-5 justify-around items-center p-3 bg-[#F3F3F3] rounded-[10px] my-3 text-[20px]">
          <div className="cursor-pointer bg-white shadow-md rounded-[10px] px-5 py-1">
            New
          </div>
          <div className="cursor-pointer">Old</div>
          <div className="cursor-pointer">Most Popular</div>
          <div className="cursor-pointer">Least Popular</div>
        </div>
      </div>
    </div>
  );
}
