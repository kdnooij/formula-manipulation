import { RootState } from '../store';

export const canUndo = (state: RootState) => state.tree.index > 0;
export const canRedo = (state: RootState) => (state.tree.index < state.tree.history.length - 1);

export const getTree = (state: RootState) => (state.tree.index >= 0 ? 
    state.tree.history[state.tree.index] : undefined);
