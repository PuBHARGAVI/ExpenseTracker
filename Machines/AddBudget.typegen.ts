
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
    "resetStoreStatus": "RESET_STORE_STATUS";
    "resetTheFields": "ADD_BUDGET";
    "setActiveDatePicker": "ON_DATE_PICKER_PRESS";
    "setBudgetAmount": "ADD_AMOUNT";
    "setDate": "OK";
    "setStoreError": "STORE_ERROR";
    "setStoreResponse": "STORE_RESPONSE";
    "storeTheBudget": "ADD_BUDGET";
    "toggleDatePickerVisibility": "CANCEL" | "OK" | "ON_DATE_PICKER_PRESS";
  };
  eventsCausingDelays: {

  };
  eventsCausingGuards: {

  };
  eventsCausingServices: {

  };
  matchesStates: "acceptingBudgetInput" | "handleDatePicker";
  tags: never;
}
