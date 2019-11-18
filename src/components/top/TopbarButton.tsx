import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { Button, ButtonProps, NavItem, UncontrolledTooltip } from 'reactstrap';

interface Props extends ButtonProps {
    name: string;
    icon: IconProp;
    id?: string;
    onClickButton?: (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
}

class TopbarButton extends React.Component<Props> {

    public render() {
        const { name, id, icon, onClickButton, ...rest} = this.props;

        return (
            <NavItem>
                <Button
                    {...rest}
                    id={id ? id : `${name.replace(' ', '')}Button`}
                    onClick={onClickButton}
                >
                    <FontAwesomeIcon icon={icon} />
                    <UncontrolledTooltip target={id ? id : `${name.replace(' ', '')}Button`}>
                        {name}
                    </UncontrolledTooltip>
                </Button>
            </NavItem>
        );
    }
}

export default TopbarButton;