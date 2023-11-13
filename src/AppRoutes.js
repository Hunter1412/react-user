import Login from './components/Auth/Login';
import Home from './components/Home';
import TableUsers from './components/User/TableUsers';

const AppRoutes = [
    {
        index: true,
        element: <Home />
    },
    {
        path: '/users',
        element: <TableUsers />
    },
    {
        path: '/login',
        element: <Login />
    }
];

export default AppRoutes;
