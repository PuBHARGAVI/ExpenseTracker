const errors = Object.freeze({
  amount: {
    zero: 'Amount cannot be Zero',
    invalidAmount: 'Invalid input enter correct amount',
  },
  email: {
    zero: 'Email cannot be empty',
    invalidPattern: 'Email pattern is incorrect',
  },
  password: {
    lengthExeceeded: 'Passwords should have a length between 6 and 12',
  },
});

function createCustomError(errorField, errorType) {
  const error = new Error(errors[errorField][errorType]);
  error.field = errorField;
  return error;
}

module.exports = {errors, createCustomError};
