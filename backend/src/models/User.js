const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowerCase: true,
    validate(value){
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

      if(value.length == 0){
        throw 'Email should not be empty';
      }
      else if(!emailPattern.test(value)){
        throw 'Email pattern is incorrect';
      }
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,
    maxlenght: 12
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