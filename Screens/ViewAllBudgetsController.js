import {useInterpret, useSelector} from '@xstate/react';
import {
  selectBudgetsList,
  viewAllBudgetsModel,
} from '../machines/viewAllBudgets';

export function useViewAllBudgetsScreen() {
  const service = useInterpret(viewAllBudgetsModel);

  return {
    budgets: useSelector(service, selectBudgetsList),
  };
}
