import Container from 'react-bootstrap/Container';
import { Nav, Navbar, NavbarBrand, NavDropdown, NavItem } from 'react-bootstrap';
import logoApp from '../assets/images/logo192.png';
import { NavLink, Link } from 'react-router-dom';

const Header = (props) => {
    return (
        <header>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <NavbarBrand tag={Link} to="/" className='navbar-brand'>
                        <img
                            src={logoApp}
                            width="30" height="30"
                            className="d-inline-block align-top" alt="React Bootstrap logo" />
                        React-Bootstrap
                    </NavbarBrand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavItem>
                                <NavLink tag={Link} to="/" className='nav-link'>Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} to="/users" className='nav-link'>Manager Users</NavLink>
                            </NavItem>
                        </Nav>
                        <Nav>
                            <NavDropdown title="Setting" id="basic-nav-dropdown">
                                <NavItem>
                                    <NavLink tag={Link} to="/login" className='dropdown-item'>Login</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className='dropdown-item'>Logout</NavLink>
                                </NavItem>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}

export default Header;