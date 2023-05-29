
// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  internalEvents: {
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {

  };
  missingImplementations: {
    actions: never;
    delays: never;
    guards: never;
    services: never;
  };
  eventsCausingActions: {
    "initializeTheBudgetKey": "STORE_RESPONSE";
    "loadAllBudgets": "xstate.init";
    "resetStoreStatus": "RESET_STORE_STATUS";
    "resetTheFields": "ADD_EXPENSE";
    "setAllBudgets": "STORE_RESPONSE";
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

  };
  matchesStates: "acceptingExpenseInput" | "handleDatePicker" | "loadingAllBudgets";
  tags: never;
}
