"use client";

import React, { useEffect, useState } from "react";
import Header from "@/app/_shared/Header";
import axios from "axios";
import TripCard from "./_shared/TripCard";

function Page() {
  const [tripsData, setTripsData] = useState<any[]>([]);

  const getTripData = async () => {
    try {
      const response = await axios.get("/api/travel");
      setTripsData(response.data);
    } catch (error) {
      console.error("Error fetching trips:", error);
    }
  };

  useEffect(() => {
    getTripData();
  }, []);

  return (
    <div>
      <Header />
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {tripsData.map((trip) => (
        <TripCard key={trip.id} trip={trip} />
      ))}
</div>
  

    </div>
  );
}

export default Page;