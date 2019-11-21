// tslint:disable-next-line:no-submodule-imports
import { all, call, put, putResolve, select, takeEvery } from 'redux-saga/effects';
import * as consoleCache from '../../cache/consoleCache';
import * as inputHandler from '../../inputHandling/inputHandler';
import { addToInputHistory, addToLog, saveHistory as saveHistoryAction, setHistory } from './actionCreators';
import { ActionTypeNames, ExecuteInputAction } from './actions';
import { getInputHistory, getLines } from './selectors';

function* watchExecuteInput() {
    yield takeEvery(ActionTypeNames.ExecuteInput, executeInput);
}

function* executeInput(action: ExecuteInputAction) {
    yield all([
        putResolve(addToLog({ isInput: true, line: action.input, isError: false })),
        putResolve(addToInputHistory(action.input))
    ]);

    const res: { output: string, error?: string } | undefined = yield call(inputHandler.execute, action.input);

    if (res) {
        const { output, error } = res;
        if (error) {
            yield all(
                error.split('\n').map(
                    (line) => putResolve(
                        addToLog({ isInput: false, line, isError: true })
                    )
                )
            );
        } else {
            yield all(
                output.split('\n').map(
                    (line) => putResolve(
                        addToLog({ isInput: false, line, isError: false })
                    )
                )
            );
        }
    }

    yield put(saveHistoryAction());
}

function* watchLoadHistory() {
    yield takeEvery(ActionTypeNames.LoadHistory, loadHistory);
}

export function* loadHistory() {
    const state = yield call(consoleCache.loadHistory);
    yield putResolve(setHistory(state));
}

function* watchClearHistory() {
    yield takeEvery(ActionTypeNames.ClearHistory, clearHistory);
}

function* clearHistory() {
    yield putResolve(setHistory({ lines: [], inputHistory: [] }));
    yield put(saveHistoryAction());
}

function* watchSaveHistory() {
    yield takeEvery(ActionTypeNames.SaveHistory, saveHistory);
}

function* saveHistory() {
    const lines = yield select(getLines);
    const inputHistory = yield select(getInputHistory);

    yield call(consoleCache.saveHistory, { lines, inputHistory });
}

export default [watchExecuteInput, watchLoadHistory, watchSaveHistory, watchClearHistory];