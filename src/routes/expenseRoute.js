const exress = require("express");
const {
  addExpense,
  getExpenses,
  getUserExpenses,
} = require("../controllers/expenseController");
const expenseValidator = require("../middlewares/expenseValidator");
const verifyToken = require("../middlewares/verifyToken");
const expenseRoute = exress.Router();

expenseRoute.post(
  "/add-expense/:id",
  expenseValidator,
  verifyToken,
  addExpense
);

expenseRoute.get("/getUserExpenses", verifyToken, getUserExpenses);
expenseRoute.get("/getUserExpenses/:id", getUserExpenses);
expenseRoute.get("/getExpense/:id", getExpenses);

module.exports = expenseRoute;
