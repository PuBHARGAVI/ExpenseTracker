import { EventFrom, StateFrom } from 'xstate';
import { createModel } from 'xstate/lib/model';


const model = createModel(
    {
        amount: 0 as Number,
        startDate: new Date() as Date,
        endDate: new Date() as Date,
        showStartDatePicker: false as boolean,
        showEndDatePicker: false as boolean,
        activeDatePicker: "" as string,
    },
    {
        events: {
            ADD_AMOUNT: (amount: Number) => ({ amount }),
            ADD_START_DATE: (startDate: string, operationType: string, platform: string) => ({ startDate, operationType, platform }),
            ADD_END_DATE: (endDate: string, operationType: string, platform: string) => ({ endDate, operationType, platform }),
            ON_DATE_PICKER_PRESS: (pickerType: string) => ({ pickerType }),
            OK: (date: string) => ({ date }),
            CANCEL: () => ({})
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
    id: 'AddExpenseModel',
    initial: 'acceptingBudgetInput',
    states: {
        acceptingBudgetInput: {
            on: {
                ADD_AMOUNT: {
                    actions: ['setBudgetAmount']
                },
                ADD_START_DATE: {
                    actions: ['setStartDate']
                },
                ON_DATE_PICKER_PRESS: {
                    actions: ['setActiveDatePicker'],
                    target: 'handleDatePicker'
                },
                ADD_END_DATE: {
                    actions: ['setEndDate']
                },
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
        })
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