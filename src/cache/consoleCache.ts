import State from '../stores/console/state';

export function saveHistory(history: State) {
    localStorage.setItem('consoleCache', JSON.stringify(history));
}

export function loadHistory() {
    const history = localStorage.getItem('consoleCache');
    if (history) {
        return JSON.parse(history);
    } else {
        return { lines: [], inputHistory: [] };
    }
}