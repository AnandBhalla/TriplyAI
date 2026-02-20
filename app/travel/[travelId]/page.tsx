"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

import TravelHeader from "./_shared/TravelHeader";
import Chats from "./_shared/Chats";
import Display from "./_shared/Display";
import { resumeAndPrerender } from "react-dom/static";
import { ClipLoader } from "react-spinners";

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
  }, [travelId,tripInfo,infoReady]);

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
        {travelData ? (
          <Display travelData={travelData} />
        ) : (
         <div className="bg-primary/20 h-[80vh] w-80 md:w-210 ml-10 p-6 rounded-2xl shadow flex items-center justify-center">
        <ClipLoader size={45} color="#6366f1" />
      </div>
        )}
      </div>
    </div>
  );
}

export default Page;
