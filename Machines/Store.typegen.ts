
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
    "sendEventToStoreService": "ADD_BUDGET" | "ADD_EXPENSE" | "VIEW_ALL_BUDGETS";
  };
  eventsCausingDelays: {

  };
  eventsCausingGuards: {

  };
  eventsCausingServices: {
    "store_service": "xstate.init";
  };
  matchesStates: "ready";
  tags: never;
}
