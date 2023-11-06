const express = require('express');
const cors = require('cors');
const router = express.Router();
const User = require('../models/User');
const Device = require('../models/Device');
const jwt = require('jsonwebtoken');
const {errors} = require('../utils/constants');

router.post('/signup', cors(), async (req, res) => {
  try {
    let user = new User({
      email: req.body.email,
      password: req.body.password,
    });

    await user.validate();

    let isEmailAlreadyExists = await User.findByCredentials(req.body.email);
    if (isEmailAlreadyExists) {
      res.status(400).send({status: 'Email already exists'});
    } else {
      const token = await user.generateAuthenticationToken();
      user.tokens = user.tokens.concat({token});

      await user
        .save()
        .then(() => res.send({status: 'success', token: token}))
        .catch(e => {
          res.status(500).send({status: 'Internal server error'});
        });
    }
  } catch (error) {
    if (Object.keys(errors).includes(error.field)) {
      res.status(400).send({status: error.message});
    } else {
      res.status(500).send({status: 'Internal server error'});
    }
  }
});

router.post('/login', cors(), async (req, res) => {
  try {
    let user = new User({
      email: req.body.email,
      password: req.body.password,
    });

    await user.validate();

    user = await User.findByCredentials(req.body.email);

    if (!user) {
      res.send({status: 'Create an account to continue'});
    } else if (user.password !== req.body.password) {
      res.send({status: 'password is invalid'});
    } else {
      const token = await user.generateAuthenticationToken();
      user.tokens = user.tokens.concat({token});
      let device = await Device.findOne({deviceId: req.header('deviceId')});
      if (device) {
        device.tokens.push(token);
      } else {
        device = new Device({
          deviceId: req.header('deviceId'),
          tokens: [token],
        });
      }
      await device.save();
      await user
        .save()
        .then(() => res.status(200).send({status: 'success', token: token}))
        .catch(e => res.send({status: e}));
    }
  } catch (error) {
    if (Object.keys(errors).includes(error.field)) {
      res.status(400).send({status: error.message});
    } else {
      res.status(500).send({status: 'Internal server error'});
    }
  }
});

router.get('/tokenList', cors(), async (req, res) => {
  try {
    let device = await Device.findOne({deviceId: req.query.deviceId});
    if (!device) {
      res.status(200).send({status: []});
    } else {
      res.status(200).send({status: device.tokens});
    }
  } catch (error) {
    res.status(500).send({status: error});
  }
});

router.get('/tokenExpiry', async (req, res) => {
  try {
    const token = req.header('Authorization').replace('Bearer', '');
    if (token) {
      const decoded = jwt.verify(token, 'mySecretKey');
    }
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      const device = await Device.findOne({deviceId: req.header('deviceId')});
      if (device) {
        await Device.deleteOne({deviceId: req.header('deviceId')});
      }
      res.status(401).send({status: []});
    } else {
      res.status(500).send({status: error});
    }
  }
});

module.exports = router;
