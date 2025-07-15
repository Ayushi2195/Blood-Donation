import React, { useEffect, useState } from "react";
import { patchToBackend, getFromBackend } from "../store/fetchdata";
import { baseUrl } from "../url";
import { motion } from "framer-motion";

export default function BecomeDonor() {
  const [isDonorAvailable, setIsDonorAvailable] = useState(false);
  const [availableUntil, setAvailableUntil] = useState("");
  const [currentRole, setCurrentRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

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
      className="flex flex-col items-center justify-center min-h-screen bg-gray-50 pt-32"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.5 }}
    >
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

      <h1 className="text-4xl font-bold mb-6 text-red-600">Manage Donor Status</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-8 w-full max-w-md space-y-4">
        <div className="flex items-center space-x-4">
          <label className="font-medium text-black">Available as Donor:</label>
          <input
            type="checkbox"
            checked={isDonorAvailable}
            onChange={(e) => setIsDonorAvailable(e.target.checked)}
            className="w-5 h-5"
          />
        </div>

        {isDonorAvailable && (
          <div>
            <label className="block text-gray-700 mb-1">Available Until:</label>
            <input
              type="date"
              value={availableUntil}
              onChange={(e) => setAvailableUntil(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        )}

        <button
          type="submit"
          className="bg-red-600 text-white px-4 py-2 rounded w-full hover:bg-red-700 transition"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Status"}
        </button>

        {message && <p className="text-center text-green-600">{message}</p>}
      </form>

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

