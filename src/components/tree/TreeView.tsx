import * as React from 'react';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import { FileContext } from '../../parsing/generated/ExpressionParser';
import { RootState } from '../../stores/store';
import { getTree } from '../../stores/tree/selectors';
import './TreeView.scss';

interface Props {
    tree?: { tree: FileContext, ruleNames: string[] };
}

class TreeView extends React.Component<Props> {
    public render() {
        return (
            <Container fluid={true} className="TreeView">
                <span>{this.props.tree ?
                    this.props.tree.tree.toStringTree(this.props.tree.ruleNames)
                    : 'undefined'}</span>
            </Container>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    tree: getTree(state),
});

export default connect(mapStateToProps)(TreeView);
