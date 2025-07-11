import React from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-center text-red-600">Sign Up</h2>
        <p className="mb-4 text-center text-gray-700">Sign up functionality coming soon.</p>
        <div className="text-center text-gray-600 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-red-600 hover:underline font-medium">Login</Link>
        </div>
      </div>
    </div>
  );
} 