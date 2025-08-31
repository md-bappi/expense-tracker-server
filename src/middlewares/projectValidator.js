const projectValidator = (req, res, next) => {
  const {
    projectName,
    clientName,
    budget,
    category,
    startDate,
    dateLine,
    projectNotes,
  } = req.body;

  try {
    const validCategories = [
      "web-development",
      "app-development",
      "design",
      "marketing",
    ];

    if (
      !projectName ||
      !clientName ||
      !budget ||
      !category ||
      !startDate ||
      !dateLine ||
      !projectNotes
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const start = new Date(startDate);
    const deadline = new Date(dateLine);

    if (projectName.length < 3) {
      return res
        .status(400)
        .json({ message: "Project name must be at least 3 characters" });
    }

    if (clientName.length < 3) {
      return res
        .status(400)
        .json({ message: "Client name must be at least 3 characters" });
    }

    if (budget <= 0) {
      return res.status(400).json({ message: "Budget must be positive" });
    }

    if (!validCategories.includes(category)) {
      return res.status(400).json({ message: "Invalid category" });
    }

    if (deadline < start) {
      return res.status(400).json({
        message: "Deadline must be after start date",
      });
    }

    if (projectNotes.length > 500) {
      return res
        .status(400)
        .json({ message: "Project notes must be less than 500 characters" });
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = projectValidator;
