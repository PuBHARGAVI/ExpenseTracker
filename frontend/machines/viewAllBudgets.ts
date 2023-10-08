import { createModel } from "xstate/lib/model";
import { EventFrom, StateFrom, spawn } from "xstate";
import { storeEvents } from "./store";
import { AppServices } from "./AddBudget";
import { storeModelMachine } from "./store";
import { __AuthenticationToken } from "../utils/globalVariables";
import { apiRequest } from "../utils/requestApi";

const model = createModel({
  budgets: {} as unknown,
  serviceRefs: {} as AppServices,
  requestStatus: "" as string,
  budgetId: "" as string
}, {
  events: {
    STORE_RESPONSE: (response: unknown) => ({ response }),
    DELETE_BUDGET: (budgetId: string) => ({ budgetId }),
    DISMISS: () => ({})
  }
})

export const events = model.events;
export const viewAllBudgetsModel = model.createMachine({
  predictableActionArguments: true,
  preserveActionOrder: true,
  tsTypes: {} as import("./viewAllBudgets.typegen").Typegen0,
  schema: {
    context: model.initialContext,
    events: {} as EventFrom<typeof model>,
  },
  id: 'ViewAllBudgetsModel',
  initial: 'loadingAllBudgets',
  states: {
    idle: {
      on: {
        DELETE_BUDGET: {
          actions: ['setBudgetId'],
          target: 'deleteBudget'
        },
        DISMISS: {
          actions: 'resetRequestStatus'
        }
      }
    },
    loadingAllBudgets: {
      invoke: {
        src: 'getAllBudgets',
        onDone: {
          actions: ['storeBudgetList'],
          target: 'idle'
        },
        onError: {
          actions: ['setRequestStatus'],
          target:'idle'
        }
      },
    },
    deleteBudget: {
      invoke: {
        src: 'sendDeleteBudgetRequest',
        onDone:{
          actions: ['setRequestStatus'],
          target: 'loadingAllBudgets'
        },
        onError: {
          actions: ['setRequestStatus'],
          target: 'idle'
        }
      }
    }
  }
}, {
  actions: {
    setBudgetId: model.assign({
      budgetId: (_context, event) => {
        return event.budgetId
      }
    }),

    loadAllBudgets: (context) => {
      context.serviceRefs.store.send(storeEvents.VIEW_ALL_BUDGETS())
    },

    storeBudgetList: model.assign({
      budgets: (_context, event) => {
        return event.data.budgetList
      }
    }),

    setRequestStatus: model.assign({
      requestStatus: (_context, event) => event.data.status
    }),

    resetRequestStatus: model.assign({
      requestStatus: () => ''
    })
  },
  services: {
    getAllBudgets: async (context) => {
      const header = {
        'Accept': 'application/json',
        'Authorization': __AuthenticationToken.getToken()
      };

      const response = await apiRequest('GET', header, '', 'getAllBudgets');
      return response;
    },
    sendDeleteBudgetRequest: async (context) => {
      const header = {
        'Accept': 'application/json',
        'Authorization': __AuthenticationToken.getToken()
      };

      const queryParams = `budgetId=${context.budgetId}`

      const response = await apiRequest('DELETE', header, '', 'deleteBudget', queryParams);
      return response;
    },
  }
})

type State = StateFrom<typeof viewAllBudgetsModel>;

export function selectBudgetsList(state: State) {
  return state.context.budgets;
}

export function selectRequestStatus(state: State) {
  return state.context.requestStatus;
}