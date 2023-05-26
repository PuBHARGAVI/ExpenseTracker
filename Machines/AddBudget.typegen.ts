
// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
 '@@xstate/typegen': true;
 internalEvents: {
  "xstate.init": { type: "xstate.init" };
 };
 invokeSrcNameMap: {

 };
 missingImplementations: {
  actions: "setEndDate" | "setStartDate";
  delays: never;
  guards: never;
  services: never;
 };
 eventsCausingActions: {
  "setActiveDatePicker": "ON_DATE_PICKER_PRESS";
  "setBudgetAmount": "ADD_AMOUNT";
  "setDate": "OK";
  "setEndDate": "ADD_END_DATE";
  "setStartDate": "ADD_START_DATE";
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
