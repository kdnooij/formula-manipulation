import * as React from 'react';
import { connect } from 'react-redux';
import { getLines } from '../../stores/console/selectors';
import { LogLine } from '../../stores/console/state';
import { RootState } from '../../stores/store';

interface Props {
    lines: LogLine[];
}

class LogView extends React.Component<Props> {
    public render() {
        return (
            <div className="LogView">
                {this.props.lines.map((line, index) => (
                    <p key={index}>
                        <code  className={line.isInput ? 'input' : ''}>
                            {(line.isInput ? '> ' : '') + line.line}
                        </code>
                    </p>
                ))}
            </div>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    lines: getLines(state)
});

export default connect(mapStateToProps)(LogView);
