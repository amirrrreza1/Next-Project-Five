import { NextResponse } from "next/server";
import { db } from "@/Lib/firebase";
import { collection, addDoc } from "firebase/firestore";

export async function POST(req: Request) {
  try {
    const { endpoint, method, success, timestamp } = await req.json();

    await addDoc(collection(db, "api_logs"), {
      endpoint,
      method,
      success,
      timestamp,
    });

    return NextResponse.json(
      { message: "Logged successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to log API call" },
      { status: 500 }
    );
  }
}
