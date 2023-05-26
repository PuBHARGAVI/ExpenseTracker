import React, {useState} from 'react';
import {
  TextInput,
  Button,
  StyleSheet,
  Pressable,
  Platform,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';

export const AddNewBudget = () => {
  const [budgetAmount, setBudgetAmount] = useState(0);
  const [showStartDatePicker, setStartDatePickerVisibility] = useState(false);
  const [showEndDatePicker, setEndDatePickerVisibility] = useState(false);
  const [startDate, setStartDate] = useState(new Date().toDateString());
  const [endDate, setEndDate] = useState(new Date().toDateString());

  const handleBudgetInput = amount => setBudgetAmount(amount);

  const handleStartDateOnChange = ({type}, selectedDate) => {
    if (type == 'set') {
      if (Platform.OS == 'android') {
        setStartDatePickerVisibility(!showStartDatePicker);
        setStartDate(selectedDate.toDateString());
      }
    } else {
      setStartDatePickerVisibility(!showStartDatePicker);
    }
  };

  const handleEndDateOnChange = ({type}, selectedDate) => {
    if (type == 'set') {
      if (Platform.OS == 'android') {
        setEndDatePickerVisibility(!showEndDatePicker);
        setEndDate(selectedDate.toDateString());
      }
    } else {
      setEndDatePickerVisibility(!showEndDatePicker);
    }
  };

  return (
    <LinearGradient
      colors={['white', 'lightblue']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={styles.container}>
      <View>
        <View style={styles.viewContainer}>
          <Text style={styles.label}>Budget</Text>
          <Text style={styles.colonStyles}>:</Text>
          <TextInput
            style={[styles.input, {flex: 0.6}]}
            keyboardType="numeric"
            placeholder="Enter the Amount"
            placeholderTextColor="#696969"
            value={budgetAmount}
            autoFocus={true}
            onChangeText={text => handleBudgetInput(text)}
          />
        </View>
        <View style={styles.viewContainer}>
          <Text style={styles.label}>Start Date</Text>
          <Text style={styles.colonStyles}>:</Text>
          <Pressable
            style={styles.pressableStyles}
            onPress={() => setStartDatePickerVisibility(!showStartDatePicker)}>
            <TextInput
              style={styles.input}
              placeholder="Select the Date"
              value={startDate}
              autoFocus={true}
              editable={false}
            />
          </Pressable>
        </View>
        <View style={styles.viewContainer}>
          <Text style={styles.label}>End Date</Text>
          <Text style={styles.colonStyles}>:</Text>
          <Pressable
            style={styles.pressableStyles}
            onPress={() => setEndDatePickerVisibility(!showEndDatePicker)}>
            <TextInput
              style={styles.input}
              placeholder="Select the Date"
              value={endDate}
              autoFocus={true}
              editable={false}
            />
          </Pressable>
        </View>
        {showStartDatePicker && (
          <DateTimePicker
            mode="date"
            display="spinner"
            value={new Date()}
            positiveButton={{label: 'OK', textColor: '#1e90ff'}}
            negativeButton={{label: 'CANCEL', textColor: '#1e90ff'}}
            onChange={handleStartDateOnChange}
          />
        )}
        {showEndDatePicker && (
          <DateTimePicker
            mode="date"
            display="spinner"
            value={new Date()}
            positiveButton={{label: 'OK', textColor: '#1e90ff'}}
            negativeButton={{label: 'CANCEL', textColor: '#1e90ff'}}
            onChange={handleEndDateOnChange}
          />
        )}
      </View>
      <Button title="Add the budget" />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  input: {
    borderBottomColor: '#1e90ff',
    borderBottomWidth: 1,
    color: '#696969',
  },
  colonStyles: {
    fontWeight: '500',
    fontSize: 17,
    color: 'black',
    flex: 0.1,
  },
  pressableStyles: {
    flex: 0.6,
  },
  viewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    justifyContent: 'space-evenly',
    width: '80%',
  },
  label: {
    color: 'black',
    fontWeight: '500',
    fontSize: 17,
    flex: 0.3,
  },
});
