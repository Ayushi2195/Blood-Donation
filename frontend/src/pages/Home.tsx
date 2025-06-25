import React from "react";
import { motion } from "framer-motion";
import heroBloodDrop from "../assets/hero-blood-drop.png";

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex flex-col items-center justify-center pt-32"
    >
      <div className="flex flex-col md:flex-row items-center gap-10">
        <div>
          <h1 className="text-5xl font-extrabold mb-6 text-gray-900 leading-tight drop-shadow-lg">
            <span className="text-red-600">LifeDrop</span> <br />
            <span className="text-yellow-500">Save Lives, Spread Smiles</span>
          </h1>
          <p className="mb-8 text-lg text-gray-700 max-w-lg">
            Join our mission to connect blood donors and recipients instantly. Your one drop can be someone's lifeline.
          </p>
          <div className="flex gap-4">
            <a href="/emergency" className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-red-700 transition transform hover:scale-105 active:scale-95">
              Emergency Request
            </a>
            <a href="/how-it-works" className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-lg font-semibold shadow hover:bg-yellow-500 transition transform hover:scale-105 active:scale-95">
              How It Works
            </a>
          </div>
        </div>
        <img src={heroBloodDrop} alt="Happy blood drops" className="w-64 h-64 object-cover rounded-xl shadow-lg floating bg-white" />
      </div>
      {/* Feature Cards Section */}
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center text-center mt-16 px-8">
        <h3 className="text-2xl font-bold mb-4 text-gray-800">Why Choose LifeDrop?</h3>
        <p className="mb-10 text-gray-600">Here's why thousands trust us to connect donors and recipients quickly and safely.</p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 w-full justify-items-center">
          {[
            {
              icon: (
                <svg className="w-10 h-10 text-red-500 mx-auto" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 21C12 21 4 13.5 4 8.5C4 5.42 6.42 3 9.5 3C11.24 3 12.91 3.81 14 5.08C15.09 3.81 16.76 3 18.5 3C21.58 3 24 5.42 24 8.5C24 13.5 16 21 16 21H12Z" />
                </svg>
              ),
              title: "Verified Donors",
              desc: "All donors are verified for safety and reliability.",
            },
            {
              icon: (
                <svg className="w-10 h-10 text-green-500 mx-auto" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M5 13l4 4L19 7" />
                </svg>
              ),
              title: "Quick Matching",
              desc: "Find donors or recipients in your area instantly.",
            },
            {
              icon: (
                <svg className="w-10 h-10 text-blue-500 mx-auto" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
              ),
              title: "24/7 Emergency",
              desc: "Emergency requests are prioritized and notified in real-time.",
            },
            {
              icon: (
                <svg className="w-10 h-10 text-yellow-500 mx-auto" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 8v4l3 3" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
              ),
              title: "Live Notifications",
              desc: "Stay updated with instant notifications and alerts.",
            },
          ].map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.07, boxShadow: "0 8px 32px rgba(0,0,0,0.15)" }}
              className="bg-white rounded-xl shadow p-6 flex flex-col items-center transition transform hover:-translate-y-2 hover:shadow-2xl"
            >
              {f.icon}
              <h4 className="mt-4 font-semibold text-lg">{f.title}</h4>
              <p className="text-gray-600 mt-2 text-center">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}