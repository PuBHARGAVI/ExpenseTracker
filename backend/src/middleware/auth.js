const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer', '');
    const decoded = jwt.verify(token, 'mySecretKey');
    const user = await User.findOne({_id: decoded._id, 'tokens.token': token});

    if (!user) {
      res.status(401).send({status: 'Create an account to continue'});
    } else {
      req.user = user;
      req.token = token;
      next();
    }
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      res.status(401).send({status: 'please Authenticate yourself'})
    };
    res.status(500).send({status: error})
  }
};

module.exports = auth;
