const express = require("express");
const router = express.Router();
const timeController = require("../controllers/timeController");
const userController = require("../controllers/userController");

// Time routes
router.post("/api/time/start", timeController.startWork); // Start work for a user
router.post("/api/time/:user_id/end", timeController.endWork); // End work for a user
router.get("/api/time/user/:user_id", timeController.getTimeByUserId); // Get all time entries for a user
router.get("/api/time/date/:created_date", timeController.getAllTimeByDate); // Get time entries by date

// User routes
router.get("/api/users", userController.getAllUsers); // Get all users
router.post("/api/users", userController.createUser); // Create a new user
router.get("/api/users/:user_id", userController.getUserById); // Get user by ID
router.put("/api/users/:user_id", userController.updateUser); // Update user by ID
router.delete("/api/users/:user_id", userController.deleteUser); // Delete user by ID

module.exports = router;
