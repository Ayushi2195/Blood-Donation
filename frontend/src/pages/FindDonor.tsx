import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { getFromBackend } from "../store/fetchdata";
import { baseUrl } from "../url";
import DonorCard from "../components/DonorCard";
import { useAuth } from "../store/auth";
interface Donor {
  id: string;
  name: string;
  location: string;
  bloodType: string;
  age: number;
  languages: string[];
  donationCount: number;
  lastDonation: string;
  Details: string;
  availability: string;
  preferences: string[];
}

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const preferencesList = [
  "Available Today",
  "First-Time Donor",
  "Experienced Donor",
  "Can Donate Platelets",
  "Can Donate Plasma",
  "No Recent Illness",
  "Willing to Travel",
];

export default function FindDonor() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBloodType, setSelectedBloodType] = useState("");
  const [preferencesFilter, setPreferencesFilter] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [donors, setDonors] = useState<Donor[]>([]);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [showFilters, setShowFilters] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
      if (!isLoggedIn) {
          setShowLoginModal(true);
      }
  }, [isLoggedIn]);


  const fetchDonors = useCallback(async () => {
    try {
      const queryParams = new URLSearchParams();
      if (searchQuery) queryParams.append("search", searchQuery);
      if (selectedBloodType) queryParams.append("bloodType", selectedBloodType);
      if (selectedLocation) queryParams.append("location", selectedLocation);
      if (preferencesFilter.length > 0)
        preferencesFilter.forEach(req => queryParams.append("preferences", req));

      const url = `${baseUrl}/api/donor/find?${queryParams.toString()}`;
      const res = await getFromBackend(url);

      setDonors(
        res.data.map((d: any) => ({
          id: d._id,
          name: d.name,
          location: d.city ?? "Unknown",
          bloodType: d.bloodGroup,
          age: d.age ?? '',
          languages: d.languages ?? [],
          donationCount: d.donationCount ?? 0,
          lastDonation: d.lastDonation ?? 'N/A',
          Details: 'Contact Donor for Details',
          availability: d.isDonorAvailable ? "Available" : "Unavailable",
          specialQualities: d.preferences ?? [], 
          verified: true,       // placeholder
          emergencyReady: false, // placeholder
          rating: 4.7,           // placeholder
          healthStatus: "Good",  // placeholder
          socialConnections: 0,  // placeholder
        }))
      );
    } catch (err) {
      console.error("Error fetching donors:", err);
    }
  }, [searchQuery, selectedBloodType, selectedLocation, preferencesFilter]);

  useEffect(() => {
    fetchDonors();
  }, [fetchDonors]);

  const filteredDonors = donors;
  console.log("filteredDonors:", filteredDonors);

  return (
    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -40 }} transition={{ duration: 0.6 }} className="min-h-screen pt-32 px-4 bg-gradient-to-br from-blue-50 to-indigo-50 w-screen">
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
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">
            Find Blood Donors<span className="text-red-600 ml-2">Near You</span>
          </h1>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex gap-4 mb-6">
              <input
                type="text"
              placeholder="Search by name, location, or preferences..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-300 bg-gray-100 text-black"
            />
            <button onClick={() => setShowFilters(!showFilters)} className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
              {showFilters ? "Hide" : "Show"} Filters
            </button>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="border-t pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="bloodTypeSelect" className="block text-sm font-medium text-gray-700 mb-2">Blood Type</label>
                    <select
                      id="bloodTypeSelect"
                      value={selectedBloodType}
                      onChange={(e) => setSelectedBloodType(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="">All Blood Types</option>
                      {bloodTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <input
                      type="text"
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      placeholder="City, area, or hospital"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Special Preferences</label>
                  <div className="flex flex-wrap gap-2">
                    {preferencesList.map(req => (
                      <button
                        key={req}
                        onClick={() =>
                          setPreferencesFilter(
                            preferencesFilter.includes(req)
                              ? preferencesFilter.filter(r => r !== req)
                              : [...preferencesFilter, req]
                          )
                        }
                        className={`px-3 py-1 rounded-full text-sm ${
                          preferencesFilter.includes(req)
                            ? "bg-red-600 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {req}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex justify-end gap-2 mb-6">
          <button onClick={() => setViewMode("list")} className={`px-4 py-2 rounded-lg ${viewMode === "list" ? "bg-red-600 text-white" : "bg-gray-100 text-gray-700"}`}>📋 List</button>
          <button onClick={() => setViewMode("grid")} className={`px-4 py-2 rounded-lg ${viewMode === "grid" ? "bg-red-600 text-white" : "bg-gray-100 text-gray-700"}`}>🗂️ Grid</button>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Found {filteredDonors.length} Donors</h2>

          {filteredDonors.length === 0 ? (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
              <p className="font-semibold text-yellow-800 mb-2">No donors found in this location. Would you like to submit an emergency request?</p>
              <button
                className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
                onClick={() => window.location.href = 'http://localhost:5173/emergency'}
              >
                Yes
              </button>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDonors.map(donor => <DonorCard key={donor.id} donor={donor} viewMode="grid" />)}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredDonors.map(donor => <DonorCard key={donor.id} donor={donor} viewMode="list" />)}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}