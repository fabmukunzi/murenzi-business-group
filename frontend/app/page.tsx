import ApartmentGallery from "@/components/landing-page/ApartmentGallery";
import BestApartment from "@/components/landing-page/BestApartment";
import ContactUs from "@/components/landing-page/ContactUs";
import Explore from "@/components/landing-page/Explore";
import HeroSection from "@/components/landing-page/HeroSection";
import WhyChooseUs from "@/components/landing-page/WhyChooseUs";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col mt-24 max-sm:mt-4 min-h-[70vh]">
      <HeroSection />
      <BestApartment />
      <ApartmentGallery />
      <WhyChooseUs />
      <Explore />
      <ContactUs />
      {/* <Button className="h-11">Frontend setup is done 😜</Button> */}
    </div>
  );
}
