import Link from "next/link";
import { UserCircle } from "lucide-react";
export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-[#FFFFFF] shadow-sm border-b border-[#C8D9E6]">
      <div className="text-2xl font-bold text-[#2F4156]">
        SkillSwap
      </div>
      <div className="flex items-center space-x-6">
        <Link href="/" className="text-[#567C8D] hover:text-[#2F4156] font-medium transition">
          Home
        </Link>
        <Link href="/skillmatch" className="text-[#567C8D] hover:text-[#2F4156] font-medium transition">
          SkillMatch
        </Link>
        <Link href="/signup" className="text-[#567C8D] hover:text-[#2F4156] font-medium transition">
          Login
        </Link>
        <Link href="/request" className="text-[#567C8D] hover:text-[#2F4156] font-medium transition">
          Requests
        </Link>
        <Link href="/profile">
          <UserCircle className="w-7 h-7 text-[#567C8D] hover:text-[#2F4156] transition" />
        </Link>
      </div>
    </nav>
  );
}
