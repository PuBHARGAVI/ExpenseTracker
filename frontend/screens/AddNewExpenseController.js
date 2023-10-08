import {useInterpret, useSelector} from '@xstate/react';
import {
  addExpenseModelMachine,
  events,
  selectExpenseAmount,
  selectExpenseDate,
  selectExpenseDescription,
  selectStoreStatus,
  selectDatePickerVisibility,
  selectBudgetList,
  selectBudgetKey,
  selectBudgetExceededInfo,
} from '../machines/addExpense';
import { selectRequestStatus } from '../machines/AddBudget';

export function useAddExpenseScreen() {
  const service = useInterpret(addExpenseModelMachine);

  return {
    ADD_AMOUNT: amount => service.send(events.ADD_AMOUNT(amount)),
    ADD_DESCRIPTION: description =>
      service.send(events.ADD_DESCRIPTION(description)),
    ADD_EXPENSE: () => service.send(events.ADD_EXPENSE()),
    ON_DATE_PICKER_PRESS: () => service.send(events.ON_DATE_PICKER_PRESS()),
    OK: date => service.send(events.OK(date)),
    CANCEL: () => service.send(events.CANCEL()),
    RESET_STORE_STATUS: () => service.send(events.RESET_STORE_STATUS()),
    ON_BUDGET_SELECTION: budgetKey =>
      service.send(events.ON_BUDGET_SELECTION(budgetKey)),
    DISMISS: () => service.send(events.DISMISS()),
    showDatePicker: useSelector(service, selectDatePickerVisibility),
    expenseAmount: useSelector(service, selectExpenseAmount),
    expenseDescription: useSelector(service, selectExpenseDescription),
    storeStatus: useSelector(service, selectStoreStatus),
    date: useSelector(service, selectExpenseDate),
    budgets: useSelector(service, selectBudgetList),
    budgetKey: useSelector(service, selectBudgetKey),
    budgetExceededInfo: useSelector(service, selectBudgetExceededInfo),
    requestStatus: useSelector(service, selectRequestStatus)
  };
}
