const Time = require("../models/time");

// Get all time entries by date
exports.getAllTimeByDate = async (req, res) => {
  try {
    const time = await Time.findOne({ created_date: req.params.created_date });
    if (!time)
      return res
        .status(404)
        .json({ message: "No time entries found for the given date" });
    res.status(200).json(time);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Start work
exports.startWork = async (req, res) => {
  const time = new Time({
    ...req.body,
    user: req.body.user_id, // Set user as a foreign key reference
  });

  try {
    const newTime = await time.save();
    res.status(201).json(newTime);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// End work
exports.endWork = async (req, res) => {
  try {
    const time = await Time.findOne({ user: req.params.user_id });
    if (!time)
      return res
        .status(404)
        .json({ message: "Time entry not found for the user" });

    Object.assign(time, req.body);
    const updatedTime = await time.save();
    res.status(200).json(updatedTime);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all time entries by user ID
exports.getTimeByUserId = async (req, res) => {
  try {
    const times = await Time.find({ user: req.params.user_id });
    if (!times || times.length === 0)
      return res
        .status(404)
        .json({ message: "No time entries found for the user" });
    res.status(200).json(times);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
