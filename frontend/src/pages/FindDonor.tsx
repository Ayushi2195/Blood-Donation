import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Mock data for demonstration
const mockDonors = [
  {
    id: 1,
    name: "Rahul Sharma",
    bloodType: "O+",
    location: "Delhi, India",
    distance: "2.3 km",
    rating: 4.8,
    lastDonation: "2024-01-15",
    availability: "Available Now",
    specialQualities: ["Universal Donor", "Rare Antigen Negative"],
    contact: "+91 98765 43210",
    verified: true,
    emergencyReady: true,
    languages: ["English", "Hindi"],
    healthStatus: "Excellent",
    donationCount: 15,
    responseTime: "5 min",
    socialConnections: 3,
  },
  {
    id: 2,
    name: "Priya Patel",
    bloodType: "A-",
    location: "Mumbai, India",
    distance: "5.1 km",
    rating: 4.9,
    lastDonation: "2024-02-01",
    availability: "Available Today",
    specialQualities: ["Platelet Donor", "CMV Negative"],
    contact: "+91 91234 56789",
    verified: true,
    emergencyReady: true,
    languages: ["English", "Gujarati"],
    healthStatus: "Good",
    donationCount: 8,
    responseTime: "12 min",
    socialConnections: 1,
  },
  {
    id: 3,
    name: "Amit Kumar",
    bloodType: "B+",
    location: "Bangalore, India",
    distance: "1.8 km",
    rating: 4.7,
    lastDonation: "2024-01-28",
    availability: "Available Now",
    specialQualities: ["Double Red Cell Donor"],
    contact: "+91 99887 77665",
    verified: true,
    emergencyReady: false,
    languages: ["English", "Kannada"],
    healthStatus: "Excellent",
    donationCount: 12,
    responseTime: "8 min",
    socialConnections: 2,
  },
  {
    id: 4,
    name: "Neha Singh",
    bloodType: "AB+",
    location: "Chennai, India",
    distance: "3.7 km",
    rating: 4.6,
    lastDonation: "2024-02-05",
    availability: "Available Tomorrow",
    specialQualities: ["Plasma Donor"],
    contact: "+91 98712 34567",
    verified: true,
    emergencyReady: true,
    languages: ["English", "Tamil"],
    healthStatus: "Good",
    donationCount: 6,
    responseTime: "15 min",
    socialConnections: 0,
  },
  {
    id: 5,
    name: "Vikram Mehta",
    bloodType: "O-",
    location: "Pune, India",
    distance: "4.2 km",
    rating: 4.9,
    lastDonation: "2024-01-20",
    availability: "Available Now",
    specialQualities: ["Universal Donor", "Rare Blood Type"],
    contact: "+91 91234 56789",
    verified: true,
    emergencyReady: true,
    languages: ["English", "Marathi"],
    healthStatus: "Excellent",
    donationCount: 22,
    responseTime: "3 min",
    socialConnections: 5,
  },
  {
    id: 6,
    name: "Suman Reddy",
    bloodType: "A+",
    location: "Hyderabad, India",
    distance: "6.8 km",
    rating: 4.5,
    lastDonation: "2024-01-10",
    availability: "Available Now",
    specialQualities: ["Platelet Donor"],
    contact: "+91 98765 12345",
    verified: true,
    emergencyReady: true,
    languages: ["English", "Telugu"],
    healthStatus: "Good",
    donationCount: 9,
    responseTime: "10 min",
    socialConnections: 2,
  },
  {
    id: 7,
    name: "Rajesh Kumar",
    bloodType: "B-",
    location: "Kolkata, India",
    distance: "2.1 km",
    rating: 4.8,
    lastDonation: "2024-02-08",
    availability: "Available Today",
    specialQualities: ["Rare Antigen Negative"],
    contact: "+91 91234 87654",
    verified: true,
    emergencyReady: false,
    languages: ["English", "Bengali"],
    healthStatus: "Excellent",
    donationCount: 18,
    responseTime: "7 min",
    socialConnections: 4,
  },
  {
    id: 8,
    name: "Anjali Desai",
    bloodType: "AB-",
    location: "Ahmedabad, India",
    distance: "4.5 km",
    rating: 4.7,
    lastDonation: "2024-01-25",
    availability: "Available Tomorrow",
    specialQualities: ["Plasma Donor", "CMV Negative"],
    contact: "+91 99887 11223",
    verified: true,
    emergencyReady: true,
    languages: ["English", "Gujarati"],
    healthStatus: "Good",
    donationCount: 11,
    responseTime: "14 min",
    socialConnections: 1,
  },
  {
    id: 9,
    name: "Karthik Iyer",
    bloodType: "O+",
    location: "Coimbatore, India",
    distance: "3.2 km",
    rating: 4.9,
    lastDonation: "2024-02-03",
    availability: "Available Now",
    specialQualities: ["Universal Donor", "Double Red Cell Donor"],
    contact: "+91 98712 99887",
    verified: true,
    emergencyReady: true,
    languages: ["English", "Tamil"],
    healthStatus: "Excellent",
    donationCount: 25,
    responseTime: "4 min",
    socialConnections: 6,
  },
  {
    id: 10,
    name: "Meera Nair",
    bloodType: "A-",
    location: "Kochi, India",
    distance: "5.7 km",
    rating: 4.6,
    lastDonation: "2024-01-18",
    availability: "Available Today",
    specialQualities: ["Platelet Donor"],
    contact: "+91 91234 55443",
    verified: true,
    emergencyReady: false,
    languages: ["English", "Malayalam"],
    healthStatus: "Good",
    donationCount: 7,
    responseTime: "11 min",
    socialConnections: 2,
  },
  {
    id: 11,
    name: "Arjun Singh",
    bloodType: "B+",
    location: "Jaipur, India",
    distance: "1.9 km",
    rating: 4.8,
    lastDonation: "2024-02-06",
    availability: "Available Now",
    specialQualities: ["Rare Antigen Negative"],
    contact: "+91 99887 33445",
    verified: true,
    emergencyReady: true,
    languages: ["English", "Hindi"],
    healthStatus: "Excellent",
    donationCount: 16,
    responseTime: "6 min",
    socialConnections: 3,
  },
  {
    id: 12,
    name: "Pooja Sharma",
    bloodType: "O-",
    location: "Lucknow, India",
    distance: "4.8 km",
    rating: 4.7,
    lastDonation: "2024-01-30",
    availability: "Available Tomorrow",
    specialQualities: ["Universal Donor", "Rare Blood Type"],
    contact: "+91 98712 66778",
    verified: true,
    emergencyReady: true,
    languages: ["English", "Hindi"],
    healthStatus: "Good",
    donationCount: 13,
    responseTime: "13 min",
    socialConnections: 1,
  },
  {
    id: 13,
    name: "Ravi Teja",
    bloodType: "AB+",
    location: "Vijayawada, India",
    distance: "2.7 km",
    rating: 4.5,
    lastDonation: "2024-02-01",
    availability: "Available Now",
    specialQualities: ["Plasma Donor"],
    contact: "+91 91234 77889",
    verified: true,
    emergencyReady: false,
    languages: ["English", "Telugu"],
    healthStatus: "Good",
    donationCount: 5,
    responseTime: "9 min",
    socialConnections: 0,
  },
  {
    id: 14,
    name: "Nisha Patel",
    bloodType: "A+",
    location: "Surat, India",
    distance: "3.9 km",
    rating: 4.9,
    lastDonation: "2024-01-22",
    availability: "Available Today",
    specialQualities: ["Platelet Donor", "CMV Negative"],
    contact: "+91 99887 88990",
    verified: true,
    emergencyReady: true,
    languages: ["English", "Gujarati"],
    healthStatus: "Excellent",
    donationCount: 19,
    responseTime: "5 min",
    socialConnections: 4,
  },
  {
    id: 15,
    name: "Deepak Verma",
    bloodType: "B-",
    location: "Indore, India",
    distance: "2.4 km",
    rating: 4.6,
    lastDonation: "2024-02-07",
    availability: "Available Now",
    specialQualities: ["Rare Antigen Negative"],
    contact: "+91 98712 00112",
    verified: true,
    emergencyReady: true,
    languages: ["English", "Hindi"],
    healthStatus: "Good",
    donationCount: 10,
    responseTime: "8 min",
    socialConnections: 2,
  },
];

