import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { clearHistory } from '../../stores/console/actionCreators';
import { canClear } from '../../stores/console/selectors';
import { RootState } from '../../stores/store';
import HeaderButton from './HeaderButton';

interface Props {
    canClear: boolean;

    clear: () => void;
}

class Controls extends React.Component<Props> {
    public render() {
        return (
            <HeaderButton
                id="Clear"
                name="Clear"
                icon="trash-alt"
                color="danger"
                disabled={!this.props.canClear}
                onClickButton={this.props.clear}
            />
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    canClear: canClear(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    clear: () => dispatch(clearHistory())
});

export default connect(mapStateToProps, mapDispatchToProps)(Controls);