import HeroSection from "@/components/hero-section/HeroSection";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex mt-24 max-sm:mt-4 min-h-[70vh]">
      <HeroSection />
      {/* <Button className="h-11">Frontend setup is done 😜</Button> */}
    </div>
  );
}
