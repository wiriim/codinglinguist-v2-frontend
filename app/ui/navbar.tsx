export default function Navbar() {
  return (
    <div className="flex p-8 justify-between">
      <div className="font-bold text-[32px] cursor-pointer">CodingLinguist</div>
      <div className="flex rounded-[15px] justify-around items-center text-[20px] bg-[#F1F1F1] w-2/5 h-[50px]">
        <div className="cursor-pointer">Courses</div>
        <div className="cursor-pointer">Forums</div>
        <div className="cursor-pointer">About us</div>
        <div className="cursor-pointer">Leaderboard</div>
      </div>
      <div className="flex gap-12 text-[20px]">
        <div className="h-[50px] flex justify-center items-center cursor-pointer">Login</div>
        <div className="rounded-[15px] bg-black text-white w-[165px] h-[50px] flex justify-center items-center cursor-pointer">
          Start Now
        </div>
      </div>
    </div>
  );
}
