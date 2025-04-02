const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  user_id: { type: String, required: true, unique: true },
  user_name: { type: String, required: true, trim: true },
  user_phone: { type: String, trim: true },
  user_email: { type: String, required: true, unique: true, trim: true },
  user_password: { type: String, required: true }, // New field for password
  user_education: { type: String, trim: true },
  user_role: {
    type: String,
    enum: ["student", "teacher", "admin"],
    default: "teacher",
  }, // Role-based access
  user_totalWorkingMinutes: { type: Number, default: 0, required: true },
  user_social: { type: String, trim: true },
  user_profile: { type: String, trim: true },
  created_date: { type: Date, default: Date.now },
});

// Hash password before saving the user
userSchema.pre("save", async function (next) {
  if (!this.isModified("user_password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.user_password = await bcrypt.hash(this.user_password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
