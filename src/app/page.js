"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";
import ProfileOverview from "@/components/profile-overview";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F5EFEB]">
      <Navbar />

      <section className="flex flex-col items-center justify-center text-center py-24 px-4">
        <h1 className="text-4xl sm:text-6xl font-extrabold text-[#2F4156] leading-tight max-w-3xl">
          Unlock Potential Together — <span className="text-[#567C8D]">Swap Skills. Share Growth.</span>
        </h1>
        <p className="mt-6 text-lg text-[#2F4156] max-w-xl">
          Connect with like-minded people, exchange skills you have for those you want. It’s learning without limits.
        </p>
        <Link
          href="/skillmatch"
          className="mt-8 px-6 py-3 bg-[#2F4156] text-white text-lg font-semibold rounded-full shadow hover:bg-[#567C8D] transition"
        >
          Find a Skill Swap
        </Link>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <ProfileOverview />
      </div>
    </div>
  );
}
