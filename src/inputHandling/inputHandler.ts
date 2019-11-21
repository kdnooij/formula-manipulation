import { Parser } from '../parsing/parser';
import { clearHistory as clearConsoleHistory } from '../stores/console/actionCreators';
import store from '../stores/store';
import { clearHistory as clearTreeHistory, updateTree } from '../stores/tree/actionCreators';

export function execute(input: string): { output: string, error?: string } | undefined {
    const tokens = input.split(' ');
    switch (tokens[0]) {
        case '/clear':
            store.dispatch(clearConsoleHistory());
            store.dispatch(clearTreeHistory());
            return;
        case '/parse':
            const parser = new Parser(tokens.slice(1).join(' '));
            store.dispatch(updateTree(parser.getTree(), parser.getRuleNames()));
            return { output: 'parsed: ' + parser.toString() };
        default:
            return { output: '', error: `Command '${tokens[0]}' not recognized` };
    }

}