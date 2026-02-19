"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

import TravelHeader from "./_shared/TravelHeader";
import Chats from "./_shared/Chats";
import Display from "./_shared/Display";
import { resumeAndPrerender } from "react-dom/static";

function Page() {
  const params = useParams();
  const travelId = params?.travelId as string;

  const [infoReady, setInfoReady] = useState(false);
  const [tripInfo, setTripInfo] = useState<any>(null);
  const [travelData, setTravelData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!infoReady || !tripInfo || !travelId) return;

    const postTripData = async () => {
      setLoading(true);
      try {
        await axios.post(`/api/travel/${travelId}`, tripInfo, {
          headers: { "Content-Type": "application/json" },
        });
      } catch (err) {
        console.error("Error posting trip info:", err);
      } finally {
        setLoading(false);
      }
    };

    postTripData();
  }, [infoReady, tripInfo, travelId]);

  useEffect(() => {
    if (!travelId) return;

    const fetchTravelData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/travel/${travelId}`);
        setTravelData(res.data);
      } catch (err) {
        console.error("Error fetching travel data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTravelData();
  }, [travelId]);

  return (
    <div>
      <TravelHeader />
      <div className="flex justify-between gap-15">
        <Chats
          onInfoReady={(ready: boolean, info: any) => {
            setInfoReady(ready);
            setTripInfo(info);
          }}
        />
        {loading && (
          <div className="text-gray-500 font-medium ml-10">
            Loading your journey...
          </div>
        )}
        {travelData && <Display travelData={travelData} />}
      </div>
    </div>
  );
}

export default Page;
