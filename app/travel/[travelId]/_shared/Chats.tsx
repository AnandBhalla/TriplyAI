"use client";

import React, { useState } from "react";
import StartChat from "./StartChat";
import Source from "./Source";
import Destination from "./Destination";
import People from "./People";
import Budgets from "./Budgets";
import TotalPassenger from "./TotalPassenger";
import CountDays from "./CountDays";
import Request from "./Request";
import { TripData } from "@/types/TripData";

function Chats() {
  const [currStep, setCurrStep] = useState(0);

  const [tripInfo, setTripInfo] = useState<TripData>({
    source: "",
    destination: "",
    people: "",
    travelers: 1,
    budget: "",
    duration: 3,
    specialRequests: "",
  });

  const updateData = (newData: Partial<TripData>) => {
    setTripInfo((prev) => ({ ...prev, ...newData }));
    setCurrStep((prev) => prev + 1);
  };

  return (
    <div className="bg-primary/10 h-[80vh] overflow-auto  w-210 ml-10 p-5 rounded-2xl shadow flex flex-col gap-5">
       
        {currStep >= 0 && (
        <StartChat onNext={() => setCurrStep(1)} step={currStep} />
      )}

     {currStep >= 1 && (
        <Source onNext={(val: string) => updateData({ source: val })} step={currStep} />
      )}
      
      {currStep >= 2 && (
        <Destination onNext={(val: string) => updateData({ destination: val })} step={currStep} />
      )}
      
      {currStep >= 3 && (
        <People onNext={(val: string) => updateData({ people: val })} step={currStep} />
      )}
      
      {currStep >= 4 && (
        <TotalPassenger onNext={(val: number) => updateData({ travelers: val })} step={currStep} />
      )}
      
      {currStep >= 5 && (
        <Budgets onNext={(val: string) => updateData({ budget: val })} step={currStep} />
      )}
      
      {currStep >= 6 && (
        <CountDays onNext={(val: number) => updateData({ duration: val })} step={currStep} />
      )}
      
      {currStep >= 7 && (
        <Request onNext={(val: string) => updateData({ specialRequests: val })} step={currStep} />
      )}

      {/* {currStep >= 8 && (
       api call
      )} */}
    </div>
  );
}

export default Chats;
