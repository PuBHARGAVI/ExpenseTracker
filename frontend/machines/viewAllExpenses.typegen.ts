
  // This file was automatically generated. Edits will be overwritten

  export interface Typegen0 {
        '@@xstate/typegen': true;
        internalEvents: {
          "done.invoke.ViewAllExpensesModel.loadingAllExpenses:invocation[0]": { type: "done.invoke.ViewAllExpensesModel.loadingAllExpenses:invocation[0]"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"error.platform.ViewAllExpensesModel.loadingAllExpenses:invocation[0]": { type: "error.platform.ViewAllExpensesModel.loadingAllExpenses:invocation[0]"; data: unknown };
"xstate.init": { type: "xstate.init" };
        };
        invokeSrcNameMap: {
          "getAllExpenses": "done.invoke.ViewAllExpensesModel.loadingAllExpenses:invocation[0]";
        };
        missingImplementations: {
          actions: never;
          delays: never;
          guards: never;
          services: never;
        };
        eventsCausingActions: {
          "setRequestStatus": "error.platform.ViewAllExpensesModel.loadingAllExpenses:invocation[0]";
"storeExpenseList": "done.invoke.ViewAllExpensesModel.loadingAllExpenses:invocation[0]";
        };
        eventsCausingDelays: {
          
        };
        eventsCausingGuards: {
          
        };
        eventsCausingServices: {
          "getAllExpenses": "xstate.init";
        };
        matchesStates: "loadingAllExpenses";
        tags: never;
      }
  