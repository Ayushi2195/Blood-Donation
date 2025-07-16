import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { mockDonors, bloodTypes, specialRequirements } from "../data/donorData";
import DonorCard from "../components/DonorCard";

export default function FindDonor() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBloodType, setSelectedBloodType] = useState("");
  const [selectedRequirements, setSelectedRequirements] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDonor, setSelectedDonor] = useState<any>(null);
  const [showDonorDetails, setShowDonorDetails] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [scheduleDonor, setScheduleDonor] = useState<any>(null);
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleConfirmed, setScheduleConfirmed] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestLocation, setRequestLocation] = useState("");
  const [requestBloodType, setRequestBloodType] = useState("");
  const [requestSubmitted, setRequestSubmitted] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");

  // Filter donors based on search criteria
  const filteredDonors = mockDonors.filter((donor) => {
      if (
        searchQuery &&
        !(
          donor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          donor.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (donor.specialQualities && donor.specialQualities.some((q: string) => q.toLowerCase().includes(searchQuery.toLowerCase())))
        )
    )
      return false;
      if (selectedBloodType && donor.bloodType !== selectedBloodType) return false;
      if (selectedLocation && !donor.location.toLowerCase().includes(selectedLocation.toLowerCase())) return false;
      if (selectedRequirements.length > 0 && !selectedRequirements.some(req => donor.specialQualities.includes(req))) return false;
      return true;
  });

  return (
    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -40 }} transition={{ duration: 0.6 }} className="min-h-screen pt-32 px-4 bg-gradient-to-br from-blue-50 to-indigo-50 w-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">
            Find Blood Donors
            <span className="text-red-600 ml-2">Near You</span>
          </h1>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
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
          </div>
          <AnimatePresence>
            {showFilters && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="border-t pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <input
                      type="text"
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      placeholder="Enter city, area, or hospital"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-300"
                    />
                  </div>
                </div>
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
                        className={`px-3 py-1 rounded-full text-sm transition ${selectedRequirements.includes(req) ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
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
        <div className="flex justify-end items-center mb-6">
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode("list")}
              className={`px-4 py-2 rounded-lg transition ${viewMode === "list" ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700'}`}
            >
              📋 List
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`px-4 py-2 rounded-lg transition ${viewMode === "grid" ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700'}`}
            >
              🗂️ Grid
            </button>
          </div>
        </div>
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900">
              Found {filteredDonors.length} Donors
            </h2>
          </div>
          {filteredDonors.length === 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center mb-6">
              <div className="text-lg font-semibold text-yellow-800 mb-2">No donors found for your search.</div>
              <div className="text-gray-700 mb-2">Try another location or blood type, or post a request for donors in your area.</div>
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
          {viewMode === "grid" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDonors.map((donor, index) => (
                <DonorCard
                  key={donor.id}
                  donor={donor}
                  viewMode="grid"
                  onViewDetails={(d) => { setSelectedDonor(d); setShowDonorDetails(true); }}
                  onContact={(d) => { setScheduleDonor(d); setShowScheduleModal(true); setScheduleDate(""); setScheduleConfirmed(false); }}
                />
              ))}
            </div>
          )}
          {viewMode === "list" && (
            <div className="space-y-4">
              {filteredDonors.map((donor, index) => (
                <DonorCard
                  key={donor.id}
                  donor={donor}
                  viewMode="list"
                  onViewDetails={(d) => { setSelectedDonor(d); setShowDonorDetails(true); }}
                  onContact={(d) => { setScheduleDonor(d); setShowScheduleModal(true); setScheduleDate(""); setScheduleConfirmed(false); }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Donor Details Modal */}
      <AnimatePresence>
        {showDonorDetails && selectedDonor && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-gray-200 bg-opacity-70 flex items-center justify-center p-4 z-50" onClick={() => setShowDonorDetails(false)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <h2 className="text-2xl font-bold text-gray-900">{selectedDonor.name || 'N/A'}</h2>
                <button onClick={() => setShowDonorDetails(false)} className="text-gray-500 hover:text-gray-700 text-2xl self-start md:self-auto">×</button>
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
                    <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">{quality}</span>
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
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-gray-200 bg-opacity-70 flex items-center justify-center p-4 z-50" onClick={() => setShowScheduleModal(false)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white rounded-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-black">Contact Donor</h2>
                <button onClick={() => setShowScheduleModal(false)} className="text-gray-500 hover:text-gray-700 text-2xl">×</button>
              </div>
              {!scheduleConfirmed ? (
                <form onSubmit={e => { e.preventDefault(); setScheduleConfirmed(true); }} className="space-y-4">
                  <div>
                    <label className="block mb-1 font-medium text-black">Preferred Date & Time for Schedule</label>
                    <input
                      type="datetime-local"
                      value={scheduleDate}
                      onChange={e => setScheduleDate(e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-black"
                    />
                  </div>
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
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-gray-200 bg-opacity-70 flex items-center justify-center p-4 z-50" onClick={() => setShowRequestModal(false)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white rounded-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-black">Post a Blood Request</h2>
                <button onClick={() => setShowRequestModal(false)} className="text-gray-500 hover:text-gray-700 text-2xl">×</button>
              </div>
              {!requestSubmitted ? (
                <form onSubmit={e => { e.preventDefault(); setRequestSubmitted(true); }} className="space-y-4">
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