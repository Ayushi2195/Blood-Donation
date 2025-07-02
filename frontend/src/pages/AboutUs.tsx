import React from "react";

const teamMembers = [
  { name: "Neha Mehta", role: "Founder & CEO", bio: "Neha is passionate about saving lives and building communities. She founded LifeDrop to make blood donation easier and more accessible for everyone." },
  { name: "Rahul Verma", role: "Lead Developer", bio: "Rahul leads the tech team, ensuring the platform is reliable, secure, and user-friendly." },
  { name: "Priya Singh", role: "Community Manager", bio: "Priya connects donors and recipients, organizes events, and manages outreach programs." },
];

export default function AboutUs() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12 bg-gray-50" style={{ marginLeft: '7.25cm', marginTop: '3.5rem' }}>
      <h1 className="text-4xl font-extrabold mb-4 text-red-700">About Us</h1>
      <p className="max-w-2xl text-center mb-8 text-lg text-gray-700">
        LifeDrop is dedicated to connecting blood donors with those in need. Our mission is to save lives by making blood donation accessible, safe, and efficient for everyone.
      </p>
      <section id="mission" className="max-w-2xl mb-12">
        <h2 className="text-2xl font-bold mb-2 text-red-600">Our Mission</h2>
        <p className="text-gray-700">
          To create a seamless, trustworthy, and supportive network for blood donation. We strive to empower communities, raise awareness, and ensure that no one has to wait for the blood they need.
        </p>
      </section>
      <section id="team" className="max-w-2xl mb-12">
        <h2 className="text-2xl font-bold mb-2 text-blue-600">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {teamMembers.map((member) => (
            <div key={member.name} className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
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
      <section id="values" className="max-w-2xl mb-12">
        <h2 className="text-2xl font-bold mb-2 text-green-600" style={{ marginLeft: '-1.75rem' }}>Our Values</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>Compassion: We care deeply about every life and every donation.</li>
          <li>Trust: We ensure safety, privacy, and transparency in every interaction.</li>
          <li>Community: We believe in the power of people helping people.</li>
          <li>Innovation: We use technology to make giving and receiving blood easier and safer.</li>
        </ul>
      </section>
      <section id="timeline" className="max-w-2xl mb-12">
        <h2 className="text-2xl font-bold mb-2 text-indigo-600">Our Journey</h2>
        <ol className="relative border-l border-indigo-300 ml-4">
          <li className="mb-8 ml-6">
            <span className="absolute flex items-center justify-center w-6 h-6 bg-indigo-100 rounded-full -left-3 ring-8 ring-white">
              <svg className="w-3 h-3 text-indigo-600" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 12H9v-2h2v2zm0-4H9V7h2v3z" /></svg>
            </span>
            <h3 className="font-semibold text-lg text-indigo-700">Founded in 2022</h3>
            <p className="text-gray-600 text-sm">LifeDrop was established with a vision to make blood donation accessible and efficient for everyone.</p>
          </li>
          <li className="mb-8 ml-6">
            <span className="absolute flex items-center justify-center w-6 h-6 bg-indigo-100 rounded-full -left-3 ring-8 ring-white">
              <svg className="w-3 h-3 text-indigo-600" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 00-1.414 0L10 10.586 8.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l6-6a1 1 0 000-1.414z" /></svg>
            </span>
            <h3 className="font-semibold text-lg text-indigo-700">First 1000 Donors</h3>
            <p className="text-gray-600 text-sm">We celebrated our first 1000 registered donors, marking a major milestone in our mission to save lives.</p>
          </li>
          <li className="ml-6">
            <span className="absolute flex items-center justify-center w-6 h-6 bg-indigo-100 rounded-full -left-3 ring-8 ring-white">
              <svg className="w-3 h-3 text-indigo-600" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 12H9v-2h2v2zm0-4H9V7h2v3z" /></svg>
            </span>
            <h3 className="font-semibold text-lg text-indigo-700">Expanding Nationwide</h3>
            <p className="text-gray-600 text-sm">LifeDrop expanded its reach across the country, partnering with hospitals and organizations to maximize impact.</p>
          </li>
        </ol>
      </section>
    </div>
  );
} 