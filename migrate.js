// migrate.js
const mongoose = require("mongoose");
const Task = require("./models/task");

mongoose.connect("mongodb://localhost:27017/Database", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const migrate = async () => {
  try {
    // Add default priority to existing tasks
    await Task.updateMany(
      { priority: { $exists: false } },
      { $set: { priority: "medium" } }
    );

    console.log("Migration completed successfully");
  } catch (error) {
    console.error("Migration failed", error);
  } finally {
    mongoose.connection.close();
  }
};

migrate();
