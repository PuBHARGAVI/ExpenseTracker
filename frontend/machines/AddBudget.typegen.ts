
  // This file was automatically generated. Edits will be overwritten

  export interface Typegen0 {
        '@@xstate/typegen': true;
        internalEvents: {
          "done.invoke.AddBudgetModel.saveTheBudget:invocation[0]": { type: "done.invoke.AddBudgetModel.saveTheBudget:invocation[0]"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"error.platform.AddBudgetModel.saveTheBudget:invocation[0]": { type: "error.platform.AddBudgetModel.saveTheBudget:invocation[0]"; data: unknown };
"xstate.init": { type: "xstate.init" };
        };
        invokeSrcNameMap: {
          "sendAddBudgetRequest": "done.invoke.AddBudgetModel.saveTheBudget:invocation[0]";
        };
        missingImplementations: {
          actions: never;
          delays: never;
          guards: never;
          services: never;
        };
        eventsCausingActions: {
          "resetRequestStatus": "ADD_AMOUNT" | "RESET_REQUEST_STATUS";
"resetStoreStatus": "RESET_STORE_STATUS";
"resetTheFields": "done.invoke.AddBudgetModel.saveTheBudget:invocation[0]" | "error.platform.AddBudgetModel.saveTheBudget:invocation[0]";
"setActiveDatePicker": "ON_DATE_PICKER_PRESS";
"setAddBudgetRequestStatus": "done.invoke.AddBudgetModel.saveTheBudget:invocation[0]" | "error.platform.AddBudgetModel.saveTheBudget:invocation[0]";
"setBudgetAmount": "ADD_AMOUNT";
"setDate": "OK";
"setStoreError": "STORE_ERROR";
"setStoreResponse": "STORE_RESPONSE";
"toggleDatePickerVisibility": "CANCEL" | "OK" | "ON_DATE_PICKER_PRESS";
        };
        eventsCausingDelays: {
          
        };
        eventsCausingGuards: {
          
        };
        eventsCausingServices: {
          "sendAddBudgetRequest": "ADD_BUDGET";
        };
        matchesStates: "acceptingBudgetInput" | "handleDatePicker" | "saveTheBudget";
        tags: never;
      }
  