const express = require("express");
const {
  getRequesterDashboard,
  getDonorDashboard,
  getAdminDashboard,
} = require("../controllers/dashboardController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect);
router.get("/requester", getRequesterDashboard);
router.get("/donor", getDonorDashboard);
router.get("/admin", getAdminDashboard);

module.exports = router;
