const mongoose = require("mongoose");

const bloodRequestSchema = new mongoose.Schema(
  {
    requester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    patientName: {
      type: String,
      required: [true, "Patient name is required"],
      trim: true,
    },
    bloodGroup: {
      type: String,
      required: [true, "Blood group is required"],
      trim: true,
    },
    unitsRequired: {
      type: Number,
      required: [true, "Units required is required"],
      min: 1,
    },
    hospitalName: {
      type: String,
      required: [true, "Hospital name is required"],
      trim: true,
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    urgency: {
      type: String,
      enum: ["Normal", "Urgent", "Emergency", "Planned"],
      default: "Normal",
    },
    requiredDate: {
      type: Date,
      required: [true, "Required date is required"],
    },
    contactNumber: {
      type: String,
      required: [true, "Contact number is required"],
      trim: true,
    },
    additionalDetails: {
      type: String,
      default: "",
      trim: true,
    },
    status: {
      type: String,
      enum: ["PENDING", "MATCHED", "CONFIRMED", "FULFILLED", "CANCELLED"],
      default: "PENDING",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("BloodRequest", bloodRequestSchema);
