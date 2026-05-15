import CTAOne from "./ui/components/LandingPage/CTAOne";
import LandingArtSection from "./ui/components/LandingPage/LandingArtSection";
import FAQSection from "./ui/components/LandingPage/FAQSection";
import SubHeroSection from "./ui/components/LandingPage/SubHeroSection";
import CTATwo from "./ui/components/LandingPage/CTATwo";
import LandingFooter from "./ui/components/LandingPage/LandingFooter";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <CTAOne />
      <LandingArtSection />
      <SubHeroSection />
      <FAQSection />
      <CTATwo />
      <LandingFooter />
    </div>
  );
}
