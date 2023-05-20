import React from 'react';
import {TextInput, View, Button, StyleSheet} from 'react-native';

export const AddNewBudget = () => {
  console.log('inside budget');
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Enter the Budget Value"
      />
      <Button
        // onPress={onPressLearnMore}
        title="Submit"
        color="green"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'green',
    alignContent: 'center',
    justifyContent: 'center',
  },
  input: {
    height: d40,
    margin: 12,
    borderBottomColor: 'white',
    borderBottomWidth: 2,
    padding: 10,
  },
});
