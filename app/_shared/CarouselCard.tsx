import React from "react";
import { Star } from "lucide-react";

interface CarouselCardProps {
  id: number;
  name: string;
  description: string;
  image: string;
  rating: number;
  budget: string;
  season: string;
  aiRecommended?: boolean;
}

const CarouselCard = ({
  name,
  description,
  image,
  rating,
  budget,
  season,
  aiRecommended,
}: CarouselCardProps) => {
  return (
    <div className="relative w-70 h-65 flex-shrink-0 rounded-xl overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105 cursor-pointer">
      <img src={image} alt={name} className="w-full h-80 object-cover" />

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 flex flex-col justify-end">
        <h3 className="text-white text-lg font-semibold">{name}</h3>

        <p className="text-white/80 text-sm mt-1 line-clamp-2">{description}</p>

        <div className="flex items-center text-white/80 text-xs mt-2 space-x-2">
          <div className="flex items-center">
            <Star size={14} className="mr-1 fill-yellow-400 text-yellow-400" />{" "}
            {rating}
          </div>
          <div>💰 {budget}</div>
          {season && <div>☀ {season}</div>}
        </div>
      </div>

      {aiRecommended && (
        <div className="absolute top-2 right-2 bg-white/20 backdrop-blur-md text-white text-xs px-2 py-0.5 rounded-full font-medium border border-white/30">
          AI Recommended
        </div>
      )}
    </div>
  );
};

export default CarouselCard;
