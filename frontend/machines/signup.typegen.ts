// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  internalEvents: {
    'done.invoke.signupModel.saveUserCredentials:invocation[0]': {
      type: 'done.invoke.signupModel.saveUserCredentials:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'error.platform.signupModel.saveUserCredentials:invocation[0]': {
      type: 'error.platform.signupModel.saveUserCredentials:invocation[0]';
      data: unknown;
    };
    'xstate.init': {type: 'xstate.init'};
  };
  invokeSrcNameMap: {
    sendSignupRequest: 'done.invoke.signupModel.saveUserCredentials:invocation[0]';
  };
  missingImplementations: {
    actions: never;
    delays: never;
    guards: never;
    services: never;
  };
  eventsCausingActions: {
    resetAuthToken: 'SUBMIT';
    resetSignupStatus: 'SUBMIT';
    setAuthenticationToken: 'done.invoke.signupModel.saveUserCredentials:invocation[0]';
    setEmail: 'ADD_EMAIL';
    setPassword: 'ADD_PASSWORD';
    setSignupStatus:
      | 'done.invoke.signupModel.saveUserCredentials:invocation[0]'
      | 'error.platform.signupModel.saveUserCredentials:invocation[0]';
  };
  eventsCausingDelays: {};
  eventsCausingGuards: {};
  eventsCausingServices: {
    sendSignupRequest: 'SUBMIT';
  };
  matchesStates: 'idle' | 'saveUserCredentials';
  tags: never;
}
