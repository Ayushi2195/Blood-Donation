import React, { useEffect, useState } from "react";
import { postToBackend } from "../store/fetchdata";
import { baseUrl } from "../url";
import { useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { useAuth } from "../store/auth";


const EmergencyRequest = () => {
  const [form, setForm] = useState({
    patientName: "",
    contactNumber: "",
    hospitalName: "",
    hospitalLocation: "",
    bloodType: "",
    unitsNeeded: "",
    urgency: "high",
  });
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await postToBackend(`${baseUrl}/api/notifications/emergency`, form);
      if (response.status === 201) {
        alert("Emergency request sent to matching donors.");
        console.log(response.data);
        navigate("/");
      } else {
        alert("Unexpected response. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Error sending emergency request.");
    }
  };
    useEffect(() => {
      if (!isLoggedIn) {
          setShowLoginModal(true);
      }
  }, [isLoggedIn]);

  return (
    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -40 }} transition={{ duration: 0.6 }} className="w-screen flex flex-col items-center" style={{ minHeight: '100vh' }}>
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
      {/* Motivational Quote */}
      <div className="w-full flex justify-center mb-8" style={{ paddingTop: '7.5rem' }}>
        <blockquote className="text-xl italic font-bold text-center text-black max-w-2xl">
          "Stay strong. Help is on the way, and your courage makes a difference."
        </blockquote>
      </div>
      <div className="flex flex-col lg:flex-row gap-10 w-full justify-center items-start lg:items-center" style={{ maxWidth: '1200px' }}>
        {/* Left: Emergency Form */}
        <div className="flex-1 max-w-xl mx-auto p-10 bg-white/90 rounded-2xl shadow-xl border border-rose-100">
          <h2 className="text-3xl font-extrabold mb-8 text-red-600 text-center tracking-wider drop-shadow">Emergency Blood Request</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <input type="text" name="patientName" value={form.patientName} onChange={handleChange} required placeholder="Patient Name" className="w-full p-2 border rounded bg-white" />
            <input type="tel" name="contactNumber" value={form.contactNumber} onChange={handleChange} required placeholder="Contact Number" className="w-full p-2 border rounded bg-white" />
            <input type="text" name="hospitalName" value={form.hospitalName} onChange={handleChange} required placeholder="Hospital Name" className="w-full p-2 border rounded bg-white" />
            <input type="text" name="hospitalLocation" value={form.hospitalLocation} onChange={handleChange} required placeholder="Hospital Location" className="w-full p-2 border rounded bg-white" />
            <input type="text" name="bloodType" value={form.bloodType.toUpperCase()} onChange={handleChange} required placeholder="Blood Type (e.g., A+)" className="w-full p-2 border rounded bg-white" />
            <input type="number" name="unitsNeeded" value={form.unitsNeeded} onChange={handleChange} required placeholder="Units Needed" className="w-full p-2 border rounded bg-white" />
            <label htmlFor="urgency" className="block font-medium">
              Urgency Level
            </label>
            <select
              id="urgency"
              name="urgency"
              value={form.urgency}
              onChange={handleChange}
              className="w-full p-2 border rounded bg-white"
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <button type="submit" className="bg-red-600 text-white px-6 py-3 rounded-xl font-bold text-lg w-full shadow hover:bg-red-700 transition">Send Emergency Request</button>
          </form>
        </div>
        {/* Right: Info Boxes */}
        <div className="flex-1 max-w-md w-full space-y-8 self-center mt-8 lg:mt-0">
          {/* Box 1: What to do in an emergency? */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-blue-700 mb-2">What to do in an emergency?</h3>
            <ul className="list-disc pl-5 text-blue-900 text-sm space-y-1">
              <li>Stay calm and ensure your safety first.</li>
              <li>Double-check the patient’s details before submitting the request.</li>
              <li>Keep your phone nearby for updates or calls from donors.</li>
              <li>Inform hospital staff about the situation.</li>
              <li>If possible, arrange for immediate transportation to the hospital.</li>
            </ul>
          </div>
          {/* Box 2: Need more support? */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl shadow-lg p-6 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-yellow-700 mb-1">Need more support?</h3>
              <p className="text-yellow-900 text-sm">If you need urgent help or have questions, please <a href='/contact' className='underline text-yellow-800 hover:text-yellow-900'>contact us</a>.</p>
            </div>
          </div>
          {/* Box 3: What happens next? */}
          <div className="bg-green-50 border border-green-200 rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-green-700 mb-2">What happens next?</h3>
            <ul className="list-disc pl-5 text-green-900 text-sm space-y-1">
              <li>Your emergency request will be forwarded to matching donors immediately.</li>
              <li>You will be notified as soon as a donor responds.</li>
              <li>Our team may reach out for further assistance if needed.</li>
              <li>You can track the status of your request in your notifications.</li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EmergencyRequest;