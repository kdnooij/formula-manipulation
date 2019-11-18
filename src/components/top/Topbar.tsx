import * as React from 'react';
import { Nav, Navbar, NavbarBrand } from 'reactstrap';
import Controls from './Controls';

class Topbar extends React.Component {
    public render() {
        return (
            <Navbar color="light" light={true} >
                <NavbarBrand href="/">
                    Formula Handling - Group 8
                </NavbarBrand>
                <Nav navbar={true}>
                    <Controls />
                </Nav>
            </Navbar>
        );
    }
}

export default Topbar;