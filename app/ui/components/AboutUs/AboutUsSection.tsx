import Image from "next/image";

export default function AboutUsSection() {
  return (
    <div className="mt-50 w-full flex justify-center">
      <div className="w-[85%] flex flex-col">
        <div className="flex gap-2 font-semibold">
          <div className="w-[21px] h-[21px] rounded-[100%] bg-[#62E959]"></div>
          ABOUT US
        </div>

        <div className="mt-2 text-[46px] lg:text-[96px] text-start">
          HOW WE STARTED, <br /> AND OUR <br /> MOTIVATION
        </div>

        <div className="flex mt-18 gap-7">
          <div className="w-1/3 min-w-[400px] min-h-[450px] justify-center hidden md:flex">
            <div className="w-[283px] h-[344px] lg:w-[383px] lg:h-[444px] rounded-[10px] bg-[#88F95B] rotate-[6deg] absolute"></div>
            <div className="w-[283px] h-[344px] lg:w-[383px] lg:h-[444px] rounded-[10px] bg-[#76F4FF] -rotate-[6deg] absolute"></div>
            <Image
              src={"/stock-team.jpg"}
              width={383}
              height={444}
              alt="stock teamwork image"
              className="rounded-[10px] absolute w-[283px] h-[344px] lg:w-[383px] lg:h-[444px] object-cover z-2"
            />
          </div>

          <div className="w-2/3 text-[24px] lg:text-[46px] text-start">
            WE NOTICED A LOT OF THE AVAILABLE RESOURCES ON LEARNING PROGRAMMING
            IS BLAND, WHILST <strong>&nbsp; CODING SHOULDN’T BE BORING.</strong>
            <span className="text-[#847E7E]">
              &nbsp; IN HOPES OF MORE PEOPLE LEARN TO CODE, WE CREATED
              CODINGLINGUIST.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
