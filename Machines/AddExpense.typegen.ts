
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
    "setBudgetAmount": "ADD_AMOUNT";
    "setEndDate": "ADD_END_DATE";
    "setStartDate": "ADD_START_DATE";
  };
  eventsCausingDelays: {

  };
  eventsCausingGuards: {

  };
  eventsCausingServices: {

  };
  matchesStates: "acceptingBudgetInput";
  tags: never;
}
