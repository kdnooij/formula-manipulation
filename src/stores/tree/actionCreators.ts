import { ASTNode, NodeType } from '../../parsing/nodes/node';
import {
    ActionTypeNames,
    AddToHistoryAction, ClearHistoryAction,
    LoadHistoryAction, RedoAction, SaveHistoryAction, SetHistoryAction, UndoAction, UpdateTreeAction
} from './actions';
import State from './state';

export function updateTree(tree: NodeType[], ruleNames: string[]): UpdateTreeAction {
    return {
        ruleNames,
        tree,
        type: ActionTypeNames.UpdateTree,
    };
}

export function addToHistory(tree: NodeType[], ruleNames: string[]): AddToHistoryAction {
    return {
        ruleNames,
        tree,
        type: ActionTypeNames.AddToHistory,
    };
}

export function undo(): UndoAction {
    return {
        type: ActionTypeNames.Undo,
    };
}

export function redo(): RedoAction {
    return {
        type: ActionTypeNames.Redo,
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