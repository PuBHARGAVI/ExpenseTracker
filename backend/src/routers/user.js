const express = require('express');
const cors = require('cors');
const router = express.Router();
const User = require('../models/User');

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
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err =>
        err.message.replace('Path `', '').replace('`', '').replace('.', ''),
      );
      const formattedError = validationErrors.join(', ');

      res.status(400).send({status: formattedError});
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

     await user
       .save()
       .then(() => res.send({status: 'success', token: token}))
       .catch(e => res.send({status: e}));
   }
 } catch (error) {
   if (error.name === 'ValidationError') {
     const validationErrors = Object.values(error.errors).map(err =>
       err.message.replace('Path `', '').replace('`', '').replace('.', ''),
     );
     const formattedError = validationErrors.join(', ');

     res.status(400).send({status: formattedError});
   } else {
     res.status(500).send({status: 'Internal server error'});
   }
 }
});

module.exports = router;
