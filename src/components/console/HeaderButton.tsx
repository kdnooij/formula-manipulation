import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { Button, ButtonProps, UncontrolledTooltip } from 'reactstrap';

interface Props extends ButtonProps {
    name: string;
    icon: IconProp;
    id?: string;
    onClickButton?: (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
}

class HeaderButton extends React.Component<Props> {

    public render() {
        const { name, id, icon, onClickButton, ...rest } = this.props;

        return (
            <Button
                size={'sm'}
                {...rest}
                id={id ? id : `${name.replace(' ', '')}Button`}
                onClick={onClickButton}
            >
                <FontAwesomeIcon icon={icon} />
                <UncontrolledTooltip target={id ? id : `${name.replace(' ', '')}Button`}>
                    {name}
                </UncontrolledTooltip>
            </Button>
        );
    }
}

export default HeaderButton;