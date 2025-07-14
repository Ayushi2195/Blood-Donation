import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const mainLinks = [
  { name: "Home", path: "/" },
  { name: "FAQ's", path: "/faq" },
  { name: "Find a Donor", path: "/find-donor" },
  { name: "Become a Donor", path: "/become-donor" },
  { name: "Contact Us", path: "/contact" },
];

const infoLinks = [
  { name: "About Us", path: "/about", icon: (
      <svg className="inline w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
    ), description: "Who we are, our mission, and our team.", submenu: [
      { name: "Our Team", path: "/about#team" },
      { name: "Our Mission", path: "/about#mission" },
    ] },
  { name: "Testimonials", path: "/testimonials", icon: (
      <svg className="inline w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M7 17a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v6a4 4 0 0 1-4 4H7zm0 0v4m10-4v4"/></svg>
    ) },
  { name: "Terms", path: "/terms", icon: (
      <svg className="inline w-4 h-4 mr-2 text-yellow-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h10zm0 0v4H7V3"/></svg>
    ) },
  { name: "Privacy", path: "/privacy", icon: (
      <svg className="inline w-4 h-4 mr-2 text-pink-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 17a5 5 0 0 0 5-5V7a5 5 0 0 0-10 0v5a5 5 0 0 0 5 5z"/></svg>
    ) },
  // Divider
  { divider: true },
  { name: "Careers", path: "/careers", icon: (
      <svg className="inline w-4 h-4 mr-2 text-indigo-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-8 0v2"/><circle cx="12" cy="7" r="4"/></svg>
    ) },
  { name: "Blog", path: "/blog", icon: (
      <svg className="inline w-4 h-4 mr-2 text-orange-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M7 10h10M7 14h5"/></svg>
    ) },
];

export default function Navbar() {
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

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
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-600 rounded-full border-2 border-white"></span>
        </Link>
        {/* Profile Avatar Icon */}
        <Link to="/login" className="ml-2">
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
        <div className="relative" ref={dropdownRef}
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <button
            className="font-medium text-white hover:text-red-200 transition focus:outline-none"
            tabIndex={0}
            aria-haspopup="true"
            aria-expanded={showDropdown}
            onClick={() => setShowDropdown((prev) => !prev)}
          >
            More
            <svg className="inline w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" /></svg>
          </button>
          {showDropdown && (
            <div
              className="absolute right-0 w-48 bg-white border rounded shadow-lg z-10"
            >
              {infoLinks.map((link, idx) => (
                link.divider ? (
                  <hr key={idx} className="my-2 border-t border-gray-200" />
                ) : !link.path ? null : link.name === "About Us" ? (
                  <div key={link.name} className="group relative">
                    <Link
                      to={link.path}
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600"
                    >
                      {link.icon}
                      <span>{link.name}</span>
                    </Link>
                    <span className="block text-xs text-gray-500 px-4 pb-1">{link.description}</span>
                  </div>
                ) : link.name === "Testimonials" ? (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="flex items-center px-4 py-2 text-pink-500 hover:bg-red-50 hover:text-red-600"
                  >
                    {link.icon}
                    <span>{link.name}</span>
                  </Link>
                ) : (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600"
                  >
                    {link.icon}
                    <span>{link.name}</span>
                  </Link>
                )
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}