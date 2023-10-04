
import { EventFrom, StateFrom } from 'xstate';
import { createModel } from 'xstate/lib/model';

const model = createModel(
  {
    email: "" as string,
    password: "" as string,
    loginStatus: "" as string,
    authToken: "" as string
  },
  {
    events: {
      ADD_EMAIL: (email: string) => ({ email }),
      ADD_PASSWORD: (password: string) => ({ password }),
      SUBMIT: () => ({})
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
        }
      }
    },
    saveUserCredentials: {
      invoke: {
        src: 'sendLoginRequest',
        onDone: {
          actions: ['setLoginStatus', 'setAuthenticationToken'],
          target: '#loginModel.idle'
        },
        onError: {
          actions: 'setLoginStatus',
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
      loginStatus: (_context, event) => {
        return event.data.status}
    }),
    setAuthenticationToken: model.assign({
      authToken: (_context, event) => event.data.token
    }),
    resetLoginStatus: model.assign({
      loginStatus: (_context, event) => ''
    }),
    resetAuthToken: model.assign({
      authToken: (_context, event) => ''
    }),
  },
  services: {
    sendLoginRequest: async (context) => {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email: context.email, password: context.password }),
      };
      try {
        const response = await fetch('http://10.0.2.2:3000/login', requestOptions);
        const responseJson = await response.json();

        return responseJson
      } catch (error) {
        console.error('Fetch error:', error);
        return error
      }
    }
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