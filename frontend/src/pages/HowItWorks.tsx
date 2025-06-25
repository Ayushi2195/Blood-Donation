import React from "react";
export default function HowItWorks() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <h1 className="text-3xl font-bold mb-4">How It Works</h1>
      <ol className="list-decimal max-w-xl mx-auto text-left space-y-2">
        <li>Sign up as a donor or recipient.</li>
        <li>Search for donors or submit a blood request.</li>
        <li>Get matched and notified instantly.</li>
        <li>Coordinate donation and save lives!</li>
      </ol>
    </div>
  );
} 