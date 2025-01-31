const Student = require("../models/student");

// Get all students

exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    if (!students.length) {
      return res.status(404).json({ message: "No students found" });
    }
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// Get student by ID
exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.student_id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
