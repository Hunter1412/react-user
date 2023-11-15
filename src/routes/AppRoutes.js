import Login from '../components/Auth/Login';
import Home from '../components/Home';
import TableUsers from '../components/User/TableUsers';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import NotFound from "../components/NotFound";


const AppRoutes = () => {
    return (
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route
                exact path="/users"
                element={
                    <PrivateRoute>
                        <TableUsers />
                    </PrivateRoute>
                }
            />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

export default AppRoutes;
