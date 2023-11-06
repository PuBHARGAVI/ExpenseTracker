const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const {createCustomError} = require('../utils/constants');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowerCase: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchema.pre('validate', function (next) {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  let error;

  if (this.email.length == 0) {
    error = createCustomError('email', 'zero');
    return next(error);
  }
  if (!emailPattern.test(this.email)) {
    error = createCustomError('email', 'invalidPattern');
    return next(error);
  }
  const passwordLength = this.password.length;
  if (passwordLength < 6 || passwordLength > 12) {
    error = createCustomError('password', 'lengthExeceeded');
    return next(error);
  }
  next();
});

userSchema.methods.generateAuthenticationToken = function () {
  const user = this;
  const token = jwt.sign({_id: user._id.toString()}, 'mySecretKey', {
    expiresIn: 1800,
  });

  return token;
};

userSchema.statics.findByCredentials = async email => {
  const user = await User.findOne({email});

  return user;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
