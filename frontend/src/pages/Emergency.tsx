import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
const urgencyLevels = ["Immediate", "Within 2 hours", "Today", "Tomorrow"];
const urgencyColors = ["bg-red-600", "bg-orange-400", "bg-yellow-400", "bg-green-400"];
const demoDonors = [
  { name: "Rohit S.", blood: "A+", distance: "2 km", contact: "+91 98765 43210" },
  { name: "Meena P.", blood: "A+", distance: "3.5 km", contact: "+91 91234 56789" },
  { name: "Vikas T.", blood: "A+", distance: "5 km", contact: "+91 99887 77665" },
];
const recentRequests = [
  { patient: "Suman K.", blood: "A+", hospital: "AIIMS Delhi", time: "2 min ago" },
  { patient: "Ravi P.", blood: "O-", hospital: "Fortis Mumbai", time: "5 min ago" },
  { patient: "Neha S.", blood: "B+", hospital: "Apollo Bangalore", time: "10 min ago" },
  { patient: "Amit T.", blood: "AB-", hospital: "CMC Chennai", time: "15 min ago" },
];
const hotline = "+91 1800-123-456";
const activityTicker = [
  "The gift of blood is the gift of life. There is no substitute for human blood."
];

function Confetti() {
  // Simple confetti burst using emoji
  return (
    <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-50 animate-fade-in">
      <div className="text-6xl select-none animate-confetti">🎉✨🎊</div>
    </div>
  );
}

