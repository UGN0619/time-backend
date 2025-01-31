const mongoose = require("mongoose");

const attedance = new mongoose.Schema({
  student_id: { type: String, required: true },
  user_id: { type: String, required: true },
  created_date: { type: Date, default: Date.now },
});

const Attedance = mongoose.model("Attedance", attedance);

module.exports = Attedance;
