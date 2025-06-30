import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const mainLinks = [
  { name: "Home", path: "/" },
  { name: "FAQ's", path: "/faq" },
  { name: "Find a Donor", path: "/find-donor" },
  { name: "Become a Donor", path: "/become-donor" },
  { name: "Contact Us", path: "/contact" },
];

const infoLinks = [
  { name: "About Us", path: "/about" },
  { name: "Testimonials", path: "/testimonials" },
  { name: "How It Works", path: "/how-it-works" },
  { name: "Terms", path: "/terms" },
  { name: "Privacy", path: "/privacy" },
];

export default function Navbar() {
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <nav className="bg-white/70 backdrop-blur-md shadow flex items-center justify-between px-8 py-4 fixed w-full z-50">
      <Link to="/" className="text-2xl font-extrabold text-red-600 tracking-tight">
        LifeDrop
      </Link>
      <div className="flex gap-6 items-center">
        {mainLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className={`font-medium hover:text-red-600 transition ${
              location.pathname === link.path ? "text-red-600" : "text-gray-700"
            }`}
          >
            {link.name}
          </Link>
        ))}
        {/* Bell Icon for Notifications */}
        <Link to="/notifications" className="relative group">
          <svg
            className="w-6 h-6 text-gray-700 hover:text-red-600 transition"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
        {/* Profile Avatar Icon */}
        <Link to="/profile" className="ml-2">
          <div className="w-8 h-8 rounded-full bg-white border border-neutral-800 flex items-center justify-center shadow">
            <svg
              className="w-6 h-6 text-black"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="8" r="4" />
              <path d="M16 20v-1a4 4 0 00-8 0v1" />
            </svg>
          </div>
        </Link>
        {/* More Dropdown */}
        <div className="relative">
          <button
            className="font-medium text-white hover:text-red-200 transition focus:outline-none"
            tabIndex={0}
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
            onFocus={() => setShowDropdown(true)}
            onBlur={() => setShowDropdown(false)}
            aria-haspopup="true"
            aria-expanded={showDropdown}
          >
            More
            <svg className="inline w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" /></svg>
          </button>
          {showDropdown && (
            <div
              className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10"
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              {infoLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}