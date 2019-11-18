import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { connect } from 'react-redux';
import { Button, Form, Input } from 'reactstrap';
import { Dispatch } from 'redux';
import { executeInput } from '../../stores/console/actionCreators';
import { getInputHistory } from '../../stores/console/selectors';
import { RootState } from '../../stores/store';

interface Props {
    inputHistory: string[];

    executeInput: typeof executeInput;
}

interface State {
    input: string;
}

class ConsoleInput extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            input: '',
        };
    }

    public render() {
        return (
                <Form inline={true}>
                    <Input value={this.state.input} onChange={this.handleInputChange} />
                    <Button onClick={() => this.props.executeInput(this.state.input)}>
                        <FontAwesomeIcon icon="arrow-right" />
                    </Button>
                </Form>
        );
    }

    private handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            input: event.target.value
        });
    }
}

const mapStateToProps = (state: RootState) => ({
    inputHistory: getInputHistory(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    executeInput: (input: string) => dispatch(executeInput(input)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ConsoleInput);
