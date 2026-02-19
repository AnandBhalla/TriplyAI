"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";

import StartChat from "./StartChat";
import Source from "./Source";
import Destination from "./Destination";
import People from "./People";
import Budgets from "./Budgets";
import TotalPassenger from "./TotalPassenger";
import CountDays from "./CountDays";
import Request from "./Request";

import { TripData } from "@/types/TripData";

interface ChatsProps {
  onInfoReady: (ready: boolean, info: TripData) => void;
}

function Chats({ onInfoReady }: ChatsProps) {
  const params = useParams();
  const travelId = params?.travelId as string;

  const [currStep, setCurrStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [tripInfo, setTripInfo] = useState<TripData>({
    source: "",
    destination: "",
    people: "",
    travelers: 1,
    budget: "",
    duration: 3,
    specialRequests: "",
  });

  const updateData = (data: Partial<TripData>) => {
    const updated = { ...tripInfo, ...data };
    setTripInfo(updated);
    setCurrStep((prev) => prev + 1);

    if (currStep === 7 && !submitted) {
      setSubmitted(true);
      onInfoReady(true, updated);
    }
  };

  return (
    <>
    {!submitted && 
    <div className="bg-primary/20 h-[80vh] overflow-auto w-210 ml-10 p-5 rounded-2xl shadow flex flex-col gap-5">
      {currStep >= 0 && <StartChat onNext={() => setCurrStep(1)} step={currStep} />}
      {currStep >= 1 && <Source onNext={(v: string) => updateData({ source: v })} step={currStep} />}
      {currStep >= 2 && <Destination onNext={(v: string) => updateData({ destination: v })} step={currStep} />}
      {currStep >= 3 && <People onNext={(v: string) => updateData({ people: v })} step={currStep} />}
      {currStep >= 4 && <TotalPassenger onNext={(v: number) => updateData({ travelers: v })} step={currStep} />}
      {currStep >= 5 && <Budgets onNext={(v: string) => updateData({ budget: v })} step={currStep} />}
      {currStep >= 6 && <CountDays onNext={(v: number) => updateData({ duration: v })} step={currStep} />}
      {currStep >= 7 && <Request onNext={(v: string) => updateData({ specialRequests: v })} step={currStep} />}
    </div>} 
    </>

   

  );
}

export default Chats;
