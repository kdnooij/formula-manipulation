import * as React from 'react';
import { Container } from 'reactstrap';
import ConsoleInput from './ConsoleInput';
import './ConsoleView.scss';
import LogView from './LogView';

class ConsoleView extends React.Component {
    public render() {
        return (
            <React.Fragment>
                <Container className="ConsoleView">
                    <LogView />

                <ConsoleInput />
                </Container>
            </React.Fragment>
        );
    }
}

export default ConsoleView;
