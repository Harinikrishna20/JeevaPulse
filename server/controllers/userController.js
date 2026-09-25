const User = require("../models/User");

// ==========================================
// GET PROFILE
// ==========================================
const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(
      req.user._id || req.user.id
    ).select("-password");

    if (!user) {
      return next({
        statusCode: 404,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        user,
      },
    });

  } catch (error) {
    next(error);
  }
};

// ==========================================
// UPDATE PROFILE
// ==========================================
const updateProfile = async (
  req,
  res,
  next
) => {
  try {
    const {
      name,
      phone,
      location,
      bloodGroup,
      availability,
    } = req.body;

    const user = await User.findById(
      req.user._id || req.user.id
    );

    if (!user) {
      return next({
        statusCode: 404,
        message: "User not found",
      });
    }

    if (name !== undefined) {
      user.name = name.trim();
    }

    if (phone !== undefined) {
      user.phone = phone.trim();
    }

    if (location !== undefined) {
      user.location = location.trim();
    }

    if (bloodGroup !== undefined) {
      user.bloodGroup = bloodGroup;
    }

    if (availability !== undefined) {
      user.availability = availability;
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: {
        user: user.toJSON(),
      },
    });

  } catch (error) {
    next(error);
  }
};

// ==========================================
// BECOME DONOR
// ==========================================
const becomeDonor = async (
  req,
  res,
  next
) => {
  try {
    const user = await User.findById(
      req.user._id || req.user.id
    );

    if (!user) {
      return next({
        statusCode: 404,
        message: "User not found",
      });
    }

    user.isDonor = true;
    user.availability = "AVAILABLE";

    await user.save();

    return res.status(200).json({
      success: true,
      message:
        "You are now registered as a donor",
      data: {
        user: user.toJSON(),
      },
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProfile,
  updateProfile,
  becomeDonor,
};