export default function Emergency() {
  const [form, setForm] = useState({
    patient: "",
    blood: "A+",
    units: "",
    hospital: "",
    location: "",
    contact: "",
    urgency: urgencyLevels[0],
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [showDonors, setShowDonors] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [tickerIdx, setTickerIdx] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTickerIdx((idx) => (idx + 1) % activityTicker.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      setShowLoginModal(true);
    }
  }, []);

  useEffect(() => {
    const body = document.body;
    const prev = body.style.background;
    const prevAnim = body.style.animation;
    body.style.background = "linear-gradient(135deg, #ffe5e5 0%, #ffb3b3 100%)";
    body.style.animation = "emergency-bg 8s ease-in-out infinite alternate";
    return () => {
      body.style.background = prev;
      body.style.animation = prevAnim;
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setShowDonors(true), 1200); // Simulate donor matching
    setShowConfetti(true);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
    setTimeout(() => setShowConfetti(false), 2000);
  };

  const shareText = encodeURIComponent(
    `EMERGENCY BLOOD REQUEST!\nPatient: ${form.patient}\nBlood Group: ${form.blood}\nHospital: ${form.hospital}\nContact: ${form.contact}\nUrgency: ${form.urgency}\nVia LifeDrop`
  );

  // Urgency meter color
  const urgencyIdx = urgencyLevels.indexOf(form.urgency);
  const urgencyColor = urgencyColors[urgencyIdx] || "bg-gray-300";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center min-h-screen pt-32 relative overflow-x-hidden"
    >
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-sm w-full flex flex-col items-center">
            <h2 className="text-xl font-bold mb-4 text-red-700 text-center">Please login to continue</h2>
            <button
              className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </div>
        </div>
      )}
      <style>{`
        @keyframes emergency-bg {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        .animate-pulse-slow {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .animate-glow-pulse {
          box-shadow: 0 0 0 0 #f87171;
          animation: glow-pulse 1.5s infinite;
        }
        @keyframes glow-pulse {
          0% { box-shadow: 0 0 0 0 #f87171; }
          70% { box-shadow: 0 0 0 10px rgba(248,113,113,0); }
          100% { box-shadow: 0 0 0 0 #f87171; }
        }
        .animate-ticker {
          animation: ticker 12s linear infinite;
        }
        @keyframes ticker {
          0% { opacity: 0; transform: translateY(20px); }
          10% { opacity: 1; transform: translateY(0); }
          90% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-20px); }
        }
        .animate-urgency-pulse {
          animation: urgency-pulse 1.2s infinite alternate;
        }
        @keyframes urgency-pulse {
          0% { filter: brightness(1); }
          100% { filter: brightness(1.5); }
        }
        .animate-confetti {
          animation: confetti-burst 1.5s cubic-bezier(0.4,0,0.2,1);
        }
        @keyframes confetti-burst {
          0% { opacity: 0; transform: scale(0.5) rotate(-30deg); }
          30% { opacity: 1; transform: scale(1.1) rotate(10deg); }
          100% { opacity: 0; transform: scale(0.7) rotate(0deg); }
        }
        .animate-pin-drop {
          animation: pin-drop 1.2s cubic-bezier(0.4,0,0.2,1);
        }
        @keyframes pin-drop {
          0% { opacity: 0; transform: translateY(-40px) scale(0.5); }
          60% { opacity: 1; transform: translateY(0) scale(1.2); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
      {/* Animated Attention Banner */}
      <div className="w-full max-w-2xl mx-auto mb-4">
        <div className="bg-red-600 text-white text-center py-3 rounded-xl font-bold text-lg shadow animate-pulse-slow md:ml-32 w-[600px] mx-auto">
          🚨 This is an emergency blood request page. Please fill the form urgently if you need help! 🚨
        </div>
      </div>
      {/* Live Activity Ticker */}
      <div className="w-full max-w-2xl mx-auto mb-4">
        <div className="bg-white text-pink-700 text-center py-2 rounded shadow font-semibold animate-ticker md:ml-32 w-[600px] mx-auto">
          {activityTicker[tickerIdx]}
        </div>
      </div>
      {/* Main content: Form + Right-side sections */}
      <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row gap-8 items-start justify-center mb-12">
        {/* Emergency Form Card (left) */}
        <div className="flex-1 min-w-[500px] max-w-[700px] md:ml-32">
          <div className="bg-white rounded-xl shadow-lg p-8 relative mb-8">
            {/* Urgency Meter */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-gray-700">Urgency Meter:</span>
                <span className={`w-4 h-4 rounded-full inline-block ${urgencyColor} animate-urgency-pulse`}></span>
                <span className="text-xs text-gray-500">({form.urgency})</span>
              </div>
              <div className="w-full h-2 rounded bg-gray-200 overflow-hidden">
                <div className={`h-2 ${urgencyColor} transition-all`} style={{ width: `${(4 - urgencyIdx) * 25}%` }}></div>
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-2 text-red-600">Emergency Blood Request</h1>
            <p className="mb-6 text-gray-700">Fill the form below to send an urgent blood request. We will notify matching donors instantly.</p>
            {!submitted ? (
              <form className="grid grid-cols-1 gap-4" onSubmit={handleSubmit}>
                <input name="patient" value={form.patient} onChange={handleChange} required placeholder="Patient Name" className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-300 bg-gray-200" />
                <div className="flex gap-4">
                  <select name="blood" value={form.blood} onChange={handleChange} className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-300 bg-gray-200">
                    {bloodGroups.map((bg) => <option key={bg}>{bg}</option>)}
                  </select>
                  <input name="units" value={form.units} onChange={handleChange} required placeholder="Units Needed" type="number" min="1" className="px-4 py-2 rounded-lg border border-gray-300 w-32 focus:ring-2 focus:ring-pink-300 bg-gray-200" />
                </div>
                <input name="hospital" value={form.hospital} onChange={handleChange} required placeholder="Hospital Name" className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-300 bg-gray-200" />
                <input name="location" value={form.location} onChange={handleChange} required placeholder="Hospital Location/Address" className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-300 bg-gray-200" />
                <input name="contact" value={form.contact} onChange={handleChange} required placeholder="Contact Number" className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-300 bg-gray-200" />
                <select name="urgency" value={form.urgency} onChange={handleChange} className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-300 bg-gray-200">
                  {urgencyLevels.map((u) => <option key={u}>{u}</option>)}
                </select>
                <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Additional Notes (optional)" className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-300 bg-gray-200" />
                <button type="submit" className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-red-700 transition animate-glow-pulse">Send Emergency Request</button>
              </form>
            ) : (
              <div className="text-center">
                <div className="text-xl font-bold text-green-600 mb-2">Request Sent!</div>
                <div className="mb-4 text-gray-700">We are notifying matching donors near <span className="font-semibold">{form.location || "your area"}</span>.</div>
                <div className="flex flex-col md:flex-row gap-4 justify-center mb-4">
                  <a href={`https://wa.me/?text=${shareText}`} target="_blank" rel="noopener noreferrer" className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-green-600 transition">Share on WhatsApp</a>
                  <a href={`sms:?body=${shareText}`} className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-blue-600 transition">Share via SMS</a>
                  <button onClick={() => {navigator.clipboard.writeText(`EMERGENCY BLOOD REQUEST! Patient: ${form.patient}, Blood Group: ${form.blood}, Hospital: ${form.hospital}, Contact: ${form.contact}, Urgency: ${form.urgency}`)}} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-semibold shadow hover:bg-gray-300 transition">Copy Request</button>
                </div>
                <div className="mb-4 text-sm text-gray-500">Or call our <span className="font-semibold text-red-600">Emergency Helpline: {hotline}</span></div>
                <div className="mb-6 text-xs text-gray-500">LifeDrop verifies all donors for your safety. Please follow hospital protocols for safe blood transfusion.</div>
                {/* Map Integration (static demo) with animated pin */}
                <div className="mb-6 flex flex-col items-center relative">
                  <div className="font-semibold mb-2">Hospital Location</div>
                  <div className="relative">
                    <img src="https://maps.googleapis.com/maps/api/staticmap?center=Delhi,India&zoom=13&size=400x200&maptype=roadmap&markers=color:red%7Clabel:H%7C28.6139,77.2090" alt="Map" className="rounded-lg border shadow" />
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl animate-pin-drop">📍</span>
                  </div>
                  <div className="text-xs text-gray-400 mt-1">(Demo map)</div>
                </div>
                {/* Live Donor Matching */}
                {showDonors && (
                  <div className="mb-6">
                    <div className="font-semibold text-pink-700 mb-2">Matching Donors Nearby</div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {demoDonors.map((d, i) => (
                        <div key={i} className="bg-pink-50 rounded-lg p-4 flex flex-col items-center shadow">
                          <div className="font-bold text-lg text-pink-700">{d.name}</div>
                          <div className="text-sm text-gray-700">Blood: {d.blood}</div>
                          <div className="text-sm text-gray-500">{d.distance} away</div>
                          <div className="text-xs text-gray-500">Contact: {d.contact}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {/* Request Status Tracking */}
                <div className="text-xs text-gray-400">Status: Notified {demoDonors.length} donors in your area.</div>
              </div>
            )}
            {/* Confetti Animation */}
            {showConfetti && <Confetti />}
            {/* Sound */}
            <audio ref={audioRef} src="https://cdn.pixabay.com/audio/2022/07/26/audio_124bfa1c82.mp3" preload="auto" />
          </div>
          {/* Motivational Quote/Story & Contact/Support - small box directly below form */}
          <div className="bg-white rounded-xl shadow p-6 mt-4 mb-12 max-w-md w-full text-center mx-auto">
            <div className="italic text-lg text-pink-700 mb-2">“The gift of blood is the gift of life. There is no substitute for human blood.”</div>
            <div className="text-sm text-gray-600 mb-4">Every donation counts. Thank you for being a hero in someone's story!</div>
            <div className="font-bold text-gray-800 mb-2">Need more help?</div>
            <a href="http://localhost:5173/contact" className="text-pink-600 font-semibold hover:underline inline-block">Contact Support</a>
          </div>
        </div>
        {/* Right-side stacked sections */}
        <div className="flex-1 flex flex-col gap-6 min-w-[400px] max-w-[600px]">
          {/* Emergency Tips & Safety Advice */}
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center justify-center text-center">
            <h2 className="text-xl font-bold text-red-600 mb-4 flex items-center gap-2 justify-center text-center">🩸 Emergency Tips & Safety Advice</h2>
            <div className="grid grid-cols-1 gap-4 w-full">
              <div className="flex flex-col items-center gap-3 text-center">
                <span className="text-2xl">🧘‍♂️</span>
                <div>
                  <div className="font-semibold text-gray-800">Stay Calm</div>
                  <div className="text-gray-600 text-sm">Take deep breaths and keep the patient comfortable while help is on the way.</div>
                </div>
              </div>
              <div className="flex flex-col items-center gap-3 text-center">
                <span className="text-2xl">📞</span>
                <div>
                  <div className="font-semibold text-gray-800">Contact Hospital Staff</div>
                  <div className="text-gray-600 text-sm">Inform the hospital about the emergency and follow their instructions.</div>
                </div>
              </div>
              <div className="flex flex-col items-center gap-3 text-center">
                <span className="text-2xl">💧</span>
                <div>
                  <div className="font-semibold text-gray-800">Keep Hydrated</div>
                  <div className="text-gray-600 text-sm">If allowed, give the patient small sips of water unless instructed otherwise by doctors.</div>
                </div>
              </div>
              <div className="flex flex-col items-center gap-3 text-center">
                <span className="text-2xl">🩹</span>
                <div>
                  <div className="font-semibold text-gray-800">Prepare for Transfusion</div>
                  <div className="text-gray-600 text-sm">Have the patient's ID and medical records ready for the hospital staff.</div>
                </div>
              </div>
            </div>
          </div>
          {/* What Happens Next */}
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center justify-center text-center">
            <h2 className="text-xl font-bold text-pink-700 mb-4 flex items-center gap-2 justify-center text-center">🔄 What Happens Next?</h2>
            <ol className="list-decimal pl-6 space-y-2 text-gray-700 w-full text-center mx-auto" style={{display:'inline-block', textAlign:'left'}}>
              <li>Your request is sent to matching donors instantly.</li>
              <li>Nearby donors receive a notification and can respond.</li>
              <li>Hospital staff will contact you as soon as a donor is found.</li>
              <li>Arrive at the hospital and follow staff instructions for transfusion.</li>
              <li>After the transfusion, rest and monitor the patient's recovery.</li>
            </ol>
          </div>
          {/* Emergency FAQ */}
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center justify-center text-center">
            <h2 className="text-xl font-bold text-yellow-600 mb-4 flex items-center gap-2 justify-center text-center">❓ Emergency FAQ</h2>
            <div className="space-y-4 w-full">
              <div>
                <div className="font-semibold text-gray-800">How quickly will I get a donor?</div>
                <div className="text-gray-600 text-sm">Most requests are matched within minutes, but timing depends on donor availability in your area.</div>
              </div>
              <div>
                <div className="font-semibold text-gray-800">Is the donor verified?</div>
                <div className="text-gray-600 text-sm">Yes, all LifeDrop donors are verified for safety and reliability.</div>
              </div>
              <div>
                <div className="font-semibold text-gray-800">What if no donor is found?</div>
                <div className="text-gray-600 text-sm">We keep your request active and notify you as soon as a match is found. You can also share your request via WhatsApp or SMS.</div>
              </div>
              <div>
                <div className="font-semibold text-gray-800">Can I edit or cancel my request?</div>
                <div className="text-gray-600 text-sm">Contact our support team or hospital staff for urgent changes or cancellations.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}