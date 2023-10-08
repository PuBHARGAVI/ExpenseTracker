const mongoose = require('mongoose')
const express = require('express');
const cors = require('cors');
const auth = require('../middleware/auth');
const Budget = require('../models/Budget');
const Expense = require('../models/Expense');
const router = express.Router();

router.post('/addExpense', cors(), auth, async (req, res) => {
    try {
    const budget = await Budget.findById(new mongoose.Types.ObjectId(req.body.budgetId));
    
    const expense = new Expense({
        amount: req.body.amount,
        description: req.body.description,
        date: req.body.date,
        user: req.user,
        budget: budget,
    });
    await expense
      .save()
      .then(() => {
        res.send({status: 'success'});
      })
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
    }catch(error) {
        res.status(400).send({status: error})
    }
});

router.get('/getAllExpenses', cors(), auth, async (req, res) => {
    const user = req.user;

    let expenseList = await Expense.find({ user: user._id })
        .populate('user')
        .exec();
    expenseList = expenseList.map(expense => {
        return JSON.stringify({
            id: expense._id,
            amount: expense.amount,
            description: expense.description,
            date: expense.date,
        });
    });

    res.status(200).send({ expenseList: expenseList });
});

router.get('/getBudgetExpenses', cors(), auth, async (req, res) => {
    const user = req.user;
    const budget = await Budget.findById({ _id: req.body.budgetId });

    let expenseList = await Expense.find({ user: user._id, budget: budget._id })
        .populate(['user','budget'])
        .exec();
    expenseList = expenseList.map(expense => {
        return JSON.stringify({
            id: expense._id,
            amount: expense.amount,
            description: expense.description,
            date: expense.date,
        });
    });

    res.status(200).send({ expenseList: expenseList });
});

module.exports = router;
