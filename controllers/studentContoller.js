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
    const student = await Student.findOne({
      student_id: req.params.student_id,
    });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// Create a new student
exports.createStudent = async (req, res) => {
  const student = new Student({
    name: req.body.name,
    student_id: req.body.student_id,
    email: req.body.email,
    phone: req.body.phone,
    education: req.body.education,
    role: req.body.role,
    address: req.body.address,
    social: req.body.social,
  });

  try {
    const newStudent = await student.save();
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(400).json(error.message);
  }
};
