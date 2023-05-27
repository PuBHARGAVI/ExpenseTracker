import { createModel } from "xstate/lib/model";
import { EventFrom } from "xstate";
import { storeBudget } from "./storeUtils";
import { sendTo } from 'xstate';
import { sendParent } from "xstate/lib/actions";

const model = createModel({
  storeError: "" as string
},
  {
    events: {
      ADD_BUDGET: (amount: Number, startDate: Date, endDate: Date) => ({ amount, startDate, endDate }),
      STORE_RESPONSE: (response: unknown) => ({ response }),
      STORE_ERROR: (error: Error) => ({ error }),
    }
  }
);
const getBudgetKey = (budget: Budget) => {
  return `amount:${budget.amount},startDate:${budget.startDate},endDate:${budget.endDate}`
}

export const storeEvents = model.events;

export const storeModelMachine = model.createMachine(
  {
    predictableActionArguments: true,
    preserveActionOrder: true,
    tsTypes: {} as import("./Store.typegen").Typegen0,
    schema: {
      context: model.initialContext,
      events: {} as EventFrom<typeof model>
    },
    id: 'store',
    initial: 'ready',
    states: {
      ready: {
        invoke: {
          id: 'store_service',
          src: (_context) => (callback, onReceive) => {
            onReceive(async (event) => {
              try {
                let response: unknown;
                switch (event.type) {
                  case "ADD_BUDGET": {
                    response = await storeBudget(getBudgetKey(event))
                  }
                }
                callback(model.events.STORE_RESPONSE(response))
              }
              catch (error: any) {
                callback(model.events.STORE_ERROR(error))
              }
            })
          }
        },
        on: {
          ADD_BUDGET: {
            actions: ['sendEventToStoreService']
          },
          STORE_RESPONSE: {
            actions: [
              sendParent(
                (_, event) => model.events.STORE_RESPONSE(event.response),
              ),
            ],
          },
          STORE_ERROR: {
            actions: [
              sendParent(
                (_, event) => model.events.STORE_ERROR(event.error),
              ),
            ],
          },
        }
      }
    }
  },
  {
    actions: {
      sendEventToStoreService: sendTo(
        'store_service',
        (_context: any, event: any) => ({
          ...event,
        })
      ),
    }
  }
)

type Budget = {
  amount: Number,
  startDate: Date,
  endDate: Date
}