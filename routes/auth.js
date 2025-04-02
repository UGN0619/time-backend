const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const {
  verifyToken,
  isAdmin,
  isTeacher,
  isStudent,
} = require("../middlewares/authMiddleware");

const authRouter = express.Router();

// Register User
authRouter.post("/register", async (req, res) => {
  try {
    const { user_id, user_name, user_email, user_password, user_role } =
      req.body;

    console.log("Register Request Body:", req.body);

    // Check if user exists
    const existingUser = await User.findOne({ user_email });
    if (existingUser) {
      console.log("User already exists:", user_email);
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user_password, salt);

    // Create new user
    const newUser = new User({
      user_id,
      user_name,
      user_email,
      user_password: hashedPassword, // Save hashed password
      user_role,
    });

    await newUser.save();
    console.log("User registered successfully:", newUser);

    res.json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error in register:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Login User
authRouter.post("/login", async (req, res) => {
  try {
    const { user_email, user_password } = req.body;

    const user = await User.findOne({ user_email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(user_password, user.user_password);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Generate JWT Token
    const token = jwt.sign({ id: user._id, role: user.user_role }, "JOTO_EDU", {
      expiresIn: "1h",
    });

    res.json({
      token,
      user: {
        id: user._id,
        name: user.user_name,
        email: user.user_email,
        role: user.user_role,
      },
    });
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
});

// Protected Route (Any Authenticated User)
authRouter.get("/profile", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-user_password");
    res.json(user);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ error: "Error fetching profile" });
  }
});

// Admin-only Route
authRouter.get("/admin", verifyToken, isAdmin, (req, res) => {
  res.json({ message: "Welcome, Admin!" });
});

// Teacher-only Route
authRouter.get("/teacher", verifyToken, isTeacher, (req, res) => {
  res.json({ message: "Welcome, Teacher!" });
});

// Student-only Route
authRouter.get("/student", verifyToken, isStudent, (req, res) => {
  res.json({ message: "Welcome, Student!" });
});

module.exports = authRouter;
