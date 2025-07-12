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
    const availability = formData.get("availability");
    const visibility = formData.get("visibility");

    const uploadedFile = formData.get("profilePhoto");
    const avatarPath = formData.get("avatarPath");

    let savedPhotoPath = "";

    // Handle uploaded file
    if (uploadedFile && typeof uploadedFile === "object" && "arrayBuffer" in uploadedFile) {
      // Optional: Validate image type
      const validTypes = ["image/jpeg", "image/png", "image/webp"];
      if (!validTypes.includes(uploadedFile.type)) {
        return NextResponse.json({ success: false, error: "Invalid file type" }, { status: 400 });
      }

      const bytes = await uploadedFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      savedPhotoPath = `/uploads/${uploadedFile.name}`;
      const filePath = path.join(process.cwd(), "public", "uploads", uploadedFile.name);
      await writeFile(filePath, buffer);
    } else if (typeof avatarPath === "string") {
      savedPhotoPath = avatarPath;
    }

    const profile = new Profile({
      fullName,
      email,
      rating,
      skillsWanted,
      skillsOffered,
      availability,
      visibility,
      profilePhoto: savedPhotoPath || "/avatars/default.jpeg",
    });

    await profile.save();

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error handling form:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
