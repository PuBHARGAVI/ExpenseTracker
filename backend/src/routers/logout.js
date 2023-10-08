const express = require('express');
const cors = require('cors');
const auth = require('../middleware/auth');
const router = express.Router();

router.patch('/logout', cors(), auth, async (req, res) => {
  console.log('inside logout');
  console.log('currenttoken:', req.token);
  console.log('before token:', req.user.tokens);
  req.user.tokens = req.user.tokens.filter(token => token !== req.token);
  console.log('after token:', req.user.tokens);
  await req.user
    .save()
    .then(() => res.status(200).send({status: 'success'}))
    .catch(error => {
      res.status(500).send({status: error});
    });
});

module.exports = router;
