import * as React from 'react';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import { FileContext } from '../../parsing/generated/ExpressionParser';
import { ASTNode } from '../../parsing/nodes/node';
import { RootState } from '../../stores/store';
import { getTree } from '../../stores/tree/selectors';
import './TreeView.scss';

interface Props {
    tree?: { tree: ASTNode[], ruleNames: string[] };
}

class TreeView extends React.Component<Props> {
    public render() {
        return (
            <Container fluid={true} className="TreeView">
                <span>{this.props.tree ?
                    JSON.stringify(this.props.tree.tree)
                    : 'undefined'}</span>
            </Container>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    tree: getTree(state),
});

export default connect(mapStateToProps)(TreeView);
