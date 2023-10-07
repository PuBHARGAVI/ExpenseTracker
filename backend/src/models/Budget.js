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
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const budget = mongoose.model('Budget', expenseSchema);

module.exports = budget;