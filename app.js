const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cron = require("node-cron");
const exportTimesToCsv = require("./utils/exportToCsv");
const routes = require("./routes/routes"); // Import routes

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/Database", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Routes
app.use("/api", routes); // Prefix all routes with /api

// Schedule CSV export at midnight
cron.schedule("0 0 * * *", async () => {
  console.log("Running scheduled task: Exporting time items to CSV");
  try {
    await exportTimesToCsv();
    console.log("CSV export completed successfully.");
  } catch (error) {
    console.error("Error during CSV export:", error);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
