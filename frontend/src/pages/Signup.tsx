import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../url.ts";
import { motion } from "framer-motion";
interface FormData {
  name: string;
  email: string;
  password: string;
  dateofBirth: string;
  gender: string;
  bloodGroup: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
}

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    dateofBirth: "",
    gender: "",
    bloodGroup: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post(`${baseUrl}/api/auth/register`, formData);
      navigate("/login");
    } catch (err: any) {
      alert(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -40, opacity: 0 }}
      transition={{ duration: 1.8, type: "spring", ease: "easeOut" }}
      className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-2 mt-12"
    >
      <div className="w-full max-w-4xl bg-white p-10 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-8 text-center text-red-600">Create an Account</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input id="name" name="name" onChange={handleChange} value={formData.name} required placeholder="Full Name" className="w-full px-3 py-2 border border-gray-300 rounded bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-200" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input id="email" name="email" onChange={handleChange} value={formData.email} required type="email" placeholder="Email" className="w-full px-3 py-2 border border-gray-300 rounded bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-200" />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input id="password" name="password" onChange={handleChange} value={formData.password} required type="password" placeholder="Password" className="w-full px-3 py-2 border border-gray-300 rounded bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-200" />
            </div>
            <div>
              <label htmlFor="dateofBirth" className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
              <input id="dateofBirth" name="dateofBirth" onChange={handleChange} value={formData.dateofBirth} required type="date" className="w-full px-3 py-2 border border-gray-300 rounded bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-200" placeholder="Date of Birth" title="Enter your date of birth" />
            </div>
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
              <select id="gender" name="gender" onChange={handleChange} value={formData.gender} required className="w-full px-3 py-2 border border-gray-300 rounded bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-200" title="Select your gender">
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="bloodGroup" className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
              <select id="bloodGroup" name="bloodGroup" onChange={handleChange} value={formData.bloodGroup} required className="w-full px-3 py-2 border border-gray-300 rounded bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-200" title="Select your blood group">
                <option value="">Select Blood Group</option>
                <option>O+</option>
                <option>O-</option>
                <option>A+</option>
                <option>A-</option>
                <option>B+</option>
                <option>B-</option>
                <option>AB+</option>
                <option>AB-</option>
              </select>
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input id="phone" name="phone" onChange={handleChange} value={formData.phone} required placeholder="Phone Number" className="w-full px-3 py-2 border border-gray-300 rounded bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-200" />
            </div>
            <div className="pt-2 border-t border-gray-200">
              <h3 className="text-md font-semibold text-gray-800 mb-2">Address Details</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input id="address" name="address" onChange={handleChange} value={formData.address} required placeholder="Address" className="w-full px-3 py-2 border border-gray-300 rounded bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-200" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input id="city" name="city" onChange={handleChange} value={formData.city} required placeholder="City" className="w-full px-3 py-2 border border-gray-300 rounded bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-200" />
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State</label>
                    <input id="state" name="state" onChange={handleChange} value={formData.state} required placeholder="State" className="w-full px-3 py-2 border border-gray-300 rounded bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-200" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                    <input id="country" name="country" onChange={handleChange} value={formData.country} required placeholder="Country" className="w-full px-3 py-2 border border-gray-300 rounded bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-200" />
                  </div>
                  <div>
                    <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                    <input id="pincode" name="pincode" onChange={handleChange} value={formData.pincode} required placeholder="Pincode" className="w-full px-3 py-2 border border-gray-300 rounded bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-200" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded font-medium mt-4">
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-red-600 hover:underline font-medium">Login</Link>
        </p>
      </div>
    </motion.div>
  );
}