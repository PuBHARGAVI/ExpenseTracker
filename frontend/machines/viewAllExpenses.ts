import { EventFrom, StateFrom } from "xstate";
import { createModel } from "xstate/lib/model";
import { __AuthenticationToken } from "../utils/globalVariables";
import { apiRequest } from "../utils/requestApi";
import { AppServices } from "./AddBudget";

const model = createModel({
  expenses: {} as unknown,
  serviceRefs: {} as AppServices,
  requestStatus: "" as string
}, {
  events: {
    STORE_RESPONSE: (response: unknown) => ({ response })
  }
})

export const events = model.events;
export const viewAllExpensesModel = model.createMachine({
  predictableActionArguments: true,
  preserveActionOrder: true,
  tsTypes: {} as import("./viewAllExpenses.typegen").Typegen0,
  schema: {
    context: model.initialContext,
    events: {} as EventFrom<typeof model>,
  },
  id: 'ViewAllExpensesModel',
  initial: 'loadingAllExpenses',
  states: {
    loadingAllExpenses: {
      invoke: {
        src: 'getAllExpenses',
        onDone: {
          actions: ['storeExpenseList'],
        },
        onError: {
          actions: ['setRequestStatus'],
        }
      },
    }
  }
}, {
  actions: {
    storeExpenseList: model.assign({
      expenses: (_context, event) => {
        console.log("budgets:", event.data.expenseList)
        return event.data.expenseList
      }
    }),

    setRequestStatus: model.assign({
      requestStatus: (_context, event) => event.data.status
    })
  },
  services: {
    getAllExpenses: async (context) => {
      const header = {
        'Accept': 'application/json',
        'Authorization': __AuthenticationToken.getToken()
      };

      const response = await apiRequest('GET', header, '', 'getAllExpenses');
      return response;
    }
  }
})

type State = StateFrom<typeof viewAllExpensesModel>;

export function selectExpensesList(state: State) {
  return state.context.expenses;
}

export function selectRequestStatus(state: State) {
  return state.context.requestStatus;
}