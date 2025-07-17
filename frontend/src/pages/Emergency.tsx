import React, { useState } from "react";
import { postToBackend } from "../store/fetchdata";
import { baseUrl } from "../url";
import { useNavigate } from "react-router";


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

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Emergency Blood Request</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="patientName" value={form.patientName} onChange={handleChange} required placeholder="Patient Name" className="w-full p-2 border rounded" />
        <input type="tel" name="contactNumber" value={form.contactNumber} onChange={handleChange} required placeholder="Contact Number" className="w-full p-2 border rounded" />
        <input type="text" name="hospitalName" value={form.hospitalName} onChange={handleChange} required placeholder="Hospital Name" className="w-full p-2 border rounded" />
        <input type="text" name="hospitalLocation" value={form.hospitalLocation} onChange={handleChange} required placeholder="Hospital Location" className="w-full p-2 border rounded" />
        <input type="text" name="bloodType" value={form.bloodType.toUpperCase()} onChange={handleChange} required placeholder="Blood Type (e.g., A+)" className="w-full p-2 border rounded" />
        <input type="number" name="unitsNeeded" value={form.unitsNeeded} onChange={handleChange} required placeholder="Units Needed" className="w-full p-2 border rounded" />
        <label htmlFor="urgency" className="block font-medium">
          Urgency Level
        </label>
        <select
          id="urgency"
          name="urgency"
          value={form.urgency}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition">Send Emergency Request</button>
      </form>
    </div>
  );
};

export default EmergencyRequest;