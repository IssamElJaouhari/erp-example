const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// Example of an admin-only route
router.get("/admin", protect, authorize(["admin"]), (req, res) => {
  res.json({ message: "Welcome Admin! You have full access." });
});

module.exports = router;
