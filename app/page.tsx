import Image from "next/image";
import Hero from "./_shared/Hero";
import Header from "./_shared/Header";
import CarouselSection from "./_shared/CarouselSection";
import Howto from "./_shared/Howto";

export default function Home() {
  return (
    <div className="relative min-h-[100svh] overflow-x-hidden">
      <Header/>
      <Hero/>
      <CarouselSection/>
      <Howto/>
    </div>
  );
}
