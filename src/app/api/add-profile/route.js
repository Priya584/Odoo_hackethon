import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import connectToDB from "@/database";
import Profile from "@/models/profile";

export async function POST(req) {
  try {
    await connectToDB();
    const formData = await req.formData();

    const fullName = formData.get("fullName");
    const email = formData.get("email");
    const rating = formData.get("rating");
    const skillsWanted = formData.getAll("skillsWanted[]");
    const skillsOffered = formData.getAll("skillsOffered[]");
    const profilePhoto = formData.get("profilePhoto");

    let savedPhotoPath = "";

    // ✅ Save uploaded image if present
    if (profilePhoto && typeof profilePhoto === "object" && "arrayBuffer" in profilePhoto) {
      const bytes = await profilePhoto.arrayBuffer();
      const buffer = Buffer.from(bytes);

      savedPhotoPath = `/uploads/${profilePhoto.name}`; // relative path
      const filePath = path.join(process.cwd(), "public", "uploads", profilePhoto.name);
      await writeFile(filePath, buffer);
    }

    // ✅ Save to DB using Mongoose
    const profile = new Profile({
      fullName,
      email,
      rating,
      skillsWanted,
      skillsOffered,
      profilePhoto: savedPhotoPath,
    });

    await profile.save();

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error handling form:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
