import React from "react";
const testimonials = [
  { name: "Amit Sharma", quote: "LifeDrop helped me find a donor in just a few hours. Forever grateful!" },
  { name: "Priya Singh", quote: "Donating blood through LifeDrop was easy and rewarding." },
];
export default function Testimonials() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <h1 className="text-3xl font-bold mb-4">Testimonials</h1>
      <div className="max-w-2xl w-full space-y-6">
        {testimonials.map((t, i) => (
          <div key={i} className="bg-gray-100 p-6 rounded shadow">
            <p className="italic mb-2">"{t.quote}"</p>
            <div className="text-right font-bold">- {t.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
} 