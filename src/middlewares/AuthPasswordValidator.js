const authPasswordValidator = (req, res, next) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  if (!strongPasswordRegex.test(newPassword)) {
    return res.status(400).json({
      message: "Password must include uppercase, lowercase, number & symbol",
    });
  }

  next();
};

module.exports = authPasswordValidator;
