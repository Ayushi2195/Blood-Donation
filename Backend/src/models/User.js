// models/User.js
import mongoose from "mongoose";

const preferencesEnum = [
  "Available Today",
  "First-Time Donor",
  "Experienced Donor",
  "Can Donate Platelets",
  "Can Donate Plasma",
  "No Recent Illness",
  "Willing to Travel",
];

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dateofBirth: { type: Date, required: true },
  gender: { type: String, required: true },
  bloodGroup: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  pincode: { type: String, required: true },
  role: { type: String, default: "patient" },
  isDonorAvailable: { type: Boolean, default: false },
  availableUntil: { type: Date },

  // ADD THIS 👇
  preferences: {
    type: [String],
    enum: preferencesEnum,
    default: [],
  },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;