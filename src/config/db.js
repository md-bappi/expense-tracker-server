const mongoose = require("mongoose");
const { MONGO_URI } = require("../secret");

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("DataBase Connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
