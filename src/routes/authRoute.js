const exress = require("express");
const {
  login,
  signUp,
  logout,
  updatePassword,
} = require("../controllers/authController");
const authValidator = require("../middlewares/authValidator");
const { successResponse } = require("../controllers/ResponseController");
const User = require("../models/authModel");
const verifyToken = require("../middlewares/verifyToken");
const authPasswordValidator = require("../middlewares/AuthPasswordValidator");

const authRoute = exress.Router();

authRoute.get("/me", verifyToken, async (req, res, next) => {
  try {
    // user info is already attached to req.user by middleware
    const id = req.user._id;
    const currentUser = await User.findById({ _id: id }).select("-password");

    return successResponse(res, {
      message: "User fetched successfully",
      payload: { currentUser },
    });
  } catch (error) {
    next(error);
  }
});

authRoute.post("/signup", authValidator, signUp);
authRoute.post("/login", login);
authRoute.patch(
  "/update-password",
  authPasswordValidator,
  verifyToken,
  updatePassword
);
authRoute.get("/logout", logout);

module.exports = authRoute;
