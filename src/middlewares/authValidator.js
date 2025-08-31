const authValidator = (req, res, next) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (firstName.length < 2) {
    return res
      .status(400)
      .json({ message: "First name must be at least 2 characters long" });
  }

  if (lastName.length < 3) {
    return res
      .status(400)
      .json({ message: "Last name must be at least 3 characters long" });
  }

  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email address" });
  }

  if (password.length < 8) {
    return res
      .status(400)
      .json({ message: "Password must be at least 8 characters long" });
  }

  const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  if (!strongPasswordRegex.test(password)) {
    return res.status(400).json({
      message: "Password must include uppercase, lowercase, number & symbol",
    });
  }

  next();
};

module.exports = authValidator;
