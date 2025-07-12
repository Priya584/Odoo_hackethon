"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

const initialData = {
  fullName: "",
  email: "", // ✅ updated
  rating: "",
  skillsWanted: [],
  skillsOffered: [],
  newSkillWanted: "",
  newSkillOffered: "",
  profilePhoto: null,
}

export default function ProfileOverview() {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState(initialData)
  const [loading, setLoading] = useState(false)
  const fileRef = useRef(null)
  const router = useRouter()

  const handleAddSkill = (type) => {
    if (formData[type].trim() === "") return
    const key = type === "newSkillWanted" ? "skillsWanted" : "skillsOffered"
    setFormData((prev) => ({
      ...prev,
      [key]: [...prev[key], prev[type]],
      [type]: ""
    }))
  }

  const handleRemoveSkill = (key, index) => {
    setFormData((prev) => ({
      ...prev,
      [key]: prev[key].filter((_, i) => i !== index)
    }))
  }

  const handleFileChange = (e) => {
    setFormData({ ...formData, profilePhoto: e.target.files[0] })
  }

  async function handleSubmit() {
    try {
      setLoading(true)

      const payload = new FormData()
      payload.append("fullName", formData.fullName)
      payload.append("email", formData.email) // ✅ updated here
      payload.append("rating", formData.rating)
      formData.skillsWanted.forEach((skill) => payload.append("skillsWanted[]", skill))
      formData.skillsOffered.forEach((skill) => payload.append("skillsOffered[]", skill))
      if (formData.profilePhoto) payload.append("profilePhoto", formData.profilePhoto)

      const res = await fetch("/api/add-profile", {
        method: "POST",
        body: payload,
      })

      const data = await res.json()

      if (data.success) {
        setFormData(initialData)
        if (fileRef.current) fileRef.current.value = null
        setOpen(false)
        router.refresh()
      } else {
        alert("Failed to add profile")
      }
    } catch (err) {
      console.error("Error:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">Profile Dashboard</h1>

      <Button onClick={() => setOpen(true)}>+ Add New Profile</Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-white text-black max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Profile</DialogTitle>
          </DialogHeader>

          <div className="space-y-3">

            <div>
              <Label>Full Name</Label>
              <Input
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              />
            </div>

            <div>
              <Label>Email</Label> {/* ✅ label updated */}
              <Input
                value={formData.email} // ✅ updated
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div>
              <Label>Rating (out of 5)</Label>
              <Input
                type="number"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
              />
            </div>

            {/* Skills Wanted */}
            <div>
              <Label>Skills Wanted</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Add skill"
                  value={formData.newSkillWanted}
                  onChange={(e) => setFormData({ ...formData, newSkillWanted: e.target.value })}
                />
                <Button onClick={() => handleAddSkill("newSkillWanted")}>Add</Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.skillsWanted.map((skill, i) => (
                  <span key={i} className="bg-gray-200 px-2 py-1 rounded-full flex items-center gap-1">
                    {skill}
                    <button onClick={() => handleRemoveSkill("skillsWanted", i)}>❌</button>
                  </span>
                ))}
              </div>
            </div>

            {/* Skills Offered */}
            <div>
              <Label>Skills Offered</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Add skill"
                  value={formData.newSkillOffered}
                  onChange={(e) => setFormData({ ...formData, newSkillOffered: e.target.value })}
                />
                <Button onClick={() => handleAddSkill("newSkillOffered")}>Add</Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.skillsOffered.map((skill, i) => (
                  <span key={i} className="bg-gray-200 px-2 py-1 rounded-full flex items-center gap-1">
                    {skill}
                    <button onClick={() => handleRemoveSkill("skillsOffered", i)}>❌</button>
                  </span>
                ))}
              </div>
            </div>

            {/* Profile Photo Upload */}
            <div>
              <Label>Profile Photo</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                ref={fileRef}
              />
            </div>

            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-black text-white mt-4"
            >
              {loading ? "Saving..." : "Save Profile"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
