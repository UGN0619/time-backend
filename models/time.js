const mongoose = require("mongoose");

const timeSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  user_name: { type: String, required: true },
  user_workTime: { type: Number, default: 0 },
  startTime: { type: Date, default: Date.now },
  endTime: { type: Date },
  totalWorkedMinutes: { type: Number, default: 0 },
  created_date: { type: Date, default: Date.now },
});

const Time = mongoose.model("Time", timeSchema);

module.exports = Time;
