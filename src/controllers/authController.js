const User = require("../models/authModel");
const { JWT_SECRET } = require("../secret");
const comparePassword = require("../utils/comparePassword");
const hashPassword = require("../utils/hashPassword");
const { createToken } = require("../utils/jwt");
const { errorResponse, successResponse } = require("./ResponseController");

const signUp = async (req, res, next) => {
  try {
    const { firstName, lastName, email, companyName, password } = req.body;

    // user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return errorResponse(res, {
        message: "User already exists",
        statusCode: 409,
      });
    }

    // hash password
    const hashedPassword = await hashPassword(password);

    // create a user
    const user = new User({
      firstName,
      lastName,
      email,
      companyName,
      password: hashedPassword,
    });

    // save user to database
    await user.save();

    const userPayload = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      companyName: user.companyName,
    };

    // create token
    const token = await createToken(userPayload, JWT_SECRET, "1h");

    // set cookie
    res.cookie("access-token", token, {
      httpOnly: true,
      sameSite: "lax", // "strict" or "lax"
      secure: false, // process.env.NODE_ENV === "production",
    });

    // return success message
    return successResponse(res, {
      message: "User created successfully",
      statusCode: 201,
      payload: { userPayload },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return errorResponse(res, {
        message: " all fields are required",
        statusCode: 400,
      });
    }

    // check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return errorResponse(res, {
        message: "User not found",
        statusCode: 404,
      });
    }

    // check if password is correct
    const isMatchPassword = await comparePassword(password, user.password);

    if (!isMatchPassword) {
      return errorResponse(res, {
        message: "Invalid credentials",
        statusCode: 401,
      });
    }

    const userPayload = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      companyName: user.companyName,
    };

    // create token
    const token = await createToken(userPayload, JWT_SECRET, "1h");

    // set cookie
    res.cookie("access-token", token, {
      httpOnly: true,
      sameSite: "lax", // "strict" or "lax"
      secure: false, // process.env.NODE_ENV === "production",
    });

    // Remove password before returning
    const { password: _, ...currentUser } = user.toObject();

    // return success message
    return successResponse(res, {
      message: "Login successful",
      statusCode: 200,
      payload: { currentUser },
    });
  } catch (error) {
    next(error);
  }
};

const updatePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
      return errorResponse(res, { message: "User not found", statusCode: 404 });
    }

    // check current password
    const isMatch = await comparePassword(currentPassword, user.password);
    if (!isMatch) {
      return errorResponse(res, {
        message: "Current password is incorrect",
        statusCode: 401,
      });
    }

    // hash new password
    const hashedPassword = await hashPassword(newPassword);

    // update password
    user.password = hashedPassword;
    await user.save();

    return successResponse(res, {
      message: "Password updated successfully",
      statusCode: 200,
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    // Clear cookie — make sure it matches the original setCookie attributes
    res.clearCookie("access-token", {
      httpOnly: true,
      secure: false, // true if using HTTPS in production
      sameSite: "lax", // same as login cookie
      path: "/", // must match the cookie path
    });

    return res.status(200).json({
      success: true,
      message: "Logout successful",
      statusCode: 200,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { signUp, login, updatePassword, logout };
