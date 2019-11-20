import * as actionCreators from './actionCreators';
import { ActionTypeNames } from './actions';
import State from './state';

const initialState: State = {
    history: [],
    index: -1,
};

type Actions = ReturnType<typeof actionCreators[keyof typeof actionCreators]>;

export default function reducer(state: State = initialState, action: Actions): State {
    switch (action.type) {
        case ActionTypeNames.AddToHistory:
            return {
                history: [...(state.history || []), { tree: action.tree, ruleNames: action.ruleNames }],
                index: state.index + 1,
            };
        case ActionTypeNames.SetHistory:
            return {
                ...action.history
            };
        case ActionTypeNames.Undo:
            return {
                ...state,
                index: state.index - 1
            };
        case ActionTypeNames.Redo:
            return {
                ...state,
                index: state.index + 1
            };
        default:
            return state;
    }
}