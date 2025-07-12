import connectToDB from "@/database";
import Profile from "@/models/profile";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  try {
    await connectToDB();

    const { searchParams } = new URL(req.url);
    const profileId = searchParams.get("id");

    if (!profileId || profileId.trim() === "") {
      return NextResponse.json({
        success: false,
        message: "Profile ID is required",
      }, { status: 400 });
    }

    const deletedProfile = await Profile.findByIdAndDelete(profileId);

    if (!deletedProfile) {
      return NextResponse.json({
        success: false,
        message: "Profile not found or already deleted",
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Profile deleted successfully",
    }, { status: 200 });

  } catch (error) {
    console.error("Delete Error:", error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong while deleting profile",
    }, { status: 500 });
  }
}
