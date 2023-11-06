const express = require('express');
const cors = require('cors');
const auth = require('../middleware/auth');
const router = express.Router();
const Budget = require('../models/Budget');
const Expense = require('../models/Expense');
const mongoose = require('mongoose');
const {errors} = require('../utils/constants');

router.post('/addBudget', cors(), auth, async (req, res) => {
  try {
    const budget = new Budget({
      amount: req.body.amount,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      user: req.user,
    });

    await budget
      .save()
      .then(() => {
        res.send({status: 'success'});
      })
      .catch(error => {
       if (Object.keys(errors).includes(error.field)) {
         res.status(400).send({status: error.message});
       } else {
         res.status(500).send({status: 'Internal server error'});
       }
      });
  } catch (error) {
    res.status(400).send({status: error});
  }
});

router.get('/getAllBudgets', cors(), auth, async (req, res) => {
  try {
    const user = req.user;

    let budgetList = await Budget.find({user: user._id})
      .populate('user')
      .exec();
    budgetList = budgetList.map(budget => {
      return JSON.stringify({
        id: budget._id,
        amount: budget.amount,
        startDate: budget.startDate,
        endDate: budget.endDate,
      });
    });

    res.status(200).send({budgetList: budgetList});
  } catch (error) {
    res.status(400).send({status: error});
  }
})

router.delete('/deleteBudget', cors(), auth, async (req, res) => {
  try {
    await Expense.deleteMany({
      budget: new mongoose.Types.ObjectId(req.query.budgetId),
    });
    await Budget.findOneAndRemove({_id: req.query.budgetId})
      .then(() => {
        res.status(200).send({status: 'success'});
      })
      .catch(error => {
        res.status(400).send({status: error});
      });
  } catch (error) {
    res.status(500).send({status: error});
  }
});

module.exports = router;