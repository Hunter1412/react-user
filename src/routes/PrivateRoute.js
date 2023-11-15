import { Navigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import { useSelector } from 'react-redux';


const PrivateRoute = ({ children }) => {
    const user = useSelector(state => state.user.account);

    if (user && user.auth === false) {
        return (
            <Alert variant="danger">
                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                <p>You don't have permission to access this router</p>
            </Alert>
        )
    }

    return user && user.auth === true ? children : <Navigate to="/" />;
}

export default PrivateRoute;