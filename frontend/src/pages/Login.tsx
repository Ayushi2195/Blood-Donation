import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    setError("");
    // TODO: Implement authentication logic
    alert(`Logged in as ${email}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-screen bg-rose-100">
      <div
        className="w-[600px] h-[600px] bg-white p-8 rounded-2xl shadow-xl flex flex-col items-center justify-center border-4 border-rose-300"
      >
        <h2 className="text-3xl mb-10 text-center text-gray-800 tracking-tight">Sign in your account</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 items-center w-full">
          <div className="w-full flex flex-col items-center">
            <div className="w-full max-w-xs mx-auto">
              <input
                type="email"
                className="w-full px-5 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-emerald-100 text-base placeholder-gray-400 shadow-sm transition"
                placeholder="Your Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="w-full flex flex-col items-center">
            <div className="w-full max-w-xs mx-auto">
              <input
                type="password"
                className="w-full px-5 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-emerald-100 text-base placeholder-gray-400 shadow-sm transition"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          {error && <div className="text-red-500 text-base text-center w-full max-w-xs mx-auto">{error}</div>}
          <div className="w-full max-w-xs mx-auto">
            <button
              type="submit"
              className="w-full bg-emerald-500 text-white py-3 rounded-lg text-lg font-bold shadow-md hover:bg-emerald-600 transition"
            >
              Sign In
            </button>
          </div>
        </form>
        <div className="mt-8 flex flex-col items-center gap-3 w-full">
          <Link to="#" className="text-violet-600 font-semibold hover:underline text-base">Forgot your password?</Link>
          <div className="text-gray-500 text-base">
            First time here?{' '}
            <Link to="/signup" className="text-violet-700 font-bold hover:underline">Create an account</Link>
          </div>
        </div>
      </div>
    </div>
  );
} 