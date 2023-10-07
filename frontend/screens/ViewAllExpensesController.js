import {useInterpret, useSelector} from '@xstate/react';
import {
  selectExpensesList,
  viewAllExpensesModel,
  selectRequestStatus,
} from '../machines/viewAllExpenses';

export function useViewAllExpensesScreen() {
  const service = useInterpret(viewAllExpensesModel);

  return {
    expenses: useSelector(service, selectExpensesList),
    requestStatus: useSelector(service, selectRequestStatus),
  };
}
