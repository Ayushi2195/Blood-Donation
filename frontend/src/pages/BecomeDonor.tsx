import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { patchToBackend, getFromBackend } from "../store/fetchdata";
import { baseUrl } from "../url";
import { motion } from "framer-motion";

export default function BecomeDonor() {
  const [isDonorAvailable, setIsDonorAvailable] = useState(false);
  const [availableUntil, setAvailableUntil] = useState("");
  const [currentRole, setCurrentRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [fontSize, setFontSize] = useState(1); // 1 = base, 1.25 = large, etc.
  const [highContrast, setHighContrast] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();
  const fontSizeClass = fontSize === 1 ? "" : fontSize === 1.25 ? "text-lg" : "text-xl";
  const contrastClass = highContrast ? "bg-black text-yellow-200" : "";

  // Fetch current donor status on page load
  useEffect(() => {
    const fetchDonorStatus = async () => {
      try {
        const res = await getFromBackend(`${baseUrl}/api/user/profile`);
        const user = res.data;
        setIsDonorAvailable(user.isDonorAvailable);
        setAvailableUntil(user.availableUntil ? user.availableUntil.slice(0, 10) : "");
        setCurrentRole(user.role);
      } catch (err) {
        console.error(err);
      }
    };
    fetchDonorStatus();
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      setShowLoginModal(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload: any = { isDonorAvailable };
      if (isDonorAvailable && availableUntil) {
        payload.availableUntil = availableUntil;
      }
      const res = await patchToBackend(`${baseUrl}/api/donor/update`, payload);
      setMessage(res.data.message);
      setCurrentRole(res.data.role);
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className={`flex flex-col items-center min-h-screen pt-32 px-0 w-screen bg-gray-50 ${contrastClass} ${fontSizeClass}`}
      style={{ fontSize: `${fontSize}em` }}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.5 }}
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
            <li>Aged 18-65 years and in good health.</li>
            <li>Weigh at least 50kg.</li>
            <li>No recent major surgery or illness.</li>
            <li>Not currently taking certain medications (check with staff).</li>
            <li>No recent tattoos/piercings (within 6 months).</li>
            <li>No recent travel to high-risk areas.</li>
          </ul>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-2xl font-bold mb-3 text-red-600">Donation Process</h2>
          <ol className="list-decimal ml-6 text-gray-700 space-y-1">
            <li>Register at the center or online.</li>
            <li>Brief health screening and mini check-up.</li>
            <li>Actual donation (10-15 minutes).</li>
            <li>Rest, refreshments, and recovery (10-15 minutes).</li>
          </ol>
        </div>
      </div>

      <div className="w-full max-w-md mb-8">
        <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-6">
          <h2 className="text-2xl font-extrabold text-red-600 mb-2 text-center">Manage Donor Status</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-gray-800 flex items-center justify-between text-lg">
                Available as Donor:
                <input
                  type="checkbox"
                  checked={isDonorAvailable}
                  onChange={(e) => setIsDonorAvailable(e.target.checked)}
                  className="w-6 h-6 accent-red-600 ml-2"
                />
              </label>
            </div>
            {isDonorAvailable && (
              <div className="flex flex-col gap-1">
                <label className="font-semibold text-gray-800 text-lg">Available Until:</label>
                <div className="flex items-center gap-3">
                  <input
                    type="date"
                    value={availableUntil}
                    onChange={(e) => setAvailableUntil(e.target.value)}
                    className="p-2 border rounded bg-white text-gray-900 font-semibold shadow-sm"
                    required
                  />
                  {availableUntil && (
                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-lg font-bold text-base border border-red-200">
                      {availableUntil.split('-').reverse().join('-')}
                    </span>
                  )}
                </div>
              </div>
            )}
            <button
              type="submit"
              className="bg-red-600 text-white px-6 py-3 rounded-xl font-bold text-lg hover:bg-red-700 transition mt-2"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Status"}
            </button>
            {message && <p className="text-center text-green-600 font-semibold">{message}</p>}
          </form>
        </div>
      </div>

      <div className="mt-8 text-gray-600 text-sm">
        <p>Current Role: <span className="font-semibold">{currentRole}</span></p>
      </div>

      {/* Preparation Tips */}
      <div className="max-w-3xl w-full mb-10 mt-12">
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-2xl font-bold mb-3 text-red-600">Preparation Tips</h2>
          <ul className="list-disc ml-6 text-gray-700 space-y-1">
            <li>Eat a healthy meal before donating.</li>
            <li>Drink plenty of water before and after.</li>
            <li>Avoid fatty foods and strenuous exercise.</li>
            <li>Bring a valid photo ID and list of medications.</li>
            <li>Wear comfortable clothing with sleeves that roll up easily.</li>
          </ul>
        </div>
      </div>

      {/* Contact & Support */}
      <div className="max-w-3xl w-full mb-10">
        <div className="bg-white rounded-xl shadow p-6 flex flex-col justify-between">
          <h2 className="text-2xl font-bold mb-3 text-red-600">Contact & Support</h2>
          <p className="mb-2 text-gray-700">Have questions or need help? <a href="/contact" className="text-red-600 hover:underline">Contact us</a>.</p>
          <p className="text-sm text-gray-700">Or email: <a href="mailto:support@lifedrop.com" className="underline">support@lifedrop.com</a></p>
        </div>
      </div>

      {/* Legal & Privacy Notice */}
      <div className="max-w-3xl w-full text-xs text-gray-500 text-center mb-8">
        <p>All donor information is kept confidential and used only for the purpose of blood donation coordination. Read our <a href="/privacy" className="underline">Privacy Policy</a>.</p>
      </div>
    </motion.div>
  );
}