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
  try {
    const { notificationId } = req.params;
    const { status, message } = req.body;

    if (!["approved", "denied"].includes(status)) {
      return res.status(400).json({ error: "Invalid status." });
    }

    const donor = await User.findById(req.user.id);
    const notification = await Notification.findById(notificationId);

    if (!notification) {
      return res.status(404).json({ error: "Notification not found." });
    }

    // Update existing patient_request notification
    notification.status = status;
    notification.data.message = message || "";
    await notification.save();

    // Create new donor_approval notification for the patient
    await Notification.create({
      recipient: notification.sender,
      sender: donor._id,
      type: "donor_approval",
      data: {
        donorName: donor.name,
        donorPhone: donor.phone,
        status,
        message,
        bloodType: notification.data.bloodType,
        patientPhone: notification.data.patientPhone,
      },
      status: status,
    });

    res.status(200).json({ message: "Response sent to patient." });
  } catch (error) {
    res.status(500).json({ error: error.message });
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

    const donors = await User.find({
      role: "donor",
      isDonorAvailable: true,
      bloodGroup: bloodType,
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
