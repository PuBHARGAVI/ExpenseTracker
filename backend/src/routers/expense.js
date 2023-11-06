const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const auth = require('../middleware/auth');
const Budget = require('../models/Budget');
const Expense = require('../models/Expense');
const router = express.Router();
const {errors} = require('../utils/constants');
const expense = require('../models/Expense');

const getAllExpensesFromDatabase = async user => {
  try {
    const expenses = await Expense.find({user: user._id})
      .populate('user')
      .exec();
    return expenses;
  } catch (error) {
    throw error;
  }
};

const getSumOfAllExpenses = expenses => {
  let sum = 0;
  expenses.map(expense => sum = sum + expense.amount);
  return sum;
};

router.post('/addExpense', cors(), auth, async (req, res) => {
  try {
    const budget = await Budget.findById(
      new mongoose.Types.ObjectId(req.body.budgetId),
    );

    const expense = new Expense({
      amount: req.body.amount,
      description: req.body.description,
      date: req.body.date,
      user: req.user,
      budget: budget,
    });

    try {
      await expense.save();
      const expenses = await getAllExpensesFromDatabase(req.user);
      const totalExpenses = getSumOfAllExpenses(expenses);
      if (budget.amount < totalExpenses) {
        res
          .status(200)
          .send({
            status:
              'Expense is successfully stored but total expenses exceeded the Budget Limit',
          });
      } else {
        res.status(200).send({
          status: 'Expense is successfully stored',
        });
      }
    } catch (error) {
      if (Object.keys(errors).includes(error.field)) {
        res.status(400).send({status: error.message});
      } else {
        res.status(500).send({status: 'Internal server error'});
      }
    }
  } catch (error) {
    res.status(400).send({status: error});
  }
});

router.get('/getAllExpenses', cors(), auth, async (req, res) => {
  try {
    const user = req.user;

    let expenseList = await getAllExpensesFromDatabase(user);
    expenseList = expenseList.map(expense => {
      return JSON.stringify({
        id: expense._id,
        amount: expense.amount,
        description: expense.description,
        date: expense.date,
      });
    });
    res.status(200).send({expenseList: expenseList});
  } catch (error) {
    res.status(400).send({status: error});
  }
});

router.get('/getBudgetExpenses', cors(), auth, async (req, res) => {
  try {
    const user = req.user;
    const budget = await Budget.findById({_id: req.query.budgetId});

    let expenseList = await Expense.find({user: user._id, budget: budget._id})
      .populate(['user', 'budget'])
      .exec();
    expenseList = expenseList.map(expense => {
      return JSON.stringify({
        id: expense._id,
        amount: expense.amount,
        description: expense.description,
        date: expense.date,
      });
    });

    res.status(200).send({expenseList: expenseList});
  } catch (error) {
    res.status(400).send({status: error});
  }
});

router.delete('/deleteExpense', cors(), auth, async (req, res) => {
  try {
    await Expense.findOneAndRemove({_id: req.query.expenseId})
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
