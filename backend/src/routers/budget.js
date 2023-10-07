const express = require('express');
const cors = require('cors');
const auth = require('../middleware/auth');
const router = express.Router();
const Budget = require('../models/Budget');
const User = require('../models/User');

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

router.get('/getAllBudgets', cors(), auth, async (req, res) => {
  const user = req.user;
  
  let budgetList = await Budget.find({user: user._id}).populate('user').exec()
  budgetList = budgetList.map(budget => {
    return JSON.stringify({
      id: budget._id,
      amount: budget.amount,
      startDate: budget.startDate,
      endDate: budget.endDate
    })
  })

  res.status(200).send({budgetList: budgetList})
})

module.exports = router;