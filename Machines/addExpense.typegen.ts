
// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  internalEvents: {
    "error.platform.AddBudgetModel.checkingBudgetStatus:invocation[0]": { type: "error.platform.AddBudgetModel.checkingBudgetStatus:invocation[0]"; data: unknown };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    "checkIfBudgetLimitIsExceeded": "done.invoke.AddBudgetModel.checkingBudgetStatus:invocation[0]";
  };
  missingImplementations: {
    actions: "resetStoreStatus";
    delays: never;
    guards: never;
    services: never;
  };
  eventsCausingActions: {
    "initializeTheBudgetKey": "STORE_RESPONSE";
    "loadAllBudgets": "xstate.init";
    "resetStoreStatus": "RESET_STORE_STATUS";
    "resetTheFields": "DISMISS";
    "setAllBudgets": "STORE_RESPONSE";
    "setBudgetExceededInfo": "error.platform.AddBudgetModel.checkingBudgetStatus:invocation[0]";
    "setDate": "OK";
    "setExpenseAmount": "ADD_AMOUNT";
    "setExpenseDescription": "ADD_DESCRIPTION";
    "setStoreError": "STORE_ERROR";
    "setStoreResponse": "STORE_RESPONSE";
    "setTheSelectedBudgetKey": "ON_BUDGET_SELECTION";
    "storeTheExpense": "ADD_EXPENSE";
    "toggleDatePickerVisibility": "CANCEL" | "OK" | "ON_DATE_PICKER_PRESS";
  };
  eventsCausingDelays: {

  };
  eventsCausingGuards: {

  };
  eventsCausingServices: {
    "checkIfBudgetLimitIsExceeded": "STORE_RESPONSE";
  };
  matchesStates: "acceptingExpenseInput" | "checkingBudgetStatus" | "handleDatePicker" | "loadingAllBudgets";
  tags: never;
}
