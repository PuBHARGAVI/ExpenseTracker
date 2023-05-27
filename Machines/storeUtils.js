import {MMKVLoader} from 'react-native-mmkv-storage';

const mmkv = new MMKVLoader().initialize();

export const storeBudget = async budgetKey => {
  try {
    await mmkv.setItem(budgetKey, JSON.stringify([]));
    return 'Budget details are successfully stored!';
  } catch (error) {
    throw error;
  }
};
