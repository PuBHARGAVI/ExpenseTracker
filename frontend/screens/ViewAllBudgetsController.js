import {useInterpret, useSelector} from '@xstate/react';
import {
  selectBudgetsList,
  viewAllBudgetsModel,
  selectRequestStatus,
} from '../machines/viewAllBudgets';

export function useViewAllBudgetsScreen() {
  const service = useInterpret(viewAllBudgetsModel);

  return {
    budgets: useSelector(service, selectBudgetsList),
    requestStatus: useSelector(service, selectRequestStatus)
  };
}
