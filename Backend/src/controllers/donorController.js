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

export const findDonors = async (req, res) => {
  try {
    const { search, bloodType, location, requirements } = req.query;

    const query = {
      role: "donor",
      isDonorAvailable: true,
    };

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { city: { $regex: search, $options: "i" } },
        { state: { $regex: search, $options: "i" } },
        { specialQualities: { $regex: search, $options: "i" } },
      ];
    }

    if (bloodType) {
      query.bloodGroup = bloodType;
    }

    if (location) {
      query.city = { $regex: location, $options: "i" };
    }

    if (requirements) {
      const reqArr = Array.isArray(requirements) ? requirements : [requirements];
      query.specialQualities = { $in: reqArr };
    }

    const donors = await User.find(query)
      .select("name email phone city state country bloodGroup specialQualities isDonorAvailable")
      .lean();

    res.status(200).json(donors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};