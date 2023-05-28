import { createModel } from "xstate/lib/model";
import { AppServices } from "./AddBudget";
import { EventFrom, StateFrom, spawn } from "xstate";
import { storeModelMachine } from "./store";
import { storeEvents } from "./store";
import { getPickerValue } from "../screens/AddNewExpense";

const model = createModel(
  {
    amount: 0 as Number,
    description: "" as string,
    storeStatus: "" as string,
    date: new Date() as Date,
    showDatePicker: false as boolean,
    serviceRefs: {} as AppServices,
    budgetKey: "" as string,
    budgets: {} as unknown,
    storeResponse: "" as string,
  },
  {
    events: {
      ADD_AMOUNT: (amount: Number) => ({ amount }),
      ADD_DESCRIPTION: (description: string) => ({ description }),
      ADD_EXPENSE: () => ({}),
      ON_DATE_PICKER_PRESS: () => ({}),
      OK: (date: string) => ({ date }),
      CANCEL: () => ({}),
      RESET_STORE_STATUS: () => ({}),
      ON_BUDGET_SELECTION: (budgetKey: string) => ({ budgetKey }),
      STORE_RESPONSE: (response: any) => ({ response })
    }
  }
)

export const events = model.events;


export const addExpenseModelMachine = model.createMachine({
  predictableActionArguments: true,
  preserveActionOrder: true,
  tsTypes: {} as import("./addExpense.typegen").Typegen0,
  schema: {
    context: model.initialContext,
    events: {} as EventFrom<typeof model>,
  },
  id: 'AddBudgetModel',
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
          actions: ['setAllBudgets', 'initializeTheBudgetKey'],
          target: 'acceptingExpenseInput'
        },
      }
    },
    acceptingExpenseInput: {
      on: {
        ADD_AMOUNT: {
          actions: ['setExpenseAmount']
        },
        ADD_DESCRIPTION: {
          actions: ['setExpenseDescription']
        },
        ON_DATE_PICKER_PRESS: {
          target: 'handleDatePicker'
        },
        ADD_EXPENSE: {
          actions: ['storeTheExpense', 'resetTheFields']
        },
        RESET_STORE_STATUS: {
          actions: ['resetStoreStatus']
        },
        ON_BUDGET_SELECTION: {
          actions: ['setTheSelectedBudgetKey']
        },
        STORE_RESPONSE: {
          actions: ['setStoreResponse']
        },
      }
    },
    handleDatePicker: {
      entry: ['toggleDatePickerVisibility'],
      on: {
        OK: {
          actions: ['toggleDatePickerVisibility', 'setDate'],
          target: 'acceptingExpenseInput'
        },
        CANCEL: {
          actions: ['toggleDatePickerVisibility'],
          target: 'acceptingExpenseInput'
        }
      }
    }
  }
}, {
  actions: {
    loadAllBudgets: (context) => {
      context.serviceRefs.store.send(storeEvents.VIEW_ALL_BUDGETS())
    },
    setAllBudgets: model.assign((context, event) => {
      return { ...context, budgets: event.response };
    }),
    initializeTheBudgetKey: model.assign((context, _event) => {
      const [firstBudget] = Object.values(context.budgets as object);
      const budget = JSON.parse(firstBudget);
      const key = getPickerValue(budget)

      return { ...context, budgetKey: key };
    }),
    setStoreResponse: model.assign((context, event) => {
      return { ...context, storeStatus: event.response.toString() };
    }),
    setExpenseAmount: model.assign({
      amount: (_context, event) => event.amount
    }),
    setExpenseDescription: model.assign({
      description: (_context, event) => event.description
    }),
    setDate: model.assign({
      date: (_context, event) => event.date as unknown as Date
    }),
    toggleDatePickerVisibility: model.assign({
      showDatePicker: (context) => !context.showDatePicker
    }),
    storeTheExpense: (context) => {
      context.serviceRefs.store.send(storeEvents.ADD_EXPENSE(
        context.budgetKey,
        context.amount,
        context.description,
        context.date
      ))
    },
    setTheSelectedBudgetKey: model.assign({
      budgetKey: (_context, event) => event.budgetKey
    }),
    resetStoreStatus: model.assign({
      storeStatus: () => ""
    }),
    resetTheFields: model.assign({
      amount: () => 0,
      description: () => "",
      date: () => new Date() as Date,
    }),
  }
})

type State = StateFrom<typeof addExpenseModelMachine>;

export function selectExpenseAmount(state: State) {
  return state.context.amount;
}

export function selectExpenseDescription(state: State) {
  return state.context.description;
}

export function selectStoreStatus(state: State) {
  return state.context.storeStatus;
}

export function selectExpenseDate(state: State) {
  return state.context.date;
}

export function selectDatePickerVisibility(state: State) {
  return state.context.showDatePicker;
}

export function selectBudgetList(state: State) {
  return state.context.budgets;
}

export function selectBudgetKey(state: State) {
  return state.context.budgetKey;
}
