export default function ForumFilter() {
  return (
    <div className="flex w-full justify-between mt-4">
      <div className="flex gap-4">
        <button className="bg-[#E2E2E2] rounded-[10px] p-2 cursor-pointer">
          New
        </button>
        <button className="rounded-[10px] p-2 hover:bg-[#E2E2E2] cursor-pointer">
          Popular
        </button>
      </div>

      <div className="flex gap-5">
        <div className="flex items-center gap-2">
          <label htmlFor="language">Language :</label>
          <select name="language" id="language" defaultValue={"all"}>
            <option value="all">All</option>
            <option value="c">C</option>
            <option value="java">Java</option>
            <option value="python">Python</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="type">Type :</label>
          <select name="language" id="language" defaultValue={"all"}>
            <option value="all">All</option>
            <option value="guide">Guide</option>
            <option value="error">Error</option>
            <option value="discussion">Discussion</option>
            <option value="question">Question</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
    </div>
  );
}
