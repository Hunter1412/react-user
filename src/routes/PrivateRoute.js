import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { Alert } from 'react-bootstrap';


const PrivateRoute = ({ children }) => {
    const { user } = useContext(UserContext);

    if (user && user.auth === false) {
        return (
            <Alert variant="danger">
                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                <p>You don't have permission to access this router</p>
            </Alert>
        )
    }

    return user && user.auth === true ? children : <Navigate to="/login" />;
}

export default PrivateRoute;