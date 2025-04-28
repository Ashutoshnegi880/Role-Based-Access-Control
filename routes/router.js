const express = require("express");
const router = express.Router();
const path = require("path");

const userRoutes = require("./userRoutes");
const blogRoutes = require("./blogRoutes");

const clientPath = path.join(__dirname, "../public");
router.use(express.static(clientPath));

// Redirect "/" and "/login" to login page
router.get("/", (req, res) => res.sendFile(clientPath + "/login.html"));
router.get("/login", (req, res) => res.sendFile(clientPath + "/login.html"));

// Signup page
router.get("/signup", (req, res) => res.sendFile(clientPath + "/signup.html"));

// Blogs page
router.get("/blogs", (req, res) => res.sendFile(clientPath + "/blogs.html"));

// Admin dashboard page
router.get("/admin", (req, res) => res.sendFile(clientPath + "/admin.html"));

router.use("/api/auth", userRoutes);
router.use("/api/blogs", blogRoutes);

module.exports = router;
