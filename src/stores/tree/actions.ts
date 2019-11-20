import { Action } from 'redux';
import { FileContext } from '../../parsing/generated/ExpressionParser';
import { ASTNode } from '../../parsing/nodes/node';
import State from './state';

export enum ActionTypeNames {
    UpdateTree = 'Tree/UpdateTree',
    AddToHistory = 'Tree/AddToHistory',
    Undo = 'Tree/Undo',
    Redo = 'Tree/Redo',
    ClearHistory = 'Tree/ClearHistory',
    LoadHistory = 'Tree/LoadHistory',
    SetHistory = 'Tree/SetHistory',
    SaveHistory = 'Tree/SaveHistory',
}

export type UpdateTreeAction = Action<ActionTypeNames.UpdateTree> & {
    tree: ASTNode[];
    ruleNames: string[];
};

export type AddToHistoryAction = Action<ActionTypeNames.AddToHistory> & {
    tree: ASTNode[];
    ruleNames: string[];
};

export type UndoAction = Action<ActionTypeNames.Undo>;
export type RedoAction = Action<ActionTypeNames.Redo>;

export type ClearHistoryAction = Action<ActionTypeNames.ClearHistory>;
export type LoadHistoryAction = Action<ActionTypeNames.LoadHistory>;
export type SetHistoryAction = Action<ActionTypeNames.SetHistory> & {
    history: State
};
export type SaveHistoryAction = Action<ActionTypeNames.SaveHistory>;
