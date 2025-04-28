const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { authenticate } = require('../middleware/authMiddleware');

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.get("/verify", authenticate, (req, res) => {
  res.json({
    role: req.user.role,
    id: req.user.id,
    email: req.user.email,
  });
});

module.exports = router;
