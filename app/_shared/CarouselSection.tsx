import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import React from "react";
import CarouselCard from "./CarouselCard";
import { CarouselData } from "@/data/CarouselData";

function CarouselSection() {
  return (
    <div className="mt-5 mx-50 items-center justify-center flex-1">
      <Carousel>
        <CarouselContent>
          {CarouselData.map((place) => (
            <CarouselItem key={place.id} className="md:basis-1/2 lg:basis-1/3">
              <CarouselCard
                id={place.id}
                name={place.name}
                description={place.description}
                image={place.image}
                rating={place.rating}
                budget={place.budget}
                season={place.season}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="bg-primary animate-pulse"/>
      <CarouselNext className="bg-primary animate-pulse"/>
      </Carousel>
    </div>
  );
}

export default CarouselSection;
