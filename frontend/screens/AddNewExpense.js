import React from 'react';
import {Button, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {LabeledInputField} from '../components/LabeledInputField';
import {PressableLabeledInputField} from '../components/PressableLabeledInputField';
import {useAddBudgetScreen} from './AddNewExpenseController';
import {theme, themeColors} from '../Theme';
import {formatDate} from '../utils/dateUtils';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import {MessageOverlay} from '../components/MessageOverlay';

export const getPickerValue = budget => {
  const formattedStartDate = formatDate(new Date(budget.startDate));
  const formattedEndDate = formatDate(new Date(budget.endDate));
  const pickerValue = `${formattedStartDate}  -  ${formattedEndDate}  -  ${budget.amount}`;

  return pickerValue;
};

export const AddNewExpense = () => {
  let parsedData;
  const controller = useAddBudgetScreen();

  if (controller.budgets.length > 0) {
    console.log('array:', controller.budgets);
    parsedData = controller.budgets.map(item => JSON.parse(item));
  }

  const onExpenseAmountChange = amount => {
    return controller.ADD_AMOUNT(Number(amount));
  };

  const onExpenseDescriptionChange = description => {
    return controller.ADD_DESCRIPTION(description);
  };

  const handleDateChange = ({type}, selectedDate) => {
    if (type == 'set') {
      if (Platform.OS == 'android') {
        controller.OK(selectedDate);
      }
    } else {
      controller.CANCEL();
    }
  };

  const handleBudgetChange = budget => {
    controller.ON_BUDGET_SELECTION(budget);
  };
  return (
    <LinearGradient
      colors={['white', 'lightblue']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={theme.addNewExpenseStyles.linearGradientContainer}>
      <MessageOverlay
        isVisible={controller.storeStatus != ''}
        message={controller.storeStatus}
        onDismiss={() => {
          return controller.DISMISS;
        }}
        budgetExceededInfo={controller.budgetExceededInfo}
      />
      <View>
        <LabeledInputField
          label="Amount"
          value={controller.expenseAmount.toString()}
          onChange={text => onExpenseAmountChange(text)}
          placeholder="Enter the Amount"
          keyboardType="numeric"
        />
        <LabeledInputField
          label="Description"
          value={controller.expenseDescription}
          onChange={text => onExpenseDescriptionChange(text)}
          placeholder="Enter the Description"
          keyboardType="default"
        />
        <PressableLabeledInputField
          label="Date"
          setDatePickerVisibility={() => controller.ON_DATE_PICKER_PRESS()}
          date={formatDate(controller.date)}
          placeholder="Select the Date"
        />
        {controller.showDatePicker && (
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
        {controller.budgets.length > 0 && (
          <View style={theme.addNewExpenseStyles.budgetView}>
            <View style={theme.addNewExpenseStyles.labelView}>
              <Text style={theme.addNewExpenseStyles.label}>Budget</Text>
              <Text style={theme.styles.colon}>:</Text>
            </View>
            <View style={theme.addNewExpenseStyles.pickerView}>
              <Picker
                selectedValue={controller.budgetKey}
                onValueChange={handleBudgetChange}
                style={theme.addNewExpenseStyles.picker}>
                {parsedData.length > 0 &&
                  parsedData.map(budget => {
                    const pickerValue = getPickerValue(budget);
                    return (
                      <Picker.Item
                        key={pickerValue}
                        label={pickerValue}
                        value={pickerValue}
                      />
                    );
                  })}
              </Picker>
            </View>
          </View>
        )}
      </View>
      <Button title="Add the Expense" onPress={controller.ADD_EXPENSE} />
    </LinearGradient>
  );
};
