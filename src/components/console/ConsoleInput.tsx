import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import $ from 'jquery';
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
    cycleIndex: number;
    tempInput?: string;
}

class ConsoleInput extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            cycleIndex: -1,
            input: '',
        };
    }

    public render() {
        return (
            <Form inline={true} onSubmit={(e) => { e.preventDefault(); this.execute(); }}>
                <Input value={this.state.input} onChange={this.handleInputChange} onKeyDown={this.cycle} />
                <Button onClick={this.execute}>
                    <FontAwesomeIcon icon="arrow-right" />
                </Button>
            </Form>
        );
    }

    public componentDidUpdate() {
        // Scroll to bottom
        const d = $('.LogView');
        d.scrollTop(d.prop('scrollHeight'));
    }

    public componentDidMount() {
        // Scroll to bottom
        const d = $('.LogView');
        d.scrollTop(d.prop('scrollHeight'));
    }

    private cycle = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'ArrowUp') {
            if (this.state.cycleIndex === -1) {
                const index = this.props.inputHistory.length - 1;
                if (index > -1) {
                    this.setState({
                        cycleIndex: index,
                        input: this.props.inputHistory[index],
                        tempInput: this.state.input,
                    });
                }
            } else if (this.state.cycleIndex === 0) {
                const index = this.props.inputHistory.length - 1;
                this.setState({
                    cycleIndex: -1,
                    input: this.state.tempInput || '',
                });
            } else {
                const index = this.state.cycleIndex - 1;
                this.setState({
                    cycleIndex: index,
                    input: this.props.inputHistory[index],
                });
            }
        } else if (e.key === 'ArrowDown') {
            if (this.state.cycleIndex === -1) {
                const index = 0;
                if (this.props.inputHistory.length > 0) {
                    this.setState({
                        cycleIndex: index,
                        input: this.props.inputHistory[index],
                        tempInput: this.state.input,
                    });
                }
            } else if (this.state.cycleIndex === this.props.inputHistory.length - 1) {
                this.setState({
                    cycleIndex: -1,
                    input: this.state.tempInput || '',
                });
            } else {
                const index = this.state.cycleIndex + 1;
                this.setState({
                    cycleIndex: index,
                    input: this.props.inputHistory[index],
                });
            }
        }
    }

    private execute = () => {
        this.props.executeInput(this.state.input);
        this.setState({ input: '' });
    }

    private handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            cycleIndex: -1,
            input: event.target.value,
            tempInput: undefined,
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
