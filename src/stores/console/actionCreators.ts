import {
    ActionTypeNames, AddToInputHistoryAction, AddToLogAction, 
    ClearHistoryAction, ExecuteInputAction, LoadHistoryAction,
    SaveHistoryAction, SetHistoryAction
} from './actions';
import State, { LogLine } from './state';

export function addToLog(line: LogLine): AddToLogAction {
    return {
        line,
        type: ActionTypeNames.AddToLog,
    };
}

export function executeInput(input: string): ExecuteInputAction {
    return {
        input,
        type: ActionTypeNames.ExecuteInput
    };
}

export function addToInputHistory(input: string): AddToInputHistoryAction {
    return {
        input,
        type: ActionTypeNames.AddToInputHistory
    };
}

export function clearHistory(): ClearHistoryAction {
    return {
        type: ActionTypeNames.ClearHistory
    };
}

export function loadHistory(): LoadHistoryAction {
    return {
        type: ActionTypeNames.LoadHistory
    };
}

export function setHistory(state: State): SetHistoryAction {
    return {
        history: state,
        type: ActionTypeNames.SetHistory
    };
}

export function saveHistory(): SaveHistoryAction {
    return {
        type: ActionTypeNames.SaveHistory
    };
}