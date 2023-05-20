import React from 'react';
import {TextInput, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export const AddNewExpense = () => {
  return (
    <LinearGradient
      colors={['white', 'lightblue']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={styles.container}>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Enter the Expense Value"
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderBottomColor: 'blue',
    borderBottomWidth: 2,
    padding: 10,
  },
});
