const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../secret");

const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies["access-token"];

    if (!token) {
      throw new Error("No token provided");
    }

    const user = jwt.verify(token, JWT_SECRET);
    console.log("current user", user);
    req.user = user;
    next();
  } catch (error) {
    throw new Error("JWT verify error: " + error.message);
  }
};

module.exports = verifyToken;
