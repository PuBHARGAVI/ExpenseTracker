
import { EventFrom, StateFrom } from 'xstate';
import { createModel } from 'xstate/lib/model';
import { apiRequest } from '../utils/requestApi';
import { __AuthenticationToken } from '../shared/GlobalVariables';

const model = createModel(
  {
    email: "" as string,
    password: "" as string,
    loginStatus: "" as string,
    logoutStatus: "" as string,
    authToken: "" as string
  },
  {
    events: {
      ADD_EMAIL: (email: string) => ({ email }),
      ADD_PASSWORD: (password: string) => ({ password }),
      SUBMIT: () => ({}),
      LOGOUT: () => ({}),
      RESET_LOGOUT_STATUS: () => ({})
    }
  }
)

export const events = model.events;

export const loginMachine = model.createMachine({
  predictableActionArguments: true,
  preserveActionOrder: true,
  tsTypes: {} as import("./login.typegen").Typegen0,
  schema: {
    context: model.initialContext,
    events: {} as EventFrom<typeof model>
  },
  id: 'loginModel',
  initial: 'idle',
  states: {
    idle: {
      on: {
        ADD_EMAIL: {
          actions: 'setEmail'
        },
        ADD_PASSWORD: {
          actions: 'setPassword'
        },
        SUBMIT: {
          actions: ['resetLoginStatus', 'resetAuthToken'],
          target: 'saveUserCredentials'
        },
        LOGOUT: {
          actions: ['resetAuthToken','resetAuthTokenInGlobalVaribles'],
          target: 'removeLoginCredentials'
        },
        RESET_LOGOUT_STATUS: {
          actions: 'resetLogoutStatus'
        }
      }
    },
    saveUserCredentials: {
      invoke: {
        src: 'sendLoginRequest',
        onDone: {
          actions: ['setAuthenticationToken','setLoginStatus'],
          target: '#loginModel.idle'
        },
        onError: {
          actions: 'setLoginStatus',
          target: '#loginModel.idle'
        }
      }
    },
    removeLoginCredentials: {
      invoke: {
        src: 'sendLogoutRequest',
        onDone: {
          actions: ['setLogoutStatus'],
          target: '#loginModel.idle'
        },
        onError: {
          actions: 'setLogoutStatus',
          target: '#loginModel.idle'
        }
      }
    }
  }
}, {
  actions: {
    setEmail: model.assign({
      email: (_context, event) => event.email
    }),
    setPassword: model.assign({
      password: (_context, event) => event.password
    }),
    setLoginStatus: model.assign({
      loginStatus: (context, event) => {
        return event.data.status}
    }),
    setLogoutStatus: model.assign({
      logoutStatus: (_context, event) => {
        return event.data.status
      }
    }),
    setAuthenticationToken: model.assign({
      authToken: (_context, event) => {
        return event.data.token}
    }),
    resetLoginStatus: model.assign({
      loginStatus: (_context, event) => ''
    }),
    resetLogoutStatus: model.assign({
      logoutStatus: (_context, event) => ''
    }),
    resetAuthToken: model.assign({
      authToken: (_context, event) => ''
    }),
    resetAuthTokenInGlobalVaribles:()=>{
      __AuthenticationToken.setToken('')
    } 
  },
  services: {
    sendLoginRequest: async (context) => {
      const body = JSON.stringify({ email: context.email, password: context.password });
      const header = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      };

      const response = await apiRequest('POST', header, body, 'login');
      return response;
    },
    sendLogoutRequest: async () => {
      const header = {
        'Accept': 'application/json',
        'Authorization': __AuthenticationToken.getToken()
      };

      const response = await apiRequest('PATCH', header, '', 'logout');
      return response;
    },
  }
}
)

type State = StateFrom<typeof loginMachine>;

export function selectUserEmail(state: State) {
  return state.context.email;
}

export function selectUserPassword(state: State) {
  return state.context.password;
}

export function selectLoginStatus(state: State) {
  return state.context.loginStatus;
}

export function selectAuthToken(state: State) {
  return state.context.authToken;
}

export function selectLogoutStatus(state: State) {
  return state.context.logoutStatus;
}