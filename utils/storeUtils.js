import {MMKVLoader} from 'react-native-mmkv-storage';

const mmkv = new MMKVLoader().initialize();

export const getAllBudgets = async () => {
  try {
    const budgets = await mmkv.getItem('budgets');

    return JSON.parse(budgets);
  } catch (error) {
    throw error;
  }
};

export const storeBudget = async budgetKey => {
  try {
    let budgets = await getAllBudgets();
    const newBudgetList = budgets ? [...budgets, budgetKey] : [budgetKey];

    await mmkv.setItem('budgets', JSON.stringify(newBudgetList));
    return 'Budget details are successfully stored!';
  } catch (error) {
    throw error;
  }
};

export const getAllExpenses = async budgetKey => {
  try {
    const expenses = await mmkv.getItem(budgetKey);

    return JSON.parse(expenses);
  } catch (error) {
    throw error;
  }
};

export const storeExpense = async (budgetKey, newExpense) => {
  try {
    let expenses = await getAllExpenses(budgetKey);

    checkBudgetExceed(budgetKey, expenses, newExpense);
    const newExpenseList = expenses ? [...expenses, newExpense] : [newExpense];

    await mmkv.setItem(budgetKey, JSON.stringify(newExpenseList));
    return 'Expense details are successfully stored!';
  } catch (error) {
    console.log('error:', error);
    throw error;
  }
};

const checkBudgetExceed = (budgetKey, expenses, currentExpense) => {
  let allExpensesSum, remainingAmount, currentExpenseAmount;

  allExpensesSum =
    expenses == null
      ? 0
      : expenses.reduce((sum, expense) => {
          const parsedExpense = JSON.parse(expense);
          return sum + parsedExpense.amount;
        }, 0);
  remainingAmount = Number(budgetKey.split('-')[2]) - allExpensesSum;
  currentExpenseAmount = JSON.parse(currentExpense).amount;

  if (currentExpenseAmount > remainingAmount) {
    throw new Error(
      `Amount is exceeding the budget limit. Only ₹ ${remainingAmount} Rs left in the budget`,
    );
  }
};
