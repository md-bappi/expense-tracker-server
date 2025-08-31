const jwt = require("jsonwebtoken");

const createToken = async (payload, jwtSecret, expiresIn = "1h") => {
  try {
    const token = jwt.sign(payload, jwtSecret, { expiresIn });
    return token;
  } catch (error) {
    console.error("JWT create error:", error);
    throw new Error("Token creation failed");
  }
};

module.exports = {
  createToken,
};
