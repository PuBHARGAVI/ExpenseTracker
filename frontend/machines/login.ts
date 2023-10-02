
import { EventFrom, StateFrom, ActorRefFrom, spawn } from 'xstate';
import { createModel } from 'xstate/lib/model';
import { storeEvents } from './store';
import { storeModelMachine } from './store';

const model = createModel(
    {
        email: "" as string,
        password: "" as string
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
    tsTypes: {} as import('./Login.typegen').Typegen0,
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
        })
    }
})

type State = StateFrom<typeof loginMachine>;

export function selectUserEmail(state: State) {
    return state.context.email;
}

export function selectUserPassword(state: State) {
    return state.context.password;
}