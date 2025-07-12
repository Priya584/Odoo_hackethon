import connectToDB from "@/database";
import { NextResponse } from "next/server";
import Profile from "@/models/profile";

export async function GET() {
  try {
    await connectToDB();

    const allProfiles = await Profile.find({});

    if (!allProfiles || allProfiles.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "No profiles found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: allProfiles,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Fetch Profiles Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong! Please try again later",
      },
      { status: 500 }
    );
  }
}
