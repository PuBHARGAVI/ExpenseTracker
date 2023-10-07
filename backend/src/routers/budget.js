const express = require('express');
const cors = require('cors');
const auth = require('../middleware/auth');
const router = express.Router();
const Budget = require('../models/Budget');

router.post('/addBudget', cors(), auth, async (req, res) => {
  const budget = new Budget({
    amount: req.body.amount,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    user: req.user
  });

  await budget
    .save()
    .then(() => {
      res.send({status: 'success'})})
    .catch(error => {
      if (error.name === 'ValidationError') {
        const validationErrors = Object.values(error.errors).map(err =>
          err.message.replace('Path `', '').replace('`', '').replace('.', ''),
        );
        const formattedError = validationErrors.join(', ');

        res.status(400).send({status: formattedError});
      } else {
        res.status(500).send({status: 'Internal server error'});
      }
    });
});

module.exports = router;