import { EventFrom, StateFrom } from "xstate";
import { createModel } from "xstate/lib/model";
import { __AuthenticationToken } from "../utils/globalVariables";
import { apiRequest } from "../utils/requestApi";
import { AppServices } from "./AddBudget";

const model = createModel({
  expenses: {} as unknown,
  serviceRefs: {} as AppServices,
  requestStatus: "" as string,
  budgetId: "" as string
}, {
  events: {
    STORE_RESPONSE: (response: unknown) => ({ response }),
    GET_EXPENSES_OF_BUDGET: (budgetId: string) => ({budgetId}),
    GET_ALL_EXPENSES: () => ({})
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
  initial: 'idle',
  states: {
    loadingAllExpenses: {
      invoke: {
        src: 'getAllExpenses',
        onDone: {
          actions: ['storeExpenseList'],
          target: 'idle'
        },
        onError: {
          actions: ['setRequestStatus'],
          target: 'idle'
        }
      },
    },
    idle: {
      on: {
        GET_ALL_EXPENSES: {
          target: 'loadingAllExpenses'
        },
        GET_EXPENSES_OF_BUDGET: {
          actions: 'setBudgetId',
          target: 'loadAllExpensesOfBudget'
        }
      }
    },
    loadAllExpensesOfBudget: {
      invoke: {
        src: 'getAllExpensesOfBudget',
        onDone: {
          actions: ['storeExpenseList'],
          target: 'idle'
        },
        onError: {
          actions: ['setRequestStatus'],
          target: 'idle'
        }
      },
    }
  }
}, {
  actions: {
    setBudgetId: model.assign({
      budgetId: (_context,event) => {
        return event.budgetId}
    }),

    storeExpenseList: model.assign({
      expenses: (_context, event) => {
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
    },
    getAllExpensesOfBudget: async (context) => {
      const header = {
        'Accept': 'application/json',
        'Authorization': __AuthenticationToken.getToken()
      };
      const queryParams = `budgetId=${ context.budgetId }`
      
      const response = await apiRequest('GET', header, '', 'getBudgetExpenses', queryParams);
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