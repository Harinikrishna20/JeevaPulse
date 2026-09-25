const BloodRequest = require("../models/BloodRequest");
const Response = require("../models/Response");
const Notification = require("../models/Notification");

const createResponse = async (req, res, next) => {
  try {
    const { bloodRequest, message } = req.body;

    if (!bloodRequest) {
      return next({ statusCode: 400, message: "Blood request ID is required" });
    }

    const request = await BloodRequest.findById(bloodRequest);
    if (!request) {
      return next({ statusCode: 404, message: "Blood request not found" });
    }

    if (request.requester.toString() === req.user._id.toString()) {
      return next({ statusCode: 400, message: "You cannot respond to your own blood request" });
    }

    const existingResponse = await Response.findOne({
      bloodRequest,
      donor: req.user._id,
    });

    if (existingResponse && existingResponse.status !== "WITHDRAWN") {
      return next({ statusCode: 409, message: "You have already responded to this request" });
    }

    const response = await Response.create({
      bloodRequest,
      donor: req.user._id,
      message: message || "",
      status: "PENDING",
    });

    await Notification.create({
      recipient: request.requester,
      type: "DONOR_RESPONSE",
      title: "New donor response",
      message: `${req.user.name} responded to your blood request.`,
      bloodRequest: request._id,
      response: response._id,
    });

    return res.status(201).json({
      success: true,
      message: "Response submitted successfully",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const getMyResponses = async (req, res, next) => {
  try {
    const responses = await Response.find({ donor: req.user._id })
      .populate({
        path: "bloodRequest",
        populate: {
          path: "requester",
          select: "name email phone location",
        },
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Your responses retrieved successfully",
      data: responses,
    });
  } catch (error) {
    next(error);
  }
};

const getResponsesForRequest = async (req, res, next) => {
  try {
    const { requestId } = req.params;

    const request = await BloodRequest.findById(requestId);
    if (!request) {
      return next({ statusCode: 404, message: "Blood request not found" });
    }

    const isOwner = request.requester.toString() === req.user._id.toString();
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return next({ statusCode: 403, message: "You are not allowed to view responses for this request" });
    }

    const responses = await Response.find({ bloodRequest: requestId })
      .populate("donor", "name email phone role location bloodGroup")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Responses retrieved successfully",
      data: responses,
    });
  } catch (error) {
    next(error);
  }
};

const withdrawResponse = async (req, res, next) => {
  try {
    const response = await Response.findById(req.params.id);

    if (!response) {
      return next({ statusCode: 404, message: "Response not found" });
    }

    if (response.donor.toString() !== req.user._id.toString()) {
      return next({ statusCode: 403, message: "You are not allowed to withdraw this response" });
    }

    response.status = "WITHDRAWN";
    await response.save();

    return res.status(200).json({
      success: true,
      message: "Response withdrawn successfully",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const acceptResponse = async (req, res, next) => {
  try {
    const response = await Response.findById(req.params.id).populate("bloodRequest");

    if (!response) {
      return next({ statusCode: 404, message: "Response not found" });
    }

    if (response.bloodRequest.requester.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return next({ statusCode: 403, message: "You are not allowed to accept this response" });
    }

    response.status = "ACCEPTED";
    await response.save();

    const request = await BloodRequest.findById(response.bloodRequest._id);
    request.status = "MATCHED";
    await request.save();

    await Notification.create({
      recipient: response.donor,
      type: "RESPONSE_ACCEPTED",
      title: "Response accepted",
      message: `Your response for the blood request was accepted by the requester.`,
      bloodRequest: request._id,
      response: response._id,
    });

    return res.status(200).json({
      success: true,
      message: "Response accepted successfully",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const rejectResponse = async (req, res, next) => {
  try {
    const response = await Response.findById(req.params.id).populate("bloodRequest");

    if (!response) {
      return next({ statusCode: 404, message: "Response not found" });
    }

    if (response.bloodRequest.requester.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return next({ statusCode: 403, message: "You are not allowed to reject this response" });
    }

    response.status = "REJECTED";
    await response.save();

    await Notification.create({
      recipient: response.donor,
      type: "DONOR_RESPONSE",
      title: "Response update",
      message: `Your response for the blood request was rejected by the requester.`,
      bloodRequest: response.bloodRequest._id,
      response: response._id,
    });

    return res.status(200).json({
      success: true,
      message: "Response rejected successfully",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createResponse,
  getMyResponses,
  getResponsesForRequest,
  withdrawResponse,
  acceptResponse,
  rejectResponse,
};
