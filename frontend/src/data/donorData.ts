// Mock donor data and constants for FindDonor page
export const mockDonors = [
  {
    id: 1,
    name: "Rahul Sharma",
    bloodType: "O+",
    location: "Delhi, India",
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
];

export const bloodTypes = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
export const urgencyLevels = ["Emergency", "Urgent", "Scheduled", "Planned"];
export const specialRequirements = [
  "Available Today",
  "First-Time Donor",
  "Experienced Donor",
  "Can Donate Platelets",
  "Can Donate Plasma",
  "No Recent Illness",
  "Willing to Travel",
];
export const hospitals = [
  "AIIMS Delhi",
  "Apollo Hospitals",
  "Fortis Healthcare",
  "Max Healthcare",
  "Manipal Hospitals",
  "Kokilaben Hospital",
]; 