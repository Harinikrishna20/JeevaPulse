const express = require("express");
const {
  createResponse,
  getMyResponses,
  getResponsesForRequest,
  withdrawResponse,
  acceptResponse,
  rejectResponse,
} = require("../controllers/responseController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect);
router.post("/", createResponse);
router.get("/my", getMyResponses);
router.get("/request/:requestId", getResponsesForRequest);
router.put("/:id/withdraw", withdrawResponse);
router.put("/:id/accept", acceptResponse);
router.put("/:id/reject", rejectResponse);

module.exports = router;
