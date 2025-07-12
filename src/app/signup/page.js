'use client';
import { useState } from 'react';
const avatars = [
  '/avatars/av1.jpeg',
  '/avatars/av2.jpeg',
  '/avatars/av3.jpeg',
  '/avatars/av4.jpeg',
];
export default function SignupPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    avatar: '',
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const selectAvatar = (avatar) => {
    setFormData({ ...formData, avatar });
  };
  const handleSubmit = () => {
    console.log('Submitted:', formData);
  };
  return (
  <div className="min-h-screen bg-[#C8D9E6] px-4 py-6">
    <div className="w-full flex justify-between items-center mb-8 px-4 md:px-12">
      <span className="text-2xl font-bold text-[#2F4156]">SkillSwap</span>
      <a
        href="/"
        className="text-[#2F4156] font-medium underline hover:text-[#35607A]"
      >
        ← Back to Home
      </a>
    </div>
    <div className="flex items-center justify-center">
      <div className="bg-white rounded-2xl p-8 shadow-xl w-full max-w-md">
        {step === 1 && (
          <>
            <h2 className="text-2xl font-bold text-[#2F4156] mb-6 text-center">Step 1: Your Details</h2>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="input-style"
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input-style"
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="input-style"
              onChange={handleChange}
            />
            <button
              onClick={() => setStep(2)}
              className="btn-style bg-[#35607A] text-white mt-4"
            >
              Next
            </button>
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
            <h2 className="text-2xl font-bold text-[#2F4156] mb-6 text-center">Step 2: Select Avatar</h2>
            <div className="grid grid-cols-2 gap-6 justify-items-center mb-6">
              {avatars.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`avatar-${index}`}
                  className={`w-24 h-24 object-cover rounded-full border-4 transition-all duration-200 ${
                    formData.avatar === src
                      ? 'border-[#35607A] scale-105'
                      : 'border-gray-300'
                  } cursor-pointer`}
                  onClick={() => selectAvatar(src)}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/96';
                  }}
                />
              ))}
            </div>
            <button
              onClick={handleSubmit}
              className="btn-style bg-[#2F4156] text-white"
            >
              Submit
            </button>
            <p className="mt-4 text-center text-sm text-gray-600">
              Already have an account?{' '}
              <a href="/login" className="text-[#35607A] hover:underline font-medium">
                Login here
              </a>
            </p>
          </>
        )}
      </div>
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
        width: 100%;
        padding: 0.75rem;
        font-size: 1rem;
        border-radius: 0.5rem;
        transition: all 0.3s ease;
      }

      .btn-style:hover {
        opacity: 0.9;
      }
    `}</style>
  </div>
);
}
