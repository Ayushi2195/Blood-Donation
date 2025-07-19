import Notification from '../models/notificationModel.js';
import User from '../models/User.js';
import { sendEmail } from '../utils/emailSender.js';

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

        await sendEmail(
            donor.email,
            "New Blood Donation Request",
            `Patient ${patient.name} (${patient.phone}) requires blood type ${patient.bloodGroup}. Kindly login and respond.`
        );

        res.status(201).json(notification);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const donorResponse = async (req, res) => {
    const { notificationId } = req.params;
    const { status, message } = req.body;

    const donorId = req.user.id;

    try {
        const notification = await Notification.findById(notificationId);
        if (!notification) return res.status(404).json({ error: "Notification not found" });
        if (notification.status !== "pending")
            return res.status(400).json({ error: "Already responded" });

        notification.status = status;
        await notification.save();

        const donor = await User.findById(donorId);
        const patient = await User.findById(notification.sender);

        await Notification.create({
            type: "donor_approval",
            sender: donorId,
            recipient: notification.sender,
            status: status,
            data: {
                donorName: donor.name,
                donorPhone: donor.phone,
                message: message || "",
                bloodType: donor.bloodType
            }
        });

        await sendEmail(
            patient.email,
            "Your Blood Request Got a Response",
            `Donor ${donor.name} (${donor.phone}) responded: ${status}\nMessage: ${message || "No message"}`
        );

        res.json({ success: true });
    } catch (err) {
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

        await Notification.insertMany(notifications);

        await Promise.all(donors.map(async (donor) => {
            await sendEmail(
                donor.email,
                "Emergency Blood Donation Request",
                `Urgent request: Patient ${patientName} at ${hospitalName}, ${hospitalLocation} needs ${unitsNeeded} units of ${bloodType} blood.\nContact: ${contactNumber}\nUrgency: ${urgency}`
            );
        }));

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
