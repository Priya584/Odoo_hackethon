// src/app/api/send-request/route.js

import { NextResponse } from "next/server";
import connectToDB from "@/database";
import Profile from "@/models/profile";

export async function POST(req) {
  try {
    await connectToDB();
    const { toUserId, fromUserId, fromName, message } = await req.json();

    const profile = await Profile.findById(toUserId);
    if (!profile) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    profile.requests.push({ fromUserId, fromName, message });
    await profile.save();

    return NextResponse.json({ success: true, message: "Request sent successfully!" });
  } catch (error) {
    console.error("Send Request Error:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}
