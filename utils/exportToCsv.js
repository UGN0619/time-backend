const fs = require("fs");
const { format } = require("date-fns");
const fastcsv = require("fast-csv");
const Time = require("../models/time");

const exportTimesToCsv = async () => {
  try {
    const times = await Time.find();

    if (times.length === 0) {
      console.log("No time items found to export.");
      return;
    }

    // Format the file name with the current date
    const date = format(new Date(), "yyyy-MM-dd");
    const fileName = `exports/times_${date}.csv`;

    // Ensure the exports directory exists
    if (!fs.existsSync("exports")) {
      fs.mkdirSync("exports");
    }

    // Write data to CSV
    const ws = fs.createWriteStream(fileName);
    fastcsv
      .write(
        times.map((item) => ({
          user_id: item.user_id,
          work_start: item.work_start,
          work_end: item.work_end,
          created_date: item.created_date,
        })),
        { headers: true }
      )
      .pipe(ws);

    console.log(`Time items exported successfully to ${fileName}`);
  } catch (error) {
    console.error("Error exporting time items:", error.message);
  }
};

module.exports = exportTimesToCsv;
