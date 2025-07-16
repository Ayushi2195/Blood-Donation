// models/notificationModel.js
import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // For patient request, emergency
    type: {
      type: String,
      enum: ["patient_request", "donor_approval", "emergency"],
      required: true,
    },
    data: {
      patientName: String,
      patientPhone: String,
      hospitalName: String,
      hospitalLocation: String,
      bloodType: String,
      unitsNeeded: String,
      urgency: String,
      message: String,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "denied", "read"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;
