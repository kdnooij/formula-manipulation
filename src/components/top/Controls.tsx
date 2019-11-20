import * as React from 'react';
import { connect } from 'react-redux';
import { Form } from 'reactstrap';
import { Dispatch } from 'redux';
import { RootState } from '../../stores/store';
import { redo, undo } from '../../stores/tree/actionCreators';
import { canRedo, canUndo } from '../../stores/tree/selectors';
import TopbarButton from './TopbarButton';

interface Props {
    canUndo: boolean;
    canRedo: boolean;

    undo: () => void;
    redo: () => void;
}

class Controls extends React.Component<Props> {
    public render() {
        return (
            <Form inline={true} onSubmit={(e) => e.preventDefault()}>
                <TopbarButton
                    id="Undo"
                    name="Undo last action"
                    icon="undo"
                    color="primary"
                    className="mr-sm-2"
                    disabled={!this.props.canUndo}
                    onClickButton={this.props.undo}
                />
                <TopbarButton
                    id="Redo"
                    name="Redo"
                    icon="redo"
                    color="primary"
                    className="mr-sm-2"
                    disabled={!this.props.canRedo}
                    onClickButton={this.props.redo}
                />
            </Form>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    canRedo: canRedo(state),
    canUndo: canUndo(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    redo: () => dispatch(redo()),
    undo: () => dispatch(undo()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Controls);