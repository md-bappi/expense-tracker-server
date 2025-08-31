require("dotenv").config();

const PORT = process.env.PORT || 5000;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/ecommerce";
const JWT_SECRET = process.env.JWT_SECRET || "sdfkdsfkdksdfkdsf";
module.exports = {
  PORT,
  MONGO_URI,
  JWT_SECRET,
};
