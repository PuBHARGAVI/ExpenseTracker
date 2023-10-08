import {useInterpret, useSelector} from '@xstate/react';
import {
  selectExpensesList,
  viewAllExpensesModel,
  selectRequestStatus,
  events
} from '../machines/viewAllExpenses';

export function useViewAllExpensesScreen(props) {
  const service = useInterpret(viewAllExpensesModel);

  return {
    GET_EXPENSES_OF_BUDGET: budgetId =>
      service.send(events.GET_EXPENSES_OF_BUDGET(budgetId)),
    GET_ALL_EXPENSES: () =>
      service.send(events.GET_ALL_EXPENSES()),
    DELETE_EXPENSE: (expenseId) => service.send(events.DELETE_EXPENSE(expenseId)),  
    expenses: useSelector(service, selectExpensesList),
    requestStatus: useSelector(service, selectRequestStatus),
  };
}
