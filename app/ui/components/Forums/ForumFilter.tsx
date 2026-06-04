export default function ForumFilter() {
  return (
    <div className="flex flex-wrap gap-5 w-full justify-between mt-4">
      <div className="flex flex-wrap gap-4">
        <button className="bg-[#E2E2E2] rounded-[10px] p-2 cursor-pointer">
          New
        </button>
        <button className="rounded-[10px] p-2 hover:bg-[#E2E2E2] cursor-pointer">
          Popular
        </button>
      </div>

      <div className="flex flex-wrap gap-5">
        <div className="flex items-center gap-2">
          <label htmlFor="language">Language :</label>
          <select name="language" id="language" defaultValue={"all"}>
            <option value="all">All</option>
            <option value="1">C</option>
            <option value="2">Python</option>
            <option value="3">Java</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="type">Type :</label>
          <select name="language" id="language" defaultValue={"all"}>
            <option value="all">All</option>
            <option value="1">Error</option>
            <option value="2">Question</option>
            <option value="3">Discussion</option>
            <option value="4">Guide</option>
            <option value="5">Other</option>
          </select>
        </div>
      </div>
    </div>
  );
}
