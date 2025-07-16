import User from "../models/User.js";

export const updateDonorStatus = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    const { isDonorAvailable, availableUntil } = req.body;

    // Case 1: Explicitly setting availability to true/false
    if (typeof isDonorAvailable === "boolean") {
      user.isDonorAvailable = isDonorAvailable;
      user.role = isDonorAvailable ? "donor" : "patient";

      if (!isDonorAvailable) {
        user.availableUntil = null; // Reset expiry if donor becomes unavailable
      }
    }

    // Case 2: Setting/updating expiry date
    if (availableUntil) {
      const expiry = new Date(availableUntil);
      if (expiry < new Date()) {
        return res.status(400).json({ error: "Expiry time must be in the future" });
      }
      user.availableUntil = expiry;
      user.isDonorAvailable = true;
      user.role = "donor";
    }

    await user.save();

    res.status(200).json({
      message: "Donor status updated successfully",
      role: user.role,
      isDonorAvailable: user.isDonorAvailable,
      availableUntil: user.availableUntil,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllDonors = async (req, res) => {
  try {
    const donors = await User.find({
      role: "donor",
      isDonorAvailable: true,
    }).select("-password -__v"); // Exclude sensitive fields

    res.status(200).json(donors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};