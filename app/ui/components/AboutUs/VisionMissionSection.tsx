import Image from "next/image";

export default function VisionMissionSection() {
  return (
    <div className="mt-30 w-full flex justify-center">
      <div className="w-[85%] flex flex-col">
        <div className="flex gap-2 font-semibold">
          <div className="w-[21px] h-[21px] rounded-[100%] bg-[#62E959]"></div>
          OUR MISSION/VISION
        </div>

        <div className="mt-2 text-[46px] lg:text-[96px] text-start">
          DRIVEN BY
          <span className="text-[#847E7E]">
            &nbsp; PURPOSE, <br /> GUIDED BY VISION
          </span>
        </div>

        <div className="flex mt-18 gap-7">
          <div className="w-1/3 hidden md:flex justify-center">
            <Image
              src={"/pillar-of-creation.jpg"}
              width={504}
              height={873}
              alt="pillar of creation image"
              className="rounded-[10px] max-h-[700px] object-cover"
            />
          </div>

          <div className="w-2/3 text-[24px] lg:text-[46px] text-start flex flex-col gap-10 items-center justify-center">
            <div className="max-w-[800px]">
              OUR MISSION IS TO MAKE A LEARNING TO CODE FUN BY
              <span className="text-[#847E7E]">
                &nbsp; INTEGRATING GAMIFICATION
              </span>
            </div>

            <div className="max-w-[800px]">
              OUR VISION IS TO BECOME A PILLAR OF CREATION
              <span className="text-[#847E7E]">
                &nbsp;TO A NEW GENERATION OF CODERS
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
