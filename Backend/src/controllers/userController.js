import User from "../models/User.js";

// GET: /api/user/profile
export const getUserProfile = async (req, res) => {
  try {
    // req.user is set by authMiddleware after verifying token
    const user = await User.findById(req.user.id).select("-password"); // Exclude password field

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      name: user.name,
      email: user.email,
      dateofBirth: user.dateofBirth,
      gender: user.gender,
      bloodGroup: user.bloodGroup,
      phone: user.phone,
      address: user.address,
      city: user.city,
      state: user.state,
      country: user.country,
      pincode: user.pincode,
      role: user.role,
      isDonorAvailable: user.isDonorAvailable,
      availableUntil: user.availableUntil || null, // optional if you added it to schema
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// PATCH: /api/user/preferences
export const setUserPreferences = async (req, res) => {
  try {
    const userId = req.user.id;
    const { preferences } = req.body;

    const allowedValues = [
      "Available Today",
      "First-Time Donor",
      "Experienced Donor",
      "Can Donate Platelets",
      "Can Donate Plasma",
      "No Recent Illness",
      "Willing to Travel",
    ];

    if (!Array.isArray(preferences)) {
      return res.status(400).json({ error: "Preferences should be an array." });
    }

    for (const pref of preferences) {
      if (!allowedValues.includes(pref)) {
        return res.status(400).json({ error: `Invalid preference: ${pref}` });
      }
    }

    const user = await User.findById(userId);
    user.preferences = preferences;
    await user.save();

    res.status(200).json({ message: "Preferences updated successfully", preferences: user.preferences });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET: /api/user/preferences
export const getUserPreferences = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json({ preferences: user.preferences });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};