const mongoose = require("mongoose");

const timeSchema = new mongoose.Schema({
  created_date: { type: Date, default: Date.now },
  user_id: { type: String, required: true },
  work_start: { type: Date, default: Date.now },
  work_end: { type: Date, default: null }, // Default to null for uncompleted tasks
});

const Time = mongoose.model("Time", timeSchema);

module.exports = Time;
