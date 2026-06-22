import Image from "next/image";

export default function ProgressSkeleton() {
  return (
    <div className="my-8 flex flex-col items-center">
      <div className="w-[80vw]">
        <div className="my-15 lg:flex gap-30">
          <Image src={"/c.png"} width={120} height={120} alt="C Logo" />

          <div className="flex flex-col w-full">
            <div className="flex flex-col w-full">
              <div className="text-[#877C7C]">20 Levels</div>
              <div className="shimmer shimmer-bg shimmer-speed-400 border rounded-[10px] w-full h-[99px] flex"></div>
            </div>
          </div>
        </div>

        <div className="my-15 lg:flex gap-30">
          <Image
            src={"/python.png"}
            width={125}
            height={125}
            alt="Python Logo"
          />
          <div className="flex flex-col w-full">
            <div className="flex flex-col w-full">
              <div className="text-[#877C7C]">20 Levels</div>
              <div className="shimmer shimmer-bg shimmer-speed-400 border rounded-[10px] w-full h-[99px] flex"></div>
            </div>
          </div>
        </div>

        <div className="my-15 lg:flex gap-30">
          <Image src={"/java.png"} width={135} height={135} alt="Java Logo" />
          <div className="flex flex-col w-full">
            <div className="text-[#877C7C]">20 Levels</div>
            <div className="shimmer shimmer-bg shimmer-speed-400 border rounded-[10px] w-full h-[99px] flex"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
