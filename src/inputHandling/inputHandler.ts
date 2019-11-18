import { clearHistory } from '../stores/console/actionCreators';
import store from '../stores/store';

export function execute(input: string): { output: string, error?: string } | undefined {
    const tokens = input.split(' ');
    switch (tokens[0]) {
        case '/clear':
            store.dispatch(clearHistory());
            return;
        case '/parse':
            return { output: 'parsed: ' + input };
        default:
            return { output: '', error: `Command '${tokens[0]}' not recognized`};
    }

}