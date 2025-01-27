const mongoose = require("mongoose");

const user = new mongoose.Schema({
  user_id: { type: String, required: true },
  user_name: { type: String, required: true },
  user_phone: { type: String },
  user_email: { type: String, required: true },
  user_education: { type: String },
  user_role: { type: String },
  user_totalWorkingMinutes: { type: Number, default: 0, required: true },
  user_social: { type: String },
  user_profile: { type: String },
  created_date: { type: Date, default: Date.now },
});

const User = mongoose.model("User", user);

module.exports = User;
