const mongoose = require("mongoose");

const timeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Foreign key to User model
  startTime: { type: Date, required: true },
  endTime: { type: Date },
  totalWorkedMinutes: { type: Number, default: 0 },
  created_date: { type: Date, default: Date.now },
});

const Time = mongoose.model("Time", timeSchema);

module.exports = Time;
