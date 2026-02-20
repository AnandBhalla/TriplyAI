"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  trip: any;
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function capitalize(str: string) {
  return str?.charAt(0).toUpperCase() + str?.slice(1).toLowerCase();
}

function TripCard({ trip }: Props) {
  const router = useRouter();
  const [imgSrc, setImgSrc] = useState(trip.tripdata.tovisit[0].imageurl);
  return (
    <div className="w-80 rounded-2xl border border-primary/40 shadow-md hover:shadow-xl transition-all duration-300 p-4 m-5 bg-white">
      <Image
        src={imgSrc}
        width={400}
        height={250}
        alt="Trip"
        className="w-full h-44 object-cover rounded-xl mb-3"
        onError={() => setImgSrc("/fallback.jpg")}
      />

      <h2 className="text-lg font-semibold mb-2 text-center">
        {capitalize(trip.source)} → {capitalize(trip.destination)}
      </h2>

      <div className="text-sm space-y-1 text-gray-700">
        <p>
          <span className="font-medium">Duration:</span> {trip.duration} Days
        </p>
        <p>
          <span className="font-medium">Travelers:</span> {trip.travelers} (
          {trip.people})
        </p>
        <p>
          <span className="font-medium">Budget:</span> {trip.budget}
        </p>
        <p>
          <span className="font-medium">Special Request:</span>{" "}
          {trip.specialRequests}
        </p>
        <p className="text-xs text-gray-500 mt-2">
          Created on {formatDate(trip.createdAt)}
        </p>
      </div>
      <Button
        className="mt-2 cursor-pointer hover:bg-primary/70 hover:text-black"
        onClick={() => router.push(`/travel/${trip.travelId}`)}
      >
        More Details
      </Button>
    </div>
  );
}

export default TripCard;
