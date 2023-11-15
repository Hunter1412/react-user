import Login from '../components/Auth/Login';
import Home from '../components/Home';
import TableUsers from '../components/User/TableUsers';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const AppRoutes = () => {
    // const { user } = useContext(UserContext);
    // console.log(`check user>>>`, user);
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
        </Routes>
    )
}

export default AppRoutes;
