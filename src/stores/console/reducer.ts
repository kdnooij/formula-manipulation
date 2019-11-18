import * as actionCreators from './actionCreators';
import { ActionTypeNames } from './actions';
import State from './state';

const initialState: State = {
    inputHistory: [],
    lines: [],
};

type Actions = ReturnType<typeof actionCreators[keyof typeof actionCreators]>;

export default function reducer(state: State = initialState, action: Actions): State {
    switch (action.type) {
        case ActionTypeNames.AddToInputHistory:
            return {
                ...state,
                inputHistory: [...state.inputHistory, action.input]
            };
        case ActionTypeNames.AddToLog:
            return {
                ...state,
                lines: [...state.lines, action.line]
            };
        case ActionTypeNames.SetHistory:
            return {
                ...action.history
            };
        case ActionTypeNames.ClearHistory:
            return initialState;
        default:
            return state;
    }
}