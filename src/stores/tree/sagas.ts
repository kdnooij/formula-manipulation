// tslint:disable-next-line:no-submodule-imports
import { all, call, put, putResolve, select, takeEvery } from 'redux-saga/effects';
import * as treeCache from '../../cache/treeCache';
import * as inputHandler from '../../inputHandling/inputHandler';
import { addToHistory, saveHistory as saveHistoryAction, setHistory } from './actionCreators';
import { ActionTypeNames, UpdateTreeAction } from './actions';

function* watchUpdateTree() {
    yield takeEvery(ActionTypeNames.UpdateTree, updateTree);
}

function* updateTree(action: UpdateTreeAction) {
    yield putResolve(addToHistory(action.tree, action.ruleNames));
    yield put(saveHistoryAction());
}

function* watchLoadHistory() {
    yield takeEvery(ActionTypeNames.LoadHistory, loadHistory);
}

export function* loadHistory() {
    const state = yield call(treeCache.loadHistory);
    yield putResolve(setHistory(state));
}

function* watchClearHistory() {
    yield takeEvery(ActionTypeNames.ClearHistory, clearHistory);
}

function* clearHistory() {
    yield putResolve(setHistory({ history: [], index: -1 }));
    yield put(saveHistoryAction());
}

function* watchSaveHistory() {
    yield takeEvery(ActionTypeNames.SaveHistory, saveHistory);
}

function* saveHistory() {
    const treeState = yield select((state) => state.tree);

    yield call(treeCache.saveHistory, treeState);
}

export default [watchUpdateTree, watchLoadHistory, watchSaveHistory, watchClearHistory];