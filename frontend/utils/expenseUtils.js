import {getAllExpenses} from './storeUtils';

const calculateExpensesSum = expenses =>
  expenses == null
    ? 0
    : expenses.reduce((sum, expense) => {
        const parsedExpense = JSON.parse(expense);
        return sum + parsedExpense.amount;
      }, 0);

export const isBudgetLimitedExceed = async budgetKey => {
  let allExpensesSum, budgetAmount, exceededAmount, expenses;

  expenses = await getAllExpenses(budgetKey);
  allExpensesSum = calculateExpensesSum(expenses);
  budgetAmount = Number(budgetKey.split('-')[2]);
  exceededAmount = allExpensesSum - budgetAmount;

  if (exceededAmount > 0) {
    throw new Error(`You have Exceeded your budget by ₹ ${exceededAmount} Rs`);
  }
};
