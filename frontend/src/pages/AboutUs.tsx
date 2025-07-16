import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const teamMembers = [
  { name: "Neha Mehta", role: "Founder & CEO", bio: "Neha is passionate about saving lives and building communities. She founded LifeDrop to make blood donation easier and more accessible for everyone." },
  { name: "Rahul Verma", role: "Lead Developer", bio: "Rahul leads the tech team, ensuring the platform is reliable, secure, and user-friendly." },
  { name: "Priya Singh", role: "Community Manager", bio: "Priya connects donors and recipients, organizes events, and manages outreach programs." },
];

export default function AboutUs() {
  const [mounted, setMounted] = useState(false);
  const location = useLocation();
  useEffect(() => {
    setMounted(false);
    const timeout = setTimeout(() => setMounted(true), 10);
    return () => clearTimeout(timeout);
  }, [location.pathname]);
  return (
    <div
      className={`flex flex-col items-center min-h-screen px-4 py-12 bg-gradient-to-b from-rose-150 to-rose-200 transition-all duration-700 ease-out w-screen ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
      style={{ marginTop: '3.5rem' }}
    >
      <div className="bg-white rounded-xl shadow p-8 max-w-2xl w-full flex flex-col items-center">
        <h1 className="text-4xl font-extrabold mb-4 text-red-700 text-center">About Us</h1>
        <p className="max-w-2xl mb-8 text-lg text-gray-700 text-center">
        LifeDrop is dedicated to connecting blood donors with those in need. Our mission is to save lives by making blood donation accessible, safe, and efficient for everyone.
      </p>
        <section id="mission" className="max-w-2xl mb-12 w-full">
          <h2 className="text-2xl font-bold mb-2 text-red-600 text-center">Our Mission</h2>
          <p className="text-gray-700 text-center">
          To create a seamless, trustworthy, and supportive network for blood donation. We strive to empower communities, raise awareness, and ensure that no one has to wait for the blood they need.
        </p>
      </section>
        <section id="team" className="max-w-2xl mb-12 w-full">
          <h2 className="text-2xl font-bold mb-2 text-blue-600 text-center">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {teamMembers.map((member) => (
              <div key={member.name} className="bg-gray-50 rounded-lg shadow p-4 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold text-gray-500 mb-2">
                {member.name[0]}
              </div>
              <div className="font-semibold text-lg">{member.name}</div>
              <div className="text-sm text-gray-500 mb-1">{member.role}</div>
              <div className="text-xs text-gray-600 text-center">{member.bio}</div>
            </div>
          ))}
        </div>
      </section>
        <section id="values" className="max-w-2xl mb-12 w-full">
          <h2 className="text-2xl font-bold mb-2 text-green-600 text-center" style={{ marginLeft: '-1.75rem' }}>Our Values</h2>
          <ul className="list-disc list-inside text-gray-700 text-left">
          <li>Compassion: We care deeply about every life and every donation.</li>
          <li>Trust: We ensure safety, privacy, and transparency in every interaction.</li>
          <li>Community: We believe in the power of people helping people.</li>
          <li>Innovation: We use technology to make giving and receiving blood easier and safer.</li>
        </ul>
      </section>
      </div>
    </div>
  );
} 