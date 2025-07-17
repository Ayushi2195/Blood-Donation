import Notification from '../models/notificationModel.js';
import User from '../models/User.js';

export const sendPatientRequest = async (req, res) => {
  try {
    const { donorId } = req.body;
    const patient = await User.findById(req.user.id);

    const donor = await User.findById(donorId);
    if (!donor || !donor.isDonorAvailable) {
      return res.status(404).json({ error: "Donor not available." });
    }

    const notification = await Notification.create({
      recipient: donor._id,
      sender: patient._id,
      type: "patient_request",
      data: {
        patientName: patient.name,
        patientPhone: patient.phone,
        bloodType: patient.bloodGroup,
      },
      status: "pending",
    });

    res.status(201).json(notification);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const donorResponse = async (req, res) => {
  const { notificationId } = req.params;
  const { status, message } = req.body;
  console.log("donorResponse called with:", { notificationId, status, message });

  const donorId = req.user.id; // ✅ You correctly changed this to `.id`

  try {
    const notification = await Notification.findById(notificationId);
    if (!notification) return res.status(404).json({ error: "Notification not found" });

    if (notification.status !== "pending")
      return res.status(400).json({ error: "Already responded" });

    // Mark the original request as handled
    notification.status = status;
    await notification.save();

    // ✅ Fetch donor details
    const donor = await User.findById(donorId);

    // ✅ Create a new notification back to the patient
    await Notification.create({
      type: "donor_approval",
      sender: donorId,                     // donor
      recipient: notification.sender,      // original sender (patient)
      status: status,
      data: {
        donorName: donor.name,             // ✅ Add these
        donorPhone: donor.phone,           // ✅ Add these
        message: message || "",
        bloodType: donor.bloodType         // Optional
      }
    });

    res.json({ success: true });
  } catch (err) {
    console.error("donorResponse error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const sendEmergencyRequest = async (req, res) => {
  try {
    const {
      patientName,
      contactNumber,
      hospitalName,
      hospitalLocation,
      bloodType,
      unitsNeeded,
      urgency,
    } = req.body;

    const patient = await User.findById(req.user.id);

    const donors = await User.find({
      role: "donor",
      isDonorAvailable: true,
      bloodGroup: bloodType
    });


    const notifications = donors.map((donor) => ({
      recipient: donor._id,
      sender: req.user.id,
      type: "emergency",
      data: {
        patientName,
        patientPhone: contactNumber,
        hospitalName,
        hospitalLocation,
        bloodType,
        unitsNeeded,
        urgency,
      },
      status: "pending",
    }));

    console.log("Notifications to send:", notifications.length);
    await Notification.insertMany(notifications);

    res.status(201).json({ message: "Emergency notifications sent." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ recipient: req.user.id })
      .sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
