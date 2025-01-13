const Time = require("../models/time");

exports.getAllTimes = async (req, res) => {
  try {
    const times = await Time.find();
    res.status(200).json(times);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createTime = async (req, res) => {
  const time = new Time({
    user_id: req.body.user_id,
  });

  try {
    const newTime = await time.save();
    res.status(201).json(newTime);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.endTime = async (req, res) => {
  try {
    const time = await Time.findOne({ user_id: req.params.user_id });
    if (!time) return res.status(404).json({ message: "Time not found" });
    time.work_end = Date.now();
    await time.save();
    res.status(200).json({
      message: "Time ended",
      time,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTimeById = async (req, res) => {
  try {
    const time = await Time.findById(req.params.id);
    if (!time) return res.status(404).json({ message: "Time not found" });
    res.status(200).json(time);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateTime = async (req, res) => {
  try {
    const time = await Time.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!time) return res.status(404).json({ message: "Time not found" });
    res.status(200).json(time);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteTime = async (req, res) => {
  try {
    const time = await Time.findByIdAndDelete(req.params.id);
    if (!time) return res.status(404).json({ message: "Time not found" });
    res.status(200).json({ message: "Time deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
