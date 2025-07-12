import connectToDB from "@/database";
import { NextResponse } from "next/server";
import Joi from "joi";
import Profile from "@/models/profile";

// Validation schema according to your updated model
const EditProfileSchema = Joi.object({
  fullName: Joi.string().required(),
  email: Joi.string().email().required(),
  skillsWanted: Joi.array().items(Joi.string()).required(),
  skillsOffered: Joi.array().items(Joi.string()).required(),
  rating: Joi.number().min(0).max(5).required(),
  profilePhoto: Joi.string().required(), // or Joi.string().uri() if you're using URL only
});

export async function PUT(req) {
  try {
    await connectToDB();

    const { searchParams } = new URL(req.url);
    const profileId = searchParams.get("id");

    if (!profileId) {
      return NextResponse.json(
        { success: false, message: "Profile ID is missing" },
        { status: 400 }
      );
    }

    const updatedData = await req.json();

    const { error } = EditProfileSchema.validate(updatedData);
    if (error) {
      return NextResponse.json(
        { success: false, message: error.details[0].message },
        { status: 400 }
      );
    }

    const updatedProfile = await Profile.findByIdAndUpdate(
      profileId,
      updatedData,
      { new: true }
    );

    if (!updatedProfile) {
      return NextResponse.json(
        { success: false, message: "Profile not found or could not be updated" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Profile updated successfully", data: updatedProfile },
      { status: 200 }
    );
  } catch (error) {
    console.error("Profile Update Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
