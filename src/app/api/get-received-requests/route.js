import connectToDB from "@/database";
import { NextResponse } from "next/server";
import Profile from "@/models/profile";

// Extract the query param from request.url
export async function GET(req) {
  try {
    await connectToDB();

    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }

    const userProfile = await Profile.findOne({ email });

    if (!userProfile) {
      return NextResponse.json(
        { success: false, message: "User profile not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: userProfile.requests },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching received requests:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
