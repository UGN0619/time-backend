const mongoose = require("mongoose");
const Time = require("./models/time");
const User = require("./models/user");

// MongoDB connection URI
const mongoURI = "mongodb://localhost:27017/Database";

// Connect to MongoDB
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB for migration"))
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit the process if connection fails
  });

const migrate = async () => {
  try {
    // Example 1: Update `Time` model entries with default `totalWorkedMinutes` if not set
    const timeResult = await Time.updateMany(
      { totalWorkedMinutes: { $exists: false } }, // Find time entries without `totalWorkedMinutes`
      { $set: { totalWorkedMinutes: 0 } } // Set default value
    );
    console.log(
      `Time migration completed: ${timeResult.nModified} time entries updated.`
    );

    // Example 2: Add default role to `User` model entries if not set
    const userResult = await User.updateMany(
      { user_role: { $exists: false } }, // Find users without `user_role`
      { $set: { user_role: "user" } } // Set default role to "user"
    );
    console.log(
      `User migration completed: ${userResult.nModified} user entries updated.`
    );
  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    // Close the database connection after migration
    mongoose.connection.close(() => {
      console.log("MongoDB connection closed.");
    });
  }
};

// Execute migration
migrate();
