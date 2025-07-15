import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../url.ts";
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-lg bg-white p-8 rounded shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-red-600">Create an Account</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input name="name" onChange={handleChange} value={formData.name} required placeholder="Full Name" className="input" />
            <input name="email" onChange={handleChange} value={formData.email} required type="email" placeholder="Email" className="input" />
            <input name="password" onChange={handleChange} value={formData.password} required type="password" placeholder="Password" className="input" />
            <input
              name="dateofBirth"
              onChange={handleChange}
              value={formData.dateofBirth}
              required
              type="date"
              className="input"
              placeholder="Date of Birth"
              title="Enter your date of birth"
            />
            <select name="gender" onChange={handleChange} value={formData.gender} required className="input" title="Select your gender">
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
            <select name="bloodGroup" onChange={handleChange} value={formData.bloodGroup} required className="input" title="Select your blood group">
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
            <input name="phone" onChange={handleChange} value={formData.phone} required placeholder="Phone Number" className="input" />
            <input name="address" onChange={handleChange} value={formData.address} required placeholder="Address" className="input" />
            <input name="city" onChange={handleChange} value={formData.city} required placeholder="City" className="input" />
            <input name="state" onChange={handleChange} value={formData.state} required placeholder="State" className="input" />
            <input name="country" onChange={handleChange} value={formData.country} required placeholder="Country" className="input" />
            <input name="pincode" onChange={handleChange} value={formData.pincode} required placeholder="Pincode" className="input" />
          </div>

          <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded font-medium">
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-red-600 hover:underline font-medium">Login</Link>
        </p>
      </div>
    </div>
  );
}