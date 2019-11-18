// tslint:disable-next-line:no-submodule-imports
import { all, call, putResolve, takeEvery } from 'redux-saga/effects';
import * as inputHandler from '../../inputHandling/inputHandler';
import { addToLog, setHistory } from './actionCreators';
import { ActionTypeNames, ExecuteInputAction } from './actions';

function* watchExecuteInput() {
    yield takeEvery(ActionTypeNames.ExecuteInput, executeInput);
}

function* executeInput(action: ExecuteInputAction) {
    yield putResolve(addToLog({ isInput: true, line: action.input }));
    const { output, error }: { output: string, error: string } =
        yield inputHandler.execute(action.input);

    if (error) {
        yield all(
            error.split('\n').map(
                (line) => putResolve(
                    addToLog({ isInput: false, line })
                )
            )
        );
    } else {
        yield all(
            output.split('\n').map(
                (line) => putResolve(
                    addToLog({ isInput: false, line })
                )
            )
        );
    }
}

function* watchLoadHistory() {
    yield takeEvery(ActionTypeNames.LoadHistory, loadHistory);
}

function* loadHistory() {
    yield putResolve(setHistory({ inputHistory: [], lines: [] }));
}

function* watchSaveHistory() {
    yield takeEvery(ActionTypeNames.SaveHistory, saveHistory);
}

function* saveHistory() {
    yield call(() => null);
}

export default [watchExecuteInput, watchLoadHistory, watchSaveHistory];