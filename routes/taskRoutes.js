const express = require("express");
const router = express.Router();
const timeController = require("../controllers/timeController");

// Define routes
router.post("/tasks", timeController.createTime);
router.post("/tasks/:user_id/end", timeController.endTime);
router.get("/tasks/:id", timeController.getTimeById);
router.put("/tasks/:id", timeController.updateTime);
router.delete("/tasks/:id", timeController.deleteTime);

module.exports = router;
