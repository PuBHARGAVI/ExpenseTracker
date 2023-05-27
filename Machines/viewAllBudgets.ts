import { createModel } from "xstate/lib/model";
import { EventFrom, StateFrom, spawn } from "xstate";
import { storeEvents } from "./store";
import { AppServices } from "./AddBudget";
import { storeModelMachine } from "./store";

const model = createModel({
  budgets: {},
  serviceRefs: {} as AppServices
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
      entry: [model.assign({
        serviceRefs: (context) => {
          const serviceRefs = {
            ...context.serviceRefs,
          };
          serviceRefs.store = spawn(storeModelMachine);
          return serviceRefs;
        }
      }), 'loadAllBudgets'],

      on: {
        STORE_RESPONSE: {
          actions: ['setStoreResponse']
        },
      }
    }
  }
}, {
  actions: {
    loadAllBudgets: (context) => {
      context.serviceRefs.store.send(storeEvents.VIEW_ALL_BUDGETS())
    },
    setStoreResponse: model.assign({
      budgets: (_context, events) => {
        return events.response
      }
    })
  }
})

type State = StateFrom<typeof viewAllBudgetsModel>;

export function selectBudgetsList(state: State) {
  return state.context.budgets;
}