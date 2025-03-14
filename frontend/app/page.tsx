import BestApartment from "@/components/landing-page/BestApartment";
import HeroSection from "@/components/landing-page/HeroSection";
import WhyChooseUs from "@/components/landing-page/WhyChooseUs";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col mt-24 max-sm:mt-4 min-h-[70vh]">
      <HeroSection />
      <BestApartment />
      <WhyChooseUs />
      {/* <Button className="h-11">Frontend setup is done 😜</Button> */}
    </div>
  );
}
