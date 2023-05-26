import React from 'react';
import {Button, Platform, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';
import {theme, themeColors} from '../Theme';
import {LabeledInputField} from '../Components/LabeledInputField';
import {PressableLabeledInputField} from '../Components/PressableLabeledInputField';
import {useAddBudgetScreen} from './AddNewBudgetController';

export const AddNewBudget = () => {
  const controller = useAddBudgetScreen();

  const handleBudgetInput = amount => controller.ADD_AMOUNT(Number(amount));

  const handleDateChange = ({type}, selectedDate) => {
    if (type == 'set') {
      if (Platform.OS == 'android') {
        controller.OK(selectedDate);
      }
    } else {
      controller.CANCEL();
    }
  };

  const formatDate = date =>
    date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

  return (
    <LinearGradient
      colors={['white', 'lightblue']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={theme.styles.linearGradient}>
      <View>
        <LabeledInputField
          label="Budget"
          budgetAmount={controller.budgetAmount.toString()}
          handleBudgetInput={handleBudgetInput}
          placeholder="Enter the Amount"
        />
        <PressableLabeledInputField
          label="Start Date"
          setDatePickerVisibility={() =>
            controller.ON_DATE_PICKER_PRESS('startDate')
          }
          date={formatDate(controller.startDate)}
          placeholder="Select the Date"
        />
        <PressableLabeledInputField
          label="End Date"
          setDatePickerVisibility={() =>
            controller.ON_DATE_PICKER_PRESS('endDate')
          }
          date={formatDate(controller.endDate)}
          placeholder="Select the Date"
        />
        {controller.showStartDatePicker && (
          <DateTimePicker
            mode="date"
            display="spinner"
            value={new Date()}
            positiveButton={{label: 'OK', textColor: themeColors.dodgerblue}}
            negativeButton={{
              label: 'CANCEL',
              textColor: themeColors.dodgerblue,
            }}
            onChange={handleDateChange}
          />
        )}
        {controller.showEndDatePicker && (
          <DateTimePicker
            mode="date"
            display="spinner"
            value={new Date()}
            positiveButton={{label: 'OK', textColor: themeColors.dodgerblue}}
            negativeButton={{
              label: 'CANCEL',
              textColor: themeColors.dodgerblue,
            }}
            onChange={handleDateChange}
          />
        )}
      </View>
      <Button title="Add the budget" />
    </LinearGradient>
  );
};
