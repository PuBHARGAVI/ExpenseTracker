const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Device = require('../models/Device');

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
      const device = await Device.findOne({deviceId: req.header('deviceId')});
      if (device) {
        await Device.deleteOne({deviceId: req.header('deviceId')});
      }
      res.status(401).send({status: 'please Authenticate yourself'});
    }
    else{
      res.status(500).send({status: error});
    }
  }
};

module.exports = auth;
