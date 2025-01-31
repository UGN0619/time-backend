const mongoose = require("mongoose");

const student = new mongoose.Schema({
  student_id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  phone: { type: String },
  email: { type: String, required: true },
  education: { type: String },
  role: { type: String },
  address: { type: String },
  social: { type: String },
  created_date: { type: Date, default: Date.now },
});

const Student = mongoose.model("Student", student);

module.exports = Student;
