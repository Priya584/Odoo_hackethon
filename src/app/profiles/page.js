"use client"

import { useState } from "react"
import { AddNewProfile } from "@/components/your-path/AddNewProfile"

export default function ProfilesPage() {
  const [openProfileDialog, setOpenProfileDialog] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSaveProfileData = async (formData) => {
    setLoading(true)
    try {
      const res = await fetch("/api/add-profile", {
        method: "POST",
        body: formData,
      })

      const result = await res.json()
      if (result.success) {
        alert("Profile saved successfully!")
        // Optionally refresh data or update local state
      } else {
        alert(result.message || "Something went wrong")
      }
    } catch (err) {
      console.error("Profile Save Error:", err)
      alert("Failed to save profile")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Profiles</h1>

      {/* AddNewProfile Button + Dialog */}
      <AddNewProfile
        openProfileDialog={openProfileDialog}
        setOpenProfileDialog={setOpenProfileDialog}
        loading={loading}
        handleSaveProfileData={handleSaveProfileData}
      />

      {/* You can render saved profiles below here */}
    </div>
  )
}
