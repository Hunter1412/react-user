import Container from 'react-bootstrap/Container';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import logoApp from '../assets/images/logo192.png';
import { NavLink, Link } from 'react-router-dom';

const Header = (props) => {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <NavLink tag={Link} to="/" className='navbar-brand'>
                    <img
                        src={logoApp}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        alt="React Bootstrap logo"
                    />
                    React-Bootstrap
                </NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink tag={Link} to="/" className='nav-link'>Home</NavLink>
                        <NavLink tag={Link} to="/users" className='nav-link'>Manager Users</NavLink>
                    </Nav>
                    <Nav>
                        <NavDropdown title="Setting" id="basic-nav-dropdown">
                            <NavLink tag={Link} to="/login" className='dropdown-item'>Login</NavLink>
                            <NavLink className='dropdown-item'>Logout</NavLink>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;