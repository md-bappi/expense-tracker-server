const expenseValidator = (req, res, next) => {
  try {
    const { description, amount, category } = req.body;

    // Check if title, amount, and category are provided
    if (!description || !amount || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if amount is a number
    if (isNaN(amount)) {
      return res.status(400).json({ message: "Amount must be a number" });
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = expenseValidator;
