import {useInterpret, useSelector} from '@xstate/react';
import {
  addBudgetModelMachine,
  events,
  selectStartDatePickerVisibility,
  selectEndDatePickerVisibility,
  selectBudgetAmount,
  selectStartDate,
  selectEndDate,
} from '../machines/addBudget';

export function useAddBudgetScreen() {
  const service = useInterpret(addBudgetModelMachine);

  return {
    ADD_AMOUNT: amount => service.send(events.ADD_AMOUNT(amount)),
    OK: date => service.send(events.OK(date)),
    CANCEL: () => service.send(events.CANCEL()),
    ON_DATE_PICKER_PRESS: pickerType =>
      service.send(events.ON_DATE_PICKER_PRESS(pickerType)),
    showStartDatePicker: useSelector(service, selectStartDatePickerVisibility),
    showEndDatePicker: useSelector(service, selectEndDatePickerVisibility),
    startDate: useSelector(service, selectStartDate),
    endDate: useSelector(service, selectEndDate),
    budgetAmount: useSelector(service, selectBudgetAmount),
  };
}
