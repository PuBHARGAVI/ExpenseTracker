import React from 'react';
import {TextInput, View, Button, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export const AddNewBudget = () => {
  return (
    <LinearGradient
      colors={['white', 'lightblue']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={styles.container}>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Enter the Budget Value"
      />
      <Button title="Submit" color="green" />
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
    borderBottomColor: 'white',
    borderBottomWidth: 2,
    padding: 10,
  },
});
