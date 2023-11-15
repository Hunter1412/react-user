import Container from 'react-bootstrap/Container';
import { Nav, Navbar, NavbarBrand, NavDropdown, NavItem } from 'react-bootstrap';
import logoApp from '../assets/images/logo192.png';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import { useDispatch, useSelector } from 'react-redux';
import { handleLogoutRedux } from "../redux/actions/userAction";

const Header = (props) => {
    const navigate = useNavigate();

    const user = useSelector(state => state.user.account);

    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(handleLogoutRedux());
        navigate("/");
        toast.success("Log out successfully!");
    }

    // useEffect(() => {
    //     if (user && user.auth === false) {
    //         navigate("/");
    //         toast.success("Log out successfully!");
    //     }
    // }, [user])

    return (
        <header>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <NavLink tag={Link} to="/" className='navbar-brand'>
                        <img
                            src={logoApp}
                            width="30" height="30"
                            className="d-inline-block align-top" alt="logo" />
                        <span>React-Bootstrap</span>
                    </NavLink>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        {((user && user.auth === true) || window.location.pathname !== "/login") &&
                            <>
                                <Nav className="me-auto">
                                    <NavItem>
                                        <NavLink tag={Link} to="/" className='nav-link'>Home</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={Link} to="/users" className='nav-link'>Manager Users</NavLink>
                                    </NavItem>
                                </Nav>
                                <Nav>
                                    {user && user.auth === true &&
                                        <NavItem>
                                            <span className='nav-link'>Welcome {user.email}</span>
                                        </NavItem>
                                    }
                                    <NavDropdown title="Setting" id="basic-nav-dropdown">
                                        {user && user.auth === true
                                            ? <NavItem>
                                                <NavDropdown.Item
                                                    onClick={() => handleLogout()}
                                                    className='dropdown-item'>Logout
                                                </NavDropdown.Item>
                                            </NavItem>
                                            :
                                            <NavItem>
                                                <NavLink tag={Link} to="/login"
                                                    className='dropdown-item'>Login</NavLink>
                                            </NavItem>
                                        }
                                    </NavDropdown>
                                </Nav>
                            </>
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}

export default Header;