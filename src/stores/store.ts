import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
// tslint:disable-next-line:no-submodule-imports
import { all } from 'redux-saga/effects';

import consoleReducer from './console/reducer';
// import formulaReducer from './formula/reducer';

import consoleSagas from './console/sagas';
// import formulaSagas from './formula/sagas';

// Import all watching sagas
const watchSagas = [...consoleSagas];

// Set up root reducer
const reducers = {
    console: consoleReducer,
    // formula: formulaReducer,
};

const rootReducer = combineReducers(reducers);

export type RootState = {
    [P in keyof typeof reducers]: ReturnType<typeof reducers[P]>;
};

function* rootSaga() {
    // initialize data
    // yield fork(...);

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
