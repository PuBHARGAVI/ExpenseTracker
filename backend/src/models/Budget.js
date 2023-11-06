const mongoose = require('mongoose');
const {createCustomError} = require('../utils/constants');

const budgetSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
    trim: true,
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

budgetSchema.pre('validate', function (next) {
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

const budget = mongoose.model('Budget', budgetSchema);

module.exports = budget;
