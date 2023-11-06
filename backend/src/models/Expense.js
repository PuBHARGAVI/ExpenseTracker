const mongoose = require('mongoose');
const {createCustomError} = require('../utils/constants');

const expenseSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
    trim: true,
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

expenseSchema.pre('validate', function (next) {
  let error;

  if (this.amount == 0) {
    error = createCustomError('amount', 'zero');
    return next(error);
  }
  if (this.amount == null) {
    error = createCustomError('amount', 'invalidAmount');
    return next(error);
  }
  next();
});

const expense = mongoose.model('Expense', expenseSchema);

module.exports = expense;
