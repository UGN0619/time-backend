const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cron = require("node-cron");
const os = require("os"); // Import os module to get local IP
const exportTimesToCsv = require("./utils/exportToCsv");
const routes = require("./routes/routes"); // Import routes

const app = express();
const port = process.env.PORT || 3000;
const mongoDBurl =
  process.env.MONGODB_URL || "mongodb://localhost:27017/Database";

// Middleware
app.use(express.json());
app.use(cors());

// Function to get the local IP address
function getLocalIPAddress() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === "IPv4" && !iface.internal) {
        return iface.address; // Return the local IP
      }
    }
  }
  return "127.0.0.1"; // Default to localhost if no IP found
}

const localIP = getLocalIPAddress();

// Connect to MongoDB
mongoose
  .connect(mongoDBurl, {
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
  console.log(`Server is running locally at: http://localhost:${port}`);
  console.log(
    `Server is accessible on your network at: http://${localIP}:${port}`
  );
});
