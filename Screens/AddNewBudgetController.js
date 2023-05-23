import {useInterpret, useSelector} from '@xstate/react';
import {
  addExpenseModelMachine,
  events,
  selectStartDatePickerVisibility,
  selectEndDatePickerVisibility,
} from '../Machines/AddExpense';

export function useAddBudgetScreen() {
  const service = useInterpret(addExpenseModelMachine);

  return {
    ADD_AMOUNT: amount => service.send(events.ADD_AMOUNT(amount)),
    START_DATE: startDate => service.send(events.START_DATE(startDate)),
    END_DATE: endDate => service.send(events.END_DATE(endDate)),
    showStartDatePicker: useSelector(service, selectStartDatePickerVisibility),
    showEndDatePicker: useSelector(service, selectEndDatePickerVisibility),
  };
}
