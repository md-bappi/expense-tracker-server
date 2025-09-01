const Expense = require("../models/expenseModel");
const Project = require("../models/projectModel");
const { successResponse } = require("./ResponseController");

// Get all expenses
const getUserExpenses = async (req, res, next) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const expenses = await Expense.find({
      userId: user._id,
    });

    if (!expenses) {
      return res.status(404).json({
        message: "No expenses found",
      });
    }

    return successResponse(res, {
      message: "Expenses fetched successfully",
      payload: {
        expenses,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get expenses by project id
const getExpenses = async (req, res, next) => {
  try {
    const { id } = req.params;

    const expenses = await Expense.find({ projectId: id });
    if (!expenses) {
      return res.status(404).json({
        message: "No expenses found",
      });
    }

    return successResponse(res, {
      message: "Expenses fetched successfully",
      payload: {
        expenses,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Add a new expense
const addExpense = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { description, amount, category, date, additionalNotes, receipt } =
      req.body;
    const user = req.user;

    const project = await Project.findById({ _id: id });
    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const newExpense = new Expense({
      description,
      amount,
      expenseCategory: category,
      date,
      additionalNotes,
      receipt,
      userId: user._id,
      projectId: id,
      projectCategory: project.category,
    });

    await newExpense.save();

    return successResponse(res, {
      message: "Expense added successfully",
      payload: {
        newExpense,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUserExpenses,
  getExpenses,
  addExpense,
};
