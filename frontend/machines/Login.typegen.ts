// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  internalEvents: {
    'done.invoke.loginModel.saveUserCredentials:invocation[0]': {
      type: 'done.invoke.loginModel.saveUserCredentials:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'error.platform.loginModel.saveUserCredentials:invocation[0]': {
      type: 'error.platform.loginModel.saveUserCredentials:invocation[0]';
      data: unknown;
    };
    'xstate.init': {type: 'xstate.init'};
  };
  invokeSrcNameMap: {
    sendLoginRequest: 'done.invoke.loginModel.saveUserCredentials:invocation[0]';
  };
  missingImplementations: {
    actions: never;
    delays: never;
    guards: never;
    services: never;
  };
  eventsCausingActions: {
    resetAuthToken: 'SUBMIT';
    resetLoginStatus: 'SUBMIT';
    setAuthenticationToken: 'done.invoke.loginModel.saveUserCredentials:invocation[0]';
    setEmail: 'ADD_EMAIL';
    setLoginStatus:
      | 'done.invoke.loginModel.saveUserCredentials:invocation[0]'
      | 'error.platform.loginModel.saveUserCredentials:invocation[0]';
    setPassword: 'ADD_PASSWORD';
  };
  eventsCausingDelays: {};
  eventsCausingGuards: {};
  eventsCausingServices: {
    sendLoginRequest: 'SUBMIT';
  };
  matchesStates: 'idle' | 'saveUserCredentials';
  tags: never;
}
