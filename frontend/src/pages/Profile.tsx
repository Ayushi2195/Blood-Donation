import React, { useEffect, useState } from "react";
import avatar1 from "../assets/avatar1.png";
import avatar2 from "../assets/avatar2.png";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getFromBackend } from "../store/fetchdata";
import { baseUrl } from "../url";

export default function Profile() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await getFromBackend(`${baseUrl}/api/user/profile`);
        setUser(res.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600 text-lg">Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-600 text-lg">Failed to load user data.</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center min-h-screen pt-32 px-2 w-screen bg-gray-50"
    >
      <div className="max-w-2xl w-full mx-auto bg-white rounded-xl shadow p-8 mb-8">
        {/* Profile Picture and Info */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-8">
          <div className="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center shrink-0 overflow-hidden">
            <img
              src={user.gender === "Female" ? avatar2 : avatar1}
              alt="Avatar"
              className="w-28 h-28 rounded-full object-cover border-4 border-gray-200 shadow"
            />
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <div className="text-lg font-bold text-gray-800">Name: <span className="font-normal">{user.name}</span></div>
            <div className="text-base text-gray-700">Email: {user.email}</div>
            <div className="text-base text-gray-700">Phone: {user.phone}</div>
            <div className="text-base text-gray-700">Date of Birth: {user.dateofBirth?.slice(0, 10)}</div>
            <div className="text-base text-gray-700">Gender: {user.gender}</div>
            <div className="text-base text-gray-700">Blood Group: {user.bloodGroup}</div>
            <div className="text-base text-gray-700">
              Address: {user.address}, {user.city}, {user.state}, {user.country} - {user.pincode}
            </div>
          </div>
        </div>

        {/* Donor Status */}
        <div className="flex flex-col md:flex-row gap-6 mb-8 border-t border-b py-4">
          <div className="flex-1 flex flex-col gap-1">
            <span className="font-semibold text-gray-700">
              Donor Status:{" "}
              <span className={user.isDonorAvailable ? "text-green-600 font-bold" : "text-gray-400 font-normal"}>
                {user.isDonorAvailable ? "Active" : "Not a Donor"}
              </span>
            </span>
            {user.isDonorAvailable && user.availableUntil && (
              <span className="font-semibold text-gray-700">
                Available Until:{" "}
                <span className="font-normal text-gray-800">
                  {new Date(user.availableUntil).toLocaleDateString()}
                </span>
              </span>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 justify-center">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 font-semibold">Edit Profile</button>
          <button className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 font-semibold">Logout</button>
        </div>

        {/* Legal */}
        <div className="w-full text-xs text-gray-500 text-center border-t pt-4">
          <p>
            <Link to="/privacy" className="underline">Privacy Policy</Link> |{" "}
            <Link to="/terms" className="underline">Terms of Service</Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
