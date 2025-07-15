import React, { useState } from "react";
import { motion } from "framer-motion";
// @ts-ignore: If type declaration for react-router-dom is missing, ignore for now
import { Link } from "react-router-dom";
import type { ChangeEvent, FormEvent } from "react";
import bloodDrop from "../assets/hero-blood-drop.png";

const eligibility = [
  "Aged 18-65 years and in good health.",
  "Weigh at least 50kg.",
  "No recent major surgery or illness.",
  "Not currently taking certain medications (check with staff).",
  "No recent tattoos/piercings (within 6 months).",
  "No recent travel to high-risk areas.",
];

const process = [
  "Register at the center or online.",
  "Brief health screening and mini check-up.",
  "Actual donation (10-15 minutes).",
  "Rest, refreshments, and recovery (10-15 minutes).",
];

const preparation = [
  "Eat a healthy meal before donating.",
  "Drink plenty of water before and after.",
  "Avoid fatty foods and strenuous exercise.",
  "Bring a valid photo ID and list of medications.",
  "Wear comfortable clothing with sleeves that roll up easily.",
];

export default function BecomeDonor() {
  const [form, setForm] = useState({
    wantToBeDonor: "yes",
    consent: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [fontSize, setFontSize] = useState(1); // 1 = base, 1.25 = large, etc.
  const [highContrast, setHighContrast] = useState(false);

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value, type } = e.target;
    let fieldValue: string | boolean = value;
    if (type === "checkbox") {
      fieldValue = (e.target as HTMLInputElement).checked;
    }
    setForm((prev) => ({
      ...prev,
      [name]: fieldValue,
    }));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
    // Here you would send data to backend
  }

  function handleDownloadCard() {
    const card = document.getElementById("donor-card");
    if (!card) return;
    const printContents = card.innerHTML;
    const win = window.open("", "", "width=400,height=300");
    if (win) {
      win.document.write(`<!DOCTYPE html><html><head><title>Donor Card</title></head><body>${printContents}</body></html>`);
      win.document.close();
      win.print();
    }
  }

  function handleShare(platform: string) {
    const url = window.location.href;
    const text = `I just registered as a blood donor! Join me and help save lives.`;
    if (platform === "twitter") {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`);
    } else if (platform === "facebook") {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
    } else if (platform === "whatsapp") {
      window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`);
    }
  }

  // Accessibility controls
  const fontSizeClass = fontSize === 1 ? "" : fontSize === 1.25 ? "text-lg" : "text-xl";
  const contrastClass = highContrast ? "bg-black text-yellow-200" : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.6 }}
      className={`flex flex-col items-center min-h-screen pt-32 px-0 w-screen bg-gray-50 ${contrastClass} ${fontSizeClass}`}
      style={{ fontSize: `${fontSize}em` }}
    >
      {/* Accessibility Controls */}
      <div className="fixed top-24 right-4 z-50 flex gap-2">
        <button
          className="px-2 py-1 rounded text-xs text-gray-700 bg-gray-200 hover:bg-gray-300"
          onClick={() => setFontSize((f) => Math.min(f + 0.25, 1.5))}
        >A+</button>
        <button
          className="px-2 py-1 rounded text-xs text-gray-700 bg-gray-200 hover:bg-gray-300"
          onClick={() => setFontSize((f) => Math.max(f - 0.25, 1))}
        >A-</button>
        <button
          className={`px-2 py-1 rounded text-xs text-gray-700 ${highContrast ? "bg-yellow-300" : "bg-gray-200 hover:bg-gray-300"}`}
          onClick={() => setHighContrast((c) => !c)}
        >Contrast</button>
      </div>

      {/* Introduction & Benefits */}
      <div className="max-w-3xl w-full mb-10 text-center">
        <h1 className="text-4xl font-bold mb-4 text-red-600">Become a Donor</h1>
        <p className="text-lg mb-2 text-black">Register as a donor and help save lives. One donation can save up to <span className="font-bold">three lives</span>!</p>
        <p className="text-md text-gray-700">You'll receive a free mini health check, support your community, and make a direct, positive impact.</p>
      </div>

      {/* Eligibility Criteria & Process */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full mb-10">
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-2xl font-bold mb-3 text-red-600">Eligibility Criteria</h2>
          <ul className="list-disc ml-6 text-gray-700 space-y-1">
            {eligibility.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-2xl font-bold mb-3 text-red-600">Donation Process</h2>
          <ol className="list-decimal ml-6 text-gray-700 space-y-1">
            {process.map((item, i) => <li key={i}>{item}</li>)}
          </ol>
        </div>
      </div>

      {/* Registration Form */}
      <div className="bg-white rounded-xl shadow p-8 max-w-2xl w-full mb-10">
        <h2 className="text-2xl font-bold mb-4 text-red-600">Donor Registration</h2>
        {submitted ? (
          <>
            <div className="text-green-600 font-semibold text-center py-6">Thank you for registering as a donor! We will contact you soon.</div>
            {/* Donor Card */}
            {/* Optionally, you can show a simple confirmation or donor badge here */}
          </>
        ) : (
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
              <label className="text-lg font-medium text-gray-800 mb-2">Do you want to become a donor?</label>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 text-black">
                  <input type="radio" name="wantToBeDonor" value="yes" checked={form.wantToBeDonor === "yes"} onChange={handleChange} />
                  Yes
                </label>
                <label className="flex items-center gap-2 text-black">
                  <input type="radio" name="wantToBeDonor" value="no" checked={form.wantToBeDonor === "no"} onChange={handleChange} />
                  No
                </label>
              </div>
            </div>
            <div className="flex items-center">
              <input type="checkbox" name="consent" checked={form.consent} onChange={handleChange} required className="mr-2" />
              <span className="text-sm text-gray-700">I consent to the use of my information for blood donation purposes.</span>
            </div>
            <button className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 w-full font-semibold" type="submit">Register</button>
          </form>
        )}
      </div>

      {/* Preparation Tips */}
      <div className="max-w-3xl w-full mb-10">
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-2xl font-bold mb-3 text-red-600">Preparation Tips</h2>
          <ul className="list-disc ml-6 text-gray-700 space-y-1">
            {preparation.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>
      </div>

      {/* Contact & Support */}
      <div className="max-w-3xl w-full mb-10">
        <div className="bg-white rounded-xl shadow p-6 flex flex-col justify-between">
          <h2 className="text-2xl font-bold mb-3 text-red-600">Contact & Support</h2>
          <p className="mb-2 text-gray-700">Have questions or need help? <Link to="/contact" className="text-red-600 hover:underline">Contact us</Link>.</p>
          <p className="text-sm text-gray-700">Or email: <a href="mailto:support@lifedrop.com" className="underline">support@lifedrop.com</a></p>
        </div>
      </div>

      {/* Legal & Privacy Notice */}
      <div className="max-w-3xl w-full text-xs text-gray-500 text-center mb-8">
        <p>All donor information is kept confidential and used only for the purpose of blood donation coordination. Read our <Link to="/privacy" className="underline">Privacy Policy</Link>.</p>
      </div>
    </motion.div>
  );
}