import { RootState } from '../store';

export const getLines = (state: RootState) => state.console.lines;
export const getInputHistory = (state: RootState) => state.console.inputHistory;