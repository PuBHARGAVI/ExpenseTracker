import {useInterpret} from '@xstate/react';
import {addExpenseModelMachine, events} from '../Machines/AddExpense';

export function useAddBudgetScreen() {
  const service = useInterpret(addExpenseModelMachine);

  return {
    ADD_AMOUNT: amount => service.send(events.ADD_AMOUNT(amount)),
    START_DATE: startDate => service.send(events.START_DATE(startDate)),
    END_DATE: endDate => service.send(events.END_DATE(endDate)),
  };
}
