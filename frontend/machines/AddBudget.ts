import { EventFrom, StateFrom, ActorRefFrom, spawn } from 'xstate';
import { createModel } from 'xstate/lib/model';
import { storeEvents } from './store';
import { storeModelMachine } from './store';

const model = createModel(
    {
        amount: 0 as Number,
        startDate: new Date() as Date,
        endDate: new Date() as Date,
        showStartDatePicker: false as boolean,
        showEndDatePicker: false as boolean,
        activeDatePicker: "" as string,
        storeStatus: "" as string,
        serviceRefs: {} as AppServices
    },
    {
        events: {
            ADD_AMOUNT: (amount: Number) => ({ amount }),
            ADD_BUDGET: () => ({}),
            ON_DATE_PICKER_PRESS: (pickerType: string) => ({ pickerType }),
            OK: (date: string) => ({ date }),
            CANCEL: () => ({}),
            STORE_RESPONSE: (response: string) => ({ response }),
            STORE_ERROR: (error: Error) => ({ error }),
            RESET_STORE_STATUS: () => ({})
        }
    }
)

export const events = model.events;

export const addBudgetModelMachine = model.createMachine({
    predictableActionArguments: true,
    preserveActionOrder: true,
    tsTypes: {} as import("./AddBudget.typegen").Typegen0,
    schema: {
        context: model.initialContext,
        events: {} as EventFrom<typeof model>,
    },
    id: 'AddBudgetModel',
    initial: 'acceptingBudgetInput',
    states: {
        acceptingBudgetInput: {
            entry: model.assign({
                serviceRefs: (context) => {
                    const serviceRefs = {
                        ...context.serviceRefs,
                    };
                    serviceRefs.store = spawn(storeModelMachine);
                    return serviceRefs;
                }
            }),
            on: {
                ADD_AMOUNT: {
                    actions: ['setBudgetAmount']
                },
                ON_DATE_PICKER_PRESS: {
                    actions: ['setActiveDatePicker'],
                    target: 'handleDatePicker'
                },
                ADD_BUDGET: {
                    actions: ['storeTheBudget', 'resetTheFields']
                },
                STORE_RESPONSE: {
                    actions: ['setStoreResponse']
                },
                STORE_ERROR: {
                    actions: ['setStoreError']
                },
                RESET_STORE_STATUS: {
                    actions: ['resetStoreStatus']
                }
            }
        },
        handleDatePicker: {
            entry: ['toggleDatePickerVisibility'],
            on: {
                OK: {
                    actions: ['toggleDatePickerVisibility', 'setDate'],
                    target: 'acceptingBudgetInput'
                },
                CANCEL: {
                    actions: ['toggleDatePickerVisibility'],
                    target: 'acceptingBudgetInput'
                }
            }
        }
    }
}, {
    actions: {
        setBudgetAmount: model.assign({
            amount: (_context, event) => event.amount
        }),
        setDate: model.assign((context, event) => {
            return context.activeDatePicker == "startDate" ?
                { ...context, startDate: event.date as unknown as Date } :
                { ...context, endDate: event.date as unknown as Date }
        }),
        toggleDatePickerVisibility: model.assign((context) => {
            return context.activeDatePicker == "startDate" ?
                { ...context, showStartDatePicker: !context.showStartDatePicker } :
                { ...context, showEndDatePicker: !context.showEndDatePicker }
        }),
        setActiveDatePicker: model.assign({
            activeDatePicker: (_context, event) => event.pickerType
        }),
        storeTheBudget: (context) => {
            context.serviceRefs.store.send(storeEvents.ADD_BUDGET(
                context.amount,
                context.startDate,
                context.endDate
            ))
        },
        setStoreResponse: model.assign({
            storeStatus: (_context, event) => event.response.toString()
        }),
        setStoreError: model.assign({
            storeStatus: (_context, event) => {
                const message = event.error.message.split(":")

                return message[0];
            }
        }),
        resetStoreStatus: model.assign({
            storeStatus: () => ""
        }),
        resetTheFields: model.assign({
            amount: () => 0,
            startDate: () => new Date() as Date,
            endDate: () => new Date() as Date,
        }),
    }
})

type State = StateFrom<typeof addBudgetModelMachine>;

export function selectStartDatePickerVisibility(state: State) {
    return state.context.showStartDatePicker;
}

export function selectEndDatePickerVisibility(state: State) {
    return state.context.showEndDatePicker;
}

export function selectBudgetAmount(state: State) {
    return state.context.amount;
}

export function selectStartDate(state: State) {
    return state.context.startDate;
}

export function selectEndDate(state: State) {
    return state.context.endDate;
}

export function selectStoreStatus(state: State) {
    return state.context.storeStatus;
}

export interface AppServices {
    store: ActorRefFrom<typeof storeModelMachine>;
}