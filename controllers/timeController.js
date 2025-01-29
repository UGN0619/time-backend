const Time = require("../models/time");
const User = require("../models/user");

// Get all time entries by date
exports.getAllTimeByDate = async (req, res) => {
  try {
    // Parse the requested date
    const date = new Date(req.params.created_date);

    // Validate the date
    if (isNaN(date.getTime())) {
      return res.status(400).json({ message: "Invalid date format" });
    }

    // Define the start and end of the day
    const startOfDay = new Date(date.setUTCHours(0, 0, 0, 0));
    const endOfDay = new Date(date.setUTCHours(23, 59, 59, 999));

    // Query for all records within the date range
    const timeEntries = await Time.find({
      created_date: { $gte: startOfDay, $lte: endOfDay },
    });

    // If no entries are found
    if (!timeEntries.length) {
      return res
        .status(404)
        .json({ message: "No time entries found for the given date" });
    }

    // Return the found entries
    res.status(200).json(timeEntries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Start work
exports.startWork = async (req, res) => {
  const time = new Time({
    ...req.body,
    user: req.body.user_id, // Set user as a foreign key reference
    user_name: req.body.user_name,
    user_workTime: req.body.user_totalWorkingMinutes,
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
    const time = await Time.findOne({ user_id: req.body.user_id });
    if (!time)
      return res
        .status(404)
        .json({ message: "Time entry not found for the user" });
    const endTime = new Date();
    const totalWorkedMinutes = Math.floor(
      (endTime - new Date(time.startTime)) / 60000
    );
    time.endTime = endTime;
    time.totalWorkedMinutes = totalWorkedMinutes;
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

// Get today's time entries by user ID
exports.getTodayTimeByUserId = async (req, res) => {
  try {
    const user = await User.findOne({ user_id: req.params.user_id });
    if (!user) return res.status(404).json({ message: "User not found" });

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(startOfDay);
    endOfDay.setHours(23, 59, 59, 999);

    const times = await Time.findOne({
      user_id: user.user_id,
      startTime: { $gte: startOfDay, $lte: endOfDay },
    });

    if (!times || times.length === 0)
      return res.status(200).json({
        isStarted: false,
        data: user,
        startedTime: null,
        endTime: null,
        message: "No time entries found for the user today",
      });

    const formattedStartedTime = new Date(times.startTime).toLocaleTimeString(
      [],
      {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }
    );

    const formattedEndTime = new Date(times.endTime).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    res.status(200).json({
      isStarted: true,
      data: user,
      startedTime: formattedStartedTime,
      endTime: times.endTime !== undefined ? formattedEndTime : null,
      totalWorkedMinutes: times.totalWorkedMinutes,
      message: "Time entry found for the user today",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTodayTimeInterval = async (req, res) => {
  try {
    const startOfDay = new Date(req.params.startDate);
    const endOfDay = new Date(req.params.endDate);

    const times = await Time.find({
      startTime: { $gte: startOfDay, $lte: endOfDay },
    });

    if (!times || times.length === 0)
      return res.status(200).json({
        message: "No time entries found for the user today",
      });

    res.status(200).json(times);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
