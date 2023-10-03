
import { EventFrom, StateFrom } from 'xstate';
import { createModel } from 'xstate/lib/model';

const model = createModel(
  {
    email: "" as string,
    password: "" as string,
    signupStatus: "" as string,
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

export const signupMachine = model.createMachine({
  predictableActionArguments: true,
  preserveActionOrder: true,
  tsTypes: {} as import("./signup.typegen").Typegen0,
  schema: {
    context: model.initialContext,
    events: {} as EventFrom<typeof model>
  },
  id: 'signupModel',
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
          target: 'saveUserCredentials'
        }
      }
    },
    saveUserCredentials: {
      invoke: {
        src: 'sendSignupRequest',
        onDone: {
          actions: ['setSignupStatus','setAuthenticationToken']
        },
        onError: {
          actions: 'setSignupStatus'
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
    setSignupStatus: model.assign({
      signupStatus: (_context, event) => event.data.status
    }),
    setAuthenticationToken: model.assign({
      authToken: (_context, event) => event.data.token
    })
  },
  services: {
    sendSignupRequest: async (context) => {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email: context.email, password: context.password }),
      };
      try {
        const response = await fetch('http://10.0.2.2:3000/signup', requestOptions);
        const data = await response.json();
        
        return JSON.parse(JSON.stringify(data))
      } catch (error) {
        console.error('Fetch error:', error);
        return error
      }
    }
  }
}
)

type State = StateFrom<typeof signupMachine>;

export function selectUserEmail(state: State) {
  return state.context.email;
}

export function selectUserPassword(state: State) {
  return state.context.password;
}

export function selectSignupStatus(state: State) {
  return state.context.signupStatus;
}

export function selectAuthToken(state: State) {
  return state.context.authToken;
}