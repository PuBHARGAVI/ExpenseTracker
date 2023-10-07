// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  internalEvents: {
    'done.invoke.ViewAllBudgetsModel.loadingAllBudgets:invocation[0]': {
      type: 'done.invoke.ViewAllBudgetsModel.loadingAllBudgets:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'error.platform.ViewAllBudgetsModel.loadingAllBudgets:invocation[0]': {
      type: 'error.platform.ViewAllBudgetsModel.loadingAllBudgets:invocation[0]';
      data: unknown;
    };
    'xstate.init': {type: 'xstate.init'};
  };
  invokeSrcNameMap: {
    getAllBudgets: 'done.invoke.ViewAllBudgetsModel.loadingAllBudgets:invocation[0]';
  };
  missingImplementations: {
    actions: never;
    delays: never;
    guards: never;
    services: never;
  };
  eventsCausingActions: {
    setRequestStatus: 'error.platform.ViewAllBudgetsModel.loadingAllBudgets:invocation[0]';
    storeBudgetList: 'done.invoke.ViewAllBudgetsModel.loadingAllBudgets:invocation[0]';
  };
  eventsCausingDelays: {};
  eventsCausingGuards: {};
  eventsCausingServices: {
    getAllBudgets: 'xstate.init';
  };
  matchesStates: 'loadingAllBudgets';
  tags: never;
}
