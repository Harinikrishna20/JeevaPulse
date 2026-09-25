const express = require("express");

const {
  createRequest,
  getRequests,
  getMyRequests,
  getRequestById,
  updateRequest,
  updateRequestStatus,
  deleteRequest,
} = require("../controllers/requestController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// All request routes require login
router.use(protect);

// Create a blood request
router.post("/", createRequest);

// Get all blood requests
router.get("/", getRequests);

// Get current user's requests
router.get("/my", getMyRequests);

// Get one request
router.get("/:id", getRequestById);

// Update request
router.put("/:id", updateRequest);

// Update request status
router.put("/:id/status", updateRequestStatus);

// Delete request
router.delete("/:id", deleteRequest);

module.exports = router;