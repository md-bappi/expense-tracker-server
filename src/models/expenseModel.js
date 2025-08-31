const { model, Schema, default: mongoose } = require("mongoose");

const ExpenseSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  expenseCategory: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  additionalNotes: {
    type: String,
    default: "",
  },
  receipt: {
    type: String,
    default: "",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Project",
  },
  projectCategory: {
    type: String,
    required: true,
    ref: "ProjectCategory",
  },
});

const Expense = model("expense", ExpenseSchema);
module.exports = Expense;
