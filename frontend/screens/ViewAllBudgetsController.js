import {useInterpret, useSelector} from '@xstate/react';
import {
  selectBudgetsList,
  viewAllBudgetsModel,
  selectRequestStatus,
  events
} from '../machines/viewAllBudgets';

export function useViewAllBudgetsScreen() {
  const service = useInterpret(viewAllBudgetsModel);

  return {
    budgets: useSelector(service, selectBudgetsList),
    requestStatus: useSelector(service, selectRequestStatus),
    DELETE_BUDGET: (budgetId) => service.send(events.DELETE_BUDGET(budgetId)),
    DISMISS: () => service.send(events.DISMISS())
  };
}
