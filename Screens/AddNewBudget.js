import React, {useState} from 'react';
import {Button, Platform, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';
import {theme, themeColors} from '../Theme';
import {LabeledInputField} from './Components/LabeledInputField';
import {PressableLabeledInputField} from './Components/PressableLabeledInputField';

export const AddNewBudget = () => {
  const [budgetAmount, setBudgetAmount] = useState('0');
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
      style={theme.styles.linearGradient}>
      <View>
        <LabeledInputField
          label="Budget"
          budgetAmount={budgetAmount}
          handleBudgetInput={handleBudgetInput}
          placeholder="Enter the Amount"
        />
        <PressableLabeledInputField
          label="Start Date"
          showStartDatePicker={showStartDatePicker}
          setStartDatePickerVisibility={setStartDatePickerVisibility}
          startDate={startDate}
          placeholder="Select the Date"
        />
        <PressableLabeledInputField
          label="End Date"
          showStartDatePicker={showEndDatePicker}
          setStartDatePickerVisibility={setEndDatePickerVisibility}
          startDate={endDate}
          placeholder="Select the Date"
        />
        {showStartDatePicker && (
          <DateTimePicker
            mode="date"
            display="spinner"
            value={new Date()}
            positiveButton={{label: 'OK', textColor: themeColors.dodgerblue}}
            negativeButton={{
              label: 'CANCEL',
              textColor: themeColors.dodgerblue,
            }}
            onChange={handleStartDateOnChange}
          />
        )}
        {showEndDatePicker && (
          <DateTimePicker
            mode="date"
            display="spinner"
            value={new Date()}
            positiveButton={{label: 'OK', textColor: themeColors.dodgerblue}}
            negativeButton={{
              label: 'CANCEL',
              textColor: themeColors.dodgerblue,
            }}
            onChange={handleEndDateOnChange}
          />
        )}
      </View>
      <Button title="Add the budget" />
    </LinearGradient>
  );
};
