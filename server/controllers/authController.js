const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ==========================================
// GENERATE JWT TOKEN
// ==========================================
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

// ==========================================
// REGISTER USER
// ==========================================
const registerUser = async (req, res, next) => {
  try {
    const {
      name,
      email,
      phone,
      password,
      confirmPassword,
      role,
      location,
      bloodGroup,
    } = req.body;

    // ----------------------------------------
    // Required fields
    // ----------------------------------------
    if (
      !name ||
      !email ||
      !phone ||
      !password ||
      !confirmPassword
    ) {
      return next({
        statusCode: 400,
        message:
          "Name, email, phone, password, and confirm password are required",
      });
    }

    // ----------------------------------------
    // Password length
    // ----------------------------------------
    if (password.length < 8) {
      return next({
        statusCode: 400,
        message:
          "Password must be at least 8 characters.",
      });
    }

    // ----------------------------------------
    // Password comparison
    // ----------------------------------------
    if (password !== confirmPassword) {
      return next({
        statusCode: 400,
        message: "Passwords do not match.",
      });
    }

    // ----------------------------------------
    // Check email
    // ----------------------------------------
    const normalizedEmail =
      email.trim().toLowerCase();

    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return next({
        statusCode: 409,
        message: "Email is already registered",
      });
    }

    // ----------------------------------------
    // Hash password
    // ----------------------------------------
    const salt = await bcrypt.genSalt(10);

    const hashedPassword =
      await bcrypt.hash(password, salt);

    // ----------------------------------------
    // Create user
    // ----------------------------------------
    const user = await User.create({
      name: name.trim(),

      email: normalizedEmail,

      phone: phone.trim(),

      password: hashedPassword,

      role: role || "user",

      location: location
        ? location.trim()
        : "",

      bloodGroup:
        bloodGroup || "",
    });

    // ----------------------------------------
    // Generate token
    // ----------------------------------------
    const token = generateToken(user);

    // ----------------------------------------
    // Send response
    // ----------------------------------------
    return res.status(201).json({
      success: true,

      message:
        "User registered successfully",

      data: {
        user: user.toJSON(),
        token,
      },
    });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern?.email) {
      return next({
        statusCode: 409,
        message: "Email is already registered",
      });
    }

    next(error);
  }
};

// ==========================================
// LOGIN USER
// ==========================================
const loginUser = async (req, res, next) => {
  try {
    const {
      email,
      password,
    } = req.body;

    // ----------------------------------------
    // Required fields
    // ----------------------------------------
    if (!email || !password) {
      return next({
        statusCode: 400,
        message:
          "Email and password are required",
      });
    }

    // ----------------------------------------
    // Normalize email
    // ----------------------------------------
    const normalizedEmail =
      email.trim().toLowerCase();

    // ----------------------------------------
    // Find user
    // ----------------------------------------
    const user = await User.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      return next({
        statusCode: 404,
        message: "User not found",
      });
    }

    // ----------------------------------------
    // Compare password
    // ----------------------------------------
    const isPasswordValid =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isPasswordValid) {
      return next({
        statusCode: 404,
        message: "User not found",
      });
    }

    // ----------------------------------------
    // Generate token
    // ----------------------------------------
    const token =
      generateToken(user);

    // ----------------------------------------
    // Send response
    // ----------------------------------------
    return res.status(200).json({
      success: true,

      message:
        "Login successful",

      data: {
        user: user.toJSON(),
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// EXPORT
// ==========================================
module.exports = {
  registerUser,
  loginUser,
};