import State from '../stores/tree/state';

export function saveHistory(history: State) {
    localStorage.setItem('treeCache', JSON.stringify(history));
}

export function loadHistory() {
    const history = localStorage.getItem('treeCache');
    if (history) {
        return JSON.parse(history) as State;
    } else {
        return { history: [], index: -1 };
    }
}