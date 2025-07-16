import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const partners = [
  { name: "Apollo Hospitals", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Apollo_Hospitals_Logo.svg", quote: "LifeDrop is a trusted partner in our mission to save lives." },
  { name: "Red Cross", logo: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Emblem_of_the_Red_Cross.svg", quote: "We recommend LifeDrop for emergency blood needs." },
  { name: "Fortis Healthcare", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2b/Fortis_Healthcare_logo.svg", quote: "A reliable platform for connecting donors and recipients." },
];

const socialMedia = [
  { user: "@health4all", platform: "Twitter", content: "Just saw another life saved thanks to @LifeDrop! #DonateBlood #LifeSaver" },
  { user: "lifedrop_official", platform: "Instagram", content: "Proud to be part of a community that saves lives every day! ❤️🩸 #LifeDrop" },
  { user: "BloodBankIndia", platform: "Facebook", content: "We partner with LifeDrop to ensure no one waits for blood in emergencies." },
];

const awards = [
  { name: "Best Health Tech Startup 2023", badge: "🏆" },
  { name: "Red Cross Partner Award", badge: "🎖️" },
  { name: "Innovation in Social Impact", badge: "🌟" },
];

const featuredDonor = {
  name: "Riya Malhotra",
  photo: "https://randomuser.me/api/portraits/women/44.jpg",
  interview: "Donating blood is my way of giving back. LifeDrop made it so easy and meaningful! I encourage everyone to join this life-saving mission.",
};

const thankYous = [
  "Thank you LifeDrop for helping my son! - Suman",
  "Forever grateful to the donor who saved my mother. - Ravi",
  "You are real heroes! - Neha",
  "Blessed to have found LifeDrop in an emergency. - Amit",
  "Thank you for your quick response! - Priya",
  "You made a difference in our lives. - Anonymous",
];

export default function Testimonials() {
  const [mounted, setMounted] = useState(false);
  const [thankYouIdx, setThankYouIdx] = useState(0);
  const location = useLocation();
  useEffect(() => {
    setMounted(false);
    const timeout = setTimeout(() => setMounted(true), 10);
    const interval = setInterval(() => {
      setThankYouIdx((idx) => (idx + 1) % thankYous.length);
    }, 2500);
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [location.pathname]);

  return (
    <div className={`flex flex-col items-center min-h-screen px-4 py-12 bg-gray-50 transition-all duration-700 ease-out w-screen ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
      style={{ marginTop: '3.5rem' }}
    >
      <h1 className="text-4xl font-extrabold mb-2 text-red-700 text-center">Testimonials</h1>
      <h2 className="text-2xl font-semibold mb-8 text-red-500 text-center">Community Voices & Recognition</h2>
      {/* Partner/Organization Endorsements */}
      <section className="w-full max-w-3xl mb-12">
        <h2 className="text-2xl font-bold mb-4 text-blue-700 text-center">Our Partners Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {partners.map((p) => (
            <div key={p.name} className="bg-white rounded shadow p-4 flex flex-col items-center text-center">
              <img src={p.logo} alt={p.name} className="h-12 mb-2" />
              <div className="font-semibold text-lg mb-1">{p.name}</div>
              <div className="text-gray-600 text-sm italic">"{p.quote}"</div>
            </div>
          ))}
        </div>
      </section>
      {/* Social Media Wall */}
      <section className="w-full max-w-3xl mb-12">
        <h2 className="text-2xl font-bold mb-4 text-purple-700 text-center">Social Media Wall</h2>
        <div className="bg-white rounded shadow p-4 flex flex-col gap-4">
          {socialMedia.map((post, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="text-2xl">{post.platform === 'Twitter' ? '🐦' : post.platform === 'Instagram' ? '📸' : '📘'}</span>
              <div>
                <span className="font-semibold text-gray-800">{post.user}</span>
                <span className="ml-2 text-gray-500 text-xs">({post.platform})</span>
                <div className="text-gray-700">{post.content}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Awards & Recognition */}
      <section className="w-full max-w-3xl mb-12">
        <h2 className="text-2xl font-bold mb-4 text-yellow-700 text-center">Awards & Recognition</h2>
        <div className="flex flex-wrap gap-6 justify-center">
          {awards.map((a) => (
            <div key={a.name} className="flex flex-col items-center bg-white rounded shadow p-4 min-w-[160px]">
              <span className="text-4xl mb-2">{a.badge}</span>
              <div className="font-semibold text-lg text-gray-800 text-center">{a.name}</div>
            </div>
          ))}
        </div>
      </section>
      {/* Featured Donor of the Month */}
      <section className="w-full max-w-2xl mb-12">
        <h2 className="text-2xl font-bold mb-4 text-green-700 text-center">Featured Donor of the Month</h2>
        <div className="flex flex-col md:flex-row items-center gap-6 bg-white rounded shadow p-6">
          <img src={featuredDonor.photo} alt={featuredDonor.name} className="w-24 h-24 rounded-full object-cover border-4 border-green-300" />
          <div>
            <div className="font-bold text-lg text-green-800 mb-1 text-center md:text-left">{featuredDonor.name}</div>
            <div className="text-gray-700 italic text-center md:text-left">"{featuredDonor.interview}"</div>
          </div>
        </div>
      </section>
      {/* Thank You Wall */}
      <section className="w-full max-w-2xl mb-12">
        <h2 className="text-2xl font-bold mb-4 text-pink-700 text-center">Thank You Wall</h2>
        <div className="bg-white rounded shadow p-6 h-24 flex items-center justify-center text-lg font-semibold text-pink-600 animate-pulse min-h-[4rem]">
          {thankYous[thankYouIdx]}
        </div>
      </section>
    </div>
  );
} 