
  // This file was automatically generated. Edits will be overwritten

  export interface Typegen0 {
        '@@xstate/typegen': true;
        internalEvents: {
          "done.invoke.loginModel.removeLoginCredentials:invocation[0]": { type: "done.invoke.loginModel.removeLoginCredentials:invocation[0]"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"done.invoke.loginModel.saveUserCredentials:invocation[0]": { type: "done.invoke.loginModel.saveUserCredentials:invocation[0]"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"error.platform.loginModel.removeLoginCredentials:invocation[0]": { type: "error.platform.loginModel.removeLoginCredentials:invocation[0]"; data: unknown };
"error.platform.loginModel.saveUserCredentials:invocation[0]": { type: "error.platform.loginModel.saveUserCredentials:invocation[0]"; data: unknown };
"xstate.init": { type: "xstate.init" };
        };
        invokeSrcNameMap: {
          "sendLoginRequest": "done.invoke.loginModel.saveUserCredentials:invocation[0]";
"sendLogoutRequest": "done.invoke.loginModel.removeLoginCredentials:invocation[0]";
        };
        missingImplementations: {
          actions: never;
          delays: never;
          guards: never;
          services: never;
        };
        eventsCausingActions: {
          "resetAuthToken": "LOGOUT" | "SUBMIT";
"resetAuthTokenInGlobalVaribles": "LOGOUT";
"resetLoginStatus": "SUBMIT";
"resetLogoutStatus": "RESET_LOGOUT_STATUS";
"setAuthenticationToken": "done.invoke.loginModel.saveUserCredentials:invocation[0]";
"setEmail": "ADD_EMAIL";
"setLoginStatus": "done.invoke.loginModel.saveUserCredentials:invocation[0]" | "error.platform.loginModel.saveUserCredentials:invocation[0]";
"setLogoutStatus": "done.invoke.loginModel.removeLoginCredentials:invocation[0]" | "error.platform.loginModel.removeLoginCredentials:invocation[0]";
"setPassword": "ADD_PASSWORD";
        };
        eventsCausingDelays: {
          
        };
        eventsCausingGuards: {
          
        };
        eventsCausingServices: {
          "sendLoginRequest": "SUBMIT";
"sendLogoutRequest": "LOGOUT";
        };
        matchesStates: "idle" | "removeLoginCredentials" | "saveUserCredentials";
        tags: never;
      }
  