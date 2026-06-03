import LandingImage from "./LandingImage";

export default function LandingArtSection() {
  return (
    <div className="mt-55 w-full flex justify-center relative h-[700px] lg:h-[1300px]">
      <div className="layer1 w-[80vw] h-[600px] lg:h-[1146px] rounded-[45px] bg-[#E9EF48] absolute"></div>
      <div className="layer1 w-[80vw] h-[600px] lg:h-[1146px] rounded-[45px] bg-[#F56EDF] absolute rotate-[-3.33deg]"></div>
      <LandingImage />
    </div>
  );
}
