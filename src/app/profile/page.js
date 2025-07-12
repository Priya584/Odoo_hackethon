"use client"
import Navbar from "@/components/Navbar";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export default function UserProfile() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [skillsOffered, setSkillsOffered] = useState("");
  const [skillsWanted, setSkillsWanted] = useState("");
  const [availability, setAvailability] = useState("");
  const [visibility, setVisibility] = useState("Public");

  return (
    <div className="min-h-screen bg-[#f5efeb] text-[#2f4156]">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex justify-between items-center mb-6">
          <div className="space-x-2">
            <Button className="bg-green-600 hover:bg-green-700">Save</Button>
            <Button variant="destructive">Discard</Button>
          </div>
          <h1 className="text-3xl font-bold text-center flex-grow -ml-16">User Profile</h1>
        </div>

        <div className="grid grid-cols-3 gap-6 h-[600px]">
          {/* Left Card */}
          <Card className="col-span-2 bg-white shadow-lg rounded-2xl p-6 h-full">
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Enter your location" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="availability">Availability</Label>
                <Select value={availability} onValueChange={setAvailability}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Evening">Evening</SelectItem>
                    <SelectItem value="Weekend">Weekend</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="visibility">Profile Visibility</Label>
                <Select value={visibility} onValueChange={setVisibility}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Visibility" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Public">Public</SelectItem>
                    <SelectItem value="Private">Private</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-6 h-full">
            {/* Top Right Card - Avatar */}
            <Card className="bg-white shadow-lg rounded-2xl p-6 flex-grow">
              <div className="flex items-center gap-4 h-full justify-center">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="" alt="Avatar" />
                  <AvatarFallback>NA</AvatarFallback>
                </Avatar>
                <div className="space-x-2">
                  <Button variant="default">Edit</Button>
                  <Button variant="destructive">Remove</Button>
                </div>
              </div>
            </Card>

            {/* Bottom Right Card - Skills */}
            <Card className="bg-white shadow-lg rounded-2xl p-6 flex-grow">
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="skillsOffered">Skills Offered</Label>
                  <Input id="skillsOffered" value={skillsOffered} onChange={(e) => setSkillsOffered(e.target.value)} placeholder="e.g., Graphic Design, Video Editing" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="skillsWanted">Skills Wanted</Label>
                  <Input id="skillsWanted" value={skillsWanted} onChange={(e) => setSkillsWanted(e.target.value)} placeholder="e.g., Python, Management" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

