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
