export default interface State {
    lines: LogLine[];
    inputHistory: string[];
}

export interface LogLine {
    line: string;
    isInput: boolean;
    isError: boolean;
}