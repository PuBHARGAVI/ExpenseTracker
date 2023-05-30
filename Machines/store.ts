import { createModel } from "xstate/lib/model";
import { EventFrom } from "xstate";
import { storeBudget, getAllBudgets, storeExpense } from "../utils/storeUtils";
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
      ADD_EXPENSE: (budgetKey: string, amount: Number, description: string, date: Date) => ({ budgetKey, amount, description, date }),
      VIEW_ALL_BUDGETS: () => ({}),

    }
  }
);
const getBudgetKey = (budget: Budget) => {
  return `{"amount":${budget.amount},"startDate":"${budget.startDate}","endDate":"${budget.endDate}"}`;
}

const getExpenseKey = (expense: Expense) => {
  return `{"amount":${expense.amount},"description":"${expense.description}","date":"${expense.date}"}`;
}

export const storeEvents = model.events;

export const storeModelMachine = model.createMachine(
  {
    predictableActionArguments: true,
    preserveActionOrder: true,
    tsTypes: {} as import("./store.typegen").Typegen0,
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
                    break;
                  }
                  case "ADD_EXPENSE": {
                    response = await storeExpense(event.budgetKey, getExpenseKey(event))
                    break;
                  }
                  case "VIEW_ALL_BUDGETS": {
                    response = await getAllBudgets()
                    break;
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
          VIEW_ALL_BUDGETS: {
            actions: ['sendEventToStoreService']
          },
          ADD_EXPENSE: {
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

type Expense = {
  amount: Number,
  description: string,
  date: Date,
  budget: string
}
