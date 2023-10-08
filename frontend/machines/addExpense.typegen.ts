// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  internalEvents: {
    'done.invoke.AddBudgetModel.deleteTheExpense:invocation[0]': {
      type: 'done.invoke.AddBudgetModel.deleteTheExpense:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'done.invoke.AddBudgetModel.loadingAllBudgets:invocation[0]': {
      type: 'done.invoke.AddBudgetModel.loadingAllBudgets:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'done.invoke.AddBudgetModel.saveTheExpense:invocation[0]': {
      type: 'done.invoke.AddBudgetModel.saveTheExpense:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'error.platform.AddBudgetModel.checkingBudgetStatus:invocation[0]': {
      type: 'error.platform.AddBudgetModel.checkingBudgetStatus:invocation[0]';
      data: unknown;
    };
    'error.platform.AddBudgetModel.deleteTheExpense:invocation[0]': {
      type: 'error.platform.AddBudgetModel.deleteTheExpense:invocation[0]';
      data: unknown;
    };
    'error.platform.AddBudgetModel.loadingAllBudgets:invocation[0]': {
      type: 'error.platform.AddBudgetModel.loadingAllBudgets:invocation[0]';
      data: unknown;
    };
    'error.platform.AddBudgetModel.saveTheExpense:invocation[0]': {
      type: 'error.platform.AddBudgetModel.saveTheExpense:invocation[0]';
      data: unknown;
    };
    'xstate.init': {type: 'xstate.init'};
  };
  invokeSrcNameMap: {
    checkIfBudgetLimitIsExceeded: 'done.invoke.AddBudgetModel.checkingBudgetStatus:invocation[0]';
    getAllBudgets: 'done.invoke.AddBudgetModel.loadingAllBudgets:invocation[0]';
    sendAddExpenseRequest: 'done.invoke.AddBudgetModel.saveTheExpense:invocation[0]';
    sendDeleteExpenseRequest: 'done.invoke.AddBudgetModel.deleteTheExpense:invocation[0]';
  };
  missingImplementations: {
    actions: 'resetStoreStatus';
    delays: never;
    guards: never;
    services: never;
  };
  eventsCausingActions: {
    initializeTheBudgetKey: 'done.invoke.AddBudgetModel.loadingAllBudgets:invocation[0]';
    resetRequestStatus: 'DISMISS';
    resetStoreStatus: 'RESET_STORE_STATUS';
    resetTheFields:
      | 'DISMISS'
      | 'done.invoke.AddBudgetModel.saveTheExpense:invocation[0]'
      | 'error.platform.AddBudgetModel.saveTheExpense:invocation[0]';
    setBudgetExceededInfo: 'error.platform.AddBudgetModel.checkingBudgetStatus:invocation[0]';
    setDate: 'OK';
    setExpenseAmount: 'ADD_AMOUNT';
    setExpenseDescription: 'ADD_DESCRIPTION';
    setRequestStatus:
      | 'done.invoke.AddBudgetModel.deleteTheExpense:invocation[0]'
      | 'done.invoke.AddBudgetModel.saveTheExpense:invocation[0]'
      | 'error.platform.AddBudgetModel.deleteTheExpense:invocation[0]'
      | 'error.platform.AddBudgetModel.loadingAllBudgets:invocation[0]'
      | 'error.platform.AddBudgetModel.saveTheExpense:invocation[0]';
    setStoreError: 'STORE_ERROR';
    setStoreResponse: 'STORE_RESPONSE';
    setTheSelectedBudgetKey: 'ON_BUDGET_SELECTION';
    storeBudgetList: 'done.invoke.AddBudgetModel.loadingAllBudgets:invocation[0]';
    toggleDatePickerVisibility: 'CANCEL' | 'OK' | 'ON_DATE_PICKER_PRESS';
  };
  eventsCausingDelays: {};
  eventsCausingGuards: {};
  eventsCausingServices: {
    checkIfBudgetLimitIsExceeded: 'STORE_RESPONSE';
    getAllBudgets: 'xstate.init';
    sendAddExpenseRequest: 'ADD_EXPENSE';
    sendDeleteExpenseRequest: 'DELETE_EXPENSE';
  };
  matchesStates:
    | 'acceptingExpenseInput'
    | 'checkingBudgetStatus'
    | 'deleteTheExpense'
    | 'handleDatePicker'
    | 'loadingAllBudgets'
    | 'saveTheExpense';
  tags: never;
}
