const express = require("express");
const router = express.Router();
const timeController = require("../controllers/timeController");
const userController = require("../controllers/userController");
const attendanceController = require("../controllers/attendanceController");
const studentController = require("../controllers/studentController");

// Time routes
router.post("/time/start", timeController.startWork); // Start work for a user
router.post("/time/end", timeController.endWork); // End work for a user
router.get("/time/user/:user_id", timeController.getTimeByUserId); // Get all time entries for a user
router.get("/time/date/:created_date", timeController.getAllTimeByDate); // Get time entries by date
router.get("/time/today/:user_id", timeController.getTodayTimeByUserId); // Get time entries by date
router.get(
  "/time/date/:startDate/:endDate",
  timeController.getTodayTimeInterval
);

// User routes
router.get("/users", userController.getAllUsers); // Get all users
router.post("/users", userController.createUser); // Create a new user
router.get("/users/:user_id", userController.getUserById); // Get user by ID
router.put("/users/:user_id", userController.updateUser); // Update user by ID
router.delete("/users/:user_id", userController.deleteUser); // Delete user by ID

// Attendance routes
router.get(
  "/attendance/month/:created_date",
  attendanceController.getAllAttendanceByMonth
); // Get all attendance entries by month
router.post("/attendance", attendanceController.createAttendance); // Create attendance entry

// Student routes
router.get("/students", studentController.getAllStudents); // Get all students

module.exports = router;
