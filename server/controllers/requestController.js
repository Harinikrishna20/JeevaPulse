const BloodRequest = require("../models/BloodRequest");
const Notification = require("../models/Notification");
const Response = require("../models/Response");
const User = require("../models/User");

const getCompatibleDonorGroups = (bloodGroup) => {
  const compatibilityMap = {
    "O-": ["O-"],
    "O+": ["O-", "O+"],
    "A-": ["O-", "A-"],
    "A+": ["O-", "O+", "A-", "A+"],
    "B-": ["O-", "B-"],
    "B+": ["O-", "O+", "B-", "B+"],
    "AB-": ["O-", "A-", "B-", "AB-"],
    "AB+": ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"],
  };

  return compatibilityMap[bloodGroup] || [bloodGroup];
};

const createRequest = async (req, res, next) => {
  try {
    const {
      patientName,
      bloodGroup,
      unitsRequired,
      hospitalName,
      location,
      urgency,
      requiredDate,
      contactNumber,
      additionalDetails,
    } = req.body;

    if (!patientName || !bloodGroup || !unitsRequired || !hospitalName || !location || !requiredDate || !contactNumber) {
      return next({
        statusCode: 400,
        message: "Patient name, blood group, units required, hospital name, location, required date, and contact number are required",
      });
    }

    const request = await BloodRequest.create({
      requester: req.user._id,
      patientName,
      bloodGroup,
      unitsRequired,
      hospitalName,
      location,
      urgency: urgency || "Normal",
      requiredDate,
      contactNumber,
      additionalDetails: additionalDetails || "",
      status: "PENDING",
    });

    const donorGroups = getCompatibleDonorGroups(bloodGroup);

    const matchingDonors = await User.find({
      _id: { $ne: req.user._id },
      isDonor: true,
      availability: "AVAILABLE",
      bloodGroup: { $in: donorGroups },
    }).select("_id name email bloodGroup availability");

    if (matchingDonors.length > 0) {
      await Notification.insertMany(
        matchingDonors.map((donor) => ({
          recipient: donor._id,
          type: "NEW_BLOOD_REQUEST",
          title: "New blood request",
          message: `A ${bloodGroup} blood request is active and matches your donor profile.`,
          bloodRequest: request._id,
        }))
      );
    }

    return res.status(201).json({
      success: true,
      message: "Blood request created successfully",
      data: request,
    });
  } catch (error) {
    next(error);
  }
};

const getRequests = async (req, res, next) => {
  try {
    const requests = await BloodRequest.find()
      .populate("requester", "name email phone role location")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Requests retrieved successfully",
      data: requests,
    });
  } catch (error) {
    next(error);
  }
};

const getMyRequests = async (req, res, next) => {
  try {
    const requests = await BloodRequest.find({ requester: req.user._id })
      .populate("requester", "name email phone role location")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Your requests retrieved successfully",
      data: requests,
    });
  } catch (error) {
    next(error);
  }
};

const getRequestById = async (req, res, next) => {
  try {
    const request = await BloodRequest.findById(req.params.id).populate(
      "requester",
      "name email phone role location"
    );

    if (!request) {
      return next({ statusCode: 404, message: "Blood request not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Blood request retrieved successfully",
      data: request,
    });
  } catch (error) {
    next(error);
  }
};

const updateRequest = async (req, res, next) => {
  try {
    const request = await BloodRequest.findById(req.params.id);

    if (!request) {
      return next({ statusCode: 404, message: "Blood request not found" });
    }

    if (request.requester.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return next({ statusCode: 403, message: "You are not allowed to update this request" });
    }

    const allowedFields = [
      "patientName",
      "bloodGroup",
      "unitsRequired",
      "hospitalName",
      "location",
      "urgency",
      "requiredDate",
      "contactNumber",
      "additionalDetails",
    ];

    const updates = {};
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    if (Object.keys(updates).length === 0) {
      return next({ statusCode: 400, message: "No valid request fields provided" });
    }

    const updatedRequest = await BloodRequest.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      success: true,
      message: "Blood request updated successfully",
      data: updatedRequest,
    });
  } catch (error) {
    next(error);
  }
};

const updateRequestStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    const validStatuses = ["PENDING", "MATCHED", "CONFIRMED", "FULFILLED", "CANCELLED"];

    if (!status || !validStatuses.includes(status)) {
      return next({ statusCode: 400, message: "A valid request status is required" });
    }

    const request = await BloodRequest.findById(req.params.id);

    if (!request) {
      return next({ statusCode: 404, message: "Blood request not found" });
    }

    if (request.requester.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return next({ statusCode: 403, message: "You are not allowed to change this request status" });
    }

    const previousStatus = request.status;
    request.status = status;
    await request.save();

    const donorResponses = await Response.find({ bloodRequest: request._id });
    const recipientIds = donorResponses.map((response) => response.donor.toString());

    if (recipientIds.length > 0) {
      await Promise.all(
        recipientIds.map((recipientId) =>
          Notification.create({
            recipient: recipientId,
            type: status === "FULFILLED" ? "REQUEST_FULFILLED" : "REQUEST_STATUS_CHANGED",
            title: status === "FULFILLED" ? "Request fulfilled" : "Request status updated",
            message:
              status === "FULFILLED"
                ? `The blood request has been fulfilled.`
                : `The blood request status changed from ${previousStatus} to ${status}.`,
            bloodRequest: request._id,
          })
        )
      );
    }

    return res.status(200).json({
      success: true,
      message: "Request status updated successfully",
      data: request,
    });
  } catch (error) {
    next(error);
  }
};

const deleteRequest = async (req, res, next) => {
  try {
    const request = await BloodRequest.findById(req.params.id);

    if (!request) {
      return next({ statusCode: 404, message: "Blood request not found" });
    }

    if (request.requester.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return next({ statusCode: 403, message: "You are not allowed to delete this request" });
    }

    await Response.deleteMany({ bloodRequest: request._id });
    await request.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Blood request deleted successfully",
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createRequest,
  getRequests,
  getMyRequests,
  getRequestById,
  updateRequest,
  updateRequestStatus,
  deleteRequest,
};
