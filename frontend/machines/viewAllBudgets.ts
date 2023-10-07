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
  requestStatus: "" as string
}, {
  events: {
    STORE_RESPONSE: (response: unknown) => ({ response })
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
    loadingAllBudgets: {
      invoke: {
        src: 'getAllBudgets',
        onDone: {
          actions: ['storeBudgetList'],
        },
        onError: {
          actions: ['setRequestStatus'],
        }
      },
    }
  }
}, {
  actions: {
    loadAllBudgets: (context) => {
      context.serviceRefs.store.send(storeEvents.VIEW_ALL_BUDGETS())
    },
    
    storeBudgetList: model.assign({
      budgets: (_context, event) => {
        console.log("budgets:",event.data.budgetList)
        return event.data.budgetList
      }
    }),

    setRequestStatus: model.assign({
      requestStatus: (_context, event) => event.data.status
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
    }
  }
})

type State = StateFrom<typeof viewAllBudgetsModel>;

export function selectBudgetsList(state: State) {
  return state.context.budgets;
}

export function selectRequestStatus(state: State) {
  return state.context.requestStatus;
}