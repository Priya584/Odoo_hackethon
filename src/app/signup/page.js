'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'

const avatars = [
  '/avatars/av1.jpeg',
  '/avatars/av2.jpeg',
  '/avatars/av3.jpeg',
  '/avatars/av4.jpeg',
]

export default function SignupPage() {
  const router = useRouter()
  const fileRef = useRef()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    rating: '0', // ✅ Default rating to '0'
    skillsWanted: [],
    skillsOffered: [],
    newSkillWanted: '',
    newSkillOffered: '',
    profilePhoto: null,
    availability: '',
    visibility: 'public',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleAddSkill = (type) => {
    const key = type === 'newSkillWanted' ? 'skillsWanted' : 'skillsOffered'
    if (formData[type].trim() === '') return
    setFormData({
      ...formData,
      [key]: [...formData[key], formData[type]],
      [type]: '',
    })
  }

  const handleRemoveSkill = (key, i) => {
    setFormData({
      ...formData,
      [key]: formData[key].filter((_, index) => index !== i),
    })
  }

  const handleAvatarSelect = (src) => {
    setFormData({ ...formData, profilePhoto: src })
  }

  const handleFileChange = (e) => {
    setFormData({ ...formData, profilePhoto: e.target.files[0] })
  }

  const handleSubmit = async () => {
    try {
      setLoading(true)

      const payload = new FormData()
      payload.append('fullName', formData.fullName)
      payload.append('email', formData.email)
      payload.append('rating', formData.rating)
      payload.append('availability', formData.availability)
      payload.append('visibility', formData.visibility)

      formData.skillsWanted.forEach((s) => payload.append('skillsWanted[]', s))
      formData.skillsOffered.forEach((s) => payload.append('skillsOffered[]', s))

      if (formData.profilePhoto instanceof File) {
        payload.append('profilePhoto', formData.profilePhoto)
      } else if (typeof formData.profilePhoto === 'string') {
        payload.append('avatarPath', formData.profilePhoto)
      }

      const res = await fetch('/api/add-profile', {
        method: 'POST',
        body: payload,
      })

      const data = await res.json()
      if (data.success) {
        router.push('/login')
      } else {
        alert('Signup failed: ' + data.error)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#C8D9E6] flex items-center justify-center px-4 py-6">
      <div className="bg-white rounded-2xl p-8 shadow-xl w-full max-w-xl">
        <div className="w-full flex justify-between items-center mb-8">
          <span className="text-2xl font-bold text-[#2F4156]">SkillSwap</span>
          <a
            href="/"
            className="text-[#2F4156] font-medium underline hover:text-[#35607A]"
          >
            ← Back to Home
          </a>
        </div>

        {step === 1 && (
          <>
            <h2 className="text-2xl font-bold text-[#2F4156] mb-6 text-center">
              Step 1: Your Details
            </h2>

            <input
              name="fullName"
              placeholder="Full Name"
              onChange={handleChange}
              className="input-style"
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              className="input-style"
            />

            <div className="flex flex-col items-center w-full">
              <div className="grid grid-cols-2 gap-4">
                {avatars.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt=""
                    className={`h-24 w-24 m-3 rounded-full cursor-pointer border-4 ${formData.profilePhoto === src
                      ? 'border-[#35607A] scale-105'
                      : 'border-gray-300'
                      } transition-all duration-200`}
                    onClick={() => handleAvatarSelect(src)}
                    onError={(e) => {
                      e.target.onerror = null
                      e.target.src = 'https://via.placeholder.com/96'
                    }}
                  />
                ))}
              </div>

              <div className="w-full flex justify-end mt-6">
                <button
                  onClick={() => setStep(2)}
                  className="btn-style bg-[#35607A] text-white w-[150px] rounded-md"
                >
                  Next
                </button>
              </div>
            </div>

            <p className="mt-4 text-center text-sm text-gray-600">
              Already have an account?{' '}
              <a href="/login" className="text-[#35607A] hover:underline font-medium">
                Login here
              </a>
            </p>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-2xl font-bold text-[#2F4156] mb-6 text-center">
              Step 2: Profile Info
            </h2>

            {/* Skills Wanted */}
            <div className="mb-3">
              <label className="font-medium text-[#2F4156] block mb-1">Skills Wanted</label>
              <div className="flex gap-2">
                <input
                  value={formData.newSkillWanted}
                  onChange={(e) =>
                    setFormData({ ...formData, newSkillWanted: e.target.value })
                  }
                  placeholder="Add skill"
                  className="input-style"
                />
                <button
                  onClick={() => handleAddSkill('newSkillWanted')}
                  className="btn-style bg-[#35607A] text-white w-[150px] h-[50px] rounded-md"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.skillsWanted.map((s, i) => (
                  <span key={i} className="bg-gray-200 px-3 py-1 rounded-full text-sm">
                    {s}{' '}
                    <button
                      onClick={() => handleRemoveSkill('skillsWanted', i)}
                      className="ml-1 text-red-600"
                    >
                      ❌
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Skills Offered */}
            <div className="mb-3">
              <label className="font-medium text-[#2F4156] block mb-1">Skills Offered</label>
              <div className="flex gap-2">
                <input
                  value={formData.newSkillOffered}
                  onChange={(e) =>
                    setFormData({ ...formData, newSkillOffered: e.target.value })
                  }
                  placeholder="Add skill"
                  className="input-style"
                />
                <button
                  onClick={() => handleAddSkill('newSkillOffered')}
                  className="btn-style bg-[#35607A] text-white w-[150px] h-[50px] rounded-md"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.skillsOffered.map((s, i) => (
                  <span key={i} className="bg-gray-200 px-3 py-1 rounded-full text-sm">
                    {s}{' '}
                    <button
                      onClick={() => handleRemoveSkill('skillsOffered', i)}
                      className="ml-1 text-red-600"
                    >
                      ❌
                    </button>
                  </span>
                ))}
              </div>
            </div>

            

            {/* Availability */}
            <div className="mb-4">
              <label className="font-medium text-[#2F4156] block mb-1">Availability</label>
              <select
                name="availability"
                onChange={handleChange}
                className="input-style"
                value={formData.availability}
              >
                <option value="">Select availability</option>
                <option value="Weekdays">Weekdays</option>
                <option value="Weekends">Weekends</option>
                <option value="Evenings">Evenings</option>
                <option value="Flexible">Flexible</option>
              </select>
            </div>

            {/* Visibility */}
            <div className="mb-4">
              <label className="font-medium text-[#2F4156] block mb-1">Visibility</label>
              <select
                name="visibility"
                onChange={handleChange}
                className="input-style"
                value={formData.visibility}
              >
                <option value="">Select visibility</option>
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </div>

            <button
              onClick={handleSubmit}
              className="btn-style bg-[#2F4156] text-white w-[150px] rounded-md"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </>
        )}
      </div>

      <style jsx>{`
        .input-style {
          width: 100%;
          margin-bottom: 1rem;
          padding: 0.75rem;
          border: 1px solid #ccc;
          border-radius: 0.5rem;
          font-size: 1rem;
          color: #333;
        }

        .input-style::placeholder {
          color: #666;
        }

        .input-style:focus {
          outline: none;
          border-color: #35607A;
          box-shadow: 0 0 0 2px rgba(53, 96, 122, 0.3);
        }

        .btn-style {
          padding: 0.75rem;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .btn-style:hover {
          opacity: 0.9;
        }
      `}</style>
    </div>
  )
}
