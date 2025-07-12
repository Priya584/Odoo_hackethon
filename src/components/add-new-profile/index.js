"use client"

import { useRef, useState, Fragment } from "react"
import { Button } from "../ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export const AddNewProfile = ({
  openProfileDialog,
  setOpenProfileDialog,
  loading,
  handleSaveProfileData,
}) => {
  const fileInputRef = useRef(null)

  const [profileFormData, setProfileFormData] = useState({
    fullName: "",
    email: "", // ✅ changed from emailId
    rating: "",
    skillsWanted: [],
    skillsOffered: [],
    profilePhoto: null,
    newWantedSkill: "",
    newOfferedSkill: ""
  })

  const handleAddSkill = (type) => {
    const newSkill = profileFormData[type]
    if (newSkill.trim()) {
      setProfileFormData((prev) => ({
        ...prev,
        [type === "newWantedSkill" ? "skillsWanted" : "skillsOffered"]: [
          ...prev[type === "newWantedSkill" ? "skillsWanted" : "skillsOffered"],
          newSkill.trim()
        ],
        [type]: ""
      }))
    }
  }

  const handleRemoveSkill = (type, index) => {
    setProfileFormData((prev) => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }))
  }

  const handleFileChange = (e) => {
    setProfileFormData({ ...profileFormData, profilePhoto: e.target.files[0] })
  }

  const handleSubmit = () => {
    const formData = new FormData()
    formData.append("fullName", profileFormData.fullName)
    formData.append("email", profileFormData.email) // ✅ matches backend
    formData.append("rating", profileFormData.rating)
    formData.append("skillsWanted", JSON.stringify(profileFormData.skillsWanted))
    formData.append("skillsOffered", JSON.stringify(profileFormData.skillsOffered))
    formData.append("profilePhoto", profileFormData.profilePhoto)

    handleSaveProfileData(formData)

    // Reset
    setProfileFormData({
      fullName: "",
      email: "",
      rating: "",
      skillsWanted: [],
      skillsOffered: [],
      profilePhoto: null,
      newWantedSkill: "",
      newOfferedSkill: ""
    })
    fileInputRef.current.value = null
    setOpenProfileDialog(false)
  }

  return (
    <Fragment>
      <div>
        <Button
          onClick={() => setOpenProfileDialog(true)}
          className="bg-[#e2d4c2] text-[#24160e] border-[#24160e] hover:bg-[#d4c3a5] hover:text-[#000000] w-full mb-4"
        >
          Add New Profile
        </Button>
      </div>

      <Dialog open={openProfileDialog} onOpenChange={setOpenProfileDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Profile</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <Input
              placeholder="Full Name"
              value={profileFormData.fullName}
              onChange={(e) =>
                setProfileFormData({ ...profileFormData, fullName: e.target.value })
              }
            />
            <Input
              placeholder="Email"
              value={profileFormData.email}
              onChange={(e) =>
                setProfileFormData({ ...profileFormData, email: e.target.value })
              }
            />
            <Input
              type="number"
              placeholder="Rating (out of 5)"
              value={profileFormData.rating}
              onChange={(e) =>
                setProfileFormData({ ...profileFormData, rating: e.target.value })
              }
            />

            {/* Skills Wanted */}
            <div>
              <Label>Skills Wanted</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Add skill"
                  value={profileFormData.newWantedSkill}
                  onChange={(e) =>
                    setProfileFormData({ ...profileFormData, newWantedSkill: e.target.value })
                  }
                />
                <Button onClick={() => handleAddSkill("newWantedSkill")}>Add</Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {profileFormData.skillsWanted.map((skill, index) => (
                  <div
                    key={index}
                    className="px-2 py-1 bg-gray-200 rounded-full flex items-center gap-1"
                  >
                    <span>{skill}</span>
                    <button onClick={() => handleRemoveSkill("skillsWanted", index)}>❌</button>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills Offered */}
            <div>
              <Label>Skills Offered</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Add skill"
                  value={profileFormData.newOfferedSkill}
                  onChange={(e) =>
                    setProfileFormData({ ...profileFormData, newOfferedSkill: e.target.value })
                  }
                />
                <Button onClick={() => handleAddSkill("newOfferedSkill")}>Add</Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {profileFormData.skillsOffered.map((skill, index) => (
                  <div
                    key={index}
                    className="px-2 py-1 bg-gray-200 rounded-full flex items-center gap-1"
                  >
                    <span>{skill}</span>
                    <button onClick={() => handleRemoveSkill("skillsOffered", index)}>❌</button>
                  </div>
                ))}
              </div>
            </div>

            {/* File Upload */}
            <div>
              <Label>Profile Photo</Label>
              <Input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" onClick={handleSubmit} disabled={loading}>
              {loading ? "Saving..." : "Save Profile"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}
