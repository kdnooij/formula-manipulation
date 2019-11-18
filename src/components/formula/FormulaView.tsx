import * as React from 'react';
import { Container } from 'reactstrap';
import './FormulaView.scss';

class FormulaView extends React.Component {
    public render() {
        return (
            <Container fluid={true} className="FormulaView">
                <span>Formula</span>
            </Container>
        );
    }
}

export default FormulaView;
