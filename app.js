const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cron = require("node-cron");
const exportTimesToCsv = require("./utils/exportToCsv");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/Database", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Schedule CSV export at midnight
cron.schedule("0 0 * * *", async () => {
  console.log("Running scheduled task: Exporting time items to CSV");
  await exportTimesToCsv();
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
