import { db } from "@/config/db";
import { tripsTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { GoogleGenAI } from "@google/genai";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

const genai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function POST(
  req: NextRequest,
  ctx: { params: Promise<{ travelId: string }> },
) {
  try {
    const { travelId } = await ctx.params;

    const user = await currentUser();
    if (!user?.primaryEmailAddress?.emailAddress) {
      return NextResponse.json({ success: false }, { status: 401 });
    }

    const {
      source,
      destination,
      people,
      travelers,
      budget,
      duration,
      specialRequests,
    } = await req.json();

    const prompt = `You are a travel planning AI.
Using the following input payload, generate a strictly valid JSON response only.
Do NOT include explanations, markdown, comments, or extra text.
INPUT PAYLOAD:
Source: ${source}
Destination: ${destination}
People Type: ${people}
Number of Travelers: ${travelers}
Budget: ${budget}
Duration: ${duration} days
Special Requests: ${specialRequests}

OUTPUT REQUIREMENTS:
Return a single JSON object with the following structure:
{
"hotel": [
{
"name": "string",
"imageurl": "string (direct image URL ending with .jpg, .png, or .webp)",
"geocoordinates": {
"lat": number (between -90 and 90),
"lng": number (between -180 and 180)
},
"price": {
"total": "string",
"per_night": "string",
"currency": "INR"
},
"link": "string (official hotel or booking website)"
}
],
"how_to_reach": {
"train": [
{
"source_station": "string",
"dest_station": "string",
"departure_time": "HH:MM (24-hour format)",
"arrival_time": "HH:MM (24-hour format)",
"total_time": "Xh Ym"
}
],
"car": {
"distance": "string (in km)",
"time": "Xh Ym"
},
"flights": [
{
"source_airport": "string",
"dest_airport": "string",
"departure_time": "HH:MM (24-hour format)",
"arrival_time": "HH:MM (24-hour format)",
"total_time": "Xh Ym"
}
]
},
"tovisit": [
{
"name": "string",
"imageurl": "string (direct image URL)",
"geocoordinates": {
"lat": number (between -90 and 90),
"lng": number (between -180 and 180)
},
"notes": "string (entry fee, timings, or special instructions)"
}
],
"youtubeguide": [
{
"title": "string",
"thumbnail": "string (direct image URL)",
"link": "string"
}
],
"itinerary": [
[
{
"place": "string",
"imageurl": "string (direct image URL)",
"timetovisit": "string"
}
]
]
}
CONSTRAINTS:
"Maker sure images links are working and not broken"
"hotel" array MUST contain exactly 3 objects
"train" array MUST contain minimum 1 and maximum 3 objects
"flights" array MUST contain minimum 1 and maximum 3 objects
"itinerary" array length MUST equal ${duration}
Each day MUST contain a maximum of 4 places
Transport feasibility rules:
Flights only if distance > 300 km
Prefer trains for short distances
Car distance and time must be geographically realistic
All times MUST follow specified formats
All latitude and longitude values MUST be valid
Respect ${budget} budget
Respect ${specialRequests} requests
Provide exactly 3 YouTube videos related to ${destination}
Output MUST be valid JSON only
`;

    const result = await genai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const text = result.text;
    if (!text) {
      return NextResponse.json({ success: false }, { status: 500 });
    }

    const aiResult = JSON.parse(text.trim().replace(/```json|```/g, ""));

    await db.insert(tripsTable).values({
      travelId,
      useremail: user.primaryEmailAddress.emailAddress,
      source,
      destination,
      people,
      travelers,
      budget,
      duration,
      specialRequests,
      tripdata: aiResult,
    });

    return NextResponse.json({ success: true, data: aiResult });
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function GET(
  req: NextRequest,
  ctx: { params: Promise<{ travelId: string }> },
) {
  try {
    const { travelId } = await ctx.params;

    const trip = await db
      .select()
      .from(tripsTable)
      .where(eq(tripsTable.travelId, travelId))
      .limit(1);

    if (!trip.length) {
      return NextResponse.json({ success: false }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: trip[0] });
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
