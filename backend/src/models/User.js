const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
})

userSchema.methods.generateAuthenticationToken = function () {
  const user = this;
  const token = jwt.sign({_id: user._id.toString()}, 'mySecretKey');

  return token;
};

userSchema.statics.findByCredentials = async (email) => {
  const user = await User.findOne({email});

  return user;
};

const User = mongoose.model('User', userSchema)

module.exports = User