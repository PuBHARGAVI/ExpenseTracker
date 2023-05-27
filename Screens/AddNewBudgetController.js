import {useInterpret, useSelector} from '@xstate/react';
import {
  addBudgetModelMachine,
  events,
  selectStartDatePickerVisibility,
  selectEndDatePickerVisibility,
  selectBudgetAmount,
  selectStartDate,
  selectEndDate,
  selectStoreStatus,
} from '../machines/AddBudget';
import {storeModelMachine} from '../machines/store';

export function useAddBudgetScreen() {
  const service = useInterpret(addBudgetModelMachine);

  return {
    ADD_AMOUNT: amount => service.send(events.ADD_AMOUNT(amount)),
    ADD_BUDGET: () => service.send(events.ADD_BUDGET()),
    OK: date => service.send(events.OK(date)),
    CANCEL: () => service.send(events.CANCEL()),
    ON_DATE_PICKER_PRESS: pickerType =>
      service.send(events.ON_DATE_PICKER_PRESS(pickerType)),
    RESET_STORE_STATUS: () => service.send(events.RESET_STORE_STATUS()),
    showStartDatePicker: useSelector(service, selectStartDatePickerVisibility),
    showEndDatePicker: useSelector(service, selectEndDatePickerVisibility),
    startDate: useSelector(service, selectStartDate),
    endDate: useSelector(service, selectEndDate),
    budgetAmount: useSelector(service, selectBudgetAmount),
    storeStatus: useSelector(service, selectStoreStatus),
  };
}
