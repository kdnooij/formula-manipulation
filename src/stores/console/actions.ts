import { Action } from 'redux';
import State, { LogLine } from './state';

export enum ActionTypeNames {
    AddToLog = 'Console/Log',
    ExecuteInput = 'Console/ExecuteInput',
    AddToInputHistory = 'Console/AddToInputHistory',
    ClearHistory = 'Console/ClearHistory',
    LoadHistory = 'Console/LoadHistory',
    SetHistory = 'Console/SetHistory',
    SaveHistory = 'Console/SaveHistory'
}

export type AddToLogAction = Action<ActionTypeNames.AddToLog> & {
    line: LogLine
};

export type ExecuteInputAction = Action<ActionTypeNames.ExecuteInput> & {
    input: string
};

export type AddToInputHistoryAction = Action<ActionTypeNames.AddToInputHistory> & {
    input: string
};

export type ClearHistoryAction = Action<ActionTypeNames.ClearHistory>;
export type LoadHistoryAction = Action<ActionTypeNames.LoadHistory>;
export type SetHistoryAction = Action<ActionTypeNames.SetHistory> & {
    history: State
};
export type SaveHistoryAction = Action<ActionTypeNames.SaveHistory>;
