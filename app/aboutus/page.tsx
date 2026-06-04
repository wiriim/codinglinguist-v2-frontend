import Image from "next/image";
import ImageCarousel from "../ui/components/AboutUs/ImageCarousel";
import AboutUsSection from "../ui/components/AboutUs/AboutUsSection";
import VisionMissionSection from "../ui/components/AboutUs/VisionMissionSection";

export default function AboutUs() {
  return (
    <div className="flex flex-col items-center text-center my-8">
      <h1 className="text-[64px] lg:text-[96px]">About Us</h1>
      <h2 className="text-[24px] lg:text-[36px] max-w-[80%] mt-6">
        CodingLinguist is a web-based programming language learning platform
        designed to make coding education more interactive and engaging.
      </h2>

      <ImageCarousel />

      <AboutUsSection />

      <div className="w-[80%] h-[3px] bg-[#D9D9D9] mt-40"></div>

      <VisionMissionSection />
    </div>
  );
}
