// src/app/page.js or page.jsx
"use client"

import ProfileOverview from "@/components/profile-overview";
import Image from "next/image";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <ProfileOverview />
    </div>
  );
}
