import * as React from 'react';
import { Container } from 'reactstrap';
import ConsoleInput from './ConsoleInput';
import './ConsoleView.scss';
import Controls from './Controls';
import LogView from './LogView';

class ConsoleView extends React.Component {
    public render() {
        return (
            <React.Fragment>
                <div className="HeaderWrapper">
                    <Container className="ConsoleHeader">
                        <p className="h6">Console</p>
                        <Controls />
                    </Container>
                </div>
                <Container className="ConsoleView">

                    <LogView />
                    <ConsoleInput />
                </Container>
            </React.Fragment>
        );
    }
}

export default ConsoleView;
