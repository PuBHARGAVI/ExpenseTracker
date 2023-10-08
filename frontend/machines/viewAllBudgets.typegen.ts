
  // This file was automatically generated. Edits will be overwritten

  export interface Typegen0 {
        '@@xstate/typegen': true;
        internalEvents: {
          "done.invoke.ViewAllBudgetsModel.deleteBudget:invocation[0]": { type: "done.invoke.ViewAllBudgetsModel.deleteBudget:invocation[0]"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"done.invoke.ViewAllBudgetsModel.loadingAllBudgets:invocation[0]": { type: "done.invoke.ViewAllBudgetsModel.loadingAllBudgets:invocation[0]"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"error.platform.ViewAllBudgetsModel.deleteBudget:invocation[0]": { type: "error.platform.ViewAllBudgetsModel.deleteBudget:invocation[0]"; data: unknown };
"error.platform.ViewAllBudgetsModel.loadingAllBudgets:invocation[0]": { type: "error.platform.ViewAllBudgetsModel.loadingAllBudgets:invocation[0]"; data: unknown };
"xstate.init": { type: "xstate.init" };
        };
        invokeSrcNameMap: {
          "getAllBudgets": "done.invoke.ViewAllBudgetsModel.loadingAllBudgets:invocation[0]";
"sendDeleteBudgetRequest": "done.invoke.ViewAllBudgetsModel.deleteBudget:invocation[0]";
        };
        missingImplementations: {
          actions: never;
          delays: never;
          guards: never;
          services: never;
        };
        eventsCausingActions: {
          "resetRequestStatus": "DISMISS";
"setBudgetId": "DELETE_BUDGET";
"setRequestStatus": "done.invoke.ViewAllBudgetsModel.deleteBudget:invocation[0]" | "error.platform.ViewAllBudgetsModel.deleteBudget:invocation[0]" | "error.platform.ViewAllBudgetsModel.loadingAllBudgets:invocation[0]";
"storeBudgetList": "done.invoke.ViewAllBudgetsModel.loadingAllBudgets:invocation[0]";
        };
        eventsCausingDelays: {
          
        };
        eventsCausingGuards: {
          
        };
        eventsCausingServices: {
          "getAllBudgets": "done.invoke.ViewAllBudgetsModel.deleteBudget:invocation[0]" | "xstate.init";
"sendDeleteBudgetRequest": "DELETE_BUDGET";
        };
        matchesStates: "deleteBudget" | "idle" | "loadingAllBudgets";
        tags: never;
      }
  