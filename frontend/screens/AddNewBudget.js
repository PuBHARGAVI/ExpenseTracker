import React from 'react';
import {Button, Platform, View, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';
import {theme, themeColors} from '../Theme';
import {LabeledInputField} from '../components/LabeledInputField';
import {PressableLabeledInputField} from '../components/PressableLabeledInputField';
import {useAddBudgetScreen} from './AddNewBudgetController';
import {MessageOverlay} from '../components/MessageOverlay';
import {formatDate} from '../utils/dateUtils';

export const AddNewBudget = ({navigation}) => {
  const controller = useAddBudgetScreen();

  if (controller.requestStatus === 'please Authenticate yourself') {
    navigation.reset({
      index: 0,
      routes: [{name: 'Login'}],
    });
  } 

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

  return (
    <LinearGradient
      colors={['white', 'lightblue']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={theme.styles.linearGradient}>
      <MessageOverlay
        isVisible={controller.requestStatus === 'success'}
        message={'Budget is successfully saved'}
        onDismiss={() => {
          return controller.RESET_REQUEST_STATUS;
        }}
      />
      <View>
        <LabeledInputField
          label="Amount"
          value={controller.budgetAmount.toString()}
          onChange={handleBudgetInput}
          placeholder="Enter the Amount"
          keyboardType="numeric"
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
      {controller.requestStatus !== 'success' && (
        <Text style={{color: '#B00020', textAlign: 'center', margin: 10}}>
          {controller.requestStatus}
        </Text>
      )}
      <Button title="Add the budget" onPress={controller.ADD_BUDGET} />
    </LinearGradient>
  );
};
