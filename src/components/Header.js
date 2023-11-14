import Container from 'react-bootstrap/Container';
import { Nav, Navbar, NavbarBrand, NavDropdown, NavItem } from 'react-bootstrap';
import logoApp from '../assets/images/logo192.png';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Header = (props) => {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
        toast.success("Log out successfully!");
    }
    return (
        <header>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <NavbarBrand tag={Link} to="/" className='navbar-brand'>
                        <img
                            src={logoApp}
                            width="30" height="30"
                            className="d-inline-block align-top" alt="logo" />
                        <span>React-Bootstrap</span>
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
                                    <NavDropdown.Item
                                        onClick={() => handleLogout()}
                                        className='dropdown-item'>Logout
                                    </NavDropdown.Item>
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