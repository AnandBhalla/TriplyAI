"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { ClipLoader } from "react-spinners";

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

  const defaultTripInfo: TripData = {
    source: "",
    destination: "",
    people: "",
    travelers: 1,
    budget: "",
    duration: 3,
    specialRequests: "",
  };

  const [currStep, setCurrStep] = useState<number>(0);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [tripInfo, setTripInfo] = useState<TripData>(defaultTripInfo);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!travelId) return;

    const fetchTravelData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/travel/${travelId}`);

        if (!res.ok) {
          setLoading(false);
          return;
        }

        const response = await res.json();
        if (response.success && response.data) {
          const trip = response.data;

          const formatted: TripData = {
            source: trip.source,
            destination: trip.destination,
            people: trip.people,
            travelers: trip.travelers,
            budget: trip.budget,
            duration: trip.duration,
            specialRequests: trip.specialRequests,
          };

          setTripInfo(formatted);
          setSubmitted(true);
          setCurrStep(7);
          onInfoReady(true, formatted);
        } else {
          const savedStep = localStorage.getItem(`tripStep-${travelId}`);
          const savedSubmitted = localStorage.getItem(
            `tripSubmitted-${travelId}`,
          );
          const savedInfo = localStorage.getItem(`tripInfo-${travelId}`);

          if (savedStep) setCurrStep(Number(savedStep));
          if (savedSubmitted) setSubmitted(savedSubmitted === "true");
          if (savedInfo) setTripInfo(JSON.parse(savedInfo));
        }
      } catch (err) {
        console.error("Error fetching travel data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTravelData();
  }, [travelId]);

  useEffect(() => {
    if (!travelId || submitted) return;

    localStorage.setItem(`tripStep-${travelId}`, currStep.toString());
    localStorage.setItem(`tripSubmitted-${travelId}`, submitted.toString());
    localStorage.setItem(`tripInfo-${travelId}`, JSON.stringify(tripInfo));
  }, [currStep, submitted, tripInfo, travelId]);

  const updateData = (data: Partial<TripData>) => {
    const updated = { ...tripInfo, ...data };
    setTripInfo(updated);

    if (currStep < 7) {
      setCurrStep((prev) => prev + 1);
    } else if (!submitted) {
      setSubmitted(true);
      onInfoReady(true, updated);
    }
  };

  if (loading) {
    return (
      <div className="bg-primary/20 h-[80vh] w-80 md:w-210 ml-10 p-6 rounded-2xl shadow flex items-center justify-center">
        <ClipLoader size={45} color="#6366f1" />
      </div>
    );
  }

  return (
    <div className="bg-primary/20 h-[80vh] overflow-auto w-80 md:w-210 ml-10 p-6 rounded-2xl shadow flex flex-col gap-6">
      {!submitted && (
        <>
          {currStep >= 0 && (
            <StartChat onNext={() => setCurrStep(1)} step={currStep} />
          )}
          {currStep >= 1 && (
            <Source onNext={(v) => updateData({ source: v })} step={currStep} />
          )}
          {currStep >= 2 && (
            <Destination
              onNext={(v) => updateData({ destination: v })}
              step={currStep}
            />
          )}
          {currStep >= 3 && (
            <People onNext={(v) => updateData({ people: v })} step={currStep} />
          )}
          {currStep >= 4 && (
            <TotalPassenger
              onNext={(v) => updateData({ travelers: v })}
              step={currStep}
            />
          )}
          {currStep >= 5 && (
            <Budgets
              onNext={(v) => updateData({ budget: v })}
              step={currStep}
            />
          )}
          {currStep >= 6 && (
            <CountDays
              onNext={(v) => updateData({ duration: v })}
              step={currStep}
            />
          )}
          {currStep >= 7 && (
            <Request
              onNext={(v) => updateData({ specialRequests: v })}
              step={currStep}
            />
          )}
        </>
      )}

      {submitted && (
        <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col gap-4">
          <h2 className="text-xl font-bold text-primary mb-2">
            Your Trip Summary
          </h2>
          <div className="flex flex-col gap-2">
            <p>
              <span className="font-semibold">Source:</span> {tripInfo.source}
            </p>
            <p>
              <span className="font-semibold">Destination:</span>{" "}
              {tripInfo.destination}
            </p>
            <p>
              <span className="font-semibold">People:</span> {tripInfo.people}
            </p>
            <p>
              <span className="font-semibold">Travelers:</span>{" "}
              {tripInfo.travelers}
            </p>
            <p>
              <span className="font-semibold">Budget:</span> {tripInfo.budget}
            </p>
            <p>
              <span className="font-semibold">Duration:</span>{" "}
              {tripInfo.duration} days
            </p>
            <p>
              <span className="font-semibold">Special Requests:</span>{" "}
              {tripInfo.specialRequests || "No Request"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chats;
