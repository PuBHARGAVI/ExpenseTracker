// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  internalEvents: {
    'done.invoke.ViewAllExpensesModel.loadAllExpensesOfBudget:invocation[0]': {
      type: 'done.invoke.ViewAllExpensesModel.loadAllExpensesOfBudget:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'done.invoke.ViewAllExpensesModel.loadingAllExpenses:invocation[0]': {
      type: 'done.invoke.ViewAllExpensesModel.loadingAllExpenses:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'error.platform.ViewAllExpensesModel.loadAllExpensesOfBudget:invocation[0]': {
      type: 'error.platform.ViewAllExpensesModel.loadAllExpensesOfBudget:invocation[0]';
      data: unknown;
    };
    'error.platform.ViewAllExpensesModel.loadingAllExpenses:invocation[0]': {
      type: 'error.platform.ViewAllExpensesModel.loadingAllExpenses:invocation[0]';
      data: unknown;
    };
    'xstate.init': {type: 'xstate.init'};
  };
  invokeSrcNameMap: {
    getAllExpenses: 'done.invoke.ViewAllExpensesModel.loadingAllExpenses:invocation[0]';
    getAllExpensesOfBudget: 'done.invoke.ViewAllExpensesModel.loadAllExpensesOfBudget:invocation[0]';
  };
  missingImplementations: {
    actions: never;
    delays: never;
    guards: never;
    services: never;
  };
  eventsCausingActions: {
    setBudgetId: 'GET_EXPENSES_OF_BUDGET';
    setRequestStatus:
      | 'error.platform.ViewAllExpensesModel.loadAllExpensesOfBudget:invocation[0]'
      | 'error.platform.ViewAllExpensesModel.loadingAllExpenses:invocation[0]';
    storeExpenseList:
      | 'done.invoke.ViewAllExpensesModel.loadAllExpensesOfBudget:invocation[0]'
      | 'done.invoke.ViewAllExpensesModel.loadingAllExpenses:invocation[0]';
  };
  eventsCausingDelays: {};
  eventsCausingGuards: {};
  eventsCausingServices: {
    getAllExpenses: 'GET_ALL_EXPENSES';
    getAllExpensesOfBudget: 'GET_EXPENSES_OF_BUDGET';
  };
  matchesStates: 'idle' | 'loadAllExpensesOfBudget' | 'loadingAllExpenses';
  tags: never;
}
