const express = require("express");
const router = express.Router();
const timeController = require("../controllers/timeController");
const userController = require("../controllers/userController");
const attendanceController = require("../controllers/attedanceController");
const studentController = require("../controllers/studentContoller");

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
  "/attendance/month/:month",
  attendanceController.getAllAttendanceByMonth
); // Get all attendance entries by month
router.post("/attendance", attendanceController.createAttendance); // Create attendance entry
router.delete(
  "/attendance/:attendance_id",
  attendanceController.deleteAttendance
); // Delete attendance entry

// Student routes
router.get("/students", studentController.getAllStudents); // Get all students
router.get("/students/:student_id", studentController.getStudentById); // Get student by ID
router.post("/students", studentController.createStudent); // Create a new student

module.exports = router;
