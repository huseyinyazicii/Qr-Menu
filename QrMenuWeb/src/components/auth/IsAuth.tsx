import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Roles from '../../constants/Roles';
import Paths from '../../constants/Paths';

const IsAuth = () => {
    const { auth } = useAuth();

    const location = useLocation();

    return !auth.isAuth ? (
        <Outlet />
    ) : Roles.Admin === auth.role ? (
        <Navigate to={Paths.admin.base} state={{ from: location }} replace />
    ) : (
        <Navigate to={Paths.customer.base} state={{ from: location }} replace />
    );
};

export default IsAuth;