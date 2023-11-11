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
    }
];

export default AppRoutes;
