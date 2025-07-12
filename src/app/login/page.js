'use client';
import { useState } from 'react';
import Link from 'next/link';
export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = () => {
    console.log('Login:', { email, password });
    //login logic here
  };
  return (
    <div className="min-h-screen flex flex-col items-center bg-[#C8D9E6] px-4"> 
      <div className="w-full flex justify-between items-center mt-6 mb-8 px-6 md:px-12">
        <span className="text-2xl font-bold text-[#2F4156]">SkillSwap</span>
        <Link
          href="/"
          className="text-[#2F4156] font-medium underline hover:text-[#35607A]"
        >
          ← Back to Home
        </Link>
      </div>

      <div className="bg-white rounded-2xl p-8 mt-10 shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-[#2F4156] mb-6 text-center">Login to SkillMatch</h2>

        <input
          type="email"
          placeholder="Email"
          className="input-style"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="input-style"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="btn-style bg-[#35607A] text-white mt-2"
        >
          Login
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="text-[#35607A] hover:underline font-medium">
            Sign up here
          </Link>
        </p>
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
