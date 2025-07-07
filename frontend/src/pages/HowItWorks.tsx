import React from "react";
import { Link } from "react-router-dom";
export default function HowItWorks() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <h1 className="text-3xl font-bold mb-4">How It Works</h1>
      <p className="max-w-xl text-center mb-6 text-gray-700">
        LifeDrop makes blood donation simple and accessible. Here's how you can become a lifesaver or get help in just a few steps:
      </p>
      <ol className="list-decimal max-w-xl mx-auto text-left space-y-2 mb-6">
        <li>Sign up as a donor or recipient.</li>
        <li>Search for donors or submit a blood request.</li>
        <li>Get matched and notified instantly.</li>
        <li>Coordinate donation and save lives!</li>
      </ol>
      <Link to="/faq" className="text-red-600 font-semibold hover:underline">Read Frequently Asked Questions &rarr;</Link>
    </div>
  );
} 