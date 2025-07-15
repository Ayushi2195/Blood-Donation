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
