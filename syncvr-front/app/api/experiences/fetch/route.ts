import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";

// Get all experiences already done
export async function POST() {
    try {
        const { db } = await connectToDatabase();
        const scheduled = await db.collection('scheduled').find({ done: true }).sort({ createdAt: -1 }).toArray();
        const response = NextResponse.json(scheduled, { status: 200 });

        return response;
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}