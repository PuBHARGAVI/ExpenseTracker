import React from 'react';
import {TextInput, StyleSheet, Button, View} from 'react-native';
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
        autoFocus={true}
      />
      <Button title="Add the Expense" />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderBottomColor: '#1e90ff',
    borderBottomWidth: 2,
    padding: 10,
    marginBottom: 30,
  },
});
