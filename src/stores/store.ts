import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
// tslint:disable-next-line:no-submodule-imports
import { all, fork } from 'redux-saga/effects';

import consoleReducer from './console/reducer';
import treeReducer from './tree/reducer';

import consoleSagas, { loadHistory as loadConsoleHistory } from './console/sagas';
import treeSagas, { loadHistory as loadTreeHistory } from './tree/sagas';

// Import all watching sagas
const watchSagas = [...consoleSagas, ...treeSagas];

// Set up root reducer
const reducers = {
    console: consoleReducer,
    tree: treeReducer,
};

const rootReducer = combineReducers(reducers);

export type RootState = {
    [P in keyof typeof reducers]: ReturnType<typeof reducers[P]>;
};

function* rootSaga() {
    // initialize data
    yield fork(loadConsoleHistory);
    yield fork(loadTreeHistory);

    yield all(watchSagas.map((saga) => saga()));
}

// Create store
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    rootReducer, process.env.NODE_ENV === 'development' ?
        composeWithDevTools(applyMiddleware(sagaMiddleware)) :
        applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

export default store;
