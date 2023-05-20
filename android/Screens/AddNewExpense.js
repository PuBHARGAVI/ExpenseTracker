import React from 'react';
import {TextInput, View, StyleSheet} from 'react-native';

export const AddNewExpense = () => {
  console.log('inside budget');
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Enter the Expense Value"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
    alignContent: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderBottomColor: 'white',
    borderBottomWidth: 2,
    padding: 10,
  },
});
