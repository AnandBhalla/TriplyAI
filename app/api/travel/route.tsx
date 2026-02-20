import { db } from "@/config/db";
import { tripsTable, usersTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async  function GET(req:NextRequest){
    const user = await currentUser();

    const trips = await db
    .select()
    .from(tripsTable)
    .where(eq(tripsTable.useremail,user?.primaryEmailAddress?.emailAddress as string))

    return NextResponse.json(trips)
}