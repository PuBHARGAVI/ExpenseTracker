const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
    trim: true,
    validate(value) {
      if (value == 0) {
        throw 'Amount cannot be Zero';
      } else if (value < 0) {
        throw 'Amount cannot be negative';
      }
    },
  },
  description: {
    type: String,
    trim: true,
  },
  date: {
    type: Date,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  budget: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Budget',
  },
});

const expense = mongoose.model('Expense', expenseSchema);

module.exports = expense;
