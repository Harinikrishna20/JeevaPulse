const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["user", "donor", "requester", "organization", "admin"],
      default: "user",
    },
    location: {
      type: String,
      default: "",
      trim: true,
    },
    bloodGroup: {
      type: String,
      default: "",
      trim: true,
    },
    isDonor: {
      type: Boolean,
      default: false,
    },
    availability: {
      type: String,
      enum: ["AVAILABLE", "UNAVAILABLE", ""],
      default: "",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

module.exports = mongoose.model("User", userSchema);