const bloodTypes = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
const urgencyLevels = ["Emergency", "Urgent", "Scheduled", "Planned"];
const specialRequirements = [
  "Universal Donor",
  "Rare Antigen Negative",
  "CMV Negative",
  "Platelet Donor",
  "Plasma Donor",
  "Double Red Cell Donor",
];

const hospitals = [
  "AIIMS Delhi",
  "Apollo Hospitals",
  "Fortis Healthcare",
  "Max Healthcare",
  "Manipal Hospitals",
  "Kokilaben Hospital",
];

export default function FindDonor() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBloodType, setSelectedBloodType] = useState("");
  const [selectedUrgency, setSelectedUrgency] = useState("");
  const [selectedHospital, setSelectedHospital] = useState("");
  const [maxDistance, setMaxDistance] = useState(10);
  const [selectedRequirements, setSelectedRequirements] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [showFilters, setShowFilters] = useState(false);
  const [showAIInsights, setShowAIInsights] = useState(false);
  const [selectedDonor, setSelectedDonor] = useState<any>(null);
  const [showDonorDetails, setShowDonorDetails] = useState(false);
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [analyticsData, setAnalyticsData] = useState({
    totalDonors: 2500,
    availableNow: 156,
    averageResponseTime: "8.5 min",
    successRate: "94.2%",
  });
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [scheduleDonor, setScheduleDonor] = useState<any>(null);
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleConfirmed, setScheduleConfirmed] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestLocation, setRequestLocation] = useState("");
  const [requestBloodType, setRequestBloodType] = useState("");
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  // AI-Powered Smart Matching
  const getAIMatchScore = (donor: any) => {
    let score = 0;
    
    // Blood type compatibility
    if (selectedBloodType && donor.bloodType === selectedBloodType) score += 30;
    
    // Distance factor
    const distance = parseFloat(donor.distance);
    if (distance <= 2) score += 25;
    else if (distance <= 5) score += 20;
    else if (distance <= 10) score += 15;
    
    // Availability
    if (donor.availability === "Available Now") score += 20;
    else if (donor.availability === "Available Today") score += 15;
    
    // Rating
    score += donor.rating * 2;
    
    // Emergency readiness
    if (donor.emergencyReady) score += 10;
    
    // Response time
    const responseTime = parseInt(donor.responseTime);
    if (responseTime <= 5) score += 10;
    else if (responseTime <= 10) score += 5;
    
    return score;
  };

  // Filter donors based on search criteria
  const filteredDonors = mockDonors
    .filter((donor) => {
      if (
        searchQuery &&
        !(
          donor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          donor.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (donor.specialQualities && donor.specialQualities.some((q: string) => q.toLowerCase().includes(searchQuery.toLowerCase())))
        )
      ) return false;
      if (selectedBloodType && donor.bloodType !== selectedBloodType) return false;
      if (selectedUrgency === "Emergency" && !donor.emergencyReady) return false;
      if (selectedRequirements.length > 0 && !selectedRequirements.some(req => donor.specialQualities.includes(req))) return false;
      if (parseFloat(donor.distance) > maxDistance) return false;
      return true;
    })
    .sort((a, b) => getAIMatchScore(b) - getAIMatchScore(a));

  // Emergency Mode Toggle
  const toggleEmergencyMode = () => {
    setEmergencyMode(!emergencyMode);
    if (!emergencyMode) {
      setSelectedUrgency("Emergency");
      setMaxDistance(5);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.6 }}
      className={`min-h-screen pt-32 px-4 ${emergencyMode ? 'bg-gradient-to-br from-red-50 to-pink-50' : 'bg-gradient-to-br from-blue-50 to-indigo-50'}`}
    >
      {/* Emergency Mode Banner */}
      {emergencyMode && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-600 text-white text-center py-3 mb-6 rounded-xl font-bold text-lg shadow-lg animate-pulse"
        >
          🚨 EMERGENCY MODE ACTIVATED - Prioritizing urgent blood requests 🚨
        </motion.div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">
            Find Blood Donors
            <span className="text-red-600 ml-2">Near You</span>
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            AI-powered matching system to connect you with verified donors instantly
          </p>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {Object.entries(analyticsData).map(([key, value]) => (
              <div key={key} className="bg-white rounded-lg p-4 shadow-md">
                <div className="text-2xl font-bold text-red-600">{value}</div>
                <div className="text-sm text-gray-600 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          {/* Main Search Bar */}
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search donors by name, location, or special requirements..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-300 focus:border-transparent bg-gray-100 text-black"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
            >
              {showFilters ? 'Hide' : 'Show'} Filters
            </button>
            <button
              onClick={toggleEmergencyMode}
              className={`px-6 py-3 rounded-lg font-semibold transition ${
                emergencyMode 
                  ? 'bg-red-600 text-white hover:bg-red-700' 
                  : 'bg-yellow-400 text-gray-900 hover:bg-yellow-500'
              }`}
            >
              {emergencyMode ? '🚨 Emergency Mode' : '🚨 Emergency'}
            </button>
          </div>

          {/* Advanced Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="border-t pt-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Blood Type Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Blood Type</label>
                    <select
                      value={selectedBloodType}
                      onChange={(e) => setSelectedBloodType(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-300"
                    >
                      <option value="">All Blood Types</option>
                      {bloodTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  {/* Urgency Level */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Urgency</label>
                    <select
                      value={selectedUrgency}
                      onChange={(e) => setSelectedUrgency(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-300"
                    >
                      <option value="">Any Urgency</option>
                      {urgencyLevels.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>

                  {/* Hospital */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Near Hospital</label>
                    <select
                      value={selectedHospital}
                      onChange={(e) => setSelectedHospital(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-300"
                    >
                      <option value="">Any Hospital</option>
                      {hospitals.map(hospital => (
                        <option key={hospital} value={hospital}>{hospital}</option>
                      ))}
                    </select>
                  </div>

                  {/* Distance */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Max Distance: {maxDistance} km
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="50"
                      value={maxDistance}
                      onChange={(e) => setMaxDistance(parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Special Requirements */}
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Special Requirements</label>
                  <div className="flex flex-wrap gap-2">
                    {specialRequirements.map(req => (
                      <button
                        key={req}
                        onClick={() => {
                          if (selectedRequirements.includes(req)) {
                            setSelectedRequirements(selectedRequirements.filter(r => r !== req));
                          } else {
                            setSelectedRequirements([...selectedRequirements, req]);
                          }
                        }}
                        className={`px-3 py-1 rounded-full text-sm transition ${
                          selectedRequirements.includes(req)
                            ? 'bg-red-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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

        {/* View Mode Toggle */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode("list")}
              className={`px-4 py-2 rounded-lg transition ${
                viewMode === "list" ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              📋 List
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`px-4 py-2 rounded-lg transition ${
                viewMode === "grid" ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              🗂️ Grid
            </button>
          </div>

          <button
            onClick={() => setShowAIInsights(!showAIInsights)}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            🤖 AI Insights
          </button>
        </div>

        {/* AI Insights Panel */}
        <AnimatePresence>
          {showAIInsights && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 mb-6 border border-purple-200"
            >
              <h3 className="text-xl font-bold text-purple-800 mb-4">🤖 AI-Powered Insights</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="text-2xl font-bold text-purple-600">94.2%</div>
                  <div className="text-sm text-gray-600">Match Success Rate</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="text-2xl font-bold text-purple-600">8.5 min</div>
                  <div className="text-sm text-gray-600">Average Response Time</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="text-2xl font-bold text-purple-600">156</div>
                  <div className="text-sm text-gray-600">Donors Available Now</div>
                </div>
              </div>
              <div className="mt-4 text-sm text-purple-700">
                💡 <strong>AI Recommendation:</strong> Based on your search criteria, we recommend contacting donors within 3km for fastest response times.
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900">
              Found {filteredDonors.length} Donors
            </h2>
            <div className="text-sm text-gray-600">
              Sorted by AI match score
            </div>
          </div>

          {/* No donors found message and suggestions */}
          {filteredDonors.length === 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center mb-6">
              <div className="text-lg font-semibold text-yellow-800 mb-2">No donors found for your search.</div>
              <div className="text-gray-700 mb-2">Try another location or blood type, or post a request for donors in your area.</div>
              {/* Suggest nearest locations */}
              {searchQuery && (() => {
                const nearest = Array.from(new Set(mockDonors.map(d => d.location)))
                  .filter(loc => loc.toLowerCase().includes(searchQuery.toLowerCase().slice(0, 2)))
                  .slice(0, 3);
                if (nearest.length > 0) {
                  return (
                    <div className="mb-2">
                      <span className="font-medium">Nearest available locations:</span>
                      <span className="ml-2 text-gray-800">{nearest.join(", ")}</span>
                    </div>
                  );
                }
                return null;
              })()}
              <button
                className="mt-2 px-6 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
                onClick={() => {
                  setShowRequestModal(true);
                  setRequestLocation("");
                  setRequestBloodType("");
                  setRequestSubmitted(false);
                }}
              >
                Post a Request
              </button>
            </div>
          )}

          {/* Map View */}
          {viewMode === "map" && (
            <div className="bg-white rounded-xl shadow-lg p-6 h-96 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🗺️</div>
                <h3 className="text-xl font-bold mb-2">Interactive Map</h3>
                <p className="text-gray-600">Donor locations with distance indicators</p>
                <div className="mt-4 text-sm text-gray-500">
                  {filteredDonors.length} donors shown on map
                </div>
              </div>
            </div>
          )}

          {/* Grid View */}
          {viewMode === "grid" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDonors.map((donor, index) => (
                <motion.div
                  key={donor.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition cursor-pointer"
                  onClick={() => {
                    setSelectedDonor(donor);
                    setShowDonorDetails(true);
                  }}
                >
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
                    <div className="flex justify-between">
                      <span className="text-gray-600">Distance:</span>
                      <span className="font-semibold text-black">{donor.distance ? donor.distance : 'N/A'}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Rating:</span>
                      <span className="font-semibold flex items-center gap-1 text-black">
                        {donor.rating !== undefined && donor.rating !== null ? (
                          <>
                            {Array.from({ length: 5 }).map((_, i) => (
                              <span key={i}>
                                {i < Math.floor(donor.rating) ? '★' : '☆'}
                              </span>
                            ))}
                            <span className="ml-1">{donor.rating}</span>
                          </>
                        ) : 'N/A'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Response:</span>
                      <span className="font-semibold text-green-600">{donor.responseTime ? donor.responseTime : 'N/A'}</span>
                    </div>
                  </div>

                  <div className="bg-green-50 rounded-lg p-3 mb-4">
                    <div className="text-sm font-semibold text-green-800">{donor.availability}</div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {donor.specialQualities.map((quality, idx) => (
                      <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {quality}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <button
                      className="px-4 py-2 bg-gray-100 text-black rounded-lg hover:bg-gray-200 transition"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedDonor(donor);
                        setShowDonorDetails(true);
                      }}
                    >
                      View Details
                    </button>
                    <button
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                      onClick={(e) => {
                        e.stopPropagation();
                        setScheduleDonor(donor);
                        setShowScheduleModal(true);
                        setScheduleDate("");
                        setScheduleConfirmed(false);
                      }}
                    >
                      Schedule Donation
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* List View */}
          {viewMode === "list" && (
            <div className="space-y-4">
              {filteredDonors.map((donor, index) => (
                <motion.div
                  key={donor.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition cursor-pointer"
                  onClick={() => {
                    setSelectedDonor(donor);
                    setShowDonorDetails(true);
                  }}
                >
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
                      <div className="text-sm text-gray-600">{donor.distance ? donor.distance : 'N/A'}</div>
                      <div className="text-sm font-semibold text-green-600">{donor.responseTime ? donor.responseTime : 'N/A'}</div>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {donor.specialQualities.map((quality, idx) => (
                        <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                          {quality}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        className="px-4 py-2 bg-gray-100 text-black rounded-lg hover:bg-gray-200 transition"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedDonor(donor);
                          setShowDonorDetails(true);
                        }}
                      >
                        View Details
                      </button>
                      <button
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                        onClick={(e) => {
                          e.stopPropagation();
                          setScheduleDonor(donor);
                          setShowScheduleModal(true);
                          setScheduleDate("");
                          setScheduleConfirmed(false);
                        }}
                      >
                        Schedule Donation
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 bg-green-50 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-green-800">{donor.availability}</span>
                      <span className="text-sm text-gray-600">AI Match Score: {getAIMatchScore(donor)}%</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Social Features Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-2xl font-bold mb-4 text-gray-900">Community Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl mb-2">👥</div>
              <h4 className="font-semibold mb-2 text-black">Social Networks</h4>
              <p className="text-sm text-gray-600">Connect through mutual friends and community groups</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl mb-2">🏆</div>
              <h4 className="font-semibold mb-2 text-black">Donor Challenges</h4>
              <p className="text-sm text-gray-600">Participate in donation challenges and earn rewards</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-3xl mb-2">📱</div>
              <h4 className="font-semibold mb-2 text-black">Social Sharing</h4>
              <p className="text-sm text-gray-600">Share blood requests on social media instantly</p>
            </div>
          </div>
        </div>

        {/* Health & Safety Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-2xl font-bold mb-4 text-gray-900">Health & Safety Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2 text-green-800">✓ Health Screening</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Pre-screening questionnaires</li>
                <li>• Medical history verification</li>
                <li>• COVID-19 status tracking</li>
                <li>• Travel history monitoring</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-blue-800">🛡️ Safety Measures</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• ID verification system</li>
                <li>• Background screening</li>
                <li>• Real-time safety alerts</li>
                <li>• Hospital protocol compliance</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Donor Details Modal */}
      <AnimatePresence>
        {showDonorDetails && selectedDonor && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-200 bg-opacity-70 flex items-center justify-center p-4 z-50"
            onClick={() => setShowDonorDetails(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Basic Details at the top */}
              <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <h2 className="text-2xl font-bold text-gray-900">{selectedDonor.name || 'N/A'}</h2>
                <button
                  onClick={() => setShowDonorDetails(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl self-start md:self-auto"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2 text-black">Contact Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="text-black"><span role="img" aria-label="phone">📞</span> {selectedDonor.contact || 'N/A'}</div>
                    <div className="text-black"><span role="img" aria-label="location">📍</span> {selectedDonor.location || 'N/A'}</div>
                    <div className="text-black"><span role="img" aria-label="languages">🌐</span> {(selectedDonor.languages && selectedDonor.languages.length > 0) ? selectedDonor.languages.join(", ") : 'N/A'}</div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Donation Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="text-black"><span role="img" aria-label="blood">🩸</span> <span className="font-bold text-red-600">{selectedDonor.bloodType || 'N/A'}</span></div>
                    <div className="text-black"><span role="img" aria-label="donations">📊</span> {selectedDonor.donationCount !== undefined ? selectedDonor.donationCount + ' donations' : 'N/A'}</div>
                    <div className="text-black"><span role="img" aria-label="last-donation">📅</span> Last: {selectedDonor.lastDonation || 'N/A'}</div>
                    <div className="text-black"><span role="img" aria-label="response">⚡</span> Response: {selectedDonor.responseTime || 'N/A'}</div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-semibold mb-2 text-black">Special Qualities</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedDonor.specialQualities.map((quality: string, idx: number) => (
                    <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                      {quality}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Schedule Donation Modal */}
      <AnimatePresence>
        {showScheduleModal && scheduleDonor && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-200 bg-opacity-70 flex items-center justify-center p-4 z-50"
            onClick={() => setShowScheduleModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-black">Schedule Donation</h2>
                <button
                  onClick={() => setShowScheduleModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              {!scheduleConfirmed ? (
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    setScheduleConfirmed(true);
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block mb-1 font-medium text-black">Preferred Date & Time</label>
                    <input
                      type="datetime-local"
                      value={scheduleDate}
                      onChange={e => setScheduleDate(e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-black"
                    />
                  </div>
                  {/* Availability check and message */}
                  {scheduleDate && (() => {
                    const selected = new Date(scheduleDate);
                    const now = new Date();
                    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                    const tomorrow = new Date(today);
                    tomorrow.setDate(today.getDate() + 1);
                    let available = false;
                    if (scheduleDonor.availability === "Available Now" || scheduleDonor.availability === "Available Today") {
                      if (selected >= today) available = true;
                    } else if (scheduleDonor.availability === "Available Tomorrow") {
                      if (selected >= tomorrow) available = true;
                    }
                    if (available) {
                      return <div className="text-green-700 font-semibold">Donor is available on this day.</div>;
                    } else {
                      return <div className="text-red-600 font-semibold">Donor is not available on this day.</div>;
                    }
                  })()}
                  {/* Show confirm button only if available */}
                  {scheduleDate && (() => {
                    const selected = new Date(scheduleDate);
                    const now = new Date();
                    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                    const tomorrow = new Date(today);
                    tomorrow.setDate(today.getDate() + 1);
                    let available = false;
                    if (scheduleDonor.availability === "Available Now" || scheduleDonor.availability === "Available Today") {
                      if (selected >= today) available = true;
                    } else if (scheduleDonor.availability === "Available Tomorrow") {
                      if (selected >= tomorrow) available = true;
                    }
                    if (available) {
                      return <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition">Confirm Schedule</button>;
                    }
                    return null;
                  })()}
                </form>
              ) : (
                <div className="text-center text-green-700 font-semibold text-lg">
                  Donation scheduled!<br />
                  We will notify the donor for you.
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Post a Request Modal */}
      <AnimatePresence>
        {showRequestModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-200 bg-opacity-70 flex items-center justify-center p-4 z-50"
            onClick={() => setShowRequestModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-black">Post a Blood Request</h2>
                <button
                  onClick={() => setShowRequestModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              {!requestSubmitted ? (
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    setRequestSubmitted(true);
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block mb-1 font-medium text-black">Location</label>
                    <input
                      type="text"
                      value={requestLocation}
                      onChange={e => setRequestLocation(e.target.value)}
                      required
                      placeholder="Enter your city or hospital"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-black"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-medium text-black">Blood Type</label>
                    <input
                      type="text"
                      value={requestBloodType}
                      onChange={e => setRequestBloodType(e.target.value)}
                      required
                      placeholder="Enter required blood type (e.g. O+)"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-black"
                    />
                  </div>
                  <button type="submit" className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition">
                    Submit Request
                  </button>
                </form>
              ) : (
                <div className="text-center text-green-700 font-semibold text-lg">
                  Your request has been posted!<br />
                  We will notify you if a matching donor is found.
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
} 