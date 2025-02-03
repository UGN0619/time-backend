const Attedance = require("../models/attendance");
const User = require("../models/user");
const Student = require("../models/student");

// Get all attendance entries by month
// Get all attendance entries by month
exports.getAllAttendanceByMonth = async (req, res) => {
  try {
    // Parse the requested month
    const date = new Date(req.params.month);

    // Validate the date
    if (isNaN(date.getTime())) {
      return res.status(400).json({ message: "Invalid date format" });
    }

    // Set the start of the month
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);

    // Set the end of the month by getting the last day of the month
    const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    // Query for all records within the month range
    const attendanceEntries = await Attedance.find({
      created_date: { $gte: startOfMonth, $lte: endOfMonth },
    });

    // If no entries are found
    if (!attendanceEntries.length) {
      return res
        .status(404)
        .json({ message: "No attendance entries found for the given month" });
    }

    // Return the found entries
    res.status(200).json(attendanceEntries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//create attendance
exports.createAttendance = async (req, res) => {
  const attendance = new Attedance({
    user_id: req.body.user_id,
    student_id: req.body.student_id,
    created_date: req.body.created_date,
  });

  try {
    const newAttendance = await attendance.save();
    res.status(201).json(newAttendance);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//delete attendance
exports.deleteAttendance = async (req, res) => {
  try {
    const attendance = await Attedance.findById(req.params.attendance_id);
    if (!attendance) {
      return res.status(404).json({ message: "Attendance not found" });
    }

    await Attedance.deleteOne({ _id: req.params.attendance_id }); // ✅ Correct method
    res.json({ message: "Attendance deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
