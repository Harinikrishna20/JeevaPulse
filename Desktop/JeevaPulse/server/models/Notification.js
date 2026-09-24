const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: [
        "NEW_BLOOD_REQUEST",
        "DONOR_RESPONSE",
        "RESPONSE_ACCEPTED",
        "REQUEST_STATUS_CHANGED",
        "REQUEST_FULFILLED",
      ],
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    bloodRequest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BloodRequest",
      default: null,
    },
    response: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Response",
      default: null,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    versionKey: false,
  }
);

module.exports = mongoose.model("Notification", notificationSchema);
