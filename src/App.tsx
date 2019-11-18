import React from 'react';
import { Provider } from 'react-redux';
import './App.scss';
import Topbar from './components/top/Topbar';

import store from './stores/store';
import { addToLog } from './stores/console/actionCreators';
import ConsoleView from './components/console/ConsoleView';
import FormulaView from './components/formula/FormulaView';

export default class App extends React.Component {
    public componentDidCatch(error: Error, info: React.ErrorInfo) {
        // tslint:disable-next-line:no-console
        console.error(error, error.stack, info.componentStack);
        store.dispatch(addToLog({
            isInput: false,
            line: error.message
        }));
    }

    public render() {
        return (
            <Provider store={store}>
                <React.Fragment>
                    <Topbar><h3>Test</h3></Topbar>
                    <FormulaView />
                    <ConsoleView />
                </React.Fragment>
            </Provider>
        );
    }
}
