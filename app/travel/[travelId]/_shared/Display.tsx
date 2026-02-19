"use client";

import React, { useState } from "react";
import {
  Train,
  Car,
  Plane,
  Hotel,
  MapPin,
  Youtube,
  Calendar,
  Navigation,
  ExternalLink,
} from "lucide-react";
import Image from "next/image";

interface DisplayProps {
  travelData: any;
}

const Display = ({ travelData }: DisplayProps) => {
  const [activeTab, setActiveTab] = useState("Transport");
  const data = travelData.data.tripdata;

  if (!data)
    return (
      <div className="bg-primary/20 h-[80vh] overflow-auto w-full mr-10 p-5 rounded-2xl shadow flex flex-col gap-5">
        No travel data found.
      </div>
    );

  const tabs = [
    { name: "Transport", icon: <Navigation size={18} /> },
    { name: "Hotels", icon: <Hotel size={18} /> },
    { name: "Sightseeing", icon: <MapPin size={18} /> },
    { name: "Guide", icon: <Youtube size={18} /> },
    { name: "Itinerary", icon: <Calendar size={18} /> },
  ];

  return (
    <div className="bg-primary/20 h-[80vh] overflow-auto w-full mr-10 p-5 rounded-2xl shadow flex flex-col gap-5">
      <div className="flex justify-around bg-primary/5 p-2 rounded-2xl border border-primary/10">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`flex items-center gap-2 px-6 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === tab.name
                ? "bg-primary text-white shadow scale-105"
                : "text-gray-600 hover:bg-primary/10"
            }`}
          >
            {tab.icon}
            <span className="font-medium">{tab.name}</span>
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === "Transport" && (
          <TransportView transport={data.how_to_reach} />
        )}
        {activeTab === "Hotels" && <HotelView hotels={data.hotel} />}
        {activeTab === "Sightseeing" && (
          <SightseeingView items={data.tovisit} />
        )}
        {activeTab === "Guide" && <GuideView videos={data.youtubeguide} />}
        {activeTab === "Itinerary" && (
          <ItineraryView itinerary={data.itinerary} />
        )}
      </div>
    </div>
  );
};

const TransportView = ({ transport }: any) => {
  if (!transport) return null;
  return (
    <div className="space-y-6">
      {" "}
      <div className="grid md:grid-cols-2 gap-4">
        {" "}
        <div className="bg-blue-50 p-4 rounded-2xl">
          {" "}
          <h3 className="flex gap-2 font-bold text-blue-700 mb-3">
            {" "}
            <Train /> Trains{" "}
          </h3>{" "}
          {transport.train?.map((t: any, i: number) => (
            <div
              key={i}
              className="bg-white p-3 rounded-xl mb-2 text-sm flex justify-between"
            >
              {" "}
              <div>
                {" "}
                <p className="font-bold">
                  {t.departure_time} - {t.arrival_time}
                </p>{" "}
                <p className="text-gray-500">
                  {t.source_station} → {t.dest_station}
                </p>{" "}
              </div>{" "}
              <p className="text-blue-600 font-medium">{t.total_time}</p>{" "}
            </div>
          ))}{" "}
        </div>{" "}
        <div className="bg-purple-50 p-4 rounded-2xl">
          {" "}
          <h3 className="flex gap-2 font-bold text-purple-700 mb-3">
            {" "}
            <Plane /> Flights{" "}
          </h3>{" "}
          {transport.flights?.map((f: any, i: number) => (
            <div
              key={i}
              className="bg-white p-3 rounded-xl mb-2 text-sm flex justify-between"
            >
              {" "}
              <div>
                {" "}
                <p className="font-bold">
                  {f.departure_time} - {f.arrival_time}
                </p>{" "}
                <p className="text-gray-500">
                  {f.source_airport} → {f.dest_airport}
                </p>{" "}
              </div>{" "}
              <p className="text-purple-600 font-medium">{f.total_time}</p>{" "}
            </div>
          ))}{" "}
        </div>{" "}
      </div>{" "}
      <div className="bg-orange-50 p-4 rounded-2xl flex justify-between items-center">
        {" "}
        <div className="flex gap-3">
          {" "}
          <div className="bg-orange-500 p-2 rounded-lg text-white">
            <Car />
          </div>{" "}
          <div>
            {" "}
            <p className="font-bold">Road Trip</p>{" "}
            <p className="text-sm">Distance: {transport.car?.distance}</p>{" "}
          </div>{" "}
        </div>{" "}
        <p className="font-bold text-orange-600">{transport.car?.time}</p>{" "}
      </div>{" "}
    </div>
  );
};

const HotelView = ({ hotels }: any) => (
  <div className="grid lg:grid-cols-3 gap-4">
    {hotels?.map((h: any, i: number) => (
      <div key={i} className="border rounded-2xl overflow-hidden shadow">
        <Image
          src={h.imageurl }
          alt={h.name}
          width={700}
          height={400}
          className="h-40 w-full object-cover"
        />
        <div className="p-4">
          <h3 className="font-bold line-clamp-1">{h.name}</h3>
          <p className="text-primary font-bold text-xl mt-3">
            ₹{h.price.per_night}/night
          </p>
          <a
            href={h.link}
            target="_blank"
            className="mt-3 flex justify-center gap-2 items-center bg-black text-white py-2 rounded-xl"
          >
            View <ExternalLink size={14} />
          </a>
        </div>
      </div>
    ))}
  </div>
);

const SightseeingView = ({ items }: any) => (
  <div className="space-y-4">
    {items?.map((item: any, i: number) => (
      <div key={i} className="flex gap-4 bg-gray-50 p-3 rounded-2xl">
        <Image
          src={item.imageurl}
          alt={item.name}
          width={128}
          height={128}
          className="w-32 h-32 rounded-xl object-cover"
        />
        <div>
          <h3 className="font-bold">{item.name}</h3>
          <p className="text-sm text-gray-600 mt-2">{item.notes}</p>
        </div>
      </div>
    ))}
  </div>
);

const GuideView = ({ videos }: any) => (
  <div className="grid md:grid-cols-3 gap-4">
    {videos?.map((v: any, i: number) => (
      <a key={i} href={v.link} target="_blank">
        <Image
          src={v.thumbnail}
          alt={v.title}
          width={400}
          height={225}
          className="rounded-2xl w-full"
        />
        <p className="mt-2 font-semibold text-sm">{v.title}</p>
      </a>
    ))}
  </div>
);

const ItineraryView = ({ itinerary }: any) => (
  <div>
    {" "}
    {itinerary?.map((day: any[], i: number) => (
      <div key={i} className="mb-8">
        {" "}
        <h2 className="text-xl font-bold text-primary mb-4">
          Day {i + 1}
        </h2>{" "}
        {day.map((p: any, j: number) => (
          <div key={j} className="flex gap-4 mb-3 bg-white p-3 rounded-xl">
            {" "}
            <img
              src={p.imageurl}
              alt="img"
              className="w-32 h-20 rounded-lg object-cover"
            />{" "}
            <div>
              {" "}
              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                {p.timetovisit}
              </span>{" "}
              <p className="font-bold mt-1">{p.place}</p>{" "}
            </div>{" "}
          </div>
        ))}{" "}
      </div>
    ))}{" "}
  </div>
);

export default Display;
