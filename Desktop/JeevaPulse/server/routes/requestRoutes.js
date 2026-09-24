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

router.use(protect);
router.post("/", createRequest);
router.get("/", getRequests);
router.get("/my", getMyRequests);
router.get("/:id", getRequestById);
router.put("/:id", updateRequest);
router.put("/:id/status", updateRequestStatus);
router.delete("/:id", deleteRequest);

module.exports = router;
