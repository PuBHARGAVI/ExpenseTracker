import { createModel } from "xstate/lib/model";
import { AppServices } from "./AddBudget";
import { EventFrom, StateFrom, spawn } from "xstate";
import { storeModelMachine } from "./store";
import { storeEvents } from "./store";
import { getPickerValue } from "../screens/AddNewExpense";
import { isBudgetLimitedExceed } from "../utils/expenseUtils";
import { apiRequest } from "../utils/requestApi";
import { __AuthenticationToken } from "../shared/GlobalVariables";

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
    budgetExceededInfo: "" as string,
    storeResponse: "" as string,
    requestStatus: "" as string

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
      STORE_RESPONSE: (response: any) => ({ response }),
      STORE_ERROR: (error: Error) => ({ error }),
      DISMISS: () => ({}),
      DELETE_EXPENSE: () => ({}),
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
      invoke: {
        src: 'getAllBudgets',
        onDone: {
          actions: ['storeBudgetList','initializeTheBudgetKey'],
          target: 'acceptingExpenseInput'
        },
        onError: {
          actions: ['setRequestStatus'],
          target: 'acceptingExpenseInput'
        }
      },
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
          target: 'saveTheExpense',
        },
        DELETE_EXPENSE: {
          target: 'deleteTheExpense',
        },
        RESET_STORE_STATUS: {
          actions: ['resetStoreStatus']
        },
        ON_BUDGET_SELECTION: {
          actions: ['setTheSelectedBudgetKey']
        },
        STORE_RESPONSE: {
          actions: ['setStoreResponse'],
          target: 'checkingBudgetStatus'
        },
        STORE_ERROR: {
          actions: ['setStoreError']
        },
        DISMISS: {
          actions: 'resetRequestStatus'
        }
      }
    },
    saveTheExpense: {
      invoke: {
        src: 'sendAddExpenseRequest',
        onDone: {
          actions: ['setRequestStatus', 'resetTheFields'],
          target: 'acceptingExpenseInput'
        },
        onError: {
          actions: ['setRequestStatus', 'resetTheFields'],
          target: 'acceptingExpenseInput'
        }
      },
    },
    deleteTheExpense: {
      invoke: {
        src: 'sendDeleteExpenseRequest',
        onDone: {
          actions: ['setRequestStatus'],
          target: 'acceptingExpenseInput'
        },
        onError: {
          actions: ['setRequestStatus'],
          target: 'acceptingExpenseInput'
        }
      },
    },
    checkingBudgetStatus: {
      invoke: {
        src: 'checkIfBudgetLimitIsExceeded',
        onDone: {
        },
        onError: {
          actions: ['setBudgetExceededInfo'],
        }
      },
      on: {
        DISMISS: {
          actions: ['resetTheFields'],
          target: 'acceptingExpenseInput'
        }
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
    storeBudgetList: model.assign({
      budgets: (_context, event) => {
        return event.data.budgetList
      }
    }),
    setAddExpenseRequestStatus: model.assign({
      requestStatus: (_context, event) => event.data.status
    }),

    setRequestStatus: model.assign({
      requestStatus: (_context, event) => event.data.status
    }),

    resetRequestStatus: model.assign({
      requestStatus: (_context) => ''
    }),

    loadAllBudgets: (context) => {
      context.serviceRefs.store.send(storeEvents.VIEW_ALL_BUDGETS())
    },
    setAllBudgets: model.assign((context, event) => {
      return { ...context, budgets: event.response };
    }),
    initializeTheBudgetKey: model.assign((context, _event) => {
      const [firstBudget] = Object.values(context.budgets as object);
      const budget = JSON.parse(firstBudget);
      const key = budget.id
      return { ...context, budgetKey: key };
    }),
    setStoreResponse: model.assign((context, event) => {
      return { ...context, storeStatus: event.response.toString() };
    }),
    setStoreError: model.assign({
      storeStatus: (_context, event) => {
        const message = event.error.message.split(":")

        return message[0];
      }
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
    resetTheFields: model.assign({
      amount: () => 0,
      description: () => "" as string,
      date: () => new Date() as Date,
      storeStatus: () => "",
      budgetExceededInfo: () => ""
    }),
    setBudgetExceededInfo: model.assign((context, event) => {
      const message = event.data.message.split(":")

      return {
        ...context,
        budgetExceededInfo: message[0]
      }
    })
  },
  services: {
    checkIfBudgetLimitIsExceeded: async (context) => {
      const response = await isBudgetLimitedExceed(context.budgetKey);

      return response;
    },
    getAllBudgets: async (context) => {
      const header = {
        'Accept': 'application/json',
        'Authorization': __AuthenticationToken.getToken()
      };

      const response = await apiRequest('GET', header, '', 'getAllBudgets');
      return response;
    },
    sendAddExpenseRequest: async (context) => {
      const body = JSON.stringify({ amount: context.amount, description: context.description, date: context.date, budgetId: context.budgetKey });
      const header = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': __AuthenticationToken.getToken()
      };

      const response = await apiRequest('POST', header, body, 'addExpense');
      return response;
    },
    sendDeleteExpenseRequest: async (context) => {
      const body = JSON.stringify({ amount: context.amount, description: context.description, date: context.date, budgetId: context.budgetKey });
      const header = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': __AuthenticationToken.getToken()
      };

      const response = await apiRequest('DELETE', header, body, 'deleteExpense');
      return response;
    }
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

export function selectBudgetExceededInfo(state: State) {
  return state.context.budgetExceededInfo;
}