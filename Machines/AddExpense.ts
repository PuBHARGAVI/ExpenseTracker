import { EventFrom } from 'xstate';
import { createModel } from 'xstate/lib/model';


const model = createModel(
    {
        amount: 0 as number,
        startDate: new Date().toDateString() as string,
        endDate: new Date().toDateString() as string,
    },
    {
        events: {
            ADD_AMOUNT: (amount: number) => ({ amount }),
            ADD_START_DATE: (startDate: string) => ({ startDate }),
            ADD_END_DATE: (endDate: string) => ({ endDate }),
        }
    }
)

export const events = model.events;

export const addExpenseModelMachine = model.createMachine({
    predictableActionArguments: true,
    preserveActionOrder: true,
    tsTypes: {} as import("./AddExpense.typegen").Typegen0,
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
                ADD_END_DATE: {
                    actions: ['setEndDate']
                },
            }
        }
    }
}, {
    actions: {
        setBudgetAmount: model.assign({
            amount: (_context, event) => event.amount,
        }),
        setStartDate: model.assign({
            startDate: (_context, event) => event.startDate,
        }),
        setEndDate: model.assign({
            endDate: (_context, event) => event.endDate,
        })
    }
})