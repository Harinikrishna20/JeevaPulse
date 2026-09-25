const User = require("../models/User");
const BloodRequest = require("../models/BloodRequest");
const Response = require("../models/Response");

const getRequesterDashboard = async (req, res, next) => {
  try {
    const totalRequests = await BloodRequest.countDocuments({ requester: req.user._id });
    const pendingRequests = await BloodRequest.countDocuments({ requester: req.user._id, status: "PENDING" });
    const matchedRequests = await BloodRequest.countDocuments({ requester: req.user._id, status: "MATCHED" });
    const confirmedRequests = await BloodRequest.countDocuments({ requester: req.user._id, status: "CONFIRMED" });
    const fulfilledRequests = await BloodRequest.countDocuments({ requester: req.user._id, status: "FULFILLED" });

    const recentRequests = await BloodRequest.find({ requester: req.user._id })
      .sort({ createdAt: -1 })
      .limit(5);

    return res.status(200).json({
      success: true,
      message: "Requester dashboard retrieved successfully",
      data: {
        totalRequests,
        pendingRequests,
        matchedRequests,
        confirmedRequests,
        fulfilledRequests,
        recentRequests,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getDonorDashboard = async (req, res, next) => {
  try {
    const availableRequests = await BloodRequest.countDocuments({ status: "PENDING" });
    const myResponses = await Response.countDocuments({ donor: req.user._id });
    const pendingResponses = await Response.countDocuments({ donor: req.user._id, status: "PENDING" });
    const acceptedResponses = await Response.countDocuments({ donor: req.user._id, status: "ACCEPTED" });

    const recentActivity = await Response.find({ donor: req.user._id })
      .populate("bloodRequest", "patientName hospitalName status")
      .sort({ createdAt: -1 })
      .limit(5);

    return res.status(200).json({
      success: true,
      message: "Donor dashboard retrieved successfully",
      data: {
        availableRequests,
        myResponses,
        pendingResponses,
        acceptedResponses,
        recentActivity,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getAdminDashboard = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return next({ statusCode: 403, message: "Admin access required" });
    }

    const totalUsers = await User.countDocuments();
    const totalRequests = await BloodRequest.countDocuments();
    const pendingRequests = await BloodRequest.countDocuments({ status: "PENDING" });
    const fulfilledRequests = await BloodRequest.countDocuments({ status: "FULFILLED" });
    const totalResponses = await Response.countDocuments();

    return res.status(200).json({
      success: true,
      message: "Admin dashboard retrieved successfully",
      data: {
        totalUsers,
        totalRequests,
        pendingRequests,
        fulfilledRequests,
        totalResponses,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getRequesterDashboard,
  getDonorDashboard,
  getAdminDashboard,
};
