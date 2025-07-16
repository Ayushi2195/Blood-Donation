import React from "react";
import { postToBackend } from "../store/fetchdata";
import { baseUrl } from "../url";

type Donor = {
  id: string;
  name: string;
  bloodType: string;
  location: string;
  rating: number;
  lastDonation: string;
  availability: string;
  specialQualities?: string[];
  contact: string;
  verified: boolean;
  emergencyReady: boolean;
  languages?: string[];
  healthStatus?: string;
  donationCount?: number;
  responseTime?: string;
  socialConnections?: number;
};

type DonorCardProps = {
  donor: Donor;
  viewMode: "list" | "grid";
  onViewDetails: (donor: Donor) => void;
};

const DonorCard: React.FC<DonorCardProps> = ({ donor, viewMode, onViewDetails }) => {
  const specialQualities = donor.specialQualities ?? [];

  const handleContact = async (donorId: string) => {
    try {
      await postToBackend(`${baseUrl}/api/notifications/request`, { donorId });
      alert("Request sent to donor successfully!");
    } catch (error) {
      console.error("Failed to send patient request:", error);
      alert("Failed to send request. Please try again.");
    }
  };

  if (viewMode === "grid") {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition cursor-pointer" onClick={() => onViewDetails(donor)}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">{donor.name}</h3>
          <div className="flex items-center gap-2">
            {donor.verified && <span className="text-blue-600">✓</span>}
            {donor.emergencyReady && <span className="text-red-600">🚨</span>}
          </div>
        </div>
        <div className="space-y-2 mb-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Blood Type:</span>
            <span className="font-bold text-red-600">{donor.bloodType}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Rating:</span>
            <span className="font-semibold flex items-center gap-1 text-black">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i}>{i < Math.floor(donor.rating) ? '★' : '☆'}</span>
              ))}
              <span className="ml-1">{donor.rating}</span>
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Response:</span>
            <span className="font-semibold text-green-600">{donor.responseTime || 'N/A'}</span>
          </div>
        </div>
        <div className="bg-green-50 rounded-lg p-3 mb-4">
          <div className="text-sm font-semibold text-green-800">{donor.availability}</div>
        </div>
        <div className="flex flex-wrap gap-1 mb-4">
          {specialQualities.length > 0 ? specialQualities.map((quality, idx) => (
            <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
              {quality}
            </span>
          )) : <span className="text-gray-500 text-sm">No preferences listed.</span>}
        </div>
        <div className="flex gap-2">
          <button
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            onClick={e => {
              e.stopPropagation();
              handleContact(donor.id);
            }}
          >
            Contact Donor
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition cursor-pointer" onClick={() => onViewDetails(donor)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold text-red-600">{donor.name.charAt(0)}</span>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-xl font-bold text-gray-900">{donor.name}</h3>
              {donor.verified && <span className="text-blue-600 text-sm">✓ Verified</span>}
              {donor.emergencyReady && <span className="text-red-600 text-sm">🚨 Emergency Ready</span>}
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span className="text-black">📍 {donor.location}</span>
              <span className="text-black">📞 {donor.contact}</span>
              <span className="text-black">⭐ {donor.rating}</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-red-600 mb-1">{donor.bloodType}</div>
          <div className="text-sm font-semibold text-green-600">{donor.responseTime || 'N/A'}</div>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {specialQualities.length > 0 ? specialQualities.map((quality, idx) => (
            <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
              {quality}
            </span>
          )) : <span className="text-gray-500 text-sm">No preferences listed.</span>}
        </div>
        <div className="flex gap-2">
          <button
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            onClick={e => {
              e.stopPropagation();
              handleContact(donor.id);
            }}
          >
            Contact Donor
          </button>
        </div>
      </div>
      <div className="mt-4 bg-green-50 rounded-lg p-3">
        <span className="font-semibold text-green-800">{donor.availability}</span>
      </div>
    </div>
  );
};

export default DonorCard;