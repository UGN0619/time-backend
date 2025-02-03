const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    student_id: { type: String, required: true },
    user_id: { type: String, required: true },
    created_date: { type: Date, default: Date.now },
  },
  {
    indexes: [
      {
        fields: { student_id: 1, user_id: 1, created_date: 1 }, // Compound index for the 3 fields
        unique: true, // Ensure the combination is unique
      },
    ],
  }
);

const Attendance = mongoose.model("Attendance", attendanceSchema);

module.exports = Attendance;
