const mongoose = require("mongoose");

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    console.warn(
      "MONGO_URI is not defined in .env. MongoDB connection skipped. Add your Atlas URI to enable database features."
    );
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 5000,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    console.warn("Continuing without MongoDB. Start the server and fix Atlas connectivity to enable database features.");
  }
};

module.exports = connectDB;